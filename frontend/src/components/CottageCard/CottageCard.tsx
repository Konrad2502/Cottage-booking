import {
  Users,
  Wifi,
  BedSingle,
  BedDouble,
  Sofa,
  Scaling,
  Flame,
} from "lucide-react";

import "./CottageCard.scss";

export default function CottageCard() {
  // Dane testowe — później zastąpimy je danymi z backendu
  const availableCount = 2;
  const totalCount = 3;
  const price = 1200;

  return (
    <article className="cottage-card">
      <div className="cottage-card__image-wrapper">
        <img
          src="/images/domki.webp"
          alt="Domki Długoszówka"
          className="cottage-card__image"
        />
      </div>

      <div className="cottage-card__content">
        <div className="cottage-card__header">
          <h2 className="cottage-card__title">Całoroczny domek letniskowy</h2>

          <p className="cottage-card__description">
            Komfortowy domek o powierzchni 56 m², idealny na wypoczynek w
            otoczeniu natury. Przytulne wnętrze z kominkiem zapewnia wygodny
            pobyt o każdej porze roku.
          </p>
        </div>

        <div className="cottage-card__amenities">
          <div className="cottage-card__amenity">
            <Users size={20} strokeWidth={1.5} />
            <span>Do 6 osób</span>
          </div>

          <div className="cottage-card__amenity">
            <Scaling size={20} strokeWidth={1.5} />
            <span>56 m²</span>
          </div>

          <div className="cottage-card__amenity">
            <Wifi size={20} strokeWidth={1.5} />
            <span>Wi-Fi</span>
          </div>

          <div className="cottage-card__amenity">
            <BedSingle size={20} strokeWidth={1.5} />
            <span>3 × pojedyncze</span>
          </div>

          <div className="cottage-card__amenity">
            <BedDouble size={20} strokeWidth={1.5} />
            <span>1 × podwójne</span>
          </div>

          <div className="cottage-card__amenity">
            <Sofa size={20} strokeWidth={1.5} />
            <span>1 × sofa</span>
          </div>

          <div className="cottage-card__amenity">
            <Flame size={20} strokeWidth={1.5} />
            <span>Kominek</span>
          </div>
        </div>

        <p className="cottage-card__availability">
          {availableCount === 1
            ? `Ostatni dostępny domek (1 z ${totalCount})`
            : `${availableCount} z ${totalCount} domków dostępne`}
        </p>

        <div className="cottage-card__footer">
          <div className="cottage-card__price-wrapper">
            <strong className="cottage-card__price">
              {price.toLocaleString("pl-PL", {
                style: "currency",
                currency: "PLN",
              })}
            </strong>

            <span className="cottage-card__price-label">za cały pobyt</span>
          </div>

          <button type="button" className="cottage-card__button">
            Wybierz
          </button>
        </div>
      </div>
    </article>
  );
}
