import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { type DateRange } from "@daypicker/react";
import { CalendarDays, ChevronDown } from "lucide-react";

import BookingCalendar from "../BookingCalendar/BookingCalendar";
import GuestSelector, {
  type CottageGuests,
} from "../GuestSelector/GuestSelector";

import "./BookingSearch.scss";

type ActivePopup = "calendar" | "guests" | null;

const MAX_COTTAGES = 3;

// Dane testowe — później pobierzemy je z backendu.
const availableCottages = 3;

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function BookingSearch() {
  const [activePopup, setActivePopup] = useState<ActivePopup>(null);

  const [selectedDates, setSelectedDates] = useState<DateRange>();

  const [selectedCottages, setSelectedCottages] = useState<CottageGuests[]>([
    { id: 1, adults: 2, children: 0 },
  ]);

  const [backdropTop, setBackdropTop] = useState(0);

  const searchRef = useRef<HTMLElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const guestsRef = useRef<HTMLDivElement | null>(null);

  const isCalendarOpen = activePopup === "calendar";
  const isGuestsOpen = activePopup === "guests";

  // Suma dorosłych ze wszystkich wybranych domków
  const totalAdults = selectedCottages.reduce(
    (sum, cottage) => sum + cottage.adults,
    0,
  );

  // Suma dzieci ze wszystkich wybranych domków
  const totalChildren = selectedCottages.reduce(
    (sum, cottage) => sum + cottage.children,
    0,
  );

  const cottageCount = selectedCottages.length;

  useEffect(() => {
    if (activePopup === null) return;

    function updateBackdropPosition() {
      if (!searchRef.current) return;

      const rect = searchRef.current.getBoundingClientRect();

      setBackdropTop(Math.max(0, rect.bottom));
    }

    function handleClickOutside(event: PointerEvent) {
      const activeRef = activePopup === "calendar" ? calendarRef : guestsRef;

      if (
        activeRef.current &&
        !activeRef.current.contains(event.target as Node)
      ) {
        setActivePopup(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActivePopup(null);
      }
    }

    updateBackdropPosition();

    window.addEventListener("resize", updateBackdropPosition);
    window.addEventListener("scroll", updateBackdropPosition, {
      passive: true,
    });

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", updateBackdropPosition);
      window.removeEventListener("scroll", updateBackdropPosition);

      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePopup]);

  function handleTogglePopup(popup: Exclude<ActivePopup, null>) {
    setActivePopup((previous) => (previous === popup ? null : popup));
  }

  function handleConfirmDates(range: DateRange) {
    setSelectedDates(range);
    setActivePopup(null);
  }

  function handleConfirmGuests(cottages: CottageGuests[]) {
    setSelectedCottages(cottages);
    setActivePopup(null);
  }

  return (
    <>
      {/* WSPÓLNY OVERLAY */}

      {activePopup !== null &&
        createPortal(
          <div
            className="booking-search__backdrop"
            style={{ top: backdropTop }}
            aria-hidden="true"
            onPointerDown={() => setActivePopup(null)}
          />,
          document.body,
        )}

      <section
        ref={searchRef}
        className={`booking-search ${
          activePopup !== null ? "booking-search--open" : ""
        }`}
        aria-label="Wyszukiwanie pobytu"
      >
        {/* WYBÓR DAT */}

        <div className="booking-search__calendar-wrapper" ref={calendarRef}>
          <button
            type="button"
            className={`booking-search__field ${
              isCalendarOpen ? "booking-search__field--active" : ""
            }`}
            aria-label="Wybierz datę pobytu"
            aria-expanded={isCalendarOpen}
            aria-controls={isCalendarOpen ? "booking-calendar" : undefined}
            onClick={() => handleTogglePopup("calendar")}
          >
            <span className="booking-search__text">
              {selectedDates?.from && selectedDates?.to
                ? `${formatDate(selectedDates.from)} – ${formatDate(selectedDates.to)}`
                : "Wybierz datę pobytu"}
            </span>

            <CalendarDays size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>

          {isCalendarOpen && (
            <BookingCalendar
              initialRange={selectedDates}
              onConfirm={handleConfirmDates}
            />
          )}
        </div>

        {/* WYBÓR GOŚCI */}

        <div className="booking-search__guests-wrapper" ref={guestsRef}>
          <button
            type="button"
            className={`booking-search__field ${
              isGuestsOpen ? "booking-search__field--active" : ""
            }`}
            aria-label="Wybierz liczbę gości"
            aria-expanded={isGuestsOpen}
            aria-controls={isGuestsOpen ? "guest-selector" : undefined}
            onClick={() => handleTogglePopup("guests")}
          >
            <span className="booking-search__text">
              <strong>{totalAdults} x Dorośli</strong>, {totalChildren} x Dzieci
              {cottageCount > 1 && `, ${cottageCount} x Domki`}
            </span>

            <ChevronDown size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>

          {isGuestsOpen && (
            <GuestSelector
              initialCottages={selectedCottages}
              availableCottages={Math.min(MAX_COTTAGES, availableCottages)}
              onConfirm={handleConfirmGuests}
            />
          )}
        </div>
      </section>
    </>
  );
}
