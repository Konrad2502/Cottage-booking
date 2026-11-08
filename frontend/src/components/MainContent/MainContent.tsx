import BookingSummary from "../BookingSummary/BookingSummary";
import CottageCard from "../CottageCard/CottageCard";
import WelcomeSection from "../WelcomeSection/WelecomeSection";
import "./MainContent.scss";

export default function MainContent() {
  return (
    <main className="main-content">
      <div className="main-content__left">
        <WelcomeSection />
        <CottageCard />
      </div>

      <aside className="main-content__right">
        <BookingSummary />
      </aside>
    </main>
  );
}
