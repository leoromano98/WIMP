import { useState, useEffect } from "react";
import "./SwitchLayout.css";
import Port from "../../components/Port/Port";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";

const SwitchLayout = (props) => {
  console.log("SwitchLayout", props);
  const [portData, setPortData] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [clickedPort, setClickedPort] = useState(null);

  const toggle = () => setPopoverOpen(!popoverOpen);
  var ports = [];

  const handlePortClick = (data) => {
    setClickedPort(data);
    toggle();
  };

  useEffect(() => {
    for (var i = 0; i < props.switchData.length; i++) {
      ports.push(
        <div className="ports-column">
          {console.log("props", props.switchData[i].port)}
          <Port
            id={"port-" + props.switchData[i].port}
            portData={props.switchData[i]}
            onClick={handlePortClick}
          />
          <div class="hidden">{i++}</div>
          <Port
            id={"port-" + props.switchData[i].port}
            portData={props.switchData[i]}
            onClick={handlePortClick}
          />
        </div>
      );
    }
    setPortData(ports);
  }, []);

  return (
    <div className="switch-container">
      <h3>{props.name}</h3>
      {portData ? <div className="ports-container">{portData}</div> : null}
      {popoverOpen ? (
        <Popover
          placement="bottom"
          isOpen={popoverOpen}
          target={"port-" + clickedPort?.port}
          toggle={toggle}
          trigger="legacy"
        >
          <PopoverHeader>Puerto {clickedPort?.port}</PopoverHeader>
          <PopoverBody>
            IP: {clickedPort?.ip}
            <br />
            MAC: {clickedPort?.mac}
            <br />
          </PopoverBody>
        </Popover>
      ) : null}
    </div>
  );
};

export default SwitchLayout;
