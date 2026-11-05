import Container from "./components/Container/Container";
import Navigation from "./components/Navigation/Navigation";
import BookingSearch from "./components/BookingSearch/BookingSearch";
import MainContent from "./components/MainContent/MainContent";
import Footer from "./components/Footer/Footer";

import "./App.scss";

export default function App() {
  return (
    <div className="app">
      <Container>
        <Navigation />
        <BookingSearch />
        <MainContent />
        <Footer />
      </Container>
    </div>
  );
}
