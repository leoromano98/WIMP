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
import { Animated } from "react-animated-css";

// Configuracion para graficos:
const tableHeader = [
  {
    key: "index",
    text: "#",
  },
  {
    key: "mac",
    text: "MAC Origen",
  },
  {
    key: "ip",
    text: "IP Origen",
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

  const [dataProtApp, setDataProtApp] = useState(null);

  const [dataProtTransp, setDataProtTransp] = useState(null);
  const [dataIp, setDataIp] = useState(null);

  useEffect(() => {
    async function getRankingPacketsByMac() {
      var response = await getRankingPackets();
      console.log("KASJDLASKJDKLAS", response);
      const adaptData = [];
      var i = 1;
      response.forEach((index) => {
        adaptData.push({
          index: i,
          mac: index._id.srcmac,
          ip: index._id.srcip,
          bytes: index.bytes,
          paquetes: index.paquetes,
        });
        i++;
      });
      setTableData(adaptData);
    }

    async function getAppLayerData() {
      var response = await getRankingPacketsByAppProtocol();
      console.log("getAppLayerData", response);
      let data = [];
      var i = 0;
      response.forEach((index) => {
        if (index._id && i < 5) {
          data.push(index);
          i++;
        }
      });
      setDataProtApp(data);
    }

    async function getTransportData() {
      var response = await getRankingPacketsByTransportProtocol();
      console.log("getTransportData", response);
      let data = [];
      let i = 0;
      response.forEach((index) => {
        if (index._id && i < 2) {
          data.push(index);
          i++;
        }
      });
      setDataProtTransp(data);
    }

    async function getNetworkData() {
      var response = await getRankingPacketsByNetworkProtocol();
      console.log("getNetworkData", response);
      setDataIp(response);
    }

    getRankingPacketsByMac();
    getTransportData();
    getAppLayerData();
    getNetworkData();
  }, []);

  useEffect(() => {
    if (!dataProtApp || !dataProtApp || !dataIp || !tableData) return;
    setLoading(false);
  }, [dataProtApp, dataProtApp, dataIp, tableData]);

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
      <h1 className="title-page">Estadísticas de captura de paquetes</h1>
      {loading ? (
        <div class="overlay">
          <CircularProgress className="loading-circle" />
        </div>
      ) : (
        <>
          {infoModal}
          <Animated
            animationIn="zoomIn"
            animationInDuration={600}
            isVisible={true}
          >
            <div className="chart-row-container">
              <div className="bar-container">
                <h5>Cantidad de paquetes por protocolo de aplicacion</h5>
                <BarChart
                  width={500}
                  height={300}
                  data={dataProtApp}
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
              </div>
              <div className="doughnut-container">
                <h5>Cantidad de paquetes por protocolo de transporte</h5>
                <BarChart
                  width={500}
                  height={300}
                  data={dataProtTransp}
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
              </div>
              <div className="gauge-container">
                <h5>Cantidad de paquetes IP</h5>
                {/* <Doughnut data={dataIp} options={optionsBar} /> */}
                <PieChart width={400} height={400}>
                  <Pie
                    nameKey="_id"
                    dataKey="total"
                    isAnimationActive={false}
                    data={dataIp}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Pie
                    nameKey="_id"
                    dataKey="total"
                    data={dataIp}
                    cx={500}
                    cy={200}
                    innerRadius={40}
                    outerRadius={80}
                    fill="#82ca9d"
                  />
                  <Tooltip />
                </PieChart>
              </div>

              {/* <div className="gauge-container">
              <GaugeChart id="gauge-chart2" />
            </div> */}
            </div>
          </Animated>

          <h1 className="title-page">
            Listado de dispositivos con mayor emision de paquetes
          </h1>
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
