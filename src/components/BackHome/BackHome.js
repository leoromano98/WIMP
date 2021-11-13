import "./BackHome.css";
import { Button } from "reactstrap";

const BackHome = () => {
  return (
    <div class="back-container">
      <Button type="button" href="/landing">
        Volver al inicio
      </Button>
    </div>
  );
};

export default BackHome;
