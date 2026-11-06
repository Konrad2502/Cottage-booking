import { CalendarDays, House, Trees } from "lucide-react";
import "./WelcomeSection.scss";

export default function WelcomeSection() {
  return (
    <section className="welcome-section">
      <div className="welcome-section__header">
        <h1 className="welcome-section__title">Zaplanuj pobyt w Długoszówce</h1>

        <p className="welcome-section__description">
          Wybierz datę przyjazdu i wyjazdu, aby sprawdzić dostępność naszych
          domków.
        </p>
      </div>

      <div className="welcome-section__gallery">
        <img
          src="/images/domki.webp"
          alt="Domki Długoszówka"
          className="welcome-section__image"
        />
      </div>

      <div className="welcome-section__features">
        <div className="welcome-section__feature">
          <House size={24} strokeWidth={1.8} aria-hidden="true" />
          <span>3 domki</span>
        </div>

        <div className="welcome-section__feature">
          <CalendarDays size={24} strokeWidth={1.8} aria-hidden="true" />
          <span>Cały rok</span>
        </div>

        <div className="welcome-section__feature">
          <Trees size={24} strokeWidth={1.8} aria-hidden="true" />
          <span>Blisko natury</span>
        </div>
      </div>
    </section>
  );
}
