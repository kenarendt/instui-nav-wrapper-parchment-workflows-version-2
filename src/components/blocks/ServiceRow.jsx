import { iconFor } from "./serviceIcons.js";
import Button from "../Button.jsx";
import "./ServiceRow.css";

/**
 * ServiceRow — a service entry in an Admin Hub group: icon, title, description,
 * a count badge, and an Open button that deep-links into the service.
 */
export default function ServiceRow({ service, onOpen }) {
  const Icon = iconFor(service.icon);
  return (
    <div className="service-row">
      <div className="service-row__icon" aria-hidden="true">
        <Icon size={28} strokeWidth={1.75} />
      </div>
      <div className="service-row__body">
        <h3 className="service-row__title">{service.name}</h3>
        <p className="service-row__desc">{service.description}</p>
        <span className="service-row__badge">
          <span className="service-row__count">{service.badge.count}</span>
          {service.badge.label}
        </span>
      </div>
      <div className="service-row__action">
        <Button variant="secondary" onClick={onOpen}>
          Open
        </Button>
      </div>
    </div>
  );
}
