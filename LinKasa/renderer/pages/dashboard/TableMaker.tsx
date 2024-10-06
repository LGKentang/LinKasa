import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { airlinePathToImage } from "../../model/flight/Flight";

export const TableMaker = (data) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = Object.keys(data[0]);

  const formatCellValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    return value;
  };

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>
                  {formatCellValue(row[column])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export const airplaneTableMaker = (data) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }
  const selectedColumns = [
    "airplaneCode",
    "airlineName",
    "manufacturerName",
    "Logo",
    "airplaneStatus",
  ];
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead></TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {selectedColumns.map((column) => (
                <TableCell key={column}>
                  {column === "Logo" ? (
                    <Image
                      src={airlinePathToImage(row["airlineName"])}
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
  );
};

export const flightScheduleTableMaker = (data) => {
  if (!data || data.length === 0)  <p>No data available</p>;

  const selectedColumns = [
    {
      key: "Logo",
      label: "Logo",
      render: (row) => (
        <TableCell key="Logo">
          <Image
            src={airlinePathToImage(row.airplane.airlineName)}
            width={"70"}
            height={"20"}
            alt=""
          />
        </TableCell>
      ),
    },
    {
      key: "airplaneCode",
      label: "Airplane Code",
      render: (row) => (
        <TableCell key="airplaneCode">{row.airplane.airplaneCode}</TableCell>
      ),
    },
    {
      key: "boardingTime",
      label: "Boarding Time",
      render: (row) => {
        const timestamp = row.boardingTime.toDate();
        const formattedDate = timestamp
          .toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(",", " -");

        return <TableCell key="boardingTime">{formattedDate}</TableCell>;
      },
    },
    {
      key: "source",
      label: "Source",
      render: (row) => <TableCell key="source">{row.source.name}</TableCell>,
    },
    {
      key: "destination",
      label: "Destination",
      render: (row) => (
        <TableCell key="destination">{row.destination.name}</TableCell>
      ),
    },
    {
      key: "duration",
      label: "Duration (min)",
      render: (row) => <TableCell key="duration">{row.duration}</TableCell>,
    },
    {
      key: "flightStatus",
      label: "Status",
      render: (row) => (
        <TableCell key="flightStatus">{row.flightStatus}</TableCell>
      ),
    },
  ];

  const tableHeaders = selectedColumns.map((col) => (
    <TableCell key={col.key}>{col.label}</TableCell>
  ));

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>{tableHeaders}</TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {selectedColumns.map((col) => col.render(row))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};
