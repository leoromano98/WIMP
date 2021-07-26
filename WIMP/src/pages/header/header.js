import "./header.css";
import { slide as Menu } from "react-burger-menu";

const Header = () => {
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
        {/* <a onClick={showSettings} className="menu-item--small" href="">
          Settings
        </a> */}
      </Menu>
    </>
  );
};

export default Header;
