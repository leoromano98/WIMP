import { useState, useEffect } from "react";
import "./Port.css";
import { UncontrolledAlert } from "reactstrap";

const Port = (props) => {
  var portCSS;
  if (props.portData) {
    if (props.isConnected) {
      portCSS = "port connected";
    } else {
      portCSS = "port";
    }
  }

  const handlePortClick = () => {
    props.onClick(props.portData, props.port);
  };

  return (
    <>
      {console.log("port", props)}
      {props.portData ? (
        <div
          id={"port-" + props.port}
          className={portCSS}
          onClick={handlePortClick}
        >
          {props.port}
        </div>
      ) : null}
    </>
    // <p>a</p>
  );
};

export default Port;
