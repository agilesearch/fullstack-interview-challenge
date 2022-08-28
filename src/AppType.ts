export type PlanetType = {
  name: string;
  code: string;
};

export type FlightType = {
  id?: number;
  data: string;
  origin: string;
  destination: string;
  price: number;
  nodays: number;
  availability: number;
};

export type DetailsType = {
  origin: string;
  destinations: Array<FlightType>;
  date: string;
};

export interface FlightRowType extends FlightType {
  addTrip: (data: FlightType) => void;
  getNameByCode: (code: string) => string;
}
