import { CalendarDays } from "lucide-react";
import "./BookingSummary.scss";

export default function BookingSummary() {
  return (
    <section
      className="booking-summary"
      aria-labelledby="booking-summary-title"
    >
      <h2 className="booking-summary__title" id="booking-summary-title">
        Twój pobyt
      </h2>

      <div className="booking-summary__empty">
        <CalendarDays size={28} strokeWidth={1.5} aria-hidden="true" />

        <p className="booking-summary__message">Nie wybrano dat</p>

        <p className="booking-summary__description">
          Wybierz termin pobytu, aby sprawdzić dostępność domków i cenę
          rezerwacji.
        </p>
      </div>
    </section>
  );
}
