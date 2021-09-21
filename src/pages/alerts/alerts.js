// Documentacion de alertas
// https://reactstrap.github.io/components/alerts/

import { useState, useEffect } from "react";
import "./alerts.css";
import { UncontrolledAlert } from "reactstrap";

const Alerts = () => {
  const [notifications, setNotifications] = useState([]);

  return (
    <div className="login-container">
      <div className="form-container">
        <h1 className="form-title">alertas</h1>
        {/* <button onClick={showAlarm}>Forzar alarma</button> */}
      </div>
    </div>
  );
};

export default Alerts;
