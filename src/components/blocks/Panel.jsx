import { MoreVertical } from "lucide-react";
import "./Panel.css";

/**
 * Panel — the standard white content container used across hubs and
 * dashboards. Optional header with title, subtitle, and an overflow menu.
 */
export default function Panel({
  title,
  subtitle,
  headerRight,
  showMenu = false,
  padded = true,
  className = "",
  children,
}) {
  return (
    <section className={`panel${className ? ` ${className}` : ""}`}>
      {(title || headerRight || showMenu) && (
        <header className="panel__header">
          <div className="panel__heading">
            {title && <h2 className="panel__title">{title}</h2>}
            {subtitle && <p className="panel__subtitle">{subtitle}</p>}
          </div>
          <div className="panel__header-right">
            {headerRight}
            {showMenu && (
              <button className="panel__menu" aria-label="More options">
                <MoreVertical size={20} strokeWidth={2} />
              </button>
            )}
          </div>
        </header>
      )}
      <div className={`panel__body${padded ? "" : " panel__body--flush"}`}>
        {children}
      </div>
    </section>
  );
}
