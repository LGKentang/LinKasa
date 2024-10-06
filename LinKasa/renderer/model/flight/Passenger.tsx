import { Timestamp } from "firebase/firestore";

interface Passenger {
    passengerId : string,
    passengerName : string,
    passengerDoB : Timestamp,
}

interface Passport {

    
}

export const FirstPassengerNames: string[] = [
    'Liam', 'Olivia', 'Noah', 'Emma', 'Oliver', 'Ava', 'William', 'Sophia', 'Elijah', 'Isabella',
    'James', 'Charlotte', 'Benjamin', 'Amelia', 'Lucas', 'Mia', 'Henry', 'Harper', 'Alexander', 'Evelyn',
    'Michael', 'Abigail', 'Daniel', 'Emily', 'Jackson', 'Elizabeth', 'Logan', 'Avery', 'David', 'Sofia',
    'Joseph', 'Ella', 'Samuel', 'Madison', 'Gabriel', 'Scarlett', 'Carter', 'Victoria', 'Mateo', 'Aria',
    'John', 'Grace', 'Matthew', 'Chloe', 'Luke', 'Camila', 'Jack', 'Penelope', 'Anthony', 'Riley',
    'Dylan', 'Luna', 'Ethan', 'Zoey', 'Andrew', 'Nora', 'Joshua', 'Lily', 'Christopher', 'Hannah',
    'Isaac', 'Aubrey', 'Wyatt', 'Stella', 'Sebastian', 'Addison', 'Nathan', 'Leah', 'Ryan', 'Willow',
    'Nicholas', 'Samantha', 'Aaron', 'Audrey', 'Aiden', 'Elena', 'Eli', 'Claire', 'Brandon', 'Lucy',
    'Christian', 'Anna', 'Adam', 'Maya', 'Julian', 'Lillian', 'Levi', 'Bella', 'Tyler', 'Nova',
    'Isaiah', 'Emilia', 'Thomas', 'Hazel'
];
  
export const LastPassengerNames: string[] = [
    'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
    'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson',
    'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King',
    'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter',
    'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins',
    'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey',
    'Rivera', 'Cooper', 'Richardson', 'Cox', 'Howard', 'Ward', 'Torres', 'Peterson', 'Gray', 'Ramirez',
    'James', 'Watson', 'Brooks', 'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes', 'Ross', 'Henderson',
    'Coleman', 'Jenkins', 'Perry', 'Powell', 'Long', 'Patterson', 'Hughes', 'Flores', 'Washington', 'Butler'
];