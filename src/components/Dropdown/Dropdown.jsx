import { useEffect, useState } from "react";
import './dropdown.css'
const Dropdown = ({ options, preset, setSelect, selected, bookingOpen }) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
      if(!bookingOpen){
        setIsOpen(false);

      }
    }, [bookingOpen]);

  return (
    <div className="dropdown">
      <div
        onClick={() => !options ? '' : setIsOpen(!isOpen)}
        className="select"
      >
        {!selected ? preset : selected}{" "}
        <img
          className={!isOpen ? "arrow" : "arrow-open"}
          src="src\assets\down-chevron-svgrepo-com.svg"
          alt=""
        />
      </div>
      <div className="options">
        {options?.map(
          (option, i) =>
            isOpen && (
              <div
                key={i}
                onClick={() => {
                  setIsOpen(false);
                  setSelect(option);
                }}
                className={
                  selected === option ? "option active" : "option"
                }
              >
                {option}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Dropdown;
