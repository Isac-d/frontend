const RoomCard = ({ guestCount, price, roomType, roomImg,  }) => {
  return (
    <div className="room-card">
        <div className="room-img-container">
        <img src={roomImg} alt="" />
        <div className="price-badge">{price}</div>
        </div>
        <div className="room-card-info">
            <div className="room-title">{roomType}</div>
            <div className="guest-wifi-container">
               <div className="guests">{guestCount} Guests</div>
               <div className="wifi">Free wifi</div> 
            </div>
            <button className="view-details-button">View details</button>
        </div>
    </div>
  );
};

export default RoomCard;
