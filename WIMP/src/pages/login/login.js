import { useState } from 'react';
import "./login.css";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { Button } from "reactstrap";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  


  const loginClickHandler = () => {
    alert("user: " + username + " , pass: " + password);
  };

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };
  
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h1 className="form-title">Iniciar Sesión</h1>
        <InputGroup className="input-container">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>@</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="username" onChange={userNameChangeHandler}/>
        </InputGroup>
        <InputGroup className="input-container">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>*</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="password" type="password" onChange={passwordChangeHandler}/>
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
