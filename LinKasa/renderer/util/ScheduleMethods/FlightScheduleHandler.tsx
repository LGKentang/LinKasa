import {
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import dayjs from "dayjs";

export const handleSubmitSchedule = (
  dayjsTime,
  dayjsDate,
  planeObject: any,
  source: string,
  destination: string
) => {
  const hours = dayjsTime.hour();
  const minutes = dayjsTime.minute();
  const seconds = dayjsTime.second();

  const combinedDateTime = dayjs(dayjsDate)
    .hour(hours)
    .minute(minutes)
    .second(seconds);

  const jsDate = combinedDateTime.toDate();
  const boardingTimestamp = Timestamp.fromDate(jsDate);
  const durationMinutes = getRandomDuration(); 

  const durationMilliseconds = durationMinutes * 60 * 1000;

  const arrivalTimestamp = new Timestamp(
    boardingTimestamp.seconds + Math.floor(durationMilliseconds / 1000),
    boardingTimestamp.nanoseconds
  );

  addDoc(collection(db, "flight-schedule"), {
    airplane: planeObject,
    boardingPassId: [],
    departureGate: "",
    boardingTime: boardingTimestamp,
    arrivalTime: arrivalTimestamp,
    duration: getRandomDuration(),
    source: source,
    destination: destination,
    flightStatus: "Scheduled",
    pilotId: [],
    cabinCrewId: [],
  });

};

export const getFlightSchedule = async () => {
  const flightScheduleCollection = collection(db, "flight-schedule");
  const querySnapshot = await getDocs(flightScheduleCollection);

  const flightSchedule = [];
  querySnapshot.forEach((doc) => {
    flightSchedule.push(doc.data());
  });

  return flightSchedule;
}



const getRandomDuration = () => {
  const min = 30;
  const max = 500;
  const interval = 5;

  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  const roundedNum = Math.round(randomNum / interval) * interval;
  return roundedNum;
};
