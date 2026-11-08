import { Link } from "react-router";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__content">
          <div className="footer__about">
            <h2 className="footer__title">Domki Długoszówka</h2>

            <p className="footer__description">
              Odpocznij blisko natury. Komfortowe, całoroczne domki stworzone z
              myślą o wyjątkowym wypoczynku.
            </p>
          </div>

          <nav className="footer__navigation" aria-label="Nawigacja w stopce">
            <h3 className="footer__heading">Przydatne linki</h3>

            <Link to="/" className="footer__link">
              Strona główna
            </Link>

            <Link to="/my-booking" className="footer__link">
              Moja rezerwacja
            </Link>
          </nav>
        </div>

        <img
          src="/images/logo.png"
          alt="Logo Domki Długoszówka"
          className="footer__logo"
        />
      </div>

      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} Domki Długoszówka. Wszelkie prawa
          zastrzeżone.
        </p>
      </div>
    </footer>
  );
}
