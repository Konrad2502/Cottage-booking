import { useState } from "react";
import { createPortal } from "react-dom";

import {
  Users,
  Wifi,
  BedSingle,
  BedDouble,
  Sofa,
  Scaling,
  Flame,
  Plus,
  Minus,
} from "lucide-react";

import CottageDetails from "../CottageDetails/CottageDetails";

import type { CottageGuests } from "../GuestSelector/GuestSelector";
import type { CottageExtras, ExtraField } from "../../types/booking";

import "./CottageCard.scss";

type CottageCardProps = {
  selectedCottages: CottageGuests[];
  nights: number;
  price: number;
  isSelected: boolean;
  extras: Record<number, CottageExtras>;
  onSelect: () => void;
  onExtraChange: (cottageId: number, field: ExtraField, change: number) => void;
};

// Formatowanie ceny w PLN
function formatPrice(price: number): string {
  return price.toLocaleString("pl-PL", {
    style: "currency",
    currency: "PLN",
  });
}

// Obliczanie ceny balii
function getBaliaPrice(days: number): number {
  if (days <= 0) return 0;
  if (days === 1) return 200;

  return 300 + (days - 2) * 150;
}

export default function CottageCard({
  selectedCottages,
  nights,
  price,
  isSelected,
  extras,
  onSelect,
  onExtraChange,
}: CottageCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Dane testowe — później zastąpimy je danymi z backendu
  const availableCount: number = 2;
  const totalCount: number = 3;

  return (
    <>
      <article className="cottage-card">
        {/* ZDJĘCIE */}
        <div className="cottage-card__image-wrapper">
          <img
            src="/images/domki.webp"
            alt="Domki Długoszówka"
            className="cottage-card__image"
          />

          <button
            type="button"
            className="cottage-card__details-button"
            onClick={() => setIsDetailsOpen(true)}
          >
            Zobacz
          </button>
        </div>

        {/* ZAWARTOŚĆ KARTY */}
        <div className="cottage-card__content">
          <div className="cottage-card__header">
            <h2 className="cottage-card__title">Całoroczny domek letniskowy</h2>

            <p className="cottage-card__description">
              Komfortowy domek o powierzchni 56 m², idealny na wypoczynek w
              otoczeniu natury. Przytulne wnętrze z kominkiem zapewnia wygodny
              pobyt o każdej porze roku.
            </p>
          </div>

          {/* Udogodnienia */}
          <div className="cottage-card__amenities">
            <div className="cottage-card__amenity">
              <Users size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>Do 6 osób</span>
            </div>

            <div className="cottage-card__amenity">
              <Scaling size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>56 m²</span>
            </div>

            <div className="cottage-card__amenity">
              <Wifi size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>Wi-Fi</span>
            </div>

            <div className="cottage-card__amenity">
              <BedSingle size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>3 × pojedyncze</span>
            </div>

            <div className="cottage-card__amenity">
              <BedDouble size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>1 × podwójne</span>
            </div>

            <div className="cottage-card__amenity">
              <Sofa size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>1 × sofa</span>
            </div>

            <div className="cottage-card__amenity">
              <Flame size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>Kominek</span>
            </div>
          </div>

          {/* Dostępność */}
          <p className="cottage-card__availability">
            {availableCount === 1
              ? `Ostatni dostępny domek (1 z ${totalCount})`
              : `${availableCount} z ${totalCount} domków dostępne`}
          </p>

          {/* Cena i przycisk */}
          <div className="cottage-card__footer">
            <div className="cottage-card__price-wrapper">
              <strong className="cottage-card__price">
                {formatPrice(price)}
              </strong>

              <span className="cottage-card__price-label">
                za cały pobyt / domek
              </span>
            </div>

            <button
              type="button"
              className="cottage-card__button"
              onClick={onSelect}
              disabled={isSelected}
              aria-expanded={isSelected}
              aria-controls={isSelected ? "cottage-extras" : undefined}
            >
              {isSelected ? "Wybrano" : "Wybierz"}
            </button>
          </div>
        </div>

        {/* DODATKI — WEWNĄTRZ ARTICLE */}
        {isSelected && (
          <section
            className="cottage-card__extras"
            id="cottage-extras"
            aria-labelledby="cottage-extras-title"
          >
            <h3
              className="cottage-card__extras-title"
              id="cottage-extras-title"
            >
              Dodatki
            </h3>

            {selectedCottages.map((cottage, index) => {
              const cottageExtras = extras[cottage.id] ?? {
                baliaDays: 0,
                saunaSessions: 0,
              };

              const baliaPrice = getBaliaPrice(cottageExtras.baliaDays);

              const saunaPrice = cottageExtras.saunaSessions * 100;

              return (
                <div className="cottage-card__extras-group" key={cottage.id}>
                  {/* Numer domku przy większej liczbie domków */}
                  {selectedCottages.length > 1 && (
                    <h4 className="cottage-card__extras-group-title">
                      Domek {index + 1}
                    </h4>
                  )}

                  {/* BALIA WODNA */}
                  <div className="cottage-card__extra">
                    <div className="cottage-card__extra-info">
                      <h4 className="cottage-card__extra-name">
                        Prywatna balia wodna
                      </h4>

                      <p className="cottage-card__extra-description">
                        1 doba: 200 zł · 2 doby: 300 zł · każda kolejna: +150 zł
                      </p>
                    </div>

                    <div className="cottage-card__extra-actions">
                      <div className="cottage-card__extra-price">
                        <strong>{formatPrice(baliaPrice)}</strong>
                        <span>łącznie</span>
                      </div>

                      <div className="cottage-card__counter">
                        <button
                          type="button"
                          className="cottage-card__counter-button"
                          disabled={cottageExtras.baliaDays === 0}
                          onClick={() =>
                            onExtraChange(cottage.id, "baliaDays", -1)
                          }
                          aria-label={`Zmniejsz liczbę dób balii dla domku ${index + 1}`}
                        >
                          <Minus size={16} aria-hidden="true" />
                        </button>

                        <span className="cottage-card__counter-value">
                          {cottageExtras.baliaDays}
                        </span>

                        <button
                          type="button"
                          className="cottage-card__counter-button cottage-card__counter-button--plus"
                          disabled={cottageExtras.baliaDays >= nights}
                          onClick={() =>
                            onExtraChange(cottage.id, "baliaDays", 1)
                          }
                          aria-label={`Zwiększ liczbę dób balii dla domku ${index + 1}`}
                        >
                          <Plus size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* SAUNA FIŃSKA */}
                  <div className="cottage-card__extra">
                    <div className="cottage-card__extra-info">
                      <h4 className="cottage-card__extra-name">Sauna fińska</h4>

                      <p className="cottage-card__extra-description">
                        100 zł za 4 godziny korzystania · wspólna dla wszystkich
                        domków
                      </p>
                    </div>

                    <div className="cottage-card__extra-actions">
                      <div className="cottage-card__extra-price">
                        <strong>{formatPrice(saunaPrice)}</strong>
                        <span>łącznie</span>
                      </div>

                      <div className="cottage-card__counter">
                        <button
                          type="button"
                          className="cottage-card__counter-button"
                          disabled={cottageExtras.saunaSessions === 0}
                          onClick={() =>
                            onExtraChange(cottage.id, "saunaSessions", -1)
                          }
                          aria-label={`Zmniejsz liczbę sesji sauny dla domku ${index + 1}`}
                        >
                          <Minus size={16} aria-hidden="true" />
                        </button>

                        <span className="cottage-card__counter-value">
                          {cottageExtras.saunaSessions}
                        </span>

                        <button
                          type="button"
                          className="cottage-card__counter-button cottage-card__counter-button--plus"
                          disabled={cottageExtras.saunaSessions >= nights}
                          onClick={() =>
                            onExtraChange(cottage.id, "saunaSessions", 1)
                          }
                          aria-label={`Zwiększ liczbę sesji sauny dla domku ${index + 1}`}
                        >
                          <Plus size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </article>

      {/* POPUP — POZA ARTICLE */}
      {isDetailsOpen &&
        createPortal(
          <CottageDetails onClose={() => setIsDetailsOpen(false)} />,
          document.body,
        )}
    </>
  );
}
