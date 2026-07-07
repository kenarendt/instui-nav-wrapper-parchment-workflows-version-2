import "./Card.css";

/**
 * Card — mirrors InstUI Card v2 (large content container).
 */
export default function Card({ title, description, children, minHeight = 578 }) {
  return (
    <section className="card" style={{ minHeight }}>
      <div className="card__content">
        {(title || description) && (
          <header className="card__header">
            {title && <h2 className="card__title">{title}</h2>}
            {description && <p className="card__description">{description}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
