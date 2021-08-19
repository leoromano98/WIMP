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
  automaticRearrangeAfterDropNode: false,
  collapsible: false,
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
    color: "#ff0000",
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
  window.alert(`Clicked node ${nodeId}`);
};

const onClickLink = function (source, target) {
  window.alert(`Clicked link between ${source} and ${target}`);
};

const D3 = () => {
  // const loginClickHandler = () => {
  //   alert("user: " + username + " , pass: " + password);
  // };

  // const userNameChangeHandler = (event) => {
  //   setUserName(event.target.value);
  // };

  // const passwordChangeHandler = (event) => {
  //   setPassword(event.target.value);
  // };

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getData() {
    var newNodes = await getTopology();
    newNodes.map((s) => {
      if (s.hasOwnProperty("_id")) {
        s.id = s._id;
        delete s._id;
      }
      return s;
    });
    if (newNodes !== undefined) {
      var newLinks = [];
      newNodes.forEach((index) => {
        if (index._pid !== undefined) {
          newLinks.push({ source: index.id, target: index._pid });
        }
      });
      var newData = {
        nodes: newNodes,
        links: newLinks,
      };
      setData(newData);
    }
  }

  useEffect(() => {
    let mounted = true;
    getData().then((items) => {
      if (mounted && items !== undefined) {
        setData(items);
      }
    });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    if (data.length !== 0 || data !== undefined) {
      setIsLoading(false);
    }
  }, [data]);

  const circleLoading = (
    <div class="overlay">
      <CircularProgress className="loading-circle" />
    </div>
  );

  return (
    <div className="login-container">
      <div className="graph-container">
        {console.log("data: ", data, " ", new Date())}
        {isLoading ? (
          circleLoading
        ) : (
          <Graph
            id="graph-id" // id is mandatory
            data={data}
            config={myConfig}
            onClickNode={onClickNode}
            onClickLink={onClickLink}
          />
        )}
      </div>
    </div>
  );
};

export default D3;
