// Documentacion de alertas
// https://reactstrap.github.io/components/alerts/

import { useState, useEffect } from "react";
import "./AccessPoints.css";
import SwitchLayout from "../../components/SwitchLayout/SwitchLayout";
import TableComponent from "../../components/Table/Table";
import { getAPs, formatDate } from "../../api/auth";
const AccessPoints = () => {
  const [tableData, setTableData] = useState(null);
  const [switch2Data, setSwitch2Data] = useState(null);

  const header = [
    { key: "state", text: "Estado", colors: "true" },
    { key: "model", text: "Modelo" },
    { key: "name", text: "Nombre" },
    { key: "cpu", text: "CPU" },
    { key: "mem", text: "MEM" },
    { key: "timestamp", text: "Ult. Actualizacion" },
  ];

  const getDataFromAPI = async () => {
    const data = await getAPs();
    console.log(data);
    data.forEach((index) => {
      index.timestamp = formatDate(index.timestamp);
      if(index.mem <= 0 || index.uptime === 0 || index.cpu === 0){
        index.state = "Inactivo"
      }
      else{
        index.state = "Activo"
      }
    });
    setTableData(data);
  };

  useEffect(() => {
    getDataFromAPI();
  }, []);

  return (
    <div className="login-container">
      {tableData ? <TableComponent header={header} data={tableData} /> : null}
    </div>
  );
};

export default AccessPoints;
