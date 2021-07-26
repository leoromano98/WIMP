import "./header.css";
import { slide as Menu } from "react-burger-menu";

const Header = () => {
  function showSettings(event) {
    event.preventDefault();
  }
  return (
    <Menu id={ "sidebar" } className={ "my-menu" } >
      <a id="home" className="menu-item" href="/">
        Home
      </a>
      <a id="about" className="menu-item" href="/about">
        About
      </a>
      <a id="contact" className="menu-item" href="/contact">
        Contact
      </a>
      <a onClick={showSettings} className="menu-item--small" href="">
        Settings
      </a>
    </Menu>
  );
};

export default Header;
