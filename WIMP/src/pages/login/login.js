import { useState } from "react";
import "./login.css";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { Button } from "reactstrap";
import { getTokenApi, signInApi, setTokenApi } from "../../api/auth";
import { Alert } from "reactstrap";

const Login = ({ parentCallback }) => {
  localStorage.clear();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(null);

  const loginClickHandler = async () => {
    setShowAlert(null);
    var response = await signInApi(username, password);
    if (response.token) {
      setTokenApi(response.token);
      parentCallback(true);
    } else {
      setShowAlert(
        <Alert color="warning">{response.message}</Alert>
      );
    }
  };

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="login-container">
      {showAlert}
      <div className="form-container">
        <h1 className="form-title">Iniciar Sesión</h1>
        <InputGroup className="input-container">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>@</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="username" onChange={userNameChangeHandler} />
        </InputGroup>
        <InputGroup className="input-container">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>*</InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="password"
            type="password"
            onChange={passwordChangeHandler}
          />
        </InputGroup>
        <div className="buttons-container">
          <Button color="success" onClick={loginClickHandler}>
            Ingresar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
