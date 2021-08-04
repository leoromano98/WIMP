import { useState, useEffect } from 'react';
import "./alerts.css";
import { Table } from "reactstrap";
import { socket } from "../header/header";


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

  const changeData = () => socket.emit("initial_data");

  useEffect(() => {
    var state_current = this;
    socket.emit("initial_data");
    socket.on("get_data", getData);
    socket.on("change_data", changeData);
  },[])

  useEffect(() => {
    socket.off("get_data");
    socket.off("change_data");
  },[])



  return (
    <div className="login-container">
      <div className="form-container">
        <h1 className="form-title">alertas</h1>
      </div>
    </div>
  );
};

export default Alerts;
