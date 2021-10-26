// Ejemplos y documentacion de charts (graficos):
// https://reactchartjs.github.io/react-chartjs-2/#/

// Ejemplos y documentacion de gauge ("velocimetro"):
// https://www.npmjs.com/package/react-gauge-chart

import React, { useEffect, useState, setState } from "react";
import "./clients.css";
import { Bar, Doughnut } from "react-chartjs-2";
import GaugeChart from "react-gauge-chart";
import {
  getTokenApi,
  getTopology,
  deleteSwitch,
  modifySwitch,
  createSwitch,
  createUser,
  activateSwitch,
  deactivateSwitch,
  handleSend,
  getRankingPacketsByAppProtocol,
  getRankingPacketsByTransportProtocol,
  getRankingPacketsByNetworkProtocol,
  getPacketsByMAC,
  getPacketsByIP,
  auxTopology,
} from "../../api/auth";
import TableComponent from "../../components/Table/Table";
import { SettingsSharp } from "@material-ui/icons";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  Input,
} from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import SwitchLayout from "../../components/SwitchLayout/SwitchLayout";
import APLayout from "../../components/APLayout/APLayout";
import ClientLayout from "../../components/ClientLayout/ClientLayout";

// Configuracion para graficos:

const optionsBar = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const optionsBarHorizontal = {
  indexAxis: "y",
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
};

const dataGrouped = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "# of Red Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "# of Blue Votes",
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: "rgb(54, 162, 235)",
    },
    {
      label: "# of Green Votes",
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: "rgb(75, 192, 192)",
    },
  ],
};

const optionsGrouped = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const tableHeader = [
  {
    key: "index",
    text: "#",
  },
  {
    key: "_id",
    text: "MAC Origen",
  },
  {
    key: "total",
    text: "Cantidad de paquetes",
  },
  {
    key: "button",
    text: "Informacion",
  },
];

const Clients = () => {
  const [tableData, setTableData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [MAC, setMAC] = useState("");
  const [topologyArray, setTopologyArray] = useState(null);
  const toggleModal = () => setOpenModal(!openModal);

  const [dataBar, setDataBar] = useState({
    labels: [],
    datasets: [
      {
        label: "Cantidad de paquetes por protocolo",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [dataDoughnut, setDataDoughnut] = useState({
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [dataIp, setDataIp] = useState({
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  async function getByMAC() {
    var response = await getPacketsByMAC(MAC);
    console.log("BY MAC", response);
    // var i = 1;
    // response.forEach((index) => {
    //   var newData = dataIp
    //   newData.datasets[0].data.push(index.total);
    //   newData.labels.push(index._id);
    //   setDataIp(newData)
    //   index["index"] = i;
    //   i++;
    // });
    // console.log('dataip', dataIp)
  }

  useEffect(() => {


    async function getProtocolData() {
      var response = await getRankingPacketsByAppProtocol();
      var i = 1;
      response.forEach((index) => {
        var newData = dataBar;
        newData.datasets[0].data.push(index.total);
        newData.labels.push(index._id);
        setDataBar(newData);
        index["index"] = i;
        i++;
      });
    }

    async function getTransportData() {
      var response = await getRankingPacketsByTransportProtocol();
      console.log("response2", response);
      var i = 1;
      response.forEach((index) => {
        var newData = dataDoughnut;
        newData.datasets[0].data.push(index.total);
        newData.labels.push(index._id);
        setDataDoughnut(newData);
        index["index"] = i;
        i++;
      });
    }

    async function getNetworkData() {
      var response = await getRankingPacketsByNetworkProtocol();
      console.log("response metwork", response);
      var i = 1;
      response.forEach((index) => {
        var newData = dataIp;
        newData.datasets[0].data.push(index.total);
        newData.labels.push(index._id);
        setDataIp(newData);
        index["index"] = i;
        i++;
      });
      console.log("dataip", dataIp);
    }

    async function getByIPC() {
      var response = await getPacketsByIP();
      console.log("BY ip", response);
      // var i = 1;
      // response.forEach((index) => {
      //   var newData = dataIp
      //   newData.datasets[0].data.push(index.total);
      //   newData.labels.push(index._id);
      //   setDataIp(newData)
      //   index["index"] = i;
      //   i++;
      // });
      // console.log('dataip', dataIp)
    }
    // getByIPC();
    // getTransportData();
    // getProtocolData();
    // getData();
    // getNetworkData();
    // getByMAC();
  }, []);

  const handleTableButtonClick = (event) => {
    toggleModal();
    const MAC = event.target.parentElement.cells[1].outerText;
    const total = event.target.parentElement.cells[2].outerText;
    setModalMessage(MAC);
    console.log("MAC:" + MAC + "  total: ", total);
  };

  const infoModal = (
    <Modal isOpen={openModal} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Crear Usuario</ModalHeader>
      <ModalBody>{modalMessage}</ModalBody>
      <ModalFooter className="modal-footer-container">
        <div className="btn-container">
          <Button color="success" onClick={toggleModal}>
            Aceptar
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );

  const iterateTopology = (array, findMAC) => {
    // const findMac = "b0:52:16:5c:62:0b";
    const findMac = findMAC;
    let nodoAux = array;
    const tree = [];
    if (array instanceof Array) {
      array.every((index) => {
        const nodo = iterateTopology(index, findMac);
        nodoAux = nodo;
        if (nodo[0]?.mac === findMac) {
          console.log("anadie", index);
          const addNode = [index];
          nodo.push(addNode[0]);
          return false;
        }
        return nodo; //finrepite
      });
    } else {
      if (array?.tipo === "SW") {
        const nodo = iterateTopology(array.ports, findMac);
        if (nodo[0]?.mac === findMac) {
          // tree.push(nodo);
          const addNode = [array];
          nodo.push(addNode[0]);
        }
        return nodo; //finrepite
      } else {
        if (array?.tipo === "AP") {
          let nodo = null;
          if (array.clientesap) {
            nodo = iterateTopology(array.clientesap, findMac);
          } else {
            return [array];
          }
          if (nodo[0]?.mac === findMac) {
            // tree.push(nodo);
            const addNode = [array];
            nodo.push(addNode[0]);
          }
          return nodo; //finrepite
        } else {
          // if (array.mac === findMac) {
          return [{ ip: array.ip, mac: array.mac }];
          // }
        }
      }
    }
    console.log("resultado", nodoAux);
    return nodoAux;
  };

  const handleSearchButton = () => {
    const getTopology = iterateTopology(auxTopology.netsws.netsws, MAC);
    getTopology.forEach((element) => {
      const findIndex = getTopology.findIndex((x) => x.mac === element.mac);
      if (findIndex >= 0) {
        console.log("aca");
        getTopology.splice(findIndex, 1);
      }
    });
    setTopologyArray(getTopology);
  };

  const handleInputMACChange = (event) => {
    setMAC(event.target.value);
  };

  let connections = [];
  if (topologyArray) {
    for (var i = 0; i < topologyArray.length; i++) {
      let disp;
      switch (topologyArray[i].tipo) {
        case "SW":
          disp = (
            <SwitchLayout
              switchData={topologyArray[i]}
              isTopology={true}
              port={topologyArray[i - 1].num}
            />
          );
          break;
        case "AP":
          disp = <APLayout apData={topologyArray[i]} />;
          break;
        default:
          disp = <ClientLayout clientData={topologyArray[i]} />;
          break;
      }
      connections.push(disp);
    }

    // port: i,
    // isConnected: false,
    // mac: "EE:EE:EE:EE:EE",
    // ip: "192.168.100." + i,
  }

  return (
    <>
      <div className="search-mac-container">
        Buscar cliente por direccion MAC:
        <InputGroup>
          <Input onChange={handleInputMACChange} />
          <InputGroupAddon addonType="append">
            <Button onClick={handleSearchButton}>BUSCAR</Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <button onClick ={getByMAC}>getByMAC</button>
      {loading ? (
        <div class="overlay">
          <CircularProgress className="loading-circle" />
        </div>
      ) : (
        <>
          {connections}
          {infoModal}
        </>
      )}
    </>
  );
};

export default Clients;
