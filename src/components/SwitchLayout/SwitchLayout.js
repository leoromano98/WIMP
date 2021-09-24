import { useState, useEffect } from "react";
import "./SwitchLayout.css";
import { UncontrolledAlert } from "reactstrap";
import Port from "../../components/Port/Port";

const SwitchLayout = (props) => {
  console.log("SwitchLayout", props);
  const [portData, setPortData] = useState(null);
  var ports = [];

  useEffect(() => {
    for (var i = 0; i <= props.switchData.length; i++) {
      ports.push(
        <div className="ports-column">
          <Port portData={props.switchData[i]} />
          <div class="hidden">{i++}</div>
          <Port portData={props.switchData[i]} />
        </div>
      );
    }
    setPortData(ports);
  }, []);

  return (
    <div className="switch-container">
      {portData ? <div className="ports-container">{portData}</div> : null}
    </div>
  );
};

export default SwitchLayout;
