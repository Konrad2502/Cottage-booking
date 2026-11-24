import { CalendarDays, Users, ArrowRight } from "lucide-react";
import type { DateRange } from "@daypicker/react";

import type { CottageGuests } from "../GuestSelector/GuestSelector";
import type { BookingLine } from "../../types/booking";

import "./BookingSummary.scss";

type BookingSummaryProps = {
  isSearchComplete: boolean;
  hasSelectedDates: boolean;
  hasConfirmedGuests: boolean;
  selectedCottages: CottageGuests[];
  selectedDates?: DateRange;
  nights: number;
  isCottageSelected: boolean;
  bookingLines: BookingLine[];
  bookingTotal: number;
  isCheckoutStep: boolean;
  hasAcceptedTerms: boolean;
  onNextStep: () => void;
  onBackFromCheckout: () => void;
  onBackToOffer: () => void;
};

const DEPOSIT_RATE = 0.3;

function formatPrice(price: number): string {
  return price.toLocaleString("pl-PL", {
    style: "currency",
    currency: "PLN",
  });
}

function formatMonth(date: Date): string {
  const month = new Intl.DateTimeFormat("pl-PL", {
    month: "short",
  }).format(date);

  return `${month} ${date.getFullYear()}`;
}

function formatNights(nights: number): string {
  if (nights === 1) return "noc";

  const lastDigit = nights % 10;
  const lastTwoDigits = nights % 100;

  if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    (lastTwoDigits < 12 || lastTwoDigits > 14)
  ) {
    return "noce";
  }

  return "nocy";
}

export default function BookingSummary({
  isSearchComplete,
  hasSelectedDates,
  hasConfirmedGuests,
  selectedCottages,
  selectedDates,
  nights,
  isCottageSelected,
  bookingLines,
  bookingTotal,
  isCheckoutStep,
  hasAcceptedTerms,
  onNextStep,
  onBackFromCheckout,
  onBackToOffer,
}: BookingSummaryProps) {
  const from = selectedDates?.from;
  const to = selectedDates?.to;

  const depositAmount = Math.round(bookingTotal * DEPOSIT_RATE * 100) / 100;

  return (
    <section
      className="booking-summary"
      aria-labelledby="booking-summary-title"
    >
      <h2 className="booking-summary__title" id="booking-summary-title">
        Twój pobyt
      </h2>

      {/* Brak dat lub gości */}
      {!isSearchComplete && (
        <div className="booking-summary__empty">
          {!hasSelectedDates ? (
            <>
              <CalendarDays size={28} strokeWidth={1.5} aria-hidden="true" />

              <p className="booking-summary__message">Nie wybrano dat</p>

              <p className="booking-summary__description">
                Wybierz termin pobytu, aby sprawdzić dostępność domków i cenę
                rezerwacji.
              </p>
            </>
          ) : !hasConfirmedGuests ? (
            <>
              <Users size={28} strokeWidth={1.5} aria-hidden="true" />

              <p className="booking-summary__message">
                Nie wybrano liczby gości
              </p>

              <p className="booking-summary__description">
                Wybierz i zatwierdź liczbę dorosłych, dzieci oraz domków, aby
                zobaczyć dostępne opcje pobytu.
              </p>
            </>
          ) : null}
        </div>
      )}

      {/* Goście wybrani, oferta jeszcze nie */}
      {isSearchComplete && !isCottageSelected && (
        <div className="booking-summary__cottages">
          {selectedCottages.map((cottage, index) => (
            <div className="booking-summary__cottage" key={cottage.id}>
              <h3 className="booking-summary__cottage-title">
                Domek {index + 1}
              </h3>

              <p className="booking-summary__guests">
                {cottage.adults} ×{" "}
                {cottage.adults === 1 ? "Dorosły" : "Dorośli"}
              </p>

              {cottage.children > 0 && (
                <p className="booking-summary__guests">
                  {cottage.children} ×{" "}
                  {cottage.children === 1 ? "Dziecko" : "Dzieci"} (0–3 lat)
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Wybrana oferta */}
      {isSearchComplete && isCottageSelected && from && to && (
        <div className="booking-summary__details">
          {/* Daty */}
          <div className="booking-summary__dates">
            <div className="booking-summary__date">
              <strong>{from.getDate()}</strong>
              <span>{formatMonth(from)}</span>
              <small>od 16:00</small>
            </div>

            <div className="booking-summary__date">
              <strong>{to.getDate()}</strong>
              <span>{formatMonth(to)}</span>
              <small>do 10:00</small>
            </div>

            <div className="booking-summary__date">
              <strong>{nights}</strong>
              <span>{formatNights(nights)}</span>
              <small>Pobyt</small>
            </div>
          </div>

          {/* Zdjęcie oferty */}
          <div className="booking-summary__image-wrapper">
            <img
              src="/images/photo-6.webp"
              alt="Wybrany całoroczny domek Długoszówka"
              className="booking-summary__image"
            />

            <div className="booking-summary__image-label">
              <strong>Całoroczny domek letniskowy</strong>
            </div>
          </div>

          {/* Wybrane domki */}
          <div className="booking-summary__selected-cottages">
            {bookingLines.map((line, index) => (
              <div className="booking-summary__selected-cottage" key={line.id}>
                <div className="booking-summary__selected-header">
                  <h3>
                    {bookingLines.length > 1
                      ? `Całoroczny domek – ${index + 1}`
                      : "Całoroczny domek letniskowy"}
                  </h3>

                  <strong>{formatPrice(line.total)}</strong>
                </div>

                <p className="booking-summary__guests">
                  {line.adults} × {line.adults === 1 ? "Dorosły" : "Dorośli"}
                  {line.children > 0 &&
                    `, ${line.children} × ${
                      line.children === 1 ? "Dziecko" : "Dzieci"
                    }`}
                </p>

                <p className="booking-summary__item-detail">
                  Pobyt: {formatPrice(line.cottagePrice)}
                </p>

                {line.baliaDays > 0 && (
                  <p className="booking-summary__item-detail">
                    Balia ({line.baliaDays}{" "}
                    {line.baliaDays === 1 ? "doba" : "dób"}):{" "}
                    {formatPrice(line.baliaPrice)}
                  </p>
                )}

                {line.saunaSessions > 0 && (
                  <p className="booking-summary__item-detail">
                    Sauna ({line.saunaSessions} × 4 godz.):{" "}
                    {formatPrice(line.saunaPrice)}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Cena i przedpłata */}
          <div className="booking-summary__payment">
            <div className="booking-summary__total">
              <span>Suma rezerwacji</span>
              <strong>{formatPrice(bookingTotal)}</strong>
            </div>

            <div className="booking-summary__deposit">
              <span>Przedpłata (30%)</span>
              <strong>{formatPrice(depositAmount)}</strong>
            </div>
          </div>

          {/* Etap 1: Dalej / Etap 2: Rezerwuj */}
          {isCheckoutStep ? (
            <>
              <button
                type="submit"
                form="booking-checkout-form"
                className="booking-summary__next booking-summary__next--reserve"
                disabled={!hasAcceptedTerms}
              >
                <span>
                  <strong>Rezerwuj</strong>
                  <small> z obowiązkiem zapłaty</small>
                </span>
              </button>

              {!hasAcceptedTerms && (
                <p className="booking-summary__terms-warning" role="status">
                  Aby kontynuować, zaakceptuj warunek bezzwrotnej przedpłaty w
                  formularzu.
                </p>
              )}
            </>
          ) : (
            <button
              type="button"
              className="booking-summary__next"
              onClick={onNextStep}
            >
              Dalej
              <ArrowRight size={20} strokeWidth={2} aria-hidden="true" />
            </button>
          )}

          {/* Powrót */}
          <button
            type="button"
            className="booking-summary__back"
            onClick={isCheckoutStep ? onBackFromCheckout : onBackToOffer}
          >
            Powrót
          </button>
        </div>
      )}
    </section>
  );
}
