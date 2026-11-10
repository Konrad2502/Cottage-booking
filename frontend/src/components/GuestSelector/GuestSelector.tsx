import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import "./GuestSelector.scss";

export type CottageGuests = {
  id: number;
  adults: number;
  children: number;
};

type GuestSelectorProps = {
  initialCottages: CottageGuests[];
  availableCottages: number;
  onConfirm: (cottages: CottageGuests[]) => void;
};

const MAX_COTTAGES = 3;
const MAX_ADULTS = 6;
const MAX_CHILDREN = 2;
const MIN_ADULTS = 1;

export default function GuestSelector({
  initialCottages,
  availableCottages,
  onConfirm,
}: GuestSelectorProps) {
  const [cottages, setCottages] = useState<CottageGuests[]>(() =>
    initialCottages.map((cottage) => ({ ...cottage })),
  );

  const cottageLimit = Math.min(MAX_COTTAGES, availableCottages);

  const canAddCottage = cottages.length < cottageLimit;

  function handleAddCottage() {
    if (!canAddCottage) return;

    setCottages((previous) => {
      if (previous.length >= cottageLimit) return previous;

      const nextId = Math.max(0, ...previous.map((cottage) => cottage.id)) + 1;

      return [
        ...previous,
        {
          id: nextId,
          adults: 2,
          children: 0,
        },
      ];
    });
  }

  function handleRemoveCottage(id: number) {
    setCottages((previous) => {
      if (previous.length <= 1) return previous;

      return previous.filter((cottage) => cottage.id !== id);
    });
  }

  function handleUpdateGuests(
    id: number,
    field: "adults" | "children",
    change: number,
  ) {
    setCottages((previous) =>
      previous.map((cottage) => {
        if (cottage.id !== id) return cottage;

        const nextValue = cottage[field] + change;

        const minValue = field === "adults" ? MIN_ADULTS : 0;
        const maxValue = field === "adults" ? MAX_ADULTS : MAX_CHILDREN;

        if (nextValue < minValue || nextValue > maxValue) {
          return cottage;
        }

        return {
          ...cottage,
          [field]: nextValue,
        };
      }),
    );
  }

  function handleConfirm() {
    onConfirm(cottages);
  }

  return (
    <div
      className="guest-selector"
      id="guest-selector"
      role="region"
      aria-label="Wybór liczby gości i domków"
    >
      <div className="guest-selector__body">
        {cottages.map((cottage, index) => {
          const canIncreaseAdults = cottage.adults < MAX_ADULTS;

          const canIncreaseChildren = cottage.children < MAX_CHILDREN;

          return (
            <div className="guest-selector__cottage" key={cottage.id}>
              <div className="guest-selector__cottage-header">
                <h3 className="guest-selector__cottage-title">
                  Domek {index + 1}
                </h3>

                {cottages.length > 1 && index > 0 && (
                  <button
                    type="button"
                    className="guest-selector__remove"
                    onClick={() => handleRemoveCottage(cottage.id)}
                    aria-label={`Usuń domek ${index + 1}`}
                  >
                    Usuń
                  </button>
                )}
              </div>

              <div className="guest-selector__cottage-content">
                <div className="guest-selector__guest-row">
                  <span className="guest-selector__label">Dorośli</span>

                  <div className="guest-selector__counter">
                    <button
                      type="button"
                      className="guest-selector__counter-button"
                      disabled={cottage.adults <= MIN_ADULTS}
                      onClick={() =>
                        handleUpdateGuests(cottage.id, "adults", -1)
                      }
                      aria-label={`Zmniejsz liczbę dorosłych w domku ${index + 1}`}
                    >
                      <Minus size={16} />
                    </button>

                    <span className="guest-selector__count">
                      {cottage.adults}
                    </span>

                    <button
                      type="button"
                      className="guest-selector__counter-button"
                      disabled={!canIncreaseAdults}
                      onClick={() =>
                        handleUpdateGuests(cottage.id, "adults", 1)
                      }
                      aria-label={`Zwiększ liczbę dorosłych w domku ${index + 1}`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="guest-selector__guest-row">
                  <span className="guest-selector__label">Dzieci 0–3 lat</span>

                  <div className="guest-selector__counter">
                    <button
                      type="button"
                      className="guest-selector__counter-button"
                      disabled={cottage.children === 0}
                      onClick={() =>
                        handleUpdateGuests(cottage.id, "children", -1)
                      }
                      aria-label={`Zmniejsz liczbę dzieci w domku ${index + 1}`}
                    >
                      <Minus size={16} />
                    </button>

                    <span className="guest-selector__count">
                      {cottage.children}
                    </span>

                    <button
                      type="button"
                      className="guest-selector__counter-button"
                      disabled={!canIncreaseChildren}
                      onClick={() =>
                        handleUpdateGuests(cottage.id, "children", 1)
                      }
                      aria-label={`Zwiększ liczbę dzieci w domku ${index + 1}`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="guest-selector__footer">
        <button
          type="button"
          className="guest-selector__add"
          onClick={handleAddCottage}
          disabled={!canAddCottage}
        >
          Dodaj domek
        </button>

        <button
          type="button"
          className="guest-selector__confirm"
          onClick={handleConfirm}
        >
          Ustaw
        </button>
      </div>
    </div>
  );
}
