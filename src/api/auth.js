import { API_HOST, TOKEN } from "../utils/constant";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import axios from "axios";

export function deactivateSwitch() {
  var token = getTokenApi();

  var data = {
    idSwitch: "6109466ed13c2240886c75c4",
  };

  const url = `${API_HOST}/switches/desactivar`;
  console.log(token);

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
        return response;
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function activateSwitch() {
  var token = getTokenApi();

  var data = {
    idSwitch: "610409d67d4b4bdbf3b636cc",
  };

  const url = `${API_HOST}/switches/activar`;
  console.log(token);

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
        return response;
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function createUser(email, usuario, password) {
  var token = getTokenApi();

  var data = {
    email: email,
    usuario: usuario,
    password: password,
  };

  const url = `${API_HOST}/usuarios/crear`;
  console.log(token);

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
        return response;
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function createSwitch(newSwitch) {
  var token = getTokenApi();

  // var data = {
  //   lat: 111,
  //   lng: 222,
  //   nombre: "Test",
  //   modelo: "Test",
  // };

  const url = `${API_HOST}/switches/crear`;
  console.log(newSwitch);

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newSwitch),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
        return response;
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function modifySwitch(data) {
  var token = getTokenApi();

  var body = {
    idSwitch: data._id,
    lat: data.lat,
    lng: data.lng,
    nombre: data.nombre,
    modelo: data.modelo,
  };

  if (data._pid) {
    body.idPadre = data._pid;
  }

  const url = `${API_HOST}/switches/modificar`;
  console.log(token);

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
        return response;
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function deleteSwitch() {
  var token = getTokenApi();
  var idSwitch = "610409a57d4b4bdbf3b636cb";
  const url = `${API_HOST}/switches/borrar?idSwitch=` + idSwitch;
  console.log(token);

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response.json());
        return response.json();
      }
    })
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export function getTopology() {
  var token = getTokenApi();
  const url = `${API_HOST}/topologia`;
  console.log(token);

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function signUpApi(user) {
  const url = `${API_HOST}/usuarios/iniciar-sesion`;
  const userTemp = {
    ...user,
    email: user.email.toLowerCase(),
  };
  delete userTemp.repeatPassword;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userTemp),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function signInApi(user, password) {
  const url = `${API_HOST}/usuarios/iniciar-sesion`;

  const data = {
    usuario: user,
    password: password,
  };

  const params = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      console.log("aqui: ", response);
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { message: "Usuario o contraseña incorrectos" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function setTokenApi(token) {
  localStorage.setItem(TOKEN, token);
}

export function getTokenApi() {
  return localStorage.getItem(TOKEN);
}

export function logoutApi() {
  localStorage.removeItem(TOKEN);
}

export function isUserLogedApi() {
  const token = getTokenApi();

  if (!token) {
    logoutApi();
    return null;
  }
  if (isExpired(token)) {
    logoutApi();
  }
  return jwtDecode(token);
}

function isExpired(token) {
  const { exp } = jwtDecode(token);
  const expire = exp * 1000;
  const timeout = expire - Date.now();
  console.log(timeout);
  if (timeout < 0) {
    return true;
  }
  return false;
}

// export function handleSend(e) {
//   e.preventDefault();

//   console.log("handleSendMail");

//   axios
//     .get("http://localhost:3001/api/form")
//     .then((res) => {
//       console.log("[GET]", res);
//     })
//     .catch(() => {
//       console.log("F");
//     });

//   axios
//     .post("http://localhost:3001/api/form", "data")
//     .then((res) => {
//       console.log("[POST]", res);
//     })
//     .catch(() => {
//       console.log("F");
//     });
// }

export async function handleSend(e) {
  try {
    await axios.post("http://localhost:3000/send-email", {
      text: "bokee",
    });
  } catch (error) {
    console.error("[handleSend]:", error);
  }
}

export async function getRankingPackets() {
  var token = getTokenApi();

  const url = `${API_HOST}/paquetes/srcmac-emision`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export async function getRankingPacketsByAppProtocol() {
  var token = getTokenApi();

  const url = `${API_HOST}/paquetes/protoapp-emision`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export async function getRankingPacketsByTransportProtocol() {
  var token = getTokenApi();

  const url = `${API_HOST}/paquetes/prototp-emision`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export async function getRankingPacketsByNetworkProtocol(MAC) {
  var token = getTokenApi();

  const url = `${API_HOST}/paquetes/protoip-emision`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export async function getPacketsByMAC(MAC) {
  var token = getTokenApi();

  const url = `${API_HOST}/paquetes/srcmac-detalle`;
  const body = {
    Mac: MAC,
  };
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    // body: (body),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        // return response.json();
        console.log("BY MAC", response.json());
      }
    })
    .then((result) => {
      console.log("BY MAC", result);

      return result;
    })
    .catch((err) => {
      console.log("BY MAC", err);

      return err;
    });
}

export async function getAlertas() {
  var token = getTokenApi();

  const url = `${API_HOST}/alertas`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export async function getAlertasRanking() {
  var token = getTokenApi();

  const url = `${API_HOST}/alertas/ranking`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export async function getAnomalias() {
  var token = getTokenApi();

  const url = `${API_HOST}/anomalias`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export async function getAnomaliasRanking() {
  var token = getTokenApi();

  const url = `${API_HOST}/anomalias/ranking`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export async function listarSwitches() {
  var token = getTokenApi();

  const url = `${API_HOST}/switches`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export async function ubicarSwitch(mac, lat, lng) {
  var token = getTokenApi();

  const url = `${API_HOST}/switches/ubicar`;
  const body = {
    mac: mac,
    lat: lat,
    lng: lng,
  };
  const params = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export const formatDate = (pDate) => {
  console.log("params", pDate);
  const date = new Date(pDate);
  console.log("date", date);
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const anio = date.getFullYear();
  const horas = date.getHours();
  const minutos = date.getMinutes();
  const segundos = date.getSeconds();
  return (
    dia +
    "/" +
    mes +
    "/" +
    anio +
    " - " +
    horas +
    ":" +
    minutos +
    ":" +
    segundos
  );
};

export async function listTopology() {
  var token = getTokenApi();

  const url = `${API_HOST}/topologia`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}