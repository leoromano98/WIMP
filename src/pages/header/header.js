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

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  function showSettings(event) {
    event.preventDefault();
  }

  var user = isUserLogedApi();
  var username = user ? user.username : "Invitado";

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
      <Menu id={"sidebar"} className={"my-menu"}>
        <a className="menu-item" href="/landing">
          Home
        </a>
        <a className="menu-item" href="/login">
          Login
        </a>
        <a className="menu-item" href="/map">
          Mapa
        </a>
        <a className="menu-item" href="/alerts">
          Alertas
        </a>
        <a className="menu-item" href="/d3">
          D3 Graph
        </a>
        {/* <a onClick={showSettings} className="menu-item--small" href="">
          Settings
        </a> */}
      </Menu>
    </>
  );
};

export default Header;
