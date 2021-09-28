// Documentacion de alertas
// https://reactstrap.github.io/components/alerts/

import { useState, useEffect } from "react";
import "./alerts.css";
import SwitchLayout from "../../components/SwitchLayout/SwitchLayout";

const Alerts = () => {
  const [notifications, setNotifications] = useState([]);

  const [switchData, setSwitchData] = useState(null);
  const [switch2Data, setSwitch2Data] = useState(null);

  // @DOC: Para actualizar datos del switch
  useEffect(() => {
    var data = [];
    for (var i = 1; i <= 12; i++) {
      data.push({
        port: i,
        isConnected: true,
        mac: "EE:EE:EE:EE:EE",
        ip: "192.168.100." + i,
      });
    }
    for (i; i <= 24; i++) {
      data.push({
        port: i,
        isConnected: false,
        mac: "EE:EE:EE:EE:EE",
        ip: "192.168.100." + i,
      });
    }
    setSwitchData(data);
  }, []);

  // @DOC: Para actualizar datos del switch
  useEffect(() => {
    var data2 = [];
    for (var i = 1; i <= 6; i++) {
      data2.push({
        port: i,
        isConnected: true,
        mac: "EE:EE:EE:EE:EE",
        ip: "192.168.100." + i,
      });
    }
    for (i; i <= 12; i++) {
      data2.push({
        port: i,
        isConnected: false,
        mac: "EE:EE:EE:EE:EE",
        ip: "192.168.100." + i,
      });
    }
    setSwitch2Data(data2);
  }, []);

  return (
    <div className="login-container">
      <div className="form-container">
        <h1 className="form-title">alertas</h1>
        {switchData ? (
          <SwitchLayout name="nombre suich" switchData={switchData} />
        ) : null}
        {switch2Data ? (
          <SwitchLayout name="nombre suich 2" switchData={switch2Data} />
        ) : null}
      </div>
    </div>
  );
};

export default Alerts;
