
export type CottageExtras = {
  baliaDays: number;
  saunaSessions: number;
};

export type ExtraField = keyof CottageExtras;

export type BookingLine = {
  id: number;
  adults: number;
  children: number;
  cottagePrice: number;
  baliaDays: number;
  saunaSessions: number;
  baliaPrice: number;
  saunaPrice: number;
  total: number;
};
