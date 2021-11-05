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

  let { pSelectedSwitch } = useParams();
  console.log("pSelectedSwitch", pSelectedSwitch);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSwitch, setSelectedSwitch] = useState(pSelectedSwitch);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
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

  const displayNodesAndLinks = (array, macSW) => {
    const auxLinks = links;
    const auxNodes = nodes;
    if (array instanceof Array) {
      array.forEach((index) => {
        if (macSW) {
          if (macSW === index.mac) {
            const hijo = displayNodesAndLinks(index);
            if (hijo && array.mac && index.mac) {
              auxLinks.push({ source: array.mac, target: index.mac });
              setLinks(auxLinks);
            }
          }
        } else {
          const hijo = displayNodesAndLinks(index);
          if (hijo && array.mac && index.mac) {
            auxLinks.push({ source: array.mac, target: index.mac });
            setLinks(auxLinks);
          }
        }
      });
      if (array.mac) {
        auxNodes.push({ id: array.mac, svg: switchSvg });
        setNodes(auxNodes);
      }
    } else {
      if (array.tipo === "SW") {
        if (array.ports) {
          //puede no tener nada conectado
          array.ports.forEach((index) => {
            const hijo = displayNodesAndLinks(index);
            if (hijo && array.mac && index.mac) {
              auxLinks.push({ source: array.mac, target: index.mac });
              setLinks(auxLinks);
            }
          });
          auxNodes.push({ id: array.mac, svg: switchSvg });
          setNodes(auxNodes);
          return array;
        }
      }
      if (array.tipo === "AP") {
        if (array.clientesap) {
          array.clientesap.forEach((index) => {
            const hijo = displayNodesAndLinks(index);
            if (hijo && array.mac && index.mac) {
              auxLinks.push({ source: array.mac, target: index.mac });
              setLinks(auxLinks);
            }
          });
          auxNodes.push({ id: array.mac, svg: apSvg });
          setNodes(auxNodes);
          return array;
        }
      }
      auxNodes.push({ id: array.mac, svg: clientSvg });
      setNodes(auxNodes);
      return array;
    }
    console.log("1", auxLinks);
    console.log("2", auxNodes);
    setLinks(auxLinks);
    setNodes(auxNodes);
    setShowGraph(true);
  };

  const circleLoading = (
    <div class="overlay">
      <CircularProgress className="loading-circle" />
    </div>
  );

  const handleShowButton = () => {
    console.log(nodes, links);
    if (nodes.length !== 0) {
      console.log("entro if");
      setIsLoading(true);

      // remove old nodes
      let auxNodes = nodes;
      let auxLinks = links;
      nodes.forEach((index) => {
        const findIndex = nodes.findIndex((el) => el === index);
        const id = index.id;
        auxLinks = auxLinks.filter((l) => l.source !== id && l.target !== id);
        auxNodes.splice(findIndex, 1);
      });
      //finish remove
      setLinks(auxLinks);
      setNodes(auxNodes);
      displayNodesAndLinks(data, selectedSwitch);

      setIsLoading(false);
    } else {
      console.log("entro else");
      displayNodesAndLinks(data, selectedSwitch);
    }
  };

  const handleRemoveButton = () => {
    let auxNodes = nodes;
    const id = nodes[0].id;
    auxNodes.splice(0, 1);
    let auxLinks = links.filter((l) => l.source !== id && l.target !== id);
    setLinks(auxLinks);
    setNodes(auxNodes);
    return auxLinks.length === 0 && auxNodes.length === 0;
  };

  const handleDropdownItemClick = (event) => {
    const selected = event.target.value;
    setSelectedSwitch(selected);
    // handleShowButton();
    if (nodes.length !== 0) {
      console.log("entro if");
      setIsLoading(true);

      // remove old nodes
      let auxNodes = nodes;
      let auxLinks = links;
      let flag = false;
      // while (!flag) {
      //   flag = handleRemoveButton();
      // }

      console.log("llego1");
      setLinks(auxLinks);
      setNodes(auxNodes);
      console.log("llego2");
      displayNodesAndLinks(data, selected);

      setIsLoading(false);
    } else {
      console.log("entro else");
      displayNodesAndLinks(data, selected);
    }
  };

  return (
    <div className="login-container">
      <div className="graph-container">
        <Dropdown
          isOpen={dropdownOpen}
          toggle={toggle}
          className="account-dropdown"
          direction="right"
        >
          <DropdownToggle caret>Seleccione dispositivo</DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Elegir MAC</DropdownItem>

            {data.map((index) => {
              return (
                <DropdownItem
                  onClick={handleDropdownItemClick}
                  value={index.mac}
                >
                  {index.mac}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
        <button
          // onClick={() => displayNodesAndLinks(data, selectedSwitch, true)}
          onClick={handleRemoveButton}
        >
          QUITAR 1 NODO
        </button>
        {pSelectedSwitch}
        {isLoading ? (
          circleLoading
        ) : (
          <>
            {console.log({ nodes: nodes, links: links })}
            {showGraph ? (
              <Graph
                id={"graph-id"} // id is mandatory
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
