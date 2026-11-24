import { useState } from "react";
import type { DateRange } from "@daypicker/react";

import Container from "./components/Container/Container";
import Navigation from "./components/Navigation/Navigation";
import BookingSearch from "./components/BookingSearch/BookingSearch";
import MainContent from "./components/MainContent/MainContent";
import Footer from "./components/Footer/Footer";

import type { CottageGuests } from "./components/GuestSelector/GuestSelector";
import type { CottageExtras, ExtraField, BookingLine } from "./types/booking";

import "./App.scss";

const COTTAGE_PRICE = 1200;
const SAUNA_SESSION_PRICE = 100;

function getNights(from: Date, to: Date): number {
  const start = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());

  const end = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());

  return Math.max(0, (end - start) / 86400000);
}

function calculateBaliaPrice(days: number): number {
  if (days <= 0) return 0;
  if (days === 1) return 200;

  return 300 + (days - 2) * 150;
}

export default function App() {
  // Daty pobytu
  const [selectedDates, setSelectedDates] = useState<DateRange>();

  // Goście i liczba domków
  const [selectedCottages, setSelectedCottages] = useState<CottageGuests[]>([
    { id: 1, adults: 2, children: 0 },
  ]);

  const [hasConfirmedGuests, setHasConfirmedGuests] = useState(false);

  // Wybrana oferta
  const [isCottageSelected, setIsCottageSelected] = useState(false);

  // Dodatki
  const [extras, setExtras] = useState<Record<number, CottageExtras>>({});

  // Etap formularza rezerwacji
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);

  // Akceptacja warunku bezzwrotnej przedpłaty
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  // Komunikat po testowym wysłaniu formularza
  const [formMessage, setFormMessage] = useState("");

  const hasSelectedDates = Boolean(selectedDates?.from && selectedDates?.to);

  const isSearchComplete = hasSelectedDates && hasConfirmedGuests;

  const nights =
    selectedDates?.from && selectedDates?.to
      ? getNights(selectedDates.from, selectedDates.to)
      : 0;

  function resetCheckout() {
    setIsCheckoutStep(false);
    setHasAcceptedTerms(false);
    setFormMessage("");
  }

  function handleConfirmDates(range: DateRange) {
    setSelectedDates(range);
    setIsCottageSelected(false);
    setExtras({});
    resetCheckout();
  }

  function handleConfirmGuests(cottages: CottageGuests[]) {
    setSelectedCottages(cottages);
    setHasConfirmedGuests(true);
    setIsCottageSelected(false);
    setExtras({});
    resetCheckout();
  }

  function handleSelectCottage() {
    if (!isSearchComplete) return;

    setIsCottageSelected(true);
  }

  function handleExtraChange(
    cottageId: number,
    field: ExtraField,
    change: number,
  ) {
    setExtras((previous) => {
      const current = previous[cottageId] ?? {
        baliaDays: 0,
        saunaSessions: 0,
      };

      const nextValue = Math.max(0, Math.min(nights, current[field] + change));

      return {
        ...previous,
        [cottageId]: {
          ...current,
          [field]: nextValue,
        },
      };
    });
  }

  // Dalej: przechodzimy do formularza
  function handleNextStep() {
    if (!isSearchComplete || !isCottageSelected) return;

    setIsCheckoutStep(true);
    setFormMessage("");
  }

  // Powrót z formularza do dodatków
  function handleBackFromCheckout() {
    resetCheckout();
  }

  // Powrót z wybranej oferty do wyszukiwania
  function handleBackToOffer() {
    setIsCottageSelected(false);
    setExtras({});
    resetCheckout();
  }

  function handleAcceptTerms(accepted: boolean) {
    setHasAcceptedTerms(accepted);
    setFormMessage("");
  }

  function handleSubmitBooking() {
    if (!hasAcceptedTerms) return;

    // Na razie nie wysyłamy danych do backendu.
    setFormMessage(
      "Formularz został poprawnie wypełniony. To wersja demonstracyjna — rezerwacja nie została wysłana i nie pobrano płatności.",
    );
  }

  // Podsumowanie ceny dla każdego domku
  const bookingLines: BookingLine[] = selectedCottages.map((cottage) => {
    const cottageExtras = extras[cottage.id] ?? {
      baliaDays: 0,
      saunaSessions: 0,
    };

    const baliaPrice = calculateBaliaPrice(cottageExtras.baliaDays);
    const saunaPrice = cottageExtras.saunaSessions * SAUNA_SESSION_PRICE;

    return {
      id: cottage.id,
      adults: cottage.adults,
      children: cottage.children,
      cottagePrice: COTTAGE_PRICE,
      baliaDays: cottageExtras.baliaDays,
      saunaSessions: cottageExtras.saunaSessions,
      baliaPrice,
      saunaPrice,
      total: COTTAGE_PRICE + baliaPrice + saunaPrice,
    };
  });

  const bookingTotal = bookingLines.reduce((sum, line) => sum + line.total, 0);

  return (
    <div className="app">
      <Container>
        <Navigation />

        <BookingSearch
          selectedDates={selectedDates}
          selectedCottages={selectedCottages}
          onConfirmDates={handleConfirmDates}
          onConfirmGuests={handleConfirmGuests}
        />

        <MainContent
          isSearchComplete={isSearchComplete}
          hasSelectedDates={hasSelectedDates}
          hasConfirmedGuests={hasConfirmedGuests}
          selectedCottages={selectedCottages}
          selectedDates={selectedDates}
          nights={nights}
          cottagePrice={COTTAGE_PRICE}
          isCottageSelected={isCottageSelected}
          extras={extras}
          bookingLines={bookingLines}
          bookingTotal={bookingTotal}
          isCheckoutStep={isCheckoutStep}
          hasAcceptedTerms={hasAcceptedTerms}
          formMessage={formMessage}
          onSelectCottage={handleSelectCottage}
          onExtraChange={handleExtraChange}
          onNextStep={handleNextStep}
          onBackFromCheckout={handleBackFromCheckout}
          onBackToOffer={handleBackToOffer}
          onAcceptTerms={handleAcceptTerms}
          onSubmitBooking={handleSubmitBooking}
        />

        <Footer />
      </Container>
    </div>
  );
}
