import Dashboard from "../dashboard/Dashboard";
import { useEffect, useState } from "react";
import { GridItem, SidebarItem } from "../dashboard/DashboardBuilder";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import Register from "../auth/Register";
import {
  Button,
  Dialog,
  DialogProps,
  Grid,
  Paper,
  Table,
  Typography,
} from "@mui/material";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { TableMaker } from "../dashboard/TableMaker";
import ChatRoom from "../chat/ChatRoom";
import { usePageState } from "../abstract/AbstractDashboard";

const HrdDashboard = () => {
  const [allEmployee, setAllEmployee] = useState(null);
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("sm");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchEmployees = () => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const employeesData = snapshot.docs.map((doc) => doc.data());
      setAllEmployee(employeesData);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchEmployees();

    return () => {
      unsubscribe();
    };
  }, []);

  const states = {
    Dashboard: {
      icon: <DashboardIcon />,
      method: () => {
        changeState("Dashboard");
      },
      body: (
        GridItem(
          <Typography>Hello World</Typography>
        )
      ),
    },
    
    Employee: {
      icon: <PeopleIcon />,
      method: () => {
        changeState("Employee");
      },
      body: (
        <>
          <Grid marginBottom={2}>
            <Button variant="outlined" onClick={handleClickOpen}>
              Create New Employee
            </Button>
          </Grid>
          <Grid >
            <Paper>
              {allEmployee !== null
                ?TableMaker(allEmployee)
                : "Loading..."}    
            </Paper>
          </Grid>


          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
          >
            <Register />
          </Dialog>
        </>
      ),
    },
  };
  
  const { pageState, listItems, changeState } = usePageState(
    "Dashboard",
    states
  );

  return (
    <Dashboard title={pageState} listItems={listItems}>
      {states[pageState].body}
    </Dashboard>
  );
};

export default HrdDashboard;
