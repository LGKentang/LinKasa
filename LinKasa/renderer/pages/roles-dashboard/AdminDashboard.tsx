import Dashboard from "../dashboard/Dashboard";
import { usePageState } from "../abstract/AbstractDashboard";
import FlightSharp from "@mui/icons-material/FlightSharp";
import People from "@mui/icons-material/People";
import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import { GridItem } from "../dashboard/DashboardBuilder";
import { airlineTypes, airlinePathToImage } from "../../model/flight/Flight";
import Notes from "@mui/icons-material/Notes";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  addPlanesToDatabase,
  getAllAirplanes,
} from "../../util/AdminMethods/PlaneHandler";
import { TableMaker, airplaneTableMaker } from "../dashboard/TableMaker";
import { db } from "../../../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import {
  addPassengerToDatabase,
  getPassengerCount,
} from "../../util/AdminMethods/PassengerHandler";
import { NotesMaker, notes } from "../../util/AdminMethods/Notes";

const AdminDashboard = () => {
  const [airplanes, setAirplanes] = useState([]);
  const [passengerCount, setPassengerCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const airplaneData = await getAllAirplanes();
        setAirplanes(airplaneData);
      } catch (error) {
        console.error("Error fetching airplanes:", error);
      }
    };
    fetchData();
    const unsubscribe = onSnapshot(collection(db, "airplane"), () => {
      fetchData();
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const count = await getPassengerCount();
      setPassengerCount(count);
    };
    fetchData();
    const unsubscribe = onSnapshot(collection(db, "passenger"), () => {
      fetchData();
    });
    return () => unsubscribe();
  }, []);

  const states = {
    Airplanes: {
      icon: <FlightSharp></FlightSharp>,
      method: () => {
        changeState("Airplanes");
      },
      body: (
        <div style={{ gap: "10px", display: "flex", flexDirection: "column" }}>
          {GridItem(
            <>
              <Button onClick={() => addPlanesToDatabase()}>
                Add One Random Plane
              </Button>
            </>
          )}

          {GridItem(
            <>
              <Typography>Airplanes</Typography>
              {airplanes !== null
                ? airplaneTableMaker(airplanes)
                : "loading..."}
            </>
          )}
        </div>
      ),
    },
    Passenger: {
      icon: <People />,
      method: () => {
        changeState("Passenger");
      },
      body: (
        <>
          {GridItem(
            <>
              <Typography>
                Total Passenger : {passengerCount !== 0 ? passengerCount : 0}
              </Typography> 
              <Button onClick={() => addPassengerToDatabase()}>
                Add One Random Passenger
              </Button>
              <Button
                onClick={() => {
                  for (let i = 0; i < 10; i++) addPassengerToDatabase();
                }}
              >
                Add Ten Random Passenger
              </Button>
            </>
          )}
        </>
      ),
    },
    Notes: {
      icon: <Notes></Notes>,
      method: () => {
        changeState("Notes");
      },
      body: (
        <>
        {NotesMaker(notes)}
        </>
      ),
    },
    Test : {

    }
  };

  const { pageState, listItems, changeState } = usePageState(
    "Airplanes",
    states
  );

  return (
    <Dashboard title={pageState} listItems={listItems}>
      {states[pageState].body}
    </Dashboard>
  );
};

export default AdminDashboard;

{
  /* <div>
{airlineTypes.map((airline, index) => (
<>
<div style={{display:'flex', gap:'15px', alignItems:'center', margin:'10px'}}>

<Typography key={index} sx={{fontFamily:'Montserrat'}}>{airline}</Typography> 
  <Image width={"70"} height={"20"} src={airlinePathToImage(airline)} alt=""></Image>

</div>
</>
))} */
}
