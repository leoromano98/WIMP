import { useState, useEffect } from "react";
import { getAlertas, getAlertasRanking } from "../../api/auth";
import "./alerts.css";
import { Button, InputGroup, InputGroupAddon, Input } from "reactstrap";
import RadioButtons from "../../components/RadioButtons/RadioButtons";
import TableComponent from "../../components/Table/Table";
const Alerts = () => {
  const [notifications, setNotifications] = useState([]);
  const [MAC, setMAC] = useState(null);
  const [selectedList, setSelectedList] = useState("ranking");
  const [tableData, setTableData] = useState(null);
  const [tableHeader, setTableHeader] = useState(null);

  const handleInputMACChange = (event) => {
    setMAC(event.target.value);
  };

  const handleSearchButton = () => {
    // Filter table
  };

  const handleSelectedList = (radioId) => {
    setSelectedList(radioId);
    console.log(radioId);
  };

  const radioOptions = [
    {
      id: "ranking",
      text: "Ranking",
    },
    {
      id: "listar",
      text: "Listar",
    },
  ];

  useEffect(() => {
    async function func() {
      let data = null;
      let header = null;
      if (selectedList === "ranking") {
        data = await getAlertasRanking();
        header = [
          {
            key: "_id",
            text: "MAC",
          },
          {
            key: "cant",
            text: "Cantidad",
          },
        ];
      } else {
        data = await getAlertas();
        header = [
          {
            key: "mac",
            text: "MAC",
          },
          {
            key: "evento",
            text: "Evento",
          },
          {
            key: "timestamp",
            text: "Fecha y hora",
          },
        ];
      }
      console.log(data);
      setTableData(data);
      setTableHeader(header);
    }
    func();
  }, [selectedList]);

  return (
    <div className="alerts-container">
      <RadioButtons options={radioOptions} selected={handleSelectedList} />
      <div className="search-mac-container">
        Buscar cliente por direccion MAC:
        <InputGroup>
          <Input onChange={handleInputMACChange} />
          <InputGroupAddon addonType="append">
            <Button onClick={handleSearchButton}>BUSCAR</Button>
          </InputGroupAddon>
        </InputGroup>
      </div>

      {tableData && tableHeader ? (
        <TableComponent header={tableHeader} data={tableData} />
      ) : null}
    </div>
  );
};

export default Alerts;
