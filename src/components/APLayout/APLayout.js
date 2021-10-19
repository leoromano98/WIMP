import "./APLayout.css";
import apImage from "../../assets/img/ap.png";

const APLayout = (props) => {
  console.log("APLayout", props);

  return (
    <div className="ap-container">
      <img src={apImage} alt="AP" className="ap-img" />
      <div className="ap-model">
        <h3>{props.apData.model}</h3>
      </div>
      <div className="ap-name">
        <h3>{props.apData.name}</h3>
      </div>
    </div>
  );
};

export default APLayout;
