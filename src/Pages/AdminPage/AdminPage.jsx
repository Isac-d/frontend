import { useEffect, useState } from "react";
import "./adminpage.css";
import BookingReceipt from "../../components/BookingReceipt/BookingReceipt";
const AdminPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setBookings(data);
    };
    fetchData();
  }, [bookings]);


  return (
    <>
        <h1> Booking Management</h1>
      <div className="bookings-container">
        {bookings.map((booking, i) => (
          <BookingReceipt
            key={i}
            id={booking.id}
            roomType={booking.room_type}
            checkIn={booking.check_in}
            checkOut={booking.check_out}
            firstname={booking.firstname}
            lastname={booking.lastname}
            phoneNumber={booking.phone_number}
          />
        ))}
      </div>
    </>
  );
};

export default AdminPage;
