import "./BackHome.css";
import { Button } from "reactstrap";
import { logoutApi } from "../../api/auth";

const BackHome = () => {
  return (
    <div class="back-container">
      <Button type="button" onClick={logoutApi}>
        Cerrar sesión y salir
      </Button>
    </div>
  );
};

export default BackHome;
