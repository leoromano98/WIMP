import "./header.css";
import { slide as Menu } from "react-burger-menu";
import { useState } from "react";
import logo from "../../assets/img/logoWIMP.png";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { isUserLogedApi, logoutApi } from "../../api/auth";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { UncontrolledAlert } from "reactstrap";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [alarms, setAlarms] = useState([]);

  function showSettings(event) {
    event.preventDefault();
  }

  var user = isUserLogedApi();
  var username = user ? user.username : "Invitado";

  const showAlarm = () => {
    const newAlarm = (
      <UncontrolledAlert color="danger" className="alert-style">
        I am an alert and I can be dismissed!
      </UncontrolledAlert>
    );
    setAlarms([...alarms, newAlarm]);
  };

  var showAlarms = alarms.map((index) => {
    return <>{index}</>;
  });

  return (
    <>
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo"></img>
        </div>
        <div className="account-container">
          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            className="account-dropdown"
            direction="right"
          >
            <DropdownToggle caret>
              <AccountCircleIcon />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>{username}</DropdownItem>
              {user ? (
                <DropdownItem
                  onClick={() => {
                    logoutApi();
                    window.location.reload();
                  }}
                >
                  Cerrar Sesion
                </DropdownItem>
              ) : null}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div class="alarms-container">{showAlarms}</div>
      <Menu id={"sidebar"} className={"my-menu"}>
        <a className="menu-item" href="/landing">
          Home
        </a>
        {/* <a className="menu-item" href="/login">
          Login
        </a> */}
        <a className="menu-item" href="/map">
          Mapa
        </a>
        <a className="menu-item" href="/alerts">
          Alertas
        </a>
        <a className="menu-item" href="/anomalies">
          Anomalias
        </a>
        <a className="menu-item" href="/d3">
          D3 Graph
        </a>
        <a className="menu-item" href="/rankpackets">
          Ranking paquetes
        </a>
        <div className="menu-item test" onClick={showAlarm}>
          Test alarma
        </div>
        <a className="menu-item" href="/accesspoints">
          Access Points
        </a>
        <a className="menu-item" href="/clients">
          Ubicar cliente
        </a>
        {/* <a onClick={showSettings} className="menu-item--small" href="">
          Settings
        </a> */}
      </Menu>
    </>
  );
};

export default Header;
