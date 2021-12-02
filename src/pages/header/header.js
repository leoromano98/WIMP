import "./header.css";
import { slide as Menu } from "react-burger-menu";
import { useState } from "react";
import logo from "../../assets/img/logoWIMP.png";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
import {
  isUserLogedApi,
  logoutApi,
  changePassword,
  createUser,
} from "../../api/auth";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [alarms, setAlarms] = useState([]);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [modalErrors, setModalErrors] = useState({});
  const [modalPassword, setModalPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showCreateUserAlert, setShowCreateUserAlert] = useState(false);
  const [createUserError, setCreateUserError] = useState(false);
  const toggleChangePassword = () => setModalPassword(!modalPassword);
  const [modalRegistration, setModalRegistration] = useState(false);
  const toggleRegistration = () => setModalRegistration(!modalRegistration);
  const [newEmail, setNewEmail] = useState("");
  const [newUser, setNewUser] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [inputsError, setInputsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleNested = () => {
    setNestedModal(!nestedModal);
  };

  function showSettings(event) {
    event.preventDefault();
  }

  var user = isUserLogedApi();
  var username = user ? user.username : "Invitado";

  const showAlarm = () => {
    const newAlarm = (
      <UncontrolledAlert color="danger" className="alert-style">
        I am an alert and I can be dismissed!
      </UncontrolledAlert>
    );
    setAlarms([...alarms, newAlarm]);
  };

  var showAlarms = alarms.map((index) => {
    return <>{index}</>;
  });

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleNewPasswordConfirmChange = (event) => {
    setNewPasswordConfirm(event.target.value);
  };

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  const registrationClickHandler = async () => {
    setLoading(true);
    if (validateNewUserForm()) {
      var response = await createUser(newEmail, newUser, newPassword);
      setShowCreateUserAlert(true)
      if (response) {
        setCreateUserError(false);
        toggleRegistration();
      } else {
        setCreateUserError(true);
      }
    }
    setLoading(false);
  };

  const validateNewUserForm = () => {
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

  const validateChangePasswordForm = () => {
    let errors = {
      oldPassword: false,
      newPassword: false,
      newPasswordConfirm: false,
      equalPassword: false,
      inputsCheck: false,
      serverErrors: false,
    };

    // Todos los campos obligatorios:
    if (
      newPassword.length === 0 ||
      oldPassword.length === 0 ||
      newPasswordConfirm.length === 0
    ) {
      errors.inputsCheck = true;
    }
    if (newPassword !== newPasswordConfirm) {
      errors.equalPassword = true;
    }

    //Password >7
    if (oldPassword.length < 8) {
      errors.oldPassword = true;
    }

    //Password >7
    if (newPassword.length < 8) {
      errors.newPassword = true;
    }

    //Password >7
    if (newPasswordConfirm.length < 8) {
      errors.newPasswordConfirm = true;
    }

    setModalErrors(errors);
    console.log(errors);
    const hasError = Object.keys(errors).some((k) => errors[k]);
    console.log("hasError", hasError);

    if (hasError) {
      return false;
    }
    return true;
  };

  const changePasswordHandler = async () => {
    if (validateChangePasswordForm()) {
      var response = await changePassword(
        oldPassword,
        newPassword,
        newPasswordConfirm
      );
      console.log(response);
      if (response?.ok) {
        setShowAlert(true);
        toggleChangePassword();
        logoutApi();
        const timer = setTimeout(() => {
          window.location.reload();
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        const auxErrors = modalErrors;
        auxErrors.serverError = true;
        setModalErrors(auxErrors);
      }
    }
  };

  const handleNewEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleNewUserChange = (event) => {
    setNewUser(event.target.value);
  };

  let circleLoading = null;
  if (loading) {
    circleLoading = (
      <div class="overlay-createuser">
        <CircularProgress className="loading-circle" />
      </div>
    );
  }

  let changePasswordModal = (
    <Modal isOpen={modalPassword} toggle={toggleChangePassword}>
      <ModalHeader toggle={toggleChangePassword}>
        Modificar contraseña
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup controlId="exampleForm.ControlInput1">
            <Label>Contraseña actual</Label>
            <Input
              type="password"
              placeholder="*******"
              onChange={handleOldPasswordChange}
              className={
                modalErrors.oldPassword || modalErrors.serverError
                  ? "input-error"
                  : null
              }
            />
            {modalErrors.oldPassword ? (
              <div className="error-msg">
                La contraseña debe contener al menos 8 caracteres.
              </div>
            ) : null}
            {modalErrors.serverError ? (
              <div className="error-msg">
                La contraseña actual es incorrecta.
              </div>
            ) : null}
          </FormGroup>
          <FormGroup controlId="exampleForm.ControlInput1">
            <Label>Nueva contraseña</Label>
            <Input
              type="password"
              placeholder="*******"
              onChange={handleNewPasswordChange}
              className={
                modalErrors.newPassword || modalErrors.equalPassword
                  ? "input-error"
                  : null
              }
            />
            {modalErrors.newPassword ? (
              <div className="error-msg">
                La contraseña debe contener al menos 8 caracteres.
              </div>
            ) : null}
          </FormGroup>
          <FormGroup controlId="exampleForm.ControlInput1">
            <Label>Confirmar nueva contraseña</Label>
            <Input
              type="password"
              placeholder="*******"
              onChange={handleNewPasswordConfirmChange}
              className={
                modalErrors.newPasswordConfirm || modalErrors.equalPassword
                  ? "input-error"
                  : null
              }
            />
            {modalErrors.newPassword ? (
              <div className="error-msg">
                La contraseña debe contener al menos 8 caracteres.
              </div>
            ) : null}
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter className="modal-footer-container">
        {modalErrors.inputsCheck ? (
          <div className="error-msg">Todos los campos son obligatorios.</div>
        ) : null}
        {modalErrors.equalPassword ? (
          <div className="error-msg">Las contraseñas no son iguales.</div>
        ) : null}
        <div className="btn-container">
          <Button color="danger" onClick={toggleChangePassword}>
            Cancel
          </Button>
          <Button color="success" onClick={changePasswordHandler}>
            Aceptar
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );

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
            <Button color="primary" onClick={toggleNested}>
              Done
            </Button>{" "}
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
    <>
      {changePasswordModal}
      {registrationModal}
      {circleLoading}
      {showAlert ? (
        <UncontrolledAlert color="success" className="registration-alert alert">
          Contraseña cambiada con exito!
        </UncontrolledAlert>
      ) : null}
      {showCreateUserAlert ? (
        <UncontrolledAlert color={createUserError?"danger":"success"} className="registration-alert alert">
          {createUserError?"Correo o usuario existente.":"Usuario creado con exito"}
        </UncontrolledAlert>
      ) : null}
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo"></img>
        </div>
        <div className="account-container">
          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            className="account-dropdown"
            direction="right"
          >
            <DropdownToggle caret>
              <AccountCircleIcon />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>{username}</DropdownItem>
              {user ? (
                <>
                  <DropdownItem
                    disabled={username !== "jbilbao"}
                    onClick={() => {
                      toggleRegistration();
                    }}
                  >
                    Crear usuario
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      toggleChangePassword();
                    }}
                  >
                    Modificar contraseña
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      logoutApi();
                      window.location.reload();
                    }}
                  >
                    Cerrar Sesion
                  </DropdownItem>
                </>
              ) : null}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div class="alarms-container">{showAlarms}</div>
      <Menu id={"sidebar"} className={"my-menu"}>
        <a className="menu-item" href="/landing">
          Inicio
        </a>
        <a className="menu-item" href="/rankpackets">
          Captura de paquetes
        </a>
        <a className="menu-item" href="/map">
          Mapa de switches
        </a>
        <a className="menu-item" href="/d3">
          Visor de topología
        </a>
        <a className="menu-item" href="/accesspoints">
          Lista de access points
        </a>
        <a className="menu-item" href="/alerts">
          Lista de alertas
        </a>
        <a className="menu-item" href="/anomalies">
          Lista de anomalías
        </a>
        {/* <div className="menu-item test" onClick={showAlarm}>
          Test alarma
        </div> */}
        <a className="menu-item" href="/clients">
          Ubicar cliente
        </a>
        {/* <a onClick={showSettings} className="menu-item--small" href="">
          Settings
        </a> */}
      </Menu>
    </>
  );
};

export default Header;
