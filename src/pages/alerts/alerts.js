import { useState, useEffect } from 'react';
import "./alerts.css";
import { Table } from "reactstrap";


const Alerts = () => {
  const [notifications, setNotifications] = useState([]);

  // const loginClickHandler = () => {
  //   alert("user: " + username + " , pass: " + password);
  // };

  // const userNameChangeHandler = (event) => {
  //   setUserName(event.target.value);
  // };
  
  // const passwordChangeHandler = (event) => {
  //   setPassword(event.target.value);
  // };

  const getData = foodItems => {
    console.log(foodItems);
    setNotifications(foodItems);
  };
  return (
    <div className="login-container">
      <div className="form-container">
        <h1 className="form-title">alertas</h1>
      </div>
    </div>
  );
};

export default Alerts;
