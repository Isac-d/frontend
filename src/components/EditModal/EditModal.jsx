import { useState, useEffect } from "react";
import "./editmodal.css";

const EditModal = ({ selectedBookingId, setOpenEdit }) => {
  const [selectedBooking, setSelectedBooking] = useState({});
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const fieldsNotFilled =
  !checkInDate ||
  !checkOutDate ||
  !firstname ||
  !lastname ||
  !email ||
  !phoneNumber;


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/bookings/${selectedBookingId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setSelectedBooking(data);
    };
    fetchData();
  }, [selectedBookingId]);



  useEffect(() => {
    if (selectedBooking) {
      if (selectedBooking?.check_in) {
        // Convert ISO → YYYY-MM-DD
        const formatted = new Date(selectedBooking.check_in)
          .toISOString()
          .split("T")[0];
        setCheckInDate(formatted);
      }
      if (selectedBooking?.check_out) {
        // Convert ISO → YYYY-MM-DD
        const formatted = new Date(selectedBooking.check_out)
          .toISOString()
          .split("T")[0];
        setCheckOutDate(formatted);
      }
      setFirstname(selectedBooking.firstname || "");
      setLastname(selectedBooking.lastname || "");
      setEmail(selectedBooking.email_address || "");
      setPhoneNumber(selectedBooking.phone_number || "");
    }
  }, [selectedBooking]);


  const handleChange = (e, setState) => {
    const value = e.target.value
    setState(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (fieldsNotFilled) {
      alert("Please fill in all fields before submitting!");
      return;
    }
  
    const bookingData = {
      guest_count: selectedBooking.guest_count,
      room_type: selectedBooking.room_type,
      check_in: checkInDate,
      check_out: checkOutDate,
      firstname,
      lastname,
      email_address: email,
      phone_number: phoneNumber,
    };
  
    try {
      const response = await fetch(`http://localhost:3000/api/bookings/${selectedBookingId}`, {
        method: "PUT", // ✅ use PUT for updating existing booking
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
  
      const text = await response.text(); // ✅ read safely
      console.log("Response text:", text);
  
      if (!response.ok) {
        throw new Error(`Server error: ${text}`);
      }
  
      setOpenEdit(false);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Error updating booking: " + err.message);
    }
  };
  


  return (
    <div className="edit-modal">
      <h2>Edit Booking: {selectedBookingId}</h2>
      <form onSubmit={handleSubmit} className="edit-input-container">
        <input onChange={(e)=>handleChange(e,setFirstname)} type="text" className="edit-input" value={firstname} />
        <input onChange={(e)=>handleChange(e,setLastname)} type="text" className="edit-input" value={lastname} />
        <input onChange={(e)=>handleChange(e,setEmail)} type="email" className="edit-input" value={email} />
        <input onChange={(e)=>handleChange(e,setPhoneNumber)} type="tel" className="edit-input" value={phoneNumber} />
        <input onChange={(e)=>handleChange(e,setCheckInDate)} type="date" className="edit-input" value={checkInDate} />
        <input onChange={(e)=>handleChange(e,setCheckOutDate)} type="date" className="edit-input" value={checkOutDate} />
      <button type="submit" className="save-btn">
        Save
      </button>
      </form>
    </div>
  );
};

export default EditModal;
