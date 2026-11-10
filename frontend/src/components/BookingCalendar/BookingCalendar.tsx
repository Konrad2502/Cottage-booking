import { useState } from "react";
import { DayPicker, type DateRange } from "@daypicker/react";
import { pl } from "@daypicker/react/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "@daypicker/react/style.css";
import "./BookingCalendar.scss";

type BookingCalendarProps = {
  initialRange?: DateRange;
  onConfirm: (range: DateRange) => void;
};

const MIN_NIGHTS = 2;
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

function getNights(from: Date, to: Date): number {
  const start = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());

  const end = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());

  return (end - start) / MILLISECONDS_PER_DAY;
}

function isSameDay(first: Date, second: Date): boolean {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function formatNights(nights: number): string {
  if (nights === 1) return "1 noc";

  const lastDigit = nights % 10;
  const lastTwoDigits = nights % 100;

  if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    (lastTwoDigits < 12 || lastTwoDigits > 14)
  ) {
    return `${nights} noce`;
  }

  return `${nights} nocy`;
}

export default function BookingCalendar({
  initialRange,
  onConfirm,
}: BookingCalendarProps) {
  const [range, setRange] = useState<DateRange | undefined>(initialRange);

  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const hasCompleteRange = Boolean(range?.from && range?.to);

  const previewNights =
    range?.from && !range.to && hoverDate
      ? getNights(range.from, hoverDate)
      : null;

  const hasValidPreview = previewNights !== null && previewNights >= MIN_NIGHTS;

  function handleDayClick(day: Date) {
    if (!range?.from || range.to) {
      setRange({ from: day, to: undefined });
      setHoverDate(null);
      setError(null);
      return;
    }

    const nights = getNights(range.from, day);

    if (nights <= 0) {
      setRange({ from: day, to: undefined });
      setHoverDate(null);
      setError(null);
      return;
    }

    if (nights < MIN_NIGHTS) {
      setError("Minimalna długość pobytu to 2 noce");
      setHoverDate(day);
      return;
    }

    setRange({ from: range.from, to: day });
    setHoverDate(null);
    setError(null);
  }

  function handleClear() {
    setRange(undefined);
    setHoverDate(null);
    setError(null);
  }

  function handleConfirm() {
    if (!range?.from || !range?.to) return;

    onConfirm(range);
  }

  return (
    <div
      className="booking-calendar"
      id="booking-calendar"
      role="region"
      aria-label="Kalendarz wyboru dat pobytu"
    >
      <div className="booking-calendar__body">
        <DayPicker
          mode="range"
          locale={pl}
          weekStartsOn={1}
          numberOfMonths={2}
          pagedNavigation
          showOutsideDays={false}
          startMonth={new Date(today.getFullYear(), today.getMonth())}
          disabled={{ before: today }}
          selected={range}
          onSelect={() => {
            // Sterujemy zakresem przez handleDayClick.
          }}
          onDayClick={(day, modifiers) => {
            if (modifiers.disabled || modifiers.hidden) return;

            handleDayClick(day);
          }}
          onDayMouseEnter={(day, modifiers) => {
            if (modifiers.disabled || !range?.from || range.to) {
              return;
            }

            setHoverDate(day);
          }}
          onDayMouseLeave={() => setHoverDate(null)}
          modifiers={{
            preview: (day) => {
              if (!range?.from || range.to || !hoverDate || !hasValidPreview) {
                return false;
              }

              return day >= range.from && day <= hoverDate;
            },

            previewStart: (day) =>
              Boolean(
                range?.from &&
                !range.to &&
                hasValidPreview &&
                isSameDay(day, range.from),
              ),

            previewEnd: (day) =>
              Boolean(
                hoverDate &&
                !range?.to &&
                hasValidPreview &&
                isSameDay(day, hoverDate),
              ),
          }}
          modifiersClassNames={{
            preview: "booking-calendar__preview",
            previewStart: "booking-calendar__preview-start",
            previewEnd: "booking-calendar__preview-end",
          }}
          components={{
            Chevron: ({ orientation }) =>
              orientation === "left" ? (
                <ChevronLeft size={20} strokeWidth={1.8} />
              ) : (
                <ChevronRight size={20} strokeWidth={1.8} />
              ),
          }}
        />

        {error && (
          <p className="booking-calendar__error" role="alert">
            {error}
          </p>
        )}

        {!error && previewNights !== null && previewNights > 0 && (
          <p
            className={`booking-calendar__preview-info ${
              previewNights < MIN_NIGHTS
                ? "booking-calendar__preview-info--invalid"
                : ""
            }`}
          >
            {previewNights < MIN_NIGHTS
              ? "min. 2 noce"
              : formatNights(previewNights)}
          </p>
        )}
      </div>

      <div className="booking-calendar__footer">
        <button
          type="button"
          className="booking-calendar__clear"
          onClick={handleClear}
        >
          Wyczyść
        </button>

        <button
          type="button"
          className="booking-calendar__confirm"
          onClick={handleConfirm}
          disabled={!hasCompleteRange}
        >
          Ustaw
        </button>
      </div>
    </div>
  );
}
