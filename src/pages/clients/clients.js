// Ejemplos y documentacion de charts (graficos):
// https://reactchartjs.github.io/react-chartjs-2/#/

// Ejemplos y documentacion de gauge ("velocimetro"):
// https://www.npmjs.com/package/react-gauge-chart

import React, { useState } from "react";
import "./clients.css";
import { Button, InputGroup, InputGroupAddon, Input } from "reactstrap";
import { auxTopology } from "../../api/auth";
import CircularProgress from "@material-ui/core/CircularProgress";
import SwitchLayout from "../../components/SwitchLayout/SwitchLayout";
import APLayout from "../../components/APLayout/APLayout";
import ClientLayout from "../../components/ClientLayout/ClientLayout";

const Clients = () => {
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [MAC, setMAC] = useState("");
  const [topologyArray, setTopologyArray] = useState(null);

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
    setLoading(true);
    setNotFound(false);
    const getTopology = iterateTopology(auxTopology.netsws.netsws, MAC);
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
