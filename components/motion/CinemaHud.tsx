export function CinemaHud() {
  return (
    <>
      <div className="film-texture" aria-hidden="true" />
      <aside className="cinema-hud" aria-hidden="true" data-tone="light">
        <span className="cinema-hud__percentage" data-cinema-progress-value>
          0%
        </span>
        <span className="cinema-hud__rail">
          <span data-cinema-progress-fill />
        </span>
        <span className="cinema-hud__label" data-cinema-progress-label>
          Chegar
        </span>
        <span className="cinema-hud__chapter">
          <span data-cinema-current>01</span>
          <span>
            /<span data-cinema-total>10</span>
          </span>
        </span>
      </aside>
    </>
  );
}
