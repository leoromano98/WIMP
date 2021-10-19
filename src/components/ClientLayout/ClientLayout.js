import "./ClientLayout.css";
import apImage from "../../assets/img/ap.png";

const ClientLayout = (props) => {
  console.log("ClientLayout", props);

  return (
    <div className="client-container">
      <div className="monitor">
        <div className="client-mac">
          <h3>
            <b>{props.clientData.mac}</b>
          </h3>
        </div>
        <div className="client-ip">
          <h3>{props.clientData.ip}</h3>
        </div>
      </div>
      <div className="keyboard" />
    </div>
  );
};

export default ClientLayout;
