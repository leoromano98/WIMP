import "./BackHome.css";
import { Button } from "reactstrap";
import { logoutApi } from "../../api/auth";

const BackHome = () => {
  const handleLogoutClick = () => {
    logoutApi();
    window.location.reload();
  };

  return (
    <div class="back-container">
      <Button type="button" onClick={handleLogoutClick}>
        Cerrar sesión y salir
      </Button>
    </div>
  );
};

export default BackHome;
