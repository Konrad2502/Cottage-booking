import { CalendarDays, ChevronDown } from "lucide-react";
import "./BookingSearch.scss";

export default function BookingSearch() {
  return (
    <section className="booking-search" aria-label="Wyszukiwanie pobytu">
      <button
        type="button"
        className="booking-search__field"
        aria-label="Wybierz datę pobytu"
      >
        <span className="booking-search__text">Wybierz datę pobytu</span>

        <CalendarDays size={20} strokeWidth={1.8} aria-hidden="true" />
      </button>

      <button
        type="button"
        className="booking-search__field"
        aria-label="Wybierz liczbę gości"
      >
        <span className="booking-search__text">
          <strong>2 x Dorośli</strong>, 0 x Dzieci
        </span>

        <ChevronDown size={20} strokeWidth={1.8} aria-hidden="true" />
      </button>
    </section>
  );
}
