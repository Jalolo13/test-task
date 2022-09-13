import React, { useState } from "react";
import "./popup.sass";

const Popup = ({ setActive, active, setSortItem, arr }) => {
  const [activeItem, setActiveItem] = useState(0);

  const handleClick = (item, index) => {
    setActive(false);
    setSortItem(item);
    setActiveItem(index);
  };

  return (
    <div className={active ? "popup active" : "popup"}>
      <ul>
        {arr.map((li, i) => (
          <li
            className={
              activeItem === i ? "popup-list-item active" : "popup-list-item"
            }
            onClick={() => handleClick(li, i)}
          >
            {li}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popup;
