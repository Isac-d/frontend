import './roomcard.css'
import { FaWifi } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { FaBreadSlice } from "react-icons/fa";


const RoomCard = ({ guestCount, price, roomType, roomImg,  }) => {
  return (
    <div className="room-card">
        <div className="room-img-container">
        <img className='room-img' src={roomImg} alt="" />
        <div className="price-badge">From {price}€</div>
        </div>
        <div className="room-card-info">
            <div className="top-card">
            <div className="room-title">{roomType}</div>
            <div className="room-info-container">
               <div className="room-info"><MdPeopleAlt style={{color: '#dd9804', fontSize: '20px'}}/> {guestCount} Guests</div>
               <div className="room-info"><FaWifi style={{color: '#dd9804', fontSize: '20px'}}/> Free wifi</div> 
               <div className="room-info"><FaBreadSlice style={{color: '#dd9804', fontSize: '20px'}}/> Breakfast included</div>
            </div>
            </div>
            <button className="view-details-button">View details</button>
        </div>
    </div>
  );
};

export default RoomCard;
