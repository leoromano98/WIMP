// Documentacion D# graph
// https://www.npmjs.com/package/react-d3-graph

import { useState, useEffect } from "react";
import "./d3.css";
import { Graph } from "react-d3-graph";
import { getTopology } from "../../api/auth";
import CircularProgress from "@material-ui/core/CircularProgress";

// graph payload (with minimalist structure)
const data = {
  nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
  links: [
    { source: "Harry", target: "Sally" },
    { source: "Harry", target: "Alice" },
  ],
};

// the graph configuration, just override the ones you need
// const myConfig = {
//   nodeHighlightBehavior: true,
//   node: {
//     color: "lightgreen",
//     size: 120,
//     highlightStrokeColor: "blue",
//   },
//   link: {
//     highlightColor: "lightblue",
//   },
// };

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

// const myConfig = {
//   automaticRearrangeAfterDropNode: false,
//   collapsible: true,
//   directed: false,
//   focusAnimationDuration: 0.75,
//   focusZoom: 1,
//   freezeAllDragEvents: false,
//   height: 400,
//   highlightDegree: 1,
//   highlightOpacity: 1,
//   linkHighlightBehavior: true,
//   maxZoom: 5,
//   minZoom: 0.5,
//   nodeHighlightBehavior: true,
//   panAndZoom: false,
//   staticGraph: false,
//   staticGraphWithDragAndDrop: false,
//   width: 800,
//   d3: {
//     alphaTarget: 0.05,
//     gravity: -100,
//     linkLength: 100,
//     linkStrength: 1,
//     disableLinkForce: false,
//   },
//   node: {
//     color: "#ff0000",
//     fontColor: "black",
//     fontSize: 12,
//     fontWeight: "normal",
//     highlightColor: "SAME",
//     highlightFontSize: 16,
//     highlightFontWeight: "true",
//     highlightStrokeColor: "SAME",
//     highlightStrokeWidth: "SAME",
//     labelProperty: "mac",
//     mouseCursor: "pointer",
//     opacity: 1,
//     renderLabel: true,
//     size: 200,
//     strokeColor: "none",
//     strokeWidth: 1.5,
//     svg: "",
//     symbolType: "circle",
//   },
//   link: {
//     color: "#d3d3d3",
//     fontColor: "black",
//     fontSize: 8,
//     fontWeight: "normal",
//     highlightColor: "SAME",
//     highlightFontSize: 8,
//     highlightFontWeight: "normal",
//     labelProperty: "label",
//     mouseCursor: "pointer",
//     opacity: 1,
//     renderLabel: false,
//     semanticStrokeWidth: false,
//     strokeWidth: 1.5,
//     markerHeight: 6,
//     markerWidth: 6,
//     strokeDasharray: 0,
//     strokeDashoffset: 0,
//     strokeLinecap: "butt",
//   },
// };

const onClickNode = function (nodeId) {
  console.log(`Clicked node ${nodeId}`);
};

const onClickLink = function (source, target) {
  console.log(`Clicked link between ${source} and ${target}`);
};

const D3 = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getData() {
    var newNodes = await getTopology();
    // while (newNodes === undefined) {}
    // newNodes.map((s) => {
    //   if (s.hasOwnProperty("_id")) {
    //     s.id = s._id;
    //     delete s._id;
    //   }
    //   return s;
    // });
    // if (newNodes !== undefined) {
    //   var newLinks = [];
    //   newNodes.forEach((index) => {
    //     if (index._pid !== undefined) {
    //       newLinks.push({ source: index.id, target: index._pid });
    //     }
    //   });
    //   var newData = {
    //     nodes: newNodes,
    //     links: newLinks,
    //   };
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
    }
  }, [data]);

  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  // const displayNodesAndLinks = (array) => {
  //   console.log("!", array, array instanceof Array);
  //   const auxNodes = nodes;
  //   const auxLinks = links;
  //   if (
  //     !(array instanceof Array) &&
  //     (!("ports" in array) || !("clientesap" in array))
  //   ) {
  //     console.log("1");
  //     auxNodes.push(array);
  //     setNodes(auxNodes);
  //     return array;
  //   }
  //   array.forEach((index) => {
  //     console.log("!!", index, index instanceof Array);
  //     if (
  //       !(index instanceof Array) &&
  //       !("ports" in index) &&
  //       !("clientesap" in index)
  //     ) {
  //       console.log("2");
  //       auxNodes.push(index);
  //       auxLinks.push({ source: array, target: index });
  //       setNodes(auxNodes);
  //       setLinks(auxLinks);
  //       return null;
  //     }
  //     console.log("hijooo", index);
  //     const hijo = displayNodesAndLinks(index);
  //     if (hijo) {
  //       auxNodes.push(index);
  //       auxLinks.push({ source: array, target: index });
  //       setNodes(auxNodes);
  //       setLinks(auxLinks);
  //     }
  //   });
  //   auxNodes.push(array);
  //   setNodes(auxNodes);
  //   console.log("nodes", nodes);
  //   console.log("links", links);
  //   return null;
  // };

  const displayNodesAndLinks = (array) => {
    console.log("!", array);
    const auxNodes = nodes;
    const auxLinks = links;
    if (array instanceof Array) {
      console.log("isarray");
      array.forEach((index) => {
        const hijo = displayNodesAndLinks(index);
        if (hijo && array.mac && index.mac) {
          auxLinks.push({ source: array.mac, target: index.mac });
          setLinks(auxLinks);
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

  return (
    <div className="login-container">
      <div className="graph-container">
        {console.log(data)}
        <button onClick={() => displayNodesAndLinks(data)}>ARMAR NODOS</button>
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
