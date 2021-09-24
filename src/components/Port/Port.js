import { useState, useEffect } from "react";
import "./Port.css";
import { UncontrolledAlert } from "reactstrap";

const Port = (props) => {
  console.log("Port", props.portData);
  var portCSS;
  if (props.portData) {
    if (props.portData.isConnected) {
      portCSS = "port connected";
    } else {
      portCSS = "port";
    }
  }

  return (
    <>
      {props.portData ? (
        <div id={"port-" + props.portData.port} className={portCSS}>
          {props.portData.port}
        </div>
      ) : null}
    </>
    // <p>a</p>
  );
};

export default Port;
