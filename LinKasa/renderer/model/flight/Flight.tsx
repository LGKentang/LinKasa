import { Timestamp } from "firebase/firestore";

interface FlightSchedule {
  flightId : string,
  airplaneCode : string,
  boardingPassId : string,
  departureGate : string,
  boardingTime : Timestamp,
  arrivalTime : Timestamp,
  origin : string
  destination : string,
  flightStatus : string,
  pilotId : string[],
  cabinCrewId : string[]
}

interface BoardingPass {
  boardingPassId : string,
  passengerId : string,
  flightId : string,
  seatNumber : string,
}

interface Airplane {
  airplaneCode: string;
  airlineName: string;
  manufacturerName: string;
  maxRow: number;
  maxCol: number;
  seatingChartCol : number;
  seatingChartRow : number;
  seatingConfiguration : string;
  seatingBoardingMap: {
      [seatingId: string]: string;
  }[];
}

export const airlineTypes = [
  "Lion Air",
  "Batik Air",
  "Air Asia",
  "Citilink",
  "Singapore Airlines",
  "Garuda Indonesia",
  "Vietnam Airlines",
  "Turkish Airlines",
  "British Airways",
  "Etihad Airways",
  "Qatar Airways",
  "American Airlines",
  "Sriwijaya Air",
  "Wings Air",
];

export const airlinePathToImage = (airline : string) => {
  return "/airline-logos/" + airline.replace(/\s+/g, "-") + ".png";
};

export const seatingConfigurations = [
  "2-4-2",
  "3-3-3",
  "1-2-1",
  "1-2-2-1",
  "3-3",
  "2-2",
  "2-3",
  "1-2-1",
  "2-3-2",
  "2-2-2",
  "3-4-3",
  "2-5-2",
];

export const airlineManufacturers = [
  "Boeing",
  "Airbus",
  "Lockheed Martin"
];

export const customRowCol = [
  { rows: 8, cols: 4 },
  { rows: 8, cols: 5 },
  { rows: 10, cols: 6 },
  { rows: 16, cols: 6 },
  { rows: 20, cols: 6 },
  { rows: 32, cols: 6 },
  { rows: 40, cols: 6 },
  { rows: 12, cols: 4 },
  { rows: 24, cols: 8 },
  { rows: 36, cols: 9 },
  { rows: 18, cols: 6 },
  { rows: 22, cols: 6 },
  { rows: 28, cols: 7 },
  { rows: 30, cols: 10 },
  { rows: 14, cols: 4 },
  { rows: 26, cols: 8 },
  { rows: 34, cols: 9 },
  { rows: 42, cols: 7 },
  { rows: 46, cols: 8 },
  { rows: 50, cols: 10 },
  { rows: 54, cols: 9 },
  { rows: 58, cols: 8 },
  { rows: 62, cols: 7 },
  { rows: 64, cols: 8 },
  { rows: 68, cols: 9 },
];

export const fuelTanks = {
  smallRegionalJets: { min: 3000, max: 10000 }, 
  midSizeJets: { min: 10000, max: 40000 }, 
  largeWideBodyJets: { min: 100000, max: 250000 }, 
  ultraLongHaulAircraft: { min: 300000, max: 500000 },
};