import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import Bookings from '../Bookings/Bookings'

const Book = () => {
  const user = useSelector((state) => JSON.parse(localStorage.getItem("user")));

  const { bedType } = useParams();
  const [value, setValue] = useState({
    checkIn: dayjs(),
    checkOut: dayjs(),
  });
  const handlecheckinDate = (date) => {
    const newDate = { ...value };
    newDate.checkin = date;
    setValue(newDate);
  };
  const handlecheckoutDate = (date) => {
    const newDate = { ...value };
    newDate.checkOut = date;
    setValue(newDate);
  };
  const handlebooking = () => {
    const newBooking = { ...user, ...value };
    fetch("http://localhost:4200/addBooking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1> Let's book a {bedType} Room.</h1>
      <p>
        Want a <Link to="/home">different room?</Link>{" "}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              // label="Controlled picker"
              // defaultValue={}
              value={value.checkIn}
              onChange={handlecheckinDate}
            />
            <DatePicker
              // label="Controlled picker"
              value={value.checkOut}
              onChange={handlecheckoutDate}
            />
          </DemoContainer>
        </LocalizationProvider>{" "}
        <Button variant="contained" color="primary" onClick={handlebooking}>
          Book now
        </Button>
      </div>
     <Bookings/>

    </div>
  );
};

export default Book;
