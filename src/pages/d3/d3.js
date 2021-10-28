// Documentacion D# graph
// https://www.npmjs.com/package/react-d3-graph

import { useState, useEffect } from "react";
import "./d3.css";
import { Graph } from "react-d3-graph";
import { getTopology } from "../../api/auth";
import CircularProgress from "@material-ui/core/CircularProgress";

// graph payload (with minimalist structure)
const myConfig = {
  "automaticRearrangeAfterDropNode": true,
  "collapsible": true,
  "directed": false,
  "focusAnimationDuration": 0.75,
  "focusZoom": 1,
  "freezeAllDragEvents": false,
  "height": 400,
  "highlightDegree": 1,
  "highlightOpacity": 1,
  "linkHighlightBehavior": false,
  "maxZoom": 8,
  "minZoom": 0.1,
  "nodeHighlightBehavior": false,
  "panAndZoom": false,
  "staticGraph": false,
  "staticGraphWithDragAndDrop": false,
  "width": 800,
  "d3": {
    "alphaTarget": 0.05,
    "gravity": -100,
    "linkLength": 100,
    "linkStrength": 1,
    "disableLinkForce": false
  },
  "node": {
    "color": "#d3d3d3",
    "fontColor": "black",
    "fontSize": 8,
    "fontWeight": "normal",
    "highlightColor": "SAME",
    "highlightFontSize": 8,
    "highlightFontWeight": "normal",
    "highlightStrokeColor": "SAME",
    "highlightStrokeWidth": "SAME",
    "labelProperty": "id",
    "mouseCursor": "pointer",
    "opacity": 1,
    "renderLabel": true,
    "size": 200,
    "strokeColor": "none",
    "strokeWidth": 1.5,
    "svg": "",
    "symbolType": "circle"
  },
  "link": {
    "color": "#d3d3d3",
    "fontColor": "black",
    "fontSize": 8,
    "fontWeight": "normal",
    "highlightColor": "SAME",
    "highlightFontSize": 8,
    "highlightFontWeight": "normal",
    "labelProperty": "label",
    "mouseCursor": "pointer",
    "opacity": 1,
    "renderLabel": false,
    "semanticStrokeWidth": false,
    "strokeWidth": 1.5,
    "markerHeight": 6,
    "markerWidth": 6,
    "strokeDasharray": 0,
    "strokeDashoffset": 0,
    "strokeLinecap": "butt"
  }
}

const onClickNode = function (nodeId) {
  console.log(`Clicked node ${nodeId}`);
};

const onClickLink = function (source, target) {
  console.log(`Clicked link between ${source} and ${target}`);
};

const D3 = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSwitch,setSelectedSwitch] = useState(null);

  async function getData() {
    var newNodes = await getTopology();
    console.log("newNodes", newNodes);
    setData(newNodes[0].netsws.netsws);
    // }
  }

  useEffect(() => {
    let mounted = true;
    getData();
    // .then((items) => {
    //   if (mounted && items !== undefined) {
    //     setData(items);
    //   }
    // });
    // return () => (mounted = false);
  }, []);

  useEffect(() => {
    if (data.length !== 0 || data !== undefined) {
      setIsLoading(false);
      setSelectedSwitch(data[0]?.mac)
    }
  }, [data]);

  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  
  const displayNodesAndLinks = (array, macSW) => {
    console.log('!!!',  macSW)
    console.log("!", array);
    const auxNodes = nodes;
    const auxLinks = links;
    if (array instanceof Array) {
      console.log("isarray");
      array.forEach((index) => {
        if(macSW){
          if(macSW === index.mac){
            const hijo = displayNodesAndLinks(index);
            if (hijo && array.mac && index.mac) {
              auxLinks.push({ source: array.mac, target: index.mac });
              setLinks(auxLinks);
            }
          }
        }
        else{
          const hijo = displayNodesAndLinks(index);
          if (hijo && array.mac && index.mac) {
            auxLinks.push({ source: array.mac, target: index.mac });
            setLinks(auxLinks);
          }
        }
      });
      if(array.mac){
        auxNodes.push({ id: array.mac });
        setNodes(auxNodes);
      }
    } else {
      if (array.tipo === "SW") {
        console.log("isSW");
        if (array.ports) {
          //puede no tener nada conectado
          array.ports.forEach((index) => {
            const hijo = displayNodesAndLinks(index);
            if (hijo && array.mac && index.mac) {
              auxLinks.push({ source: array.mac, target: index.mac });
              setLinks(auxLinks);
            }
          });
          auxNodes.push({ id: array.mac });
          setNodes(auxNodes);
          return array;
        }
      }
      if (array.tipo === "AP") {
        console.log("isAP");
        if (array.clientesap) {
          array.clientesap.forEach((index) => {
            const hijo = displayNodesAndLinks(index);
            if (hijo && array.mac && index.mac) {
              auxLinks.push({ source: array.mac, target: index.mac });
              setLinks(auxLinks);
            }
          });
          auxNodes.push({ id: array.mac });
          setNodes(auxNodes);
          return array;
        }
      }
      console.log("isCLIENTE");
      auxNodes.push({ id: array.mac });
      setNodes(auxNodes);
      return array;
    }
    setNodes(auxNodes);
    setLinks(auxLinks);
    console.log(nodes);
    console.log(links);
  };

  const circleLoading = (
    <div class="overlay">
      <CircularProgress className="loading-circle" />
    </div>
  );

  const handleShowGraph = () => {
    setShowGraph(true);
  };

  const handleSelectSwitch = (event) => {
    setSelectedSwitch(event.target.value);
    console.log(event.target.value)
  };

  return (
    <div className="login-container">
      <div className="graph-container">
        <select onChange={handleSelectSwitch}>
          {data.map(index=>{
            return <option value={index.mac} defaultValue={index.mac===data[0].mac}>
                {index.mac}
              </option>
          })}
          </select>
        <button onClick={() => displayNodesAndLinks(data, selectedSwitch)}>ARMAR NODOS</button>
        <button onClick={handleShowGraph}>ARMAR NODOS</button>
        {isLoading ? (
          circleLoading
        ) : (
          <>
            {console.log({ nodes: nodes, links: links })}
            {showGraph ? (
              <Graph
                id="graph-id" // id is mandatory
                data={{ nodes: nodes, links: links }}
                config={myConfig}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default D3;
