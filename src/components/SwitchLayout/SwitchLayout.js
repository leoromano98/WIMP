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

  const handlePortClick = (data, port) => {
    data.port = port;
    setClickedPort(data);
    console.log(data);
    toggle();
  };

  // useEffect(() => {
  //   for (var i = 0; i < props.switchData.length; i++) {
  //     ports.push(
  //       <div className="ports-column">
  //         {console.log("props", props.switchData[i].port)}
  //         <Port
  //           id={"port-" + props.switchData[i].port}
  //           portData={props.switchData[i]}
  //           onClick={handlePortClick}
  //         />
  //         <div class="hidden">{i++}</div>
  //         <Port
  //           id={"port-" + props.switchData[i].port}
  //           portData={props.switchData[i]}
  //           onClick={handlePortClick}
  //         />
  //       </div>
  //     );
  //   }
  //   setPortData(ports);
  // }, []);

  useEffect(() => {
    if (props.isTopology) {
      let numberPorts;
      console.log("COUNTRY", props);
      switch (props.switchData.model) {
        case "US48":
          numberPorts = 52;
          break;
        case "USXG":
          numberPorts = 16;
          break;
        case "US24P250":
          numberPorts = 26;
          break;
        case "US24":
          numberPorts = 26;
          break;
        default:
          numberPorts = 26;
          break;
      }
      const findIndex = props.switchData.ports.findIndex(
        (index) => index.num === props.port
      );
      console.log("index bro", findIndex);
      for (var i = 1; i <= numberPorts; i++) {
        console.log("check", props.switchData.ports[i]?.num, i);
        ports.push(
          <div className="ports-column">
            {i === props.port ? (
              <Port
                id={"port-" + i}
                portData={props.switchData}
                onClick={handlePortClick}
                isConnected={true}
                port={i}
              />
            ) : (
              <Port
                id={"port-" + i}
                portData={{ ip: "", mac: "" }}
                onClick={handlePortClick}
                isConnected={false}
                port={i}
              />
            )}
            <div class="hidden">{i++}</div>
            {i === props.port ? (
              <Port
                id={"port-" + i}
                portData={props.switchData}
                onClick={handlePortClick}
                isConnected={true}
                port={i}
              />
            ) : (
              <Port
                id={"port-" + i}
                portData={{ ip: "", mac: "" }}
                onClick={handlePortClick}
                isConnected={false}
                port={i}
              />
            )}
          </div>
        );
      }
    }

    // for (var i = 0; i < props.switchData.length; i++) {
    //   ports.push(
    //     <div className="ports-column">
    //       {console.log("props", props.switchData[i].port)}
    //       <Port
    //         id={"port-" + props.switchData[i].port}
    //         portData={props.switchData[i]}
    //         onClick={handlePortClick}
    //       />
    //       <div class="hidden">{i++}</div>
    //       <Port
    //         id={"port-" + props.switchData[i].port}
    //         portData={props.switchData[i]}
    //         onClick={handlePortClick}
    //       />
    //     </div>
    //   );
    // }
    setPortData(ports);
  }, []);

  return (
    <div className="switch-container">
      <h3>
        {props.switchData.name} ({props.switchData.model})
      </h3>
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
