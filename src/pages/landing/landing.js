// Ejemplos y documentacion de charts (graficos):
// https://reactchartjs.github.io/react-chartjs-2/#/

// Ejemplos y documentacion de gauge ("velocimetro"):
// https://www.npmjs.com/package/react-gauge-chart

import React, { useState } from "react";
import "./landing.css";
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
  getRankingPackets,
  getRankingPacketsByAppProtocol,
  getRankingPacketsByTransportProtocol,
  getRankingPacketsByNetworkProtocol,
  getAlertas,
  isUserLogedApi
} from "../../api/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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

const Landing = () => {
  const [startDate, setStartDate] = useState(new Date());

  // return (
  //   <>
  //     <h3>TESTING</h3>
  //     <button onClick={getTopology}>TOPOLOGOIA</button>
  //     <button onClick={modifySwitch}>MODIFICAR</button>
  //     <button onClick={deleteSwitch}>BORRAR</button>
  //     <button onClick={createSwitch}>CREAR SWITCH</button>
  //     <button onClick={createUser}>CREAR USUARIO</button>
  //     <button onClick={activateSwitch}>ACTIVAR USUARIO</button>
  //     <button onClick={deactivateSwitch}>DESACTIVAR USUARIO</button>
  //     <button onClick={handleSend}>ENVIAR MAIL</button>
  //     <button onClick={getRankingPackets}>GET PAQUETES</button>
  //     <button onClick={getRankingPacketsByAppProtocol}>
  //       GET PAQUETES PROT APP
  //     </button>
  //     <button onClick={getRankingPacketsByTransportProtocol}>
  //       GET PAQUETES PROT TRANSP
  //     </button>
  //     <button onClick={getRankingPacketsByNetworkProtocol}>
  //       GET PAQUETES PROT RED
  //     </button>
  //     <button onClick={getAlertas}>ALERTAS</button>

  //     <DatePicker
  //       selected={startDate}
  //       onChange={(date) => setStartDate(date)}
  //     />
  //     <div className="chart-row-container">
  //       <div className="bar-container">
  //         <Bar data={dataBar} options={optionsBar} />
  //       </div>
  //       <div className="doughnut-container">
  //         <Doughnut data={dataDoughnut} />
  //       </div>
  //     </div>

  //     <div className="chart-row-container">
  //       <div className="bar-container">
  //         <Bar data={dataBar} options={optionsBarHorizontal} />
  //       </div>
  //       <div className="doughnut-container">
  //         <Bar data={dataGrouped} options={optionsGrouped} />
  //       </div>
  //     </div>

  //     <div className="chart-row-container">
  //       <div className="gauge-container">
  //         <GaugeChart id="gauge-chart1" />
  //       </div>
  //       <div className="gauge-container">
  //         <GaugeChart id="gauge-chart2" />
  //       </div>
  //     </div>
  //   </>
  // );

  var user = isUserLogedApi();
  var username = user ? user.username : "Invitado";

  return (
    <div className="title-container">
      <h1>Bienvenido <b>{username}</b> !</h1> 
      <h2>Seleccione una opcion del menu superior izquierdo</h2>
    </div>
  )
};

export default Landing;
