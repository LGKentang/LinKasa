import { Timestamp, addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import {FirstPassengerNames, LastPassengerNames} from '../../model/flight/Passenger'
import { db } from '../../../firebase/firebase';
import { getRandomObject } from '../random/Random';

export const addPassengerToDatabase = () => {
    addDoc(collection(db, "passenger"), {
        passengerName : getFullRandomName(),
        passengerDOB : getRandomFirestoreTimestamp()
    });
  };

export const getFullRandomName = () => {
    return getRandomObject(FirstPassengerNames) + " " + getRandomObject(LastPassengerNames)
}

export function getRandomFirestoreTimestamp(): Timestamp {
    const startDate = new Date(1970, 0, 1).getTime(); 
    const endDate = new Date().getTime();
  
    const randomTime = startDate + Math.random() * (endDate - startDate);
    const randomTimestamp = Timestamp.fromMillis(randomTime);
  
    return randomTimestamp;
}
export const getPassengerCount = async () => {
    const passengersCollectionRef = collection(db, 'passenger');
    const snapshot = await getDocs(passengersCollectionRef);
    
    const numberOfDocuments = snapshot.size;
    return numberOfDocuments;
};