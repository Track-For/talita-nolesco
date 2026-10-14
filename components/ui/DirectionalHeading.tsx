type DirectionalHeadingProps = {
  lines: string[];
  className?: string;
};

export function DirectionalHeading({
  lines,
  className,
}: DirectionalHeadingProps) {
  return (
    <h2 className={className}>
      {lines.map((line, index) => (
        <span className="directional-line" key={line}>
          <span
            className="directional-line__inner"
            data-direction-line
            data-reveal-direction={index % 2 === 0 ? "from-right" : "from-bottom"}
          >
            {line}
          </span>
        </span>
      ))}
    </h2>
  );
}

