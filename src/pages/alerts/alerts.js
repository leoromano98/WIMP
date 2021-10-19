import { useState, useEffect } from "react";
import "./alerts.css";
import { Button, InputGroup, InputGroupAddon, Input } from "reactstrap";
import RadioButtons from "../../components/RadioButtons/RadioButtons";
const Alerts = () => {
  const [notifications, setNotifications] = useState([]);
  const [MAC, setMAC] = useState(null);
  const [selectedList, setSelectedList] = useState("ranking");

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
    </div>
  );
};

export default Alerts;
