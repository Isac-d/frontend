import { useEffect, useState } from "react";

const BookingReceipt = ({id, firstname, lastname, roomType, checkIn, checkOut, phoneNumber, email, guestCount, setOpenEdit, setSelectedBookingId}) => {


  const deleteBooking = async() => {
    try {
        const response = await fetch(`http://localhost:3000/api/bookings/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({id}),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to delete booking");
        }
  

      } catch (err) {
        console.error(err);
        alert("Error deleting booking: " + err.message);
      }
  }



  return (
    <div className="receipt">
      <div className="receipt-btn-container">
      <button onClick={deleteBooking} className="delete-btn">Delete</button>
      <button onClick={()=>{setOpenEdit(true); setSelectedBookingId(id)}} className="edit-btn">Edit</button>
      </div>
      <h2>Booking {id}</h2>

      <div className="booking-item">
        <p>
          <strong>Guest:</strong> {firstname + ' ' + lastname}
        </p>
        <p>
          <strong>Room:</strong> {roomType}
        </p>
        <p>
          <strong>Check-in:</strong> {new Date(checkIn).toLocaleDateString()}
        </p>
        <p>
          <strong>Check-out:</strong> {new Date(checkOut).toLocaleDateString()}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone:</strong> {phoneNumber}
        </p>
      </div>

      <p className="total">Price: {roomType === 'Deluxe Double Room' ? '200€' : roomType === 'Executive Family Room' ? '350€' : '750€'}</p>
    </div>
  );
};

export default BookingReceipt;
