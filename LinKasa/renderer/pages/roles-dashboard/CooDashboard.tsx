import Dashboard from "../dashboard/Dashboard";
import { usePageState } from "../abstract/AbstractDashboard";
import FlightSharp from "@mui/icons-material/FlightSharp";
import {
  Autocomplete,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogProps,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { GridItem } from "../dashboard/DashboardBuilder";
import { useState, useEffect } from "react";
import { cityData } from "../../model/flight/FlightSchedule";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import { getAllAirplanes } from "../../util/AdminMethods/PlaneHandler";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import {
  airplaneTableMaker, flightScheduleTableMaker,
} from "../dashboard/TableMaker";
import { airlinePathToImage } from "../../model/flight/Flight";
import React from "react";
import Image from "next/image";
import { getFlightSchedule, handleSubmitSchedule } from "../../util/ScheduleMethods/FlightScheduleHandler";

const CooDashboard = () => {
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); 
  const [selectedTime, setSelectedTime] = useState(null); 
  const [airplanes, setAirplanes] = useState([]);
  const [selectedAirplane, setSelectedAirplane] = useState(null);
  const [flightSchedule, setFlightSchedule] = useState(null);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ScheduleData = await getFlightSchedule();
        setFlightSchedule(ScheduleData);
      } catch (error) {
        console.error("Error fetching airplanes:", error);
      }
    };
    fetchData();
    const unsubscribe = onSnapshot(collection(db, "flight-schedule"), () => {
      fetchData();
    });
    return () => unsubscribe();
  }, []);


  const data = airplanes ? airplanes : null;
  const handleRowClick = (row) => {
    setSelectedAirplane(row);
  };

  const handleSubmit = () => {
    // TODO kasi validasi sini !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    handleSubmitSchedule(selectedTime,selectedDate,selectedAirplane, selectedSource, selectedDestination)
  }

  const isSelected = (row) => {
    if (selectedAirplane != null) {
      return row.airplaneCode === selectedAirplane.airplaneCode;
    }
    return false;
  };

  const selectedColumns = [
    "airplaneCode",
    "airlineName",
    "manufacturerName",
    "Logo",
    "airplaneStatus",
  ];


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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
  };

  const states = {
    Flight: {
      icon: <FlightSharp />,
      body: (
        <div style={{gap:'15px', display:'flex'}}>
          {GridItem(
            <>
          
              <Button
                variant="contained"
                color="primary"
                style={{ borderRadius: "8px", padding: "12px 24px" }}
                onClick={handleClickOpen}
              >
                Create Flight Schedule
              </Button>

              <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
                <Paper
                  style={{
                    padding: "20px",
                    borderRadius: "10px",
                    overflowY: "auto",
                    background:
                      "linear-gradient(13deg, rgba(255,255,255,0.9) 60%, rgba(0,0,255,0.1796)30%)",
                  }}
                  className="scrollbar-custom-white"
                >
                  <Typography
                    variant="h4"
                    style={{ marginBottom: "4px", fontFamily: "Montserrat" }}
                  >
                    Create Flight Schedule
                  </Typography>

                  <Paper
                    style={{
                      marginTop: "15px",
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0px 3px 10px rgba(0.1, 0.2, 0.3, 0.1)",
                      border: "0.02px rgba(128, 128, 128, 0.23) solid",
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{ marginBottom: "20px", fontFamily: "Montserrat" }}
                    >
                      Departure Time
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div style={{ display: "flex" }}>
                        <DatePicker
                          sx={{ flex: 1, marginRight: "10px" }}
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e)}
                        />
                        <TimePicker
                          sx={{ flex: 1 }}
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e)}
                        />
                      </div>
                    </LocalizationProvider>
                  </Paper>

                  <div style={{ height: "15px" }}></div>

                  <Paper
                    style={{
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0px 3px 10px rgba(0.1, 0.2, 0.3, 0.1)",
                      display: "flex",
                      flexDirection: "column",
                      border: "0.02px rgba(128, 128, 128, 0.23) solid",
                    }}
                  >
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div style={{ width: "50%" }}>
                        <Typography
                          variant="h6"
                          style={{
                            marginBottom: "20px",
                            fontFamily: "Montserrat",
                          }}
                        >
                          Source
                        </Typography>
                      </div>

                      <div style={{ width: "50%" }}>
                        <Typography
                          variant="h6"
                          style={{
                            marginBottom: "20px",
                            fontFamily: "Montserrat",
                          }}
                        >
                          Destination
                        </Typography>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <Autocomplete
                        style={{ width: "50%" }}
                        value={selectedSource}
                        onChange={(event, newValue) => {
                          setSelectedSource(newValue);
                        }}
                        options={cityData}
                        getOptionLabel={(option) =>
                          option.code + " - " + option.name
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="From"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />

                      <Autocomplete
                        style={{ width: "50%" }}
                        value={selectedDestination}
                        onChange={(event, newValue) => {
                          setSelectedDestination(newValue);
                        }}
                        options={cityData}
                        getOptionLabel={(option) =>
                          option.code + " - " + option.name
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="To"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                    </div>
                  </Paper>

                  <Paper
                    style={{
                      marginTop: "15px",
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0px 3px 10px rgba(0.1, 0.2, 0.3, 0.1)",
                      border: "0.02px rgba(128, 128, 128, 0.23) solid",
                    }}
                  >
                    <React.Fragment>
                      <Table size="small">
                        <TableHead></TableHead>
                        <TableBody>
                          {data.map((row, index) => (
                            <TableRow
                              key={index}
                              hover
                              onClick={() => handleRowClick(row)}
                              style={{
                                cursor: "pointer",
                                backgroundColor: isSelected(row)
                                  ? "#b9abf7"
                                  : "inherit",
                              }}
                              selected={isSelected(row)}
                            >
                              {selectedColumns.map((column) => (
                                <TableCell
                                  key={column}
                                  style={{
                                    color: isSelected(row) ? "white" : "black",
                                    fontFamily: "Montserrat",
                                    fontWeight: isSelected(row) ? 900 : 500,
                                  }}
                                >
                                  {column === "Logo" ? (
                                    <Image
                                      src={airlinePathToImage(
                                        row["airlineName"]
                                      )}
                                      width={"70"}
                                      height={"20"}
                                      alt=""
                                    />
                                  ) : (
                                    row[column]
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </React.Fragment>
                  </Paper>

                  <div style={{ marginTop: "20px", textAlign: "right" }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginLeft: "10px" }}
                      onClick={handleSubmit}
                    >
                      Save
                    </Button>
                  </div>
                </Paper>
              </Dialog>
            </>
          )}

          <Paper>
          {flightSchedule ?  flightScheduleTableMaker(flightSchedule) : "Loading..."}
          </Paper>

        </div>
      ),
    },
  };

  const { pageState, listItems } = usePageState("Flight", states);

  return (
    <Dashboard title={pageState} listItems={listItems}>
      {states[pageState].body}
    </Dashboard>
  );
};

export default CooDashboard;
