import { useEffect, useState } from "react";
import "./bookingmodal.css";
import Dropdown from "../Dropdown/dropdown";

const BookingModal = ({ selectedRoomType, isOpen }) => {

  const [roomType, setRoomType] = useState(
    !selectedRoomType ? null : selectedRoomType
  );
  const [selectedGuestCount, setSelectedGuestCount] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [firstname, setFirstname] = useState(null)
  const [lastname, setLastname]  =useState(null)
  const [email, setEmail] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState (null)

  const guestCountOpts =
    roomType === "Deluxe Double Room"
      ? [1, 2]
      : roomType === "Executive Family Room"
      ? [1, 2, 3]
      : roomType === "Presidential Suite"
      ? [1, 2, 3, 4, 5, 6]
      : null;
  const roomTypeOpts = [
    "Deluxe Double Room",
    "Executive Family Room",
    "Presidential Suite",
  ];
  console.log(checkInDate)

  useEffect(()=>{
    setSelectedGuestCount(null)
  },[roomType])

  const handleInput = (e, setState) => {
    const value = e.target.value
    setState(value)
  }

  const bookingData = {
    guest_count: selectedGuestCount,
    roomType,
    check_in: checkInDate,
    check_out: checkOutDate,
    firstname,
    lastname,
    email_adress: email,
    phone_number: phoneNumber
  }


  return (
    <div className={!isOpen ? "booking-modal" : "booking-modal open" }>
      <div className="modal-header">
        <h1>Welcome</h1>
        <div className="line"></div>
      </div>
      <form className="booking-form" action="post">
        <h2>Book your stay</h2>
        <div className="room-details">
          <div className="check-in">
            <label htmlFor="checkin">Check In</label>
            <input style={{cursor: 'pointer'}} id="checkin" onChange={(e)=>handleInput(e, setCheckInDate)} type="date" />
          </div>
          <div className="check-in">
            <label htmlFor="checkout">Check Out</label>
            <input style={{cursor: 'pointer'}} id="checkout" onChange={(e)=>handleInput(e, setCheckOutDate)} type="date" />
          </div>
          <div className="room-type">
            <h3>Room Type</h3>
            <Dropdown
              options={roomTypeOpts}
              preset={"Select room type"}
              setSelect={setRoomType}
              selected={roomType}
            />

            <Dropdown
              options={guestCountOpts}
              preset={"Number of guests"}
              setSelect={setSelectedGuestCount}
              selected={selectedGuestCount}
            />
          </div>
        </div>

        <div className="personal-details">
          <h2>Personal Details</h2>
          <input
          onChange={(e)=>handleInput(e, setFirstname)}
            placeholder="First name..."
            type="text"
            className="personal-detail-input"
          />
          <input
          onChange={(e)=>handleInput(e, setLastname)}
            placeholder="Last name..."
            type="text"
            className="personal-detail-input"
          />
          <input
          onChange={(e)=>handleInput(e, setEmail)}
            placeholder="Email address..."
            type="email"
            className="personal-detail-input"
          />
          <input
          onChange={(e)=>handleInput(e, setPhoneNumber)}
            placeholder="Phone number..."
            type="tel"
            className="personal-detail-input"
          />
        </div>
        <button className="submit-button">BOOK ROOM</button>
      </form>
    </div>
  );
};

export default BookingModal;
