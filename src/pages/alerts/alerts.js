import { useState, useEffect } from "react";
import { getAlertas, getAlertasRanking } from "../../api/auth";
import "./alerts.css";
import { Button, InputGroup, InputGroupAddon, Input } from "reactstrap";
import RadioButtons from "../../components/RadioButtons/RadioButtons";
import TableComponent from "../../components/Table/Table";
import CircularProgress from "@material-ui/core/CircularProgress";
const Alerts = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedList, setSelectedList] = useState("ranking");
  const [tableData, setTableData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [tableHeader, setTableHeader] = useState(null);

  const handleInputMACChange = (event) => {
    const busqueda = event.target.value.toLowerCase();
    const filter = tableData.filter((index) => {
      if (selectedList === "ranking") {
        return index._id.toLowerCase().includes(busqueda);
      } else {
        return (
          index.mac.toLowerCase().includes(busqueda) ||
          index.evento.toLowerCase().includes(busqueda)
        );
      }
    });
    setFilterData(filter);
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
    setTableData(null);
    setFilterData(null);
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
      setTableData(data);
      setFilterData(data);
      setTableHeader(header);
    }
    func();
  }, [selectedList]);

  return (
    <div className="alerts-container">
      <RadioButtons options={radioOptions} selected={handleSelectedList} />
      <div className="search-mac-container">
        Filtrar por direccion MAC{" "}
        {selectedList === "listar" ? " o por evento" : null}:
        <InputGroup>
          <Input onChange={handleInputMACChange} />
        </InputGroup>
      </div>

      {filterData && tableHeader ? (
        <TableComponent header={tableHeader} data={filterData} />
      ) : (
        <div class="overlay">
          <CircularProgress className="loading-circle" />
        </div>
      )}
    </div>
  );
};

export default Alerts;
