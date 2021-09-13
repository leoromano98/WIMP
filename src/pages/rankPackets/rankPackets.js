// Ejemplos y documentacion de charts (graficos):
// https://reactchartjs.github.io/react-chartjs-2/#/

// Ejemplos y documentacion de gauge ("velocimetro"):
// https://www.npmjs.com/package/react-gauge-chart

import React, { useEffect, useState, setState } from "react";
import "./rankPackets.css";
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
  getRankingPacketsByMAC,
  getRankingPacketsByAppProtocol,
  getRankingPacketsByTransportProtocol,
  getRankingPacketsByNetworkProtocol,
} from "../../api/auth";
import TableComponent from "../../components/Table/Table";
import { SettingsSharp } from "@material-ui/icons";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// Configuracion para graficos:
const dataBar = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
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
};

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

const dataDoughnut = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
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

const RankPackets = () => {
  const [tableData, setTableData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const toggleModal = () => setOpenModal(!openModal);

  useEffect(() => {
    async function getData() {
      var response = await getRankingPacketsByMAC();
      var i = 1;
      response.forEach((index) => {
        index["index"] = i;
        i++;
      });
      console.log("response", response);
      setTableData(response);
    }
    getData();
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
      {tableData ? (
        <TableComponent
          header={tableHeader}
          data={tableData}
          btnClick={handleTableButtonClick}
        />
      ) : null}
      {infoModal}

      <div className="chart-row-container">
        <div className="bar-container">
          <Bar data={dataBar} options={optionsBar} />
        </div>
        <div className="doughnut-container">
          <Doughnut data={dataDoughnut} />
        </div>
      </div>

      <div className="chart-row-container">
        <div className="bar-container">
          <Bar data={dataBar} options={optionsBarHorizontal} />
        </div>
        <div className="doughnut-container">
          <Bar data={dataGrouped} options={optionsGrouped} />
        </div>
      </div>

      <div className="chart-row-container">
        <div className="gauge-container">
          <GaugeChart id="gauge-chart1" />
        </div>
        <div className="gauge-container">
          <GaugeChart id="gauge-chart2" />
        </div>
      </div>
    </>
  );
};

export default RankPackets;
