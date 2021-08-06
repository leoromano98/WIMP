import { useState, useEffect } from "react";
import "./login.css";
import { getTokenApi, signInApi, setTokenApi, createUser } from "../../api/auth";
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

  const [inputsError, setInputsError] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const toggleRegistration = () => setModalRegistration(!modalRegistration);

  const [createSuccess, setCreateSuccess] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);

  const validateForm = () => {
    console.log(newEmail, newUser, newPassword);
    let userCheck = true;
    let emailCheck = true;
    let passwordCheck = true;
    let inputsCheck = true;

    // Todos los campos obligatorios:
    if (
      newEmail.length === 0 ||
      newUser.length === 0 ||
      newPassword.length === 0
    ) {
      inputsCheck = false;
      setInputsError(true);
    } else {
      setInputsError(false);
    }

    // Usuario > 3
    if (newUser.length < 4) {
      userCheck = false;
      setUserError(true);
    } else {
      setUserError(false);
    }

    // Email valido:
    if (!ValidateEmail(newEmail)) {
      emailCheck = false;
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    //Password >7
    if (newPassword.length < 8) {
      userCheck = false;
      passwordCheck = false;

      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (inputsCheck && userCheck && passwordCheck && emailCheck) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (userError) {
      console.log("user error!");
    }
    if (emailError) {
      console.log("email error!");
    }
    if (passwordError) {
      console.log("password error!");
    }
    if (inputsError) {
      console.log("inputs error!");
    }
    if(createSuccess){
      console.log('created new user!')
    }
  }, [userError, emailError, passwordError, inputsError]);

  const registrationClickHandler = () => {
    if (validateForm()) {
      var response = createUser(newEmail, newUser, newPassword);
      console.log(response)
      if(response.ok){
        alert('usuario creado!');
        setCreateSuccess(true);
      }
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

  const toggleNested = () => {
    setNestedModal(!nestedModal);
  }

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
      <ModalHeader toggle={toggleRegistration}>Crear Usuario</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup controlId="exampleForm.ControlInput1">
            <Label>Correo electronico</Label>
            <Input
              type="email"
              placeholder="wimp@wimp.com"
              onChange={handleNewEmailChange}
              className={emailError ? "input-error" : null}
            />
            {emailError ? (
              <div className="error-msg">Formato de correo invalido.</div>
            ) : null}
          </FormGroup>
          <FormGroup controlId="exampleForm.ControlInput1">
            <Label>Usuario</Label>
            <Input
              type="text"
              placeholder="WIMP"
              onChange={handleNewUserChange}
              className={userError ? "input-error" : null}
            />
            {userError ? (
              <div className="error-msg">
                El usuario debe contener al menos 4 caracteres.
              </div>
            ) : null}
          </FormGroup>
          <FormGroup controlId="exampleForm.ControlInput1">
            <Label>Contraseña</Label>
            <Input
              type="password"
              placeholder="*******"
              onChange={handleNewPasswordChange}
              className={passwordError ? "input-error" : null}
            />
            {passwordError ? (
              <div className="error-msg">
                La contraseña debe contener al menos 8 caracteres.
              </div>
            ) : null}
          </FormGroup>
        </Form>
        <Modal isOpen={createSuccess} toggle={toggleNested}>
            <ModalHeader>Nested Modal title</ModalHeader>
            <ModalBody>Stuff and things</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggleNested}>Done</Button>{' '}
              
            </ModalFooter>
          </Modal>
      </ModalBody>
      <ModalFooter className="modal-footer-container">
        {inputsError ? (
          <div className="error-msg">Todos los campos son obligatorios.</div>
        ) : null}

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
