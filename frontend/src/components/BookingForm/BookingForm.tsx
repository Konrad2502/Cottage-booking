import { useState, type FormEvent } from "react";

import "./BookingForm.scss";

type BookingFormProps = {
  hasAcceptedTerms: boolean;
  formMessage: string;
  onAcceptTerms: (accepted: boolean) => void;
  onSubmit: () => void;
};

const arrivalHours = [
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

export default function BookingForm({
  hasAcceptedTerms,
  formMessage,
  onAcceptTerms,
  onSubmit,
}: BookingFormProps) {
  const [wantsInvoice, setWantsInvoice] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Dodatkowe zabezpieczenie przed wysłaniem bez zgody
    if (!hasAcceptedTerms) return;

    // Walidacja pól required odbywa się wcześniej w przeglądarce.
    onSubmit();
  }

  return (
    <section className="booking-form" aria-labelledby="booking-form-title">
      <h2 className="booking-form__title" id="booking-form-title">
        Podsumowanie
      </h2>

      <form
        id="booking-checkout-form"
        className="booking-form__form"
        onSubmit={handleSubmit}
      >
        {/* DANE OSOBOWE */}
        <section className="booking-form__card">
          <h3 className="booking-form__section-title">Dane osobowe</h3>

          <div className="booking-form__grid">
            <div className="booking-form__field">
              <label htmlFor="booking-first-name">Imię *</label>
              <input
                id="booking-first-name"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
              />
            </div>

            <div className="booking-form__field">
              <label htmlFor="booking-last-name">Nazwisko *</label>
              <input
                id="booking-last-name"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
              />
            </div>

            <div className="booking-form__field">
              <label htmlFor="booking-email">E-mail *</label>
              <input
                id="booking-email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>

            <div className="booking-form__field">
              <label htmlFor="booking-phone">Telefon *</label>

              <div className="booking-form__phone">
                <select
                  name="phoneCode"
                  aria-label="Kod kraju numeru telefonu"
                  defaultValue="+48"
                >
                  <option value="+48">+48 PL</option>
                  <option value="+44">+44 UK</option>
                  <option value="+49">+49 DE</option>
                  <option value="+420">+420 CZ</option>
                </select>

                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel-national"
                  inputMode="tel"
                  required
                  placeholder="Numer telefonu"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAKTURA */}
        <section className="booking-form__invoice">
          <label className="booking-form__checkbox-label">
            <input
              type="checkbox"
              name="wantsInvoice"
              checked={wantsInvoice}
              onChange={(event) => setWantsInvoice(event.target.checked)}
            />
            <span>Faktura</span>
          </label>

          <p className="booking-form__hint">
            Zaznacz tę opcję, jeśli potrzebujesz faktury wystawionej na firmę.
          </p>
        </section>

        {/* DANE FIRMY */}
        {wantsInvoice && (
          <section className="booking-form__card">
            <h3 className="booking-form__section-title">Dane firmy</h3>

            <div className="booking-form__grid">
              <div className="booking-form__field">
                <label htmlFor="company-name">Nazwa firmy *</label>
                <input
                  id="company-name"
                  name="companyName"
                  type="text"
                  autoComplete="organization"
                  required
                />
              </div>

              <div className="booking-form__field">
                <label htmlFor="company-nip">NIP *</label>
                <input
                  id="company-nip"
                  name="companyNip"
                  type="text"
                  inputMode="numeric"
                  required
                />
              </div>

              <div className="booking-form__field">
                <label htmlFor="company-street">Ulica i nr domu *</label>
                <input
                  id="company-street"
                  name="companyStreet"
                  type="text"
                  autoComplete="street-address"
                  required
                />
              </div>

              <div className="booking-form__field">
                <label htmlFor="company-postal">Kod pocztowy *</label>
                <input
                  id="company-postal"
                  name="companyPostal"
                  type="text"
                  autoComplete="postal-code"
                  required
                />
              </div>

              <div className="booking-form__field">
                <label htmlFor="company-city">Miejscowość *</label>
                <input
                  id="company-city"
                  name="companyCity"
                  type="text"
                  required
                />
              </div>

              <div className="booking-form__field">
                <label htmlFor="company-country">Państwo *</label>
                <select
                  id="company-country"
                  name="companyCountry"
                  defaultValue="Polska"
                  required
                >
                  <option value="Polska">Polska</option>
                  <option value="Wielka Brytania">Wielka Brytania</option>
                  <option value="Niemcy">Niemcy</option>
                  <option value="Czechy">Czechy</option>
                  <option value="Inne">Inne</option>
                </select>
              </div>
            </div>
          </section>
        )}

        {/* DODATKOWE ŻYCZENIA */}
        <section className="booking-form__card">
          <h3 className="booking-form__section-title">Dodatkowe życzenia</h3>

          <div className="booking-form__field booking-form__field--time">
            <label htmlFor="arrival-hour">Planowana godzina przyjazdu</label>

            <select id="arrival-hour" name="arrivalHour" defaultValue="16:00">
              {arrivalHours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>

          <div className="booking-form__field">
            <label htmlFor="booking-requests">Uwagi i preferencje</label>

            <textarea
              id="booking-requests"
              name="requests"
              rows={5}
              placeholder="Preferencje, uwagi, pytania?..."
            />
          </div>
        </section>

        {/* REGULAMIN PRZEDPŁATY */}
        <section className="booking-form__terms">
          <h3 className="booking-form__section-title">Warunki rezerwacji</h3>

          <label className="booking-form__terms-label">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={hasAcceptedTerms}
              onChange={(event) => onAcceptTerms(event.target.checked)}
              required
            />

            <span>
              Rozumiem i akceptuję, że{" "}
              <strong>
                przedpłata w wysokości 30% wartości rezerwacji jest bezzwrotna
              </strong>{" "}
              w przypadku rezygnacji z pobytu.
            </span>
          </label>
        </section>

        {formMessage && (
          <p className="booking-form__feedback" role="status">
            {formMessage}
          </p>
        )}

        <p className="booking-form__required-note">* Pola wymagane</p>
      </form>
    </section>
  );
}
