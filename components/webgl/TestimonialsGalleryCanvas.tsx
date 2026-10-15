"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  LinearFilter,
  MathUtils,
  ShaderMaterial,
  SRGBColorSpace,
  TextureLoader,
} from "three";

export type TestimonialTexture = {
  id: string;
  src: string;
  width: number;
  height: number;
};

const DEPTH_STEP = 4.8;
const CAMERA_START = 6.4;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uProximity;

  void main() {
    vUv = uv;
    vec3 transformed = position;
    float horizontalEdge = pow(abs(uv.x - 0.5) * 2.0, 2.0);
    float verticalEdge = pow(abs(uv.y - 0.5) * 2.0, 2.0);
    transformed.z += horizontalEdge * uProximity * 0.42;
    transformed.z += verticalEdge * uProximity * 0.08;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uDistance;
  uniform float uHover;

  void main() {
    float zoom = mix(1.0, 0.94, uHover);
    vec2 uv = 0.5 + (vUv - 0.5) * zoom;
    vec4 color = texture2D(uTexture, uv);

    float farFog = smoothstep(5.4, 10.5, uDistance);
    float nearFade = smoothstep(1.2, 2.35, uDistance);
    float edgeShade = smoothstep(0.74, 0.98, length((vUv - 0.5) * 1.5));
    vec3 fogColor = vec3(0.204, 0.184, 0.282);
    vec3 finalColor = mix(color.rgb, fogColor, farFog * 0.96);
    finalColor *= 1.0 - edgeShade * 0.08;

    float alpha = color.a * (1.0 - farFog * 0.96) * nearFade;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const X_OFFSETS = [1.4, 1.05, 1.48, 0.95, 1.3] as const;

function TestimonialPlane({
  index,
  testimonial,
}: {
  index: number;
  testimonial: TestimonialTexture;
}) {
  const materialRef = useRef<ShaderMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const sourceTexture = useLoader(TextureLoader, testimonial.src);
  const renderer = useThree((state) => state.gl);
  const viewportWidth = useThree((state) => state.size.width);
  const compact = viewportWidth <= 900;
  const aspect = testimonial.width / testimonial.height;
  const compactPlaneWidth = 1.42;
  const planeHeight = compact
    ? compactPlaneWidth / aspect
    : aspect < 0.9
      ? 2.35
      : 1.9;
  const planeWidth = compact
    ? compactPlaneWidth
    : Math.min(4.5, planeHeight * aspect);
  const z = -index * DEPTH_STEP;

  const texture = useMemo(() => {
    const preparedTexture = sourceTexture.clone();
    preparedTexture.colorSpace = SRGBColorSpace;
    preparedTexture.minFilter = LinearFilter;
    preparedTexture.magFilter = LinearFilter;
    preparedTexture.anisotropy = Math.min(
      8,
      renderer.capabilities.getMaxAnisotropy(),
    );
    preparedTexture.needsUpdate = true;
    return preparedTexture;
  }, [renderer, sourceTexture]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uDistance: { value: 10 },
      uHover: { value: 0 },
      uProximity: { value: 0 },
    }),
    [texture],
  );

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame(({ camera }, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const distance = Math.abs(camera.position.z - z);
    material.uniforms.uDistance.value = distance;
    material.uniforms.uProximity.value = Math.max(0, 1 - distance / 5.2);
    material.uniforms.uHover.value = MathUtils.damp(
      material.uniforms.uHover.value,
      hovered ? 1 : 0,
      7,
      delta,
    );
  });

  return (
    <mesh
      position={[
        compact ? 0 : X_OFFSETS[index % X_OFFSETS.length],
        compact ? -0.58 : 0,
        z,
      ]}
      rotation={[0, index % 2 === 0 ? 0.055 : -0.055, 0]}
      onPointerOut={() => setHovered(false)}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
    >
      <planeGeometry args={[planeWidth, planeHeight, 32, 24]} />
      <shaderMaterial
        ref={materialRef}
        depthWrite={false}
        fragmentShader={fragmentShader}
        transparent
        uniforms={uniforms}
        vertexShader={vertexShader}
      />
    </mesh>
  );
}

function TestimonialsScene({
  progressRef,
  testimonials,
}: {
  progressRef: { current: number };
  testimonials: TestimonialTexture[];
}) {
  const viewportWidth = useThree((state) => state.size.width);
  const compact = viewportWidth <= 900;
  const finalApproachDistance = 2.5;
  const travelOffset = compact ? -finalApproachDistance : 2.6;
  const travel =
    CAMERA_START + (testimonials.length - 1) * DEPTH_STEP + travelOffset;

  useFrame(({ camera }, delta) => {
    const targetZ = CAMERA_START - progressRef.current * travel;
    camera.position.z = MathUtils.damp(camera.position.z, targetZ, 3.6, delta);
    camera.position.y = MathUtils.damp(camera.position.y, 0.08, 3.2, delta);
    camera.lookAt(0, 0, camera.position.z - 5);
  });

  return testimonials.map((testimonial, index) => (
    <TestimonialPlane
      index={index}
      key={testimonial.id}
      testimonial={testimonial}
    />
  ));
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

export default function TestimonialsGalleryCanvas({
  active,
  onLost,
  progressRef,
  testimonials,
}: {
  active: boolean;
  onLost: () => void;
  progressRef: { current: number };
  testimonials: TestimonialTexture[];
}) {
  return (
    <Canvas
      camera={{ fov: 44, position: [0, 0.08, CAMERA_START] }}
      dpr={[1, 1.35]}
      frameloop={active ? "always" : "demand"}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#342f48");
      }}
    >
      <ContextGuard onLost={onLost} />
      <TestimonialsScene
        progressRef={progressRef}
        testimonials={testimonials}
      />
    </Canvas>
  );
}
