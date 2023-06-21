import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const user = useSelector((state) => JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    fetch(`http://localhost:4200/booking?email=${user?.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div>
      <h1>You have {bookings.length} bookings</h1>
      {bookings?.map((book) => (
        <li key={book._id}>
          {book.email} from:{book.checkIn} to:{book.checkOut}
        </li>
      ))}
    </div>
  );
};

export default Bookings;
