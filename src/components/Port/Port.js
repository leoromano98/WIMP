import { useState, useEffect } from "react";
import "./Port.css";
import { UncontrolledAlert } from "reactstrap";

const Port = (props) => {
  var portCSS;
  if (props.portData) {
    if (props.portData.isConnected) {
      portCSS = "port connected";
    } else {
      portCSS = "port";
    }
  }

  const handlePortClick = () => {
    props.onClick(props.portData);
  };

  return (
    <>
      {props.portData ? (
        <div
          id={"port-" + props.portData.port}
          className={portCSS}
          onClick={handlePortClick}
        >
          {props.portData.port}
        </div>
      ) : null}
    </>
    // <p>a</p>
  );
};

export default Port;
