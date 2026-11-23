import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  TbWifi,
  TbFence,
  TbTemperature,
  TbBeach,
  TbArmchair,
  TbGrill,
  TbTeapot,
  TbCooker,
  TbToolsKitchen2,
  TbDeviceTv,
  TbFlame,
  TbParking,
  TbPaw,
  TbBath,
  TbFlower,
  TbTrees,
  TbUsers,
  TbDimensions,
  TbBed,
  TbSofa,
  TbX,
} from "react-icons/tb";

import { FaShower } from "react-icons/fa";
import { PiHairDryer, PiTowel } from "react-icons/pi";
import { MdOutlinePool, MdHotTub } from "react-icons/md";

import type { IconType } from "react-icons";
import "./CottageDetails.scss";

// Props komponentu
type CottageDetailsProps = {
  onClose: () => void;
};

// Typ pojedynczego udogodnienia
type Amenity = {
  label: string;
  icon: IconType;
  extraPaid?: boolean;
};

// Zdjęcia domków
const cottageImages = [
  {
    src: "/images/photo-1.jpg",
    alt: "Domki Długoszówka – zdjęcie 1",
  },
  {
    src: "/images/photo-2.webp",
    alt: "Domki Długoszówka – zdjęcie 2",
  },
  {
    src: "/images/photo-3.webp",
    alt: "Domki Długoszówka – zdjęcie 3",
  },
  {
    src: "/images/photo-4.webp",
    alt: "Domki Długoszówka – zdjęcie 4",
  },
  {
    src: "/images/photo-5.webp",
    alt: "Domki Długoszówka – zdjęcie 5",
  },
  {
    src: "/images/photo-6.webp",
    alt: "Domki Długoszówka – zdjęcie 6",
  },
  {
    src: "/images/photo-7.jpg",
    alt: "Domki Długoszówka – zdjęcie 7",
  },
  {
    src: "/images/photo-8.webp",
    alt: "Domki Długoszówka – zdjęcie 8",
  },
  {
    src: "/images/photo-9.webp",
    alt: "Domki Długoszówka – zdjęcie 9",
  },
  {
    src: "/images/photo-10.webp",
    alt: "Domki Długoszówka – zdjęcie 10",
  },
];

// Podstawowe informacje o domku
const cottageInfo: Amenity[] = [
  { label: "Do 6 osób", icon: TbUsers },
  { label: "56 m²", icon: TbDimensions },
  { label: "3 łóżka pojedyncze", icon: TbBed },
  { label: "1 łóżko podwójne", icon: TbBed },
  { label: "Sofa dla 2 osób", icon: TbSofa },
  { label: "Kominek", icon: TbFlame },
];

// Wyposażenie i udogodnienia
const amenities: Amenity[] = [
  { label: "Wi-Fi", icon: TbWifi },
  { label: "Taras", icon: TbFence },
  { label: "Ogrzewanie", icon: TbTemperature },
  { label: "Leżak", icon: TbBeach },
  { label: "Meble ogrodowe", icon: TbArmchair },
  { label: "Grill", icon: TbGrill },
  { label: "Czajnik", icon: TbTeapot },
  { label: "Aneks kuchenny", icon: TbCooker },
  { label: "Naczynia i sztućce", icon: TbToolsKitchen2 },
  { label: "Telewizor", icon: TbDeviceTv },
  { label: "Kominek", icon: TbFlame },
  { label: "Prysznic", icon: FaShower },
  { label: "Ręczniki", icon: PiTowel },
  { label: "Suszarka do włosów", icon: PiHairDryer },
  { label: "Parking", icon: TbParking },
  { label: "Akceptujemy zwierzęta", icon: TbPaw },
  { label: "Widok na ogród", icon: TbFlower },
  { label: "Widok na las", icon: TbTrees },
  { label: "Basen", icon: MdOutlinePool },
  { label: "Sauna", icon: MdHotTub, extraPaid: true },
  { label: "Balia wodna", icon: TbBath, extraPaid: true },
];

export default function CottageDetails({ onClose }: CottageDetailsProps) {
  // Aktualne zdjęcie w galerii
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Referencja do całego okna modala
  const dialogRef = useRef<HTMLElement | null>(null);

  // Referencja do przycisku zamykania
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Zapamiętujemy najnowszą funkcję onClose
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Obsługa modala
  useEffect(() => {
    // Zapamiętujemy element, który miał fokus przed otwarciem
    const previouslyFocusedElement = document.activeElement;

    // Zapamiętujemy wcześniejszy styl body
    const previousOverflow = document.body.style.overflow;

    // Blokujemy przewijanie strony
    document.body.style.overflow = "hidden";

    // Przenosimy fokus na przycisk X
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      // Zamykanie klawiszem Escape
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      // Zatrzymanie fokusu wewnątrz modala
      if (event.key === "Tab" && dialogRef.current) {
        const focusableElements =
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement || !lastElement) {
          event.preventDefault();
          return;
        }

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        } else if (!dialogRef.current.contains(document.activeElement)) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup po zamknięciu modala
    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      // Przywracamy wcześniejsze przewijanie strony
      document.body.style.overflow = previousOverflow;

      // Przywracamy fokus na przycisk Zobacz
      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, []);

  // Poprzednie zdjęcie
  function handlePreviousImage() {
    setCurrentImageIndex((previousIndex) =>
      previousIndex === 0 ? cottageImages.length - 1 : previousIndex - 1,
    );
  }

  // Następne zdjęcie
  function handleNextImage() {
    setCurrentImageIndex((previousIndex) =>
      previousIndex === cottageImages.length - 1 ? 0 : previousIndex + 1,
    );
  }

  return (
    <>
      {/* Przyciemnione tło modala */}
      <div
        className="cottage-details__overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Okno ze szczegółami domku */}
      <section
        ref={dialogRef}
        className="cottage-details"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cottage-details-title"
      >
        {/* Przycisk zamykania */}
        <button
          ref={closeButtonRef}
          type="button"
          className="cottage-details__close"
          onClick={onClose}
          aria-label="Zamknij szczegóły domku"
        >
          <TbX size={24} aria-hidden="true" />
        </button>

        <div className="cottage-details__content">
          {/* Nagłówek */}
          <div className="cottage-details__header">
            <h2 className="cottage-details__title" id="cottage-details-title">
              Całoroczny domek letniskowy
            </h2>

            <p className="cottage-details__subtitle">
              Komfortowy wypoczynek w otoczeniu natury
            </p>
          </div>

          {/* Galeria zdjęć */}
          <div
            className="cottage-details__gallery"
            aria-label="Galeria zdjęć domku"
          >
            {cottageImages.map((image, index) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className={`cottage-details__image ${
                  index === currentImageIndex
                    ? "cottage-details__image--active"
                    : ""
                }`}
                aria-hidden={index !== currentImageIndex}
              />
            ))}

            {/* Przyciski przewijania zdjęć */}
            {cottageImages.length > 1 && (
              <div className="cottage-details__gallery-controls">
                <button
                  type="button"
                  className="cottage-details__gallery-button"
                  onClick={handlePreviousImage}
                  aria-label="Poprzednie zdjęcie"
                >
                  <ChevronLeft size={22} strokeWidth={1.5} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className="cottage-details__gallery-button"
                  onClick={handleNextImage}
                  aria-label="Następne zdjęcie"
                >
                  <ChevronRight
                    size={22}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}

            {/* Licznik zdjęć */}
            <span
              className="cottage-details__gallery-counter"
              aria-live="polite"
              aria-atomic="true"
            >
              {currentImageIndex + 1} / {cottageImages.length}
            </span>
          </div>

          {/* Podstawowe informacje */}
          <section className="cottage-details__section">
            <h3 className="cottage-details__section-title">
              Informacje o domku
            </h3>

            <div className="cottage-details__info">
              {cottageInfo.map(({ label, icon: Icon }) => (
                <div className="cottage-details__info-item" key={label}>
                  <Icon size={30} aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Wyposażenie */}
          <section className="cottage-details__section">
            <h3 className="cottage-details__section-title">
              Wyposażenie i udogodnienia
            </h3>

            <div className="cottage-details__amenities">
              {amenities.map(({ label, icon: Icon, extraPaid }) => (
                <div className="cottage-details__amenity" key={label}>
                  <Icon
                    size={30}
                    className="cottage-details__amenity-icon"
                    aria-hidden="true"
                  />

                  <span className="cottage-details__amenity-label">
                    {label}
                  </span>

                  {extraPaid && (
                    <span className="cottage-details__amenity-extra">
                      Dodatkowo płatne
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Opis */}
          <section className="cottage-details__section">
            <h3 className="cottage-details__section-title">Opis domku</h3>

            <div className="cottage-details__description">
              <p>
                Domki Długoszówka to idealne miejsce na wypoczynek w otoczeniu
                natury, z dala od miejskiego zgiełku. Nasze komfortowe,
                całoroczne domki doskonale sprawdzą się podczas rodzinnych
                wakacji, romantycznego weekendu oraz pobytu w gronie przyjaciół.
              </p>

              <p>
                Każdy domek o powierzchni 56 m² przeznaczony jest dla
                maksymalnie 6 osób. Do dyspozycji gości pozostaje przytulny
                salon z kominkiem, wygodne miejsca do spania, w pełni wyposażony
                aneks kuchenny, łazienka z prysznicem oraz taras z meblami
                ogrodowymi. W domkach znajdują się również telewizory i
                bezpłatne Wi-Fi.
              </p>

              <h4>Relaks i odprężenie</h4>

              <p>
                Każdy domek posiada prywatną balię ogrodową opalaną drewnem, z
                wodą podgrzewaną do około 38°C. Koszt korzystania wynosi
                <strong> 200 zł za dobę lub 300 zł za dwie doby.</strong>
              </p>

              <p>
                Na terenie obiektu dostępna jest również sauna fińska z beczką
                do schładzania, wspólna dla trzech domków. Koszt wynosi
                <strong> 100 zł od domku za 4 godziny.</strong> Korzystanie z
                sauny wymaga wcześniejszego uzgodnienia terminu.
              </p>

              <p>
                W sezonie od początku maja do końca września goście mogą
                korzystać z dużego basenu zewnętrznego o wymiarach 10 × 5 m.
              </p>

              <h4>Atrakcje i aktywny wypoczynek</h4>

              <p>
                Na terenie Długoszówki znajduje się pełnowymiarowe boisko do
                siatkówki plażowej, plac zabaw dla dzieci oraz wyjątkowa zagroda
                z alpakami. Goście mają także do dyspozycji rowery, z których
                mogą korzystać bezpłatnie w ramach pobytu.
              </p>

              <p>
                Miłośnicy spokojnego wypoczynku mogą odpoczywać na hamakach,
                huśtawkach i leżakach, a wieczory spędzać przy wspólnym ognisku
                lub grillu.
              </p>

              <p>
                <strong>
                  Domki Długoszówka to połączenie komfortu, relaksu i aktywnego
                  wypoczynku — idealne miejsce, aby zwolnić tempo i cieszyć się
                  bliskością natury.
                </strong>
              </p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
