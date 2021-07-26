import "./header.css";
import { slide as Menu } from "react-burger-menu";
import socketIOClient from "socket.io-client";
import { useState } from 'react';

export const socket = socketIOClient("http://localhost:3001/");

const Header = () => {
  const [endpoint, setEndpoint] = useState("http://localhost:3001/");
  
  var socket = socketIOClient(endpoint);

  function showSettings(event) {
    event.preventDefault();
  }
  return (
    <>
      <div className="header">
        <img src="/../../assets/img/logoWIMP.png" alt="logo"></img>
        <h1>WIMP</h1>
      </div>
      <Menu id={"sidebar"} className={"my-menu"}>
        <a className="menu-item" href="/landing">
          Home
        </a>
        <a  className="menu-item" href="/login">
          Login
        </a>
        <a className="menu-item" href="/map">
          Mapa
        </a>
        <a className="menu-item" href="/alerts">
          Alertas
        </a>
        {/* <a onClick={showSettings} className="menu-item--small" href="">
          Settings
        </a> */}
      </Menu>
    </>
  );
};

export default Header;