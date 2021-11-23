import React, { useState } from "react";
import "./landing.css";
import { logoutApi, isUserLogedApi } from "../../api/auth";
import BackHome from "../../components/BackHome/BackHome";

const Landing = () => {
  const user = isUserLogedApi();
  const username = user ? user.username : "Invitado";
  return (
    <>
      <BackHome />
      <div className="title-container">
        <h1>
          Bienvenido <b>{username}</b> !
        </h1>
        <h2>Seleccione una opcion del menu superior izquierdo</h2>
      </div>
    </>
  );
};

export default Landing;
