// Ejemplos y documentacion de charts (graficos):
// https://reactchartjs.github.io/react-chartjs-2/#/

// Ejemplos y documentacion de gauge ("velocimetro"):
// https://www.npmjs.com/package/react-gauge-chart

import React, { useEffect, useState, setState, PureComponent } from "react";
import "./rankPackets.css";
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
  getRankingPackets,
  getRankingPacketsByAppProtocol,
  getRankingPacketsByTransportProtocol,
  getRankingPacketsByNetworkProtocol,
  getPacketsByMAC,
  getPacketsByIP,
} from "../../api/auth";
import TableComponent from "../../components/Table/Table";
import { SettingsSharp } from "@material-ui/icons";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from "recharts";

// Configuracion para graficos:
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
    key: "paquetes",
    text: "Cantidad de paquetes",
  },
  {
    key: "bytes",
    text: "Cantidad de bytes",
  },
];

const RankPackets = () => {
  const [tableData, setTableData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const toggleModal = () => setOpenModal(!openModal);

  const [dataBar, setDataBar] = useState(null);

  const [dataPie, setDataPie] = useState(null);

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

  useEffect(() => {
    async function getData() {
      var response = await getRankingPackets();
      var i = 1;
      response.forEach((index) => {
        index["index"] = i;
        i++;
      });
      setTableData(response);
    }

    async function getProtocolData() {
      var response = await getRankingPacketsByAppProtocol();
      console.log("getProtocolData", response);
      setDataBar(response);
    }

    async function getTransportData() {
      var response = await getRankingPacketsByTransportProtocol();
      console.log("getTransportData", response);
      setDataPie(response);
    }

    async function getNetworkData() {
      var response = await getRankingPacketsByNetworkProtocol();
      console.log("getNetworkData", response);
      setDataIp(response);
    }

    async function getByMAC() {
      var response = await getPacketsByMAC();
      // console.log("BY MAC", response);
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

    getData();
    getTransportData();
    getProtocolData();
    getNetworkData();
    // getByMAC();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("This will run after 1 second!");
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
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

  return (
    <>
      {loading ? (
        <div class="overlay">
          <CircularProgress className="loading-circle" />
        </div>
      ) : (
        <>
          {dataBar ? (
            <BarChart
              width={500}
              height={300}
              data={dataBar}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#82ca9d" />
            </BarChart>
          ) : null}

          {dataPie ? (
            <PieChart width={400} height={400}>
              <Pie
                nameKey="_id"
                dataKey="total"
                isAnimationActive={false}
                data={dataPie}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Pie nameKey="_id" dataKey="total" data={dataPie} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
              <Tooltip />
            </PieChart>
          ) : null}

          {infoModal}
          <div className="chart-row-container">
            <div className="bar-container">
              <h5>Cantidad de paquetes por protocolo</h5>
              {/* <Bar data={dataBar} options={optionsBar} /> */}
            </div>
            <div className="doughnut-container">
              <h5>Cantidad de paquetes por protocolo de transporte</h5>
              {/* <Doughnut data={dataDoughnut} /> */}
            </div>
            <div className="gauge-container">
              <h5>Cantidad de paquetes IP</h5>
              {/* <Doughnut data={dataIp} options={optionsBar} /> */}
            </div>
          </div>

          {/* <div className="chart-row-container">
        <div className="bar-container">
          <Bar data={dataBar} options={optionsBarHorizontal} />
        </div>
        <div className="doughnut-container">
          <Bar data={dataGrouped} options={optionsGrouped} />
        </div>
      </div> */}

          <div className="chart-row-container">
            <div className="gauge-container">
              <GaugeChart id="gauge-chart2" />
            </div>
          </div>

          {tableData ? (
            <TableComponent
              header={tableHeader}
              data={tableData}
              btnClick={handleTableButtonClick}
            />
          ) : (
            <CircularProgress className="loading-circle" />
          )}
        </>
      )}
    </>
  );
};

export default RankPackets;
