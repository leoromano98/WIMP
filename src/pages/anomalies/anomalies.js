import { useState, useEffect } from "react";
import { getAnomalias, getAnomaliasRanking, formatDate } from "../../api/auth";
import "./anomalies.css";
import { Button, InputGroup, InputGroupAddon, Input } from "reactstrap";
import RadioButtons from "../../components/RadioButtons/RadioButtons";
import TableComponent from "../../components/Table/Table";
import CircularProgress from "@material-ui/core/CircularProgress";

const Anomalies = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedList, setSelectedList] = useState("ranking");
  const [tableData, setTableData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [tableHeader, setTableHeader] = useState(null);

  const handleInputMACChange = (event) => {
    const busqueda = event.target.value.toLowerCase();
    const filter = tableData.filter((index) => {
      if (selectedList === "ranking") {
        return (
          index.name?.toLowerCase().includes(busqueda) ||
          index.mac.toLowerCase().includes(busqueda) ||
          index.ip?.toLowerCase().includes(busqueda)
        )
      } else {
        return (
          index.mac.toLowerCase().includes(busqueda) ||
          index.anomaly.toLowerCase().includes(busqueda)
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
      let adaptData = [];
      let data = null;
      let header = null;
      if (selectedList === "ranking") {
        data = await getAnomaliasRanking();
        data.forEach((index) => {
          adaptData.push({
            cant: index.cant,
            mac: index._id.mac,
            name: index._id.name ? index._id.name : "-",
            ip: index._id.ip ? index._id.ip : "-",
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
        data = await getAnomalias();
        data.forEach(index=>{
          if(!index.name){

          }
          adaptData.push({
            mac: index.mac,
            anomaly: index.anomaly,
            name: index.device?.name ? index.device.name : "-",
            ip: index.device?.ip ? index.device.ip : "-",
            type: index.device?.type ? index.device.type : "Desconectado",
            timestamp: formatDate(index.timestamp)
          })
        })
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
            key: "type",
            text: "Tipo",
          },
          {
            key: "anomaly",
            text: "Anomalia",
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
    }
    func();
  }, [selectedList]);

  return (
    <div className="alerts-container">
      <h1 className="title-page">
      {selectedList === "ranking" ? "Ranking de dispositivos con mayor cantidad de anomalías" : "Listado de anomalías generadas por dispositivo"}
        </h1>
      <div className="checkbox-search-contianer">
        <RadioButtons options={radioOptions} selected={handleSelectedList} />
        <div className="search-mac-container">
          Filtrar por
          {selectedList === "ranking"
            ? " nombre, MAC o IP "
            : " MAC o anomalia"}
          :
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

export default Anomalies;
