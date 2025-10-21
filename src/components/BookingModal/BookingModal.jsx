import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./bookingmodal.css";
import Dropdown from "../Dropdown/dropdown";

const BookingModal = ({
  selectedRoomType,
  isOpen,
  setSelectedRoomType,
  setIsOpen,
}) => {
  const [selectedGuestCount, setSelectedGuestCount] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const guestCountOpts =
    selectedRoomType === "Deluxe Double Room"
      ? [1, 2]
      : selectedRoomType === "Executive Family Room"
      ? [1, 2, 3]
      : selectedRoomType === "Presidential Suite"
      ? [1, 2, 3, 4, 5, 6]
      : null;
  const roomTypeOpts = [
    "Deluxe Double Room",
    "Executive Family Room",
    "Presidential Suite",
  ];

  const fieldsNotFilled =
    !selectedRoomType ||
    !selectedGuestCount ||
    !checkInDate ||
    !checkOutDate ||
    !firstname ||
    !lastname ||
    !email ||
    !phoneNumber;

  useEffect(() => {
    setSelectedGuestCount(null);
  }, [selectedRoomType]);

  const handleInput = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (fieldsNotFilled) {
      alert("Please fill in all fields before submitting!");
      return;
    }

    const bookingData = {
      guest_count: selectedGuestCount,
      room_type: selectedRoomType,
      check_in: checkInDate,
      check_out: checkOutDate,
      firstname,
      lastname,
      email_address: email,
      phone_number: phoneNumber,
    };

    try {
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create booking");
      }

      toast.success("Booking Created!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setSelectedRoomType(null);
      setSelectedGuestCount(null);
      setCheckInDate(null);
      setCheckOutDate(null);
      setFirstname("");
      setLastname("");
      setEmail("");
      setPhoneNumber("");

      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Error creating booking: " + err.message);
    }
  };

  return (
    <div className={!isOpen ? "booking-modal" : "booking-modal open"}>
      <ToastContainer />

      <div className="modal-header">
        <h1>Welcome</h1>
        <div className="line"></div>
      </div>
      <form onSubmit={handleSubmit} className="booking-form" action="post">
        <h2>Book your stay</h2>
        <div className="room-details">
          <div className="check-in">
            <label htmlFor="checkin">Check In</label>
            <input
              style={{ cursor: "pointer" }}
              id="checkin"
              onChange={(e) => handleInput(e, setCheckInDate)}
              type="date"
            />
          </div>
          <div className="check-in">
            <label htmlFor="checkout">Check Out</label>
            <input
              style={{ cursor: "pointer" }}
              id="checkout"
              onChange={(e) => handleInput(e, setCheckOutDate)}
              type="date"
            />
          </div>
          <div className="room-type">
            <h3>Room Type</h3>
            <Dropdown
              options={roomTypeOpts}
              preset={"Select room type"}
              setSelect={setSelectedRoomType}
              selected={selectedRoomType}
              openBooking={isOpen}
            />

            <Dropdown
              options={guestCountOpts}
              preset={"Number of guests"}
              setSelect={setSelectedGuestCount}
              selected={selectedGuestCount}
              openBooking={isOpen}
            />
          </div>
        </div>

        <div className="personal-details">
          <h2>Personal Details</h2>
          <input
            value={firstname || ""}
            onChange={(e) => handleInput(e, setFirstname)}
            placeholder="First name..."
            type="text"
            className="personal-detail-input"
          />
          <input
            value={lastname || ""}
            onChange={(e) => handleInput(e, setLastname)}
            placeholder="Last name..."
            type="text"
            className="personal-detail-input"
          />
          <input
            value={email || ""}
            onChange={(e) => handleInput(e, setEmail)}
            placeholder="Email address..."
            type="email"
            className="personal-detail-input"
          />
          <input
            value={phoneNumber || ""}
            onChange={(e) => handleInput(e, setPhoneNumber)}
            placeholder="Phone number..."
            type="tel"
            className="personal-detail-input"
          />
        </div>
        <button
          disabled={fieldsNotFilled || isSubmitting}
          type="submit"
          className="submit-button"
        >
          BOOK ROOM
        </button>
      </form>
    </div>
  );
};

export default BookingModal;
