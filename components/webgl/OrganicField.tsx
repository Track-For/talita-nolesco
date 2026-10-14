"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const trailVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const trailFragmentShader = `
  uniform float uTime;
  uniform float uDelta;
  uniform float uAspect;
  uniform float uPointerActive;
  uniform float uPointerRadius;
  uniform float uTrailDuration;
  uniform vec2 uPointer;
  uniform sampler2D uPreviousFrame;
  varying vec2 vUv;

  float hash(vec2 point) {
    return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    local = local * local * (3.0 - 2.0 * local);

    float a = hash(cell);
    float b = hash(cell + vec2(1.0, 0.0));
    float c = hash(cell + vec2(0.0, 1.0));
    float d = hash(cell + vec2(1.0, 1.0));

    return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
  }

  void main() {
    float trail = texture2D(uPreviousFrame, vUv).r;
    trail -= clamp(uDelta / uTrailDuration, 0.0, 0.045);
    trail = clamp(trail, 0.0, 1.0);

    if (uPointerActive > 0.5) {
      vec2 uv = (vUv - 0.5) * 2.0 * vec2(uAspect, 1.0);
      vec2 pointer = uPointer * vec2(uAspect, 1.0);
      vec2 toPointer = uv - pointer;
      float angle = atan(toPointer.y, toPointer.x);
      float distanceToPointer = length(toPointer);

      float firstNoise = noise(
        vec2(angle * 3.0 + uTime * 0.48, distanceToPointer * 5.0)
      );
      float secondNoise = noise(
        vec2(
          angle * 5.0 - uTime * 0.28,
          distanceToPointer * 3.0 + uTime
        )
      );
      float radiusVariation = 0.7 + firstNoise * 0.5 + secondNoise * 0.3;
      float organicRadius = uPointerRadius * radiusVariation;
      float imprint = 1.0 - smoothstep(
        organicRadius * 0.05,
        organicRadius * 1.2,
        distanceToPointer
      );

      imprint *= 0.8 + firstNoise * 0.2;
      trail += imprint * 0.25;
    }

    gl_FragColor = vec4(vec3(clamp(trail, 0.0, 1.0)), 1.0);
  }
`;

const fieldVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fieldFragmentShader = `
  uniform sampler2D uTrail;
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 point) {
    return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    local = local * local * (3.0 - 2.0 * local);

    float a = hash(cell);
    float b = hash(cell + vec2(1.0, 0.0));
    float c = hash(cell + vec2(0.0, 1.0));
    float d = hash(cell + vec2(1.0, 1.0));

    return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
  }

  float fbm(vec2 point) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int index = 0; index < 4; index++) {
      value += amplitude * noise(point);
      point *= 2.1;
      amplitude *= 0.3;
    }

    return value;
  }

  void main() {
    vec3 deepPlum = vec3(0.094, 0.078, 0.137);
    vec3 ivory = vec3(0.969, 0.945, 0.906);
    vec3 paleStone = vec3(0.825, 0.805, 0.842);
    vec3 paleLavender = vec3(0.662, 0.609, 0.714);
    vec3 mutedPlum = vec3(0.369, 0.314, 0.454);

    float trailValue = texture2D(uTrail, vUv).r;
    float reveal = smoothstep(0.018, 0.058, trailValue);

    vec2 textureUv = vUv * 3.5;
    vec2 distortionField = vUv * 2.0;
    float distortion = fbm(distortionField + uTime * 0.038);
    vec2 warpedUv = textureUv + (distortion - 0.5) * 0.72;
    float terrain = fbm(warpedUv);

    float softShape = smoothstep(0.1, 0.9, sin(terrain * 3.0));
    float contourCoordinate = terrain * 18.0;
    float contourBand = fract(contourCoordinate);
    float edgeWidth = max(fwidth(contourCoordinate) * 0.62, 0.012);
    float alternatingBand = smoothstep(
      0.49 - edgeWidth,
      0.51 + edgeWidth,
      contourBand
    );
    float broadBand = mod(floor(contourCoordinate), 4.0);
    float distanceToContour = min(contourBand, 1.0 - contourBand);
    float contourLine = 1.0 - smoothstep(
      0.018 + edgeWidth,
      0.06 + edgeWidth,
      distanceToContour
    );

    vec3 topography = mix(ivory, paleStone, alternatingBand);
    topography = mix(
      topography,
      paleLavender,
      step(1.5, broadBand) * 0.42
    );
    topography = mix(topography, paleLavender, softShape * 0.12);
    topography = mix(topography, mutedPlum, contourLine * 0.22);

    vec3 color = mix(deepPlum, topography, reveal * 0.92);
    gl_FragColor = vec4(color, 1.0);
  }
`;

class TrailBuffer {
  output: THREE.WebGLRenderTarget;
  private previous: THREE.WebGLRenderTarget;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.Camera;
  readonly uniforms: {
    uTime: { value: number };
    uDelta: { value: number };
    uAspect: { value: number };
    uPointerActive: { value: number };
    uPointerRadius: { value: number };
    uTrailDuration: { value: number };
    uPointer: { value: THREE.Vector2 };
    uPreviousFrame: { value: THREE.Texture };
  };

  constructor(
    private readonly renderer: THREE.WebGLRenderer,
    width: number,
    height: number,
    aspect: number,
  ) {
    const options: THREE.RenderTargetOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      depthBuffer: false,
      stencilBuffer: false,
    };

    this.output = new THREE.WebGLRenderTarget(width, height, options);
    this.previous = new THREE.WebGLRenderTarget(width, height, options);
    this.uniforms = {
      uTime: { value: 0 },
      uDelta: { value: 0 },
      uAspect: { value: aspect },
      uPointerActive: { value: 0 },
      uPointerRadius: { value: 0.38 },
      uTrailDuration: { value: 2.75 },
      uPointer: { value: new THREE.Vector2(10, 10) },
      uPreviousFrame: { value: this.previous.texture },
    };

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: trailVertexShader,
      fragmentShader: trailFragmentShader,
      depthTest: false,
      depthWrite: false,
    });

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));
    this.camera = new THREE.Camera();
  }

  resize(width: number, height: number) {
    this.output.setSize(width, height);
    this.previous.setSize(width, height);
  }

  render() {
    this.renderer.setRenderTarget(this.output);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);

    const current = this.previous;
    this.previous = this.output;
    this.output = current;
    this.uniforms.uPreviousFrame.value = this.previous.texture;
  }

  get texture() {
    return this.previous.texture;
  }

  dispose() {
    this.output.dispose();
    this.previous.dispose();
    this.scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.geometry.dispose();
      if (Array.isArray(object.material)) {
        object.material.forEach((material) => material.dispose());
      } else {
        object.material.dispose();
      }
    });
  }
}

function ContextGuard({ onLost }: { onLost: () => void }) {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const handleLost = (event: Event) => {
      event.preventDefault();
      onLost();
    };

    canvas.addEventListener("webglcontextlost", handleLost);
    return () => canvas.removeEventListener("webglcontextlost", handleLost);
  }, [gl, onLost]);

  return null;
}

function FieldPlane() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const trail = useRef<TrailBuffer | null>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const pointerTarget = useRef(new THREE.Vector2(0, 0));
  const hovering = useRef(false);
  const activeTouch = useRef<number | null>(null);
  const touchReleaseTimer = useRef<number | null>(null);
  const { gl, size, viewport } = useThree();

  useEffect(() => {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
    const canvasWidth = Math.max(1, gl.domElement.clientWidth);
    const canvasHeight = Math.max(1, gl.domElement.clientHeight);
    const buffer = new TrailBuffer(
      gl,
      Math.max(1, Math.round(canvasWidth * pixelRatio)),
      Math.max(1, Math.round(canvasHeight * pixelRatio)),
      canvasWidth / canvasHeight,
    );

    trail.current = buffer;
    const shader = material.current;
    if (shader) shader.uniforms.uTrail.value = buffer.texture;

    return () => {
      buffer.dispose();
      trail.current = null;
    };
  }, [gl]);

  useEffect(() => {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
    const buffer = trail.current;
    if (!buffer) return;

    buffer.uniforms.uAspect.value = size.width / Math.max(size.height, 1);
    buffer.resize(
      Math.max(1, Math.round(size.width * pixelRatio)),
      Math.max(1, Math.round(size.height * pixelRatio)),
    );
  }, [size.height, size.width]);

  useEffect(() => {
    const region = gl.domElement.closest(".pause-section") as HTMLElement | null;
    if (!region) return;

    const updatePointerPosition = (event: PointerEvent) => {
      const bounds = region.getBoundingClientRect();
      const isInside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      if (!isInside) {
        hovering.current = false;
        return false;
      }

      pointerTarget.current.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
      );
      return true;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const isTouch = event.pointerType === "touch";
      if (isTouch && activeTouch.current !== event.pointerId) return;
      hovering.current = updatePointerPosition(event);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch" && event.pointerType !== "pen") return;
      if (touchReleaseTimer.current !== null) {
        window.clearTimeout(touchReleaseTimer.current);
        touchReleaseTimer.current = null;
      }
      activeTouch.current = event.pointerId;
      hovering.current = updatePointerPosition(event);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (activeTouch.current !== event.pointerId) return;
      activeTouch.current = null;
      touchReleaseTimer.current = window.setTimeout(() => {
        hovering.current = false;
        touchReleaseTimer.current = null;
      }, 360);
    };

    const clearPointer = () => {
      activeTouch.current = null;
      hovering.current = false;
      if (touchReleaseTimer.current !== null) {
        window.clearTimeout(touchReleaseTimer.current);
        touchReleaseTimer.current = null;
      }
    };

    region.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, { passive: true });
    window.addEventListener("blur", clearPointer);
    document.addEventListener("mouseleave", clearPointer);

    return () => {
      region.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("blur", clearPointer);
      document.removeEventListener("mouseleave", clearPointer);
      if (touchReleaseTimer.current !== null) {
        window.clearTimeout(touchReleaseTimer.current);
      }
    };
  }, [gl]);

  useFrame((_, delta) => {
    const buffer = trail.current;
    const shader = material.current;
    if (!buffer || !shader) return;

    const safeDelta = Math.min(delta, 0.05);
    const smoothing = 1 - Math.exp(-safeDelta * 10.5);
    pointer.current.lerp(pointerTarget.current, smoothing);

    buffer.uniforms.uTime.value += safeDelta;
    buffer.uniforms.uDelta.value = safeDelta;
    buffer.uniforms.uPointer.value.copy(pointer.current);
    buffer.uniforms.uPointerActive.value = hovering.current ? 1 : 0;
    buffer.render();
    shader.uniforms.uTime.value += safeDelta;
    shader.uniforms.uTrail.value = buffer.texture;
  });

  return (
    <mesh scale={[viewport.width * 1.02, viewport.height * 1.02, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={material}
        fragmentShader={fieldFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uTrail: { value: null },
        }}
        vertexShader={fieldVertexShader}
      />
    </mesh>
  );
}

export function OrganicField({ onLost }: { onLost: () => void }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 1.55], fov: 55 }}
      dpr={[1, 1.25]}
      gl={{
        alpha: false,
        antialias: false,
        powerPreference: "low-power",
      }}
      frameloop="always"
    >
      <ContextGuard onLost={onLost} />
      <FieldPlane />
    </Canvas>
  );
}
