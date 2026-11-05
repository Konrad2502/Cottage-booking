import { useState } from "react";
import { Link } from "react-router";
import "./Navigation.scss";

type Language = "pl" | "en";

export default function Navigation() {
  const [language, setLanguage] = useState<Language>("pl");

  return (
    <header className="navigation">
      <Link to="/" className="navigation__logo">
        DOMKI DŁUGOSZÓWKA
      </Link>

      <nav className="navigation__actions" aria-label="Main navigation">
        <Link to="/my-booking" className="navigation__booking">
          Moja rezerwacja
        </Link>

        <div
          className="navigation__languages"
          role="group"
          aria-label="Wybierz język"
        >
          <button
            type="button"
            className={`navigation__language ${
              language === "pl" ? "navigation__language--active" : ""
            }`}
            onClick={() => setLanguage("pl")}
            aria-pressed={language === "pl"}
          >
            PL
          </button>

          <button
            type="button"
            className={`navigation__language ${
              language === "en" ? "navigation__language--active" : ""
            }`}
            onClick={() => setLanguage("en")}
            aria-pressed={language === "en"}
          >
            EN
          </button>
        </div>
      </nav>
    </header>
  );
}
