// Documentacion D# graph
// https://www.npmjs.com/package/react-d3-graph

import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./d3.css";
import { Graph } from "react-d3-graph";
import { getTopology } from "../../api/auth";
import CircularProgress from "@material-ui/core/CircularProgress";
import switchSvg from "../../assets/img/switch.svg";
import clientSvg from "../../assets/img/client.svg";
import apSvg from "../../assets/img/ap.svg";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import BackHome from "../../components/BackHome/BackHome";
// graph payload (with minimalist structure)
const myConfig = {
  automaticRearrangeAfterDropNode: true,
  collapsible: true,
  directed: false,
  focusAnimationDuration: 0.75,
  focusZoom: 1,
  freezeAllDragEvents: false,
  height: 400,
  highlightDegree: 1,
  highlightOpacity: 1,
  linkHighlightBehavior: false,
  maxZoom: 8,
  minZoom: 0.1,
  nodeHighlightBehavior: false,
  panAndZoom: false,
  staticGraph: false,
  staticGraphWithDragAndDrop: false,
  width: 800,
  d3: {
    alphaTarget: 0.05,
    gravity: -100,
    linkLength: 100,
    linkStrength: 1,
    disableLinkForce: false,
  },
  node: {
    color: "#d3d3d3",
    fontColor: "black",
    fontSize: 8,
    fontWeight: "normal",
    highlightColor: "SAME",
    highlightFontSize: 8,
    highlightFontWeight: "normal",
    highlightStrokeColor: "SAME",
    highlightStrokeWidth: "SAME",
    labelProperty: "id",
    mouseCursor: "pointer",
    opacity: 1,
    renderLabel: true,
    size: 200,
    strokeColor: "none",
    strokeWidth: 1.5,
    svg: "",
    symbolType: "circle",
  },
  link: {
    color: "#d3d3d3",
    fontColor: "black",
    fontSize: 8,
    fontWeight: "normal",
    highlightColor: "SAME",
    highlightFontSize: 8,
    highlightFontWeight: "normal",
    labelProperty: "label",
    mouseCursor: "pointer",
    opacity: 1,
    renderLabel: false,
    semanticStrokeWidth: false,
    strokeWidth: 1.5,
    markerHeight: 6,
    markerWidth: 6,
    strokeDasharray: 0,
    strokeDashoffset: 0,
    strokeLinecap: "butt",
  },
};

const onClickNode = function (nodeId) {
  console.log(`Clicked node ${nodeId}`);
};

const onClickLink = function (source, target) {
  console.log(`Clicked link between ${source} and ${target}`);
};

const D3 = () => {
  let history = useHistory();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSwitch, setSelectedSwitch] = useState(null);
  // const [nodes, setNodes] = useState([]);
  // const [links, setLinks] = useState([]);
  const [nodesData, setNodesData] = useState([]);
  const [linksData, setLinksData] = useState([]);
  let nodes = []
  let links = []
  const [showGraph, setShowGraph] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  async function getData() {
    var newNodes = await getTopology();
    console.log("newNodes", newNodes);
    setData(newNodes[0].netsws.netsws);
  }

  useEffect(() => {
    console.log("asdlaskdl;as", selectedSwitch);
    getData();
  }, []);

  useEffect(() => {
    if (data.length !== 0 || data !== undefined) {
      console.log("useEffect", selectedSwitch, data);
      setIsLoading(false);
    }
  }, []);

  const displayNodesAndLinks = (array, macSW, links, nodes) => {
    console.log("[displayNodesAndLinks]", links, nodes);
    const auxLinks = links;
    const auxNodes = nodes;
    if (array instanceof Array) {
      array.forEach((index) => {
        if (macSW) {
          if (macSW === index.mac) {
            const hijo = displayNodesAndLinks(index, null, links, nodes);
            if (hijo && array.mac && index.mac) {
              auxLinks.push({ source: array.mac, target: index.mac });

              links = auxLinks;
            }
          }
        } else {
          const hijo = displayNodesAndLinks(index, null, links, nodes);
          if (hijo && array.mac && index.mac) {
            auxLinks.push({ source: array.mac, target: index.mac });

            links = auxLinks;
          }
        }
      });
      if (array.mac) {
        auxNodes.push({ id: array.mac, svg: switchSvg });

        nodes = auxNodes;
      }
    } else {
      if (array.tipo === "SW") {
        if (array.ports) {
          //puede no tener nada conectado
          array.ports.forEach((index) => {
            const hijo = displayNodesAndLinks(index, null, links, nodes);
            if (hijo && array.mac && index.mac) {
              auxLinks.push({ source: array.mac, target: index.mac });
              links = auxLinks;
            }
          });
          auxNodes.push({ id: array.mac, svg: switchSvg });
          nodes = auxNodes;
          return array;
        }
      }
      if (array.tipo === "AP") {
        if (array.clientesap) {
          array.clientesap.forEach((index) => {
            const hijo = displayNodesAndLinks(index, null, links, nodes);
            if (hijo && array.mac && index.mac) {
              auxLinks.push({ source: array.mac, target: index.mac });
              links = auxLinks;
            }
          });
          auxNodes.push({ id: array.mac, svg: apSvg });
          nodes = auxNodes;
          return array;
        }
      }
      auxNodes.push({ id: array.mac, svg: clientSvg });
      nodes = auxNodes;
      return array;
    }
    console.log("1", auxLinks);
    console.log("2", auxNodes);
    // setLinks(auxLinks);
    // setNodes(auxNodes);
    setShowGraph(true);
    console.log("dale1");
  };

  const circleLoading = (
    <div class="overlay">
      <CircularProgress className="loading-circle" />
    </div>
  );

  // const handleShowButton = () => {
  //   console.log(nodes, links);
  //   if (nodes.length !== 0) {
  //     console.log("entro if");
  //     setIsLoading(true);

  //     // remove old nodes
  //     let auxNodes = nodes;
  //     let auxLinks = links;
  //     nodes.forEach((index) => {
  //       debugger;
  //       const findIndex = nodes.findIndex((el) => el === index);
  //       const id = index.id;
  //       auxLinks = auxLinks.filter((l) => l.source !== id && l.target !== id);
  //       auxNodes.splice(findIndex, 1);
  //     });
  //     //finish remove
  //     setLinks(auxLinks);
  //     setNodes(auxNodes);
  //     displayNodesAndLinks(data, selectedSwitch);

  //     setIsLoading(false);
  //   } else {
  //     console.log("entro else");
  //     displayNodesAndLinks(data, selectedSwitch);
  //   }
  // };

  const handleRemoveButton = () => {
    let auxNodes = nodes;
    let auxLinks = links;
    console.log("hola1", auxLinks.length, auxNodes.length);
    while (auxLinks.length !== 0 && auxNodes.length !== 0) {
      let auxNodes = nodes;
      let auxLinks = links;
      const id = nodes[0].id;
      auxNodes.splice(0, 1);
      console.log(
        "jeje",
        id,
        auxLinks.filter((l) => l.source !== id && l.target !== id)
      );
      const auxLinks2 = auxLinks2.filter(
        (l) => l.source !== id && l.target !== id
      );
      links = auxLinks
      nodes = auxNodes
      // setLinks(auxLinks);
      // setNodes(auxNodes);
      console.log("hola2", auxLinks.length, auxNodes.length);
    }
  };

  const handleDropdownItemClick = (event) => {
    const selected = event.target.value;
    setSelectedSwitch(selected);
    // handleShowButton();
    if (nodes.length !== 0 || links.length !== 0) {
      console.log("entro if");
      setIsLoading(true);

      // remove old nodes
      // let auxNodes = nodes;
      // let auxLinks = links;
      handleRemoveButton();

      console.log("llego1", links, nodes);
      // setLinks(auxLinks);
      // setNodes(auxNodes);
      // console.log("llego2");
      displayNodesAndLinks(data, selected, links, nodes);
      console.log("dale2");

      setIsLoading(false);
      console.log("dale3");
    } else {
      console.log("entro else");
      displayNodesAndLinks(data, selected, links, nodes);
      console.log("dale4");
    }
    setLinksData(links)
    setNodesData(nodes)
  };

  return (
    <div className="login-container">
      <BackHome />
      <h1 className="title-page">Visor dinámico de topología de red</h1>
      <div className="graph-container">
        Seleccione un dispositivo
        <Dropdown
          isOpen={dropdownOpen}
          toggle={toggle}
          className="graph-dropdown"
          direction="right"
        >
          <DropdownToggle caret>
            {selectedSwitch
              ? data.find((e) => e.mac === selectedSwitch).name
              : "Nombre del dispositvo"}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Elegir dispositivo</DropdownItem>

            {data.map((index) => {
              return (
                <DropdownItem
                  onClick={handleDropdownItemClick}
                  value={index.mac}
                >
                  {index.name}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
        {isLoading ? (
          circleLoading
        ) : (
          <>
            {showGraph ? (
              <Graph
                id={"graph-id"} // id is mandatory
                data={{ nodes: nodesData, links: linksData }}
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
