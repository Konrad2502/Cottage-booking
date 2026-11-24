import type { DateRange } from "@daypicker/react";

import BookingSummary from "../BookingSummary/BookingSummary";
import BookingForm from "../BookingForm/BookingForm";
import CottageCard from "../CottageCard/CottageCard";
import WelcomeSection from "../WelcomeSection/WelecomeSection";

import type { CottageGuests } from "../GuestSelector/GuestSelector";
import type {
  CottageExtras,
  ExtraField,
  BookingLine,
} from "../../types/booking";

import "./MainContent.scss";

type MainContentProps = {
  isSearchComplete: boolean;
  hasSelectedDates: boolean;
  hasConfirmedGuests: boolean;
  selectedCottages: CottageGuests[];
  selectedDates?: DateRange;
  nights: number;
  cottagePrice: number;
  isCottageSelected: boolean;
  extras: Record<number, CottageExtras>;
  bookingLines: BookingLine[];
  bookingTotal: number;

  isCheckoutStep: boolean;
  hasAcceptedTerms: boolean;
  formMessage: string;

  onSelectCottage: () => void;
  onExtraChange: (cottageId: number, field: ExtraField, change: number) => void;
  onNextStep: () => void;
  onBackFromCheckout: () => void;
  onBackToOffer: () => void;
  onAcceptTerms: (accepted: boolean) => void;
  onSubmitBooking: () => void;
};

export default function MainContent({
  isSearchComplete,
  hasSelectedDates,
  hasConfirmedGuests,
  selectedCottages,
  selectedDates,
  nights,
  cottagePrice,
  isCottageSelected,
  extras,
  bookingLines,
  bookingTotal,
  isCheckoutStep,
  hasAcceptedTerms,
  formMessage,
  onSelectCottage,
  onExtraChange,
  onNextStep,
  onBackFromCheckout,
  onBackToOffer,
  onAcceptTerms,
  onSubmitBooking,
}: MainContentProps) {
  return (
    <main className="main-content">
      <div className="main-content__left">
        {!isSearchComplete ? (
          <WelcomeSection />
        ) : isCheckoutStep ? (
          <BookingForm
            hasAcceptedTerms={hasAcceptedTerms}
            formMessage={formMessage}
            onAcceptTerms={onAcceptTerms}
            onSubmit={onSubmitBooking}
          />
        ) : (
          <CottageCard
            selectedCottages={selectedCottages}
            nights={nights}
            price={cottagePrice}
            isSelected={isCottageSelected}
            extras={extras}
            onSelect={onSelectCottage}
            onExtraChange={onExtraChange}
          />
        )}
      </div>

      <aside className="main-content__right">
        <BookingSummary
          isSearchComplete={isSearchComplete}
          hasSelectedDates={hasSelectedDates}
          hasConfirmedGuests={hasConfirmedGuests}
          selectedCottages={selectedCottages}
          selectedDates={selectedDates}
          nights={nights}
          isCottageSelected={isCottageSelected}
          bookingLines={bookingLines}
          bookingTotal={bookingTotal}
          isCheckoutStep={isCheckoutStep}
          hasAcceptedTerms={hasAcceptedTerms}
          onNextStep={onNextStep}
          onBackFromCheckout={onBackFromCheckout}
          onBackToOffer={onBackToOffer}
        />
      </aside>
    </main>
  );
}
