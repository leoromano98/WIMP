import { useState } from "react";
import "./login.css";
import { getTokenApi, signInApi, setTokenApi } from "../../api/auth";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Alert,
  UncontrolledAlert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from "reactstrap";

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

const Login = ({ parentCallback }) => {
  localStorage.clear();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [newEmail, setNewEmail] = useState("");
  const [newUser, setNewUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showAlert, setShowAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const [modalRegistration, setModalRegistration] = useState(false);
  const [errorRegistration, setErrorRegistration] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const toggleRegistration = () => setModalRegistration(!modalRegistration);

  const registrationClickHandler = () => {
    console.log(newEmail, newUser, newPassword);
    setErrorRegistration("");
    setEmailError(false);
    setUserError(false);
    setPasswordError(false);
    if (
      newEmail.length === 0 ||
      newUser.length === 0 ||
      newPassword.length === 0
    ) {
      setErrorRegistration("Todos los campos son obligatorios.");
    }

    if (newUser.length < 4) {
      setUserError("El usuario debe contener al menos 4 caracteres.");
    }
    if (newPassword.length < 8) {
      setPasswordError("La contraseña debe contener al menos 8 caracteres.");
    }
    if (!ValidateEmail(newEmail)) {
      setEmailError("Formato de correo invalido.");
    }
    if(!emailError && !userError && !passwordError){
      alert("Usuario creado! (solo frontend)")
    }
  };

  const loginEnterHandler = (event) => {
    if (event.key === "Enter") {
      loginClickHandler();
    }
  };

  const loginClickHandler = async () => {
    setShowAlert(null);
    setLoading(true);
    var response = await signInApi(username, password);
    if (response.token) {
      setTokenApi(response.token);
      parentCallback(true);
    } else {
      setShowAlert(
        <UncontrolledAlert color="warning">
          {response.message}
        </UncontrolledAlert>
      );
    }
    setLoading(false);
  };

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const handleNewEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleNewUserChange = (event) => {
    setNewUser(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  let circleLoading = null;
  if (loading) {
    circleLoading = (
      <div class="overlay">
        <CircularProgress className="loading-circle" />
      </div>
    );
  }

  let registrationModal = (
    <Modal isOpen={modalRegistration} toggle={toggleRegistration}>
      <ModalHeader toggle={toggleRegistration}>Modal title</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup controlId="exampleForm.ControlInput1">
            <Label>Correo electronico</Label>
            <Input
              type="email"
              placeholder="wimp@wimp.com"
              onChange={handleNewEmailChange}
              className={emailError?"input-error":null}
            />
            <div className="error-msg">{emailError}</div>
          </FormGroup>
          <FormGroup controlId="exampleForm.ControlInput1">
            <Label>Usuario</Label>
            <Input
              type="text"
              placeholder="WIMP"
              onChange={handleNewUserChange}
              className={userError?"input-error":null}
            />
            <div className="error-msg">{userError}</div>
          </FormGroup>
          <FormGroup controlId="exampleForm.ControlInput1">
            <Label>Contraseña</Label>
            <Input
              type="password"
              placeholder="*******"
              onChange={handleNewPasswordChange}
              className={passwordError?"input-error":null}
            />
            <div className="error-msg">{passwordError}</div>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter className="modal-footer-container">
        <div className="error-msg">{errorRegistration}</div>
        <div className="btn-container">
          <Button color="danger" onClick={toggleRegistration}>
            Cancel
          </Button>
          <Button color="success" onClick={registrationClickHandler}>
            Aceptar
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );

  return (
    <div className="login-container">
      {showAlert}
      {circleLoading}
      {registrationModal}
      <div className="form-container" onKeyDown={loginEnterHandler}>
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
          <Button
            color="success"
            onClick={loginClickHandler}
            onKeyDown={() => loginEnterHandler()}
          >
            Ingresar
          </Button>
        </div>
        <div className="registration-container">
          <div className="registration-title">¿No tiene una cuenta?</div>
          <div className="registration-link" onClick={toggleRegistration}>
            Registrarse
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
