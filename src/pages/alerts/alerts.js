import { useState, useEffect } from "react";
import { getAlertas, getAlertasRanking, formatDate } from "../../api/auth";
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

  useEffect(() => {
    setTableData(null);
    setFilterData(null);
    async function func() {
      let adaptData = [];
      let header = null;
      if (selectedList === "ranking") {
        const data = await getAlertasRanking();
        data.forEach((index) => {
          adaptData.push({
            cant: index.cant,
            ip: index._id.ip,
            mac: index._id.mac,
            name: index._id.name,
          });
        });
        header = [
          {
            key: "name",
            text: "Nombre",
          },
          {
            key: "mac",
            text: "MAC",
          },
          {
            key: "ip",
            text: "IP",
          },
          {
            key: "cant",
            text: "Cantidad",
          },
        ];
      } else {
        const data = await getAlertas();
        data.forEach((index) => {
          adaptData.push({
            mac: index.mac,
            timestamp: formatDate(index.timestamp),
            evento: index.evento,
            ip: index.device?.ip,
            name: index.device?.name,
            model: index.device?.model,
            type: index.device?.type,
          });
        });
        header = [
          {
            key: "name",
            text: "Nombre",
          },
          {
            key: "model",
            text: "Modelo",
          },
          {
            key: "type",
            text: "Tipo",
          },
          {
            key: "mac",
            text: "MAC",
          },
          {
            key: "ip",
            text: "IP",
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
      setTableData(adaptData);
      setFilterData(adaptData);
      setTableHeader(header);
      console.log(adaptData);
    }
    func();
  }, [selectedList]);

  const handleInputMACChange = (event) => {
    const busqueda = event.target.value.toLowerCase();
    const filter = tableData.filter((index) => {
      if (selectedList === "ranking") {
        return (
          index.ip.toLowerCase().includes(busqueda) ||
          index.mac.toLowerCase().includes(busqueda) ||
          index.name.toLowerCase().includes(busqueda)
        );
      } else {
        return (
          index.mac.toLowerCase().includes(busqueda) ||
          index.evento.toLowerCase().includes(busqueda) ||
          index.name?.toLowerCase().includes(busqueda) ||
          index.model?.toLowerCase().includes(busqueda) ||
          index.ip?.toLowerCase().includes(busqueda)
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

  return (
    <div className="alerts-container">
      <div className="checkbox-search-contianer">
        <RadioButtons options={radioOptions} selected={handleSelectedList} />
        <div className="search-mac-container">
          Filtrar por nombre, MAC{" "}
          {selectedList === "listar" ? ", IP o por evento" : " o IP"}:
          <InputGroup>
            <Input onChange={handleInputMACChange} />
          </InputGroup>
        </div>
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
