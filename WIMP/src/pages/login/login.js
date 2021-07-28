import { useState } from 'react';
import "./login.css";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { Button } from "reactstrap";

const Login = () => {
  localStorage.clear();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  const [token, setToken] = useState(false);
  const [user, setUser] = useState('');

  const login = ()=>{
    fetch('https://jsonplaceholder.typicode.com/posts',{
      method:"POST",
      body:JSON.stringify({
        username: username,
        password: password
      }),
      headers:{
        'Content-type': 'application/json; charset=UTF-8', 
      }
    }).then((response)=>{
      response.json().then((result)=>{
        console.log("result", result);
          localStorage.setItem('login',JSON.stringify({
            login: true,
            token: result.username+"."+result.password
        }))
      })
    })
    console.log(localStorage.getItem('login'))
  }



  // const login2 = ()=>{
  //   fetch('https://jsonplaceholder.typicode.com/posts')
  // .then(response => response.json())
  // .then(json => {
  //   console.log(json);
  //   localStorage.setItem('login',JSON.stringify({
  //     login: true,
  //     token: json.id
  // }))
  // })}

  const loginClickHandler = () => {
    // login2();
    login();

    // if(username==='leoromano' && password==='leoromano'){
    //   alert("Logueado como leoromano");
    //   setToken(true);
    //   setUser(username);
    // }
    // else{
    //   alert("Usuario y/o contrase;a incorrectos");
    // }
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
