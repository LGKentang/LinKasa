import { setDoc, doc, getDocs, collection, query } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import {
  airlineTypes,
  seatingConfigurations,
  customRowCol,
  airlineManufacturers,
  fuelTanks,
} from "../../model/flight/Flight";
import { getRandomObject } from '../random/Random';

export const getAllAirplanes = async () => {
  const airplanesCollection = collection(db, "airplane");
  const querySnapshot = await getDocs(airplanesCollection);

  const airplanes = [];
  querySnapshot.forEach((doc) => {
    airplanes.push(doc.data());
  });

  return airplanes;
};

export const addPlanesToDatabase = async () => {
  const airplaneCodeList = await getAirplaneCodesList();

  let randomAirplane: string;

  do {
    randomAirplane = getRandomAirplaneCode();
  } while (airplaneCodeList.includes(randomAirplane));

  let randomSeatingConfig: string;
  const { rows, cols } = getRandomCustomRowCol();

  do {
    randomSeatingConfig = getRandomSeatingConfig();
  } while (cols !== countSeatingColumnConfig(randomSeatingConfig));

  const fuel = getFuelTankBasedOnSize(rows, cols);

  setDoc(doc(db, "airplane", randomAirplane), {
    airplaneCode: randomAirplane,
    airplaneStatus: "Unused",
    airplaneFuel: fuel,
    airplaneFuelInventory: fuel,
    airlineName: getRandomAirline(),
    manufacturerName: getRandomAirlineManufacturer(),
    maxRow: rows,
    maxCol: cols,
    seatingChartRow: rows,
    seatingChartCol: cols,
    seatingConfiguration: randomSeatingConfig,
    seatingBoardingData: [{}],
  });
};

const getRandomAirline = () => getRandomObject(airlineTypes);
const getRandomSeatingConfig = () => getRandomObject(seatingConfigurations);
const getRandomCustomRowCol = () => getRandomObject(customRowCol);
const getRandomAirlineManufacturer = () =>
  getRandomObject(airlineManufacturers);

export const getAirplaneCodesList = async () => {
  const airplanesCollection = collection(db, "airplane");
  const querySnapshot = await getDocs(airplanesCollection);

  const airplaneCodesList = [];

  querySnapshot.forEach((doc) => {
    const airplaneCode = doc.id;
    airplaneCodesList.push(airplaneCode);
  });

  return airplaneCodesList;
};

const getRandomCharFromAtoZ = () => {
  const charCode = Math.floor(Math.random() * 26) + 65;
  return String.fromCharCode(charCode);
};

const getRandomNumber = () => {
  const number =
    Math.floor(
      Math.random() < 0.85
        ? Math.random() * 1000 - 100
        : Math.random() * 10000 - 100
    ) + 100;
  return number;
};

const getRandomAirplaneCode = () => {
  return (
    (Math.random() < 0.85
      ? getRandomCharFromAtoZ()
      : getRandomCharFromAtoZ() + getRandomCharFromAtoZ()) +
    getRandomNumber().toString()
  );
};

const getFuelTankBasedOnSize = (rows, cols) => {
  let selectedFuelTank;

  if (rows * cols <= fuelTanks.smallRegionalJets.max) {
    selectedFuelTank = fuelTanks.smallRegionalJets;
  } else if (rows * cols <= fuelTanks.midSizeJets.max) {
    selectedFuelTank = fuelTanks.midSizeJets;
  } else if (rows * cols <= fuelTanks.largeWideBodyJets.max) {
    selectedFuelTank = fuelTanks.largeWideBodyJets;
  } else {
    selectedFuelTank = fuelTanks.ultraLongHaulAircraft;
  }

  // Generate a random number within the selected fuel tank's range
  const randomFuel =
    Math.floor(
      Math.random() * (selectedFuelTank.max - selectedFuelTank.min + 1)
    ) + selectedFuelTank.min;
  return randomFuel;
};

const seatToArrayMapper = (seatNumber) => {
  const rowLetter = seatNumber.charAt(0);
  const colNumber = parseInt(seatNumber.substring(1)) - 1;

  const row = rowLetter.charCodeAt(0) - "A".charCodeAt(0);

  return { row, col: colNumber };
};

function countSeatingColumnConfig(seatingConfig) {
  const columns = seatingConfig.split("-").map(Number);
  return columns.reduce((total, col) => total + col, 0);
}
