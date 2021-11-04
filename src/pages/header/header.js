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
import { isUserLogedApi, logoutApi, changePassword } from "../../api/auth";
import { BrowserRouter as Router, Redirect } from "react-router-dom";

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
  const toggleModal = () => setModalPassword(!modalPassword);

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

  const validateForm = () => {
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
    if (validateForm()) {
      var response = await changePassword(
        oldPassword,
        newPassword,
        newPasswordConfirm
      );
      console.log(response);
      if (response?.ok) {
        setShowAlert(true);
        toggleModal();
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

  let registrationModal = (
    <Modal isOpen={modalPassword} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Modificar contraseña</ModalHeader>
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
          <Button color="danger" onClick={toggleModal}>
            Cancel
          </Button>
          <Button color="success" onClick={changePasswordHandler}>
            Aceptar
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );

  return (
    <>
      {registrationModal}
      {showAlert ? (
        <UncontrolledAlert color="success" className="alert">
          Contraseña cambiada con exito!
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
                    onClick={() => {
                      toggleModal();
                    }}
                  >
                    Cambiar contraseña
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
          Home
        </a>
        {/* <a className="menu-item" href="/login">
          Login
        </a> */}
        <a className="menu-item" href="/map">
          Mapa
        </a>
        <a className="menu-item" href="/alerts">
          Alertas
        </a>
        <a className="menu-item" href="/anomalies">
          Anomalias
        </a>
        <a className="menu-item" href="/d3/1">
          D3 Graph
        </a>
        <a className="menu-item" href="/rankpackets">
          Ranking paquetes
        </a>
        {/* <div className="menu-item test" onClick={showAlarm}>
          Test alarma
        </div> */}
        <a className="menu-item" href="/accesspoints">
          Access Points
        </a>
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
