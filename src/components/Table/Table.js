import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../Popup/Popup";
import { fetchUsers } from "../store/usersSlice";
import "./table.sass";

const Table = () => {
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [popupTwo, setPopupTwo] = useState(false);
  const [sortItem, setSortItem] = useState("username");
  const [sortItemTwo, setSortItemTwo] = useState("address street");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users.users);
  const { status } = useSelector((state) => state.users);

  return status === "resolved" ? (
    <table className="table">
      <tr className="tr">
        <td>Name</td>

        <td>
          <Popup
            arr={["username", "number", "company"]}
            setActive={setPopup}
            active={popup}
            setSortItem={setSortItem}
          />
          <button onClick={() => setPopup((prevState) => !prevState)}>
            {sortItem}
          </button>
        </td>
        <td>
          <Popup
            arr={["address street", "address suite", "email"]}
            setActive={setPopupTwo}
            active={popupTwo}
            setSortItem={setSortItemTwo}
          />
          <button onClick={() => setPopupTwo((prevState) => !prevState)}>
            {sortItemTwo}
          </button>
        </td>
      </tr>
      {users.map(({ name, id, username, phone, address, email, company }) => (
        <>
          <tr key={id} className="tr-dynamic">
            <td>{name}</td>
            <td>
              {sortItem === "username"
                ? username
                : sortItem === "number"
                ? phone
                : sortItem === "company"
                ? company.name
                : null}
            </td>
            <td>
              {sortItemTwo === "address street"
                ? address.street
                : sortItemTwo === "address suite"
                ? address.suite
                : sortItemTwo === "email"
                ? email
                : null}
            </td>
          </tr>
        </>
      ))}
    </table>
  ) : (
    <p>loading</p>
  );
};

export default Table;
