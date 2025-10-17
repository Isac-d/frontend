import { Link } from "react-router-dom";
import "./homepage.css";
import RoomCard from "../../components/RoomCard/RoomCard";
import { FaCalendarDay } from "react-icons/fa";

const Homepage = () => {
const rooms = [
  {
    guestCount: 2,
    price: 200,
    roomTypes: "Deluxe Double Room",
    roomImg: "src/assets/linus-mimietz-p3UWyaujtQo-unsplash.jpg",
  },
  {
    guestCount: 3,
    price: 350,
    roomTypes: "Executive Family Room",
    roomImg: "src/assets/vojtech-bruzek-Yrxr3bsPdS0-unsplash.jpg",
  },
  {
    guestCount: 6,
    price: 750,
    roomTypes: "Presidential Suite",
    roomImg: "src/assets/reisetopia-aI6Su7Mu9Ro-unsplash.jpg",
  },
];


  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <h1 className="hero-big-text">
            Welcome to <span>Lumea Hotels</span>
          </h1>
          <h3 className="hero-small-text">
            Experience unparalleled luxury and comfort in the heart of the city.
            Where elegance meets exceptional service.
          </h3>
          <div className="hero-button-container">
            <Link style={{textDecoration: 'none'}} to={"/"}>
              <button className="booking-link"><FaCalendarDay/>Book your stay</button>
            </Link>
            <button className="explore-rooms-btn">Explore our rooms</button>
          </div>
        </div>
      </section>
      <secton className="page-section">
        <div className="section-header">
          <h1>Our Rooms & Suites </h1>
          <h3>
            Discover your perfect sanctuary from our collection of elegantly
            designed accommodations
          </h3>
        </div>

        <div className="room-cards">
          {rooms.map((room, i) => (
            <RoomCard
              key={i}
              guestCount={room.guestCount}
              price={room.price}
              roomType={room.roomTypes}
              roomImg={room.roomImg}
            />
          ))}
        </div>
      </secton>
              <div className="section-header">

        </div>
        <footer></footer>
    </>
  );
};

export default Homepage;
