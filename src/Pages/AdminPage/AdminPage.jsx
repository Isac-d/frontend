import { useEffect, useState } from "react";
import "./adminpage.css";
import BookingReceipt from "../../components/BookingReceipt/BookingReceipt";
import EditModal from "../../components/EditModal/EditModal";
const AdminPage = () => {
  const [bookings, setBookings] = useState([]);
const [openEdit, setOpenEdit] = useState(false)
const [selectedBookingId, setSelectedBookingId] = useState(null)


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
    {openEdit && <EditModal selectedBookingId={selectedBookingId} setOpenEdit={setOpenEdit}/>}
    <div onClick={()=>setOpenEdit(false)} className={!openEdit ? "booking-overlay" : 'booking-overlay open'}></div>

        <h1 style={{textAlign: 'center', padding: '100px 0'}}> Booking Management</h1>
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
            email={booking.email_address}
            guestCount={booking.guest_count}
            setOpenEdit={setOpenEdit}
            setSelectedBookingId={setSelectedBookingId}
          />
        ))}
      </div>
    </>
  );
};

export default AdminPage;
