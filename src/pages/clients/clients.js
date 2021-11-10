// Ejemplos y documentacion de charts (graficos):
// https://reactchartjs.github.io/react-chartjs-2/#/

// Ejemplos y documentacion de gauge ("velocimetro"):
// https://www.npmjs.com/package/react-gauge-chart

import React, { useState } from "react";
import "./clients.css";
import { Button, InputGroup, InputGroupAddon, Input } from "reactstrap";
import { listTopology } from "../../api/auth";
import CircularProgress from "@material-ui/core/CircularProgress";
import SwitchLayout from "../../components/SwitchLayout/SwitchLayout";
import APLayout from "../../components/APLayout/APLayout";
import ClientLayout from "../../components/ClientLayout/ClientLayout";
import { Animated } from "react-animated-css";

const Clients = () => {
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [MACorIP, setMACorIP] = useState("");
  const [topologyArray, setTopologyArray] = useState(null);

  const iterateTopology = (array, IPorMAC) => {
    const pIPorMAC = IPorMAC;
    let nodoAux = array;
    if (array instanceof Array) {
      array.every((index) => {
        const nodo = iterateTopology(index, pIPorMAC);
        nodoAux = nodo;
        if (nodo[0]?.mac === pIPorMAC || nodo[0]?.ip === pIPorMAC) {
          console.log("anadie", index);
          const addNode = [index];
          nodo.push(addNode[0]);
          return false;
        }
        return nodo; //finrepite
      });
    } else {
      if (array?.tipo === "SW") {
        const nodo = iterateTopology(array.ports, pIPorMAC);
        if (nodo[0]?.mac === pIPorMAC || nodo[0]?.ip === pIPorMAC) {
          const addNode = [array];
          nodo.push(addNode[0]);
        }
        return nodo; //finrepite
      } else {
        if (array?.tipo === "AP") {
          let nodo = null;
          if (array.clientesap) {
            nodo = iterateTopology(array.clientesap, pIPorMAC);
          } else {
            return [array];
          }
          if (nodo[0]?.mac === pIPorMAC || nodo[0]?.ip === pIPorMAC) {
            const addNode = [array];
            nodo.push(addNode[0]);
          }
          return nodo; //finrepite
        } else {
          return [{ ip: array?.ip, mac: array?.mac }];
        }
      }
    }
    console.log("resultado", nodoAux);
    return nodoAux;
  };

  const handleSearchButton = async () => {
    setLoading(true);
    setTopologyArray(null);
    setNotFound(false);
    const fullTopology = await listTopology();
    const searchMACorIP = MACorIP.replaceAll("-", ":").toLowerCase();
    const getTopology = iterateTopology(
      fullTopology[0].netsws.netsws,
      searchMACorIP
    );
    getTopology.forEach((element) => {
      const findIndex = getTopology.findIndex((x) => x.mac === element.mac);
      if (findIndex >= 0) {
        console.log("aca");
        getTopology.splice(findIndex, 1);
      }
    });

    setTopologyArray(getTopology);
    const timer = setTimeout(() => {
      setLoading(false);
      if (getTopology.length === 0) {
        setNotFound(true);
      }
    }, 400);
    return () => clearTimeout(timer);
  };

  const handleInputMACChange = (event) => {
    setMACorIP(event.target.value);
  };

  let connections = [];
  if (topologyArray) {
    for (var i = 0; i < topologyArray.length; i++) {
      let disp;
      switch (topologyArray[i].tipo) {
        case "SW":
          disp = (
            <Animated
              animationIn="lightSpeedIn"
              animationInDuration={1200}
              isVisible={true}
            >
              <SwitchLayout
                switchData={topologyArray[i]}
                isTopology={true}
                port={topologyArray[i - 1].num}
              />
            </Animated>
          );
          break;
        case "AP":
          disp = (
            <Animated
              animationIn="lightSpeedIn"
              animationInDuration={800}
              isVisible={true}
            >
              <APLayout apData={topologyArray[i]} />;
            </Animated>
          );

          break;
        default:
          disp = (
            <Animated
              animationIn="lightSpeedIn"
              animationInDuration={400}
              isVisible={true}
            >
              <ClientLayout clientData={topologyArray[i]} />;
            </Animated>
          );

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
      <h1 className="title-page">
        Trazar topología de un cliente
      </h1>
      <div className="search-mac-container">
        Buscar cliente por direccion MAC o IP:
        <InputGroup>
          <Input onChange={handleInputMACChange} />
          <InputGroupAddon addonType="append">
            <Button onClick={handleSearchButton}>BUSCAR</Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
      {loading ? (
        <div class="overlay">
          <CircularProgress className="loading-circle" />
        </div>
      ) : null}
      {notFound ? (
        <h1 className="error-message">No se encontraron coincidencias.</h1>
      ) : (
        <>{connections}</>
      )}
    </>
  );
};

export default Clients;
