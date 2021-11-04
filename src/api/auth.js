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
  console.log('params', pDate)
  const date = new Date(pDate);
  console.log('date', date)
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

export const auxTopology = {
  _id: { $oid: "6161a9cb56963dbd0c0118a3" },
  ident: 27017,
  netsws: {
    netsws: [
      {
        cpu: 78,
        temp: 65,
        uptime: 517848,
        mem: 55,
        ip: "10.10.1.102",
        mac: "b4:fb:e4:2f:c0:34",
        model: "US48",
        name: "FACET-MAINSW-BLOCK4-P1",
        version: "5.64.8.13083",
        timestamp: { $date: "2021-10-12T14:05:00.053Z" },
        ports: [
          {
            num: 52,
            mac: "18:e8:29:56:6a:53",
            ip: "172.16.0.131",
            name: "FACET-LAB.SUELOS",
            model: "U7MSH",
            uptime: 201752,
            cpu: 10,
            mem: 63,
            clientesap: [
              { mac: "48:c7:96:28:1d:93", ip: "172.16.27.149" },
              { mac: "42:7a:63:df:55:1b", ip: "172.16.11.71" },
              { mac: "7c:2a:31:fd:1e:48", ip: "172.16.21.94" },
              { mac: "92:39:51:84:90:a1", ip: "172.16.9.172" },
              { mac: "c0:25:67:b1:22:a1", ip: "172.16.20.194" },
              { mac: "e2:00:98:3d:ef:35", ip: "172.16.20.24" },
            ],
            tipo: "AP",
          },
          {
            num: 48,
            mac: "78:8a:20:26:ae:ba",
            ip: "172.16.0.103",
            name: "FACET-BLOCK4-P1-SEC.CIVIL",
            model: "U7MSH",
            uptime: 201767,
            cpu: 13,
            mem: 65,
            clientesap: [
              { mac: "c8:f3:19:36:ec:8e", ip: "172.16.6.251" },
              { mac: "86:34:0b:5c:4b:8a", ip: "172.16.18.248" },
              { mac: "14:56:8e:92:0c:73", ip: "172.16.29.55" },
              { mac: "d4:38:9c:b6:56:67", ip: "172.16.11.177" },
              { mac: "30:6a:85:70:63:f4", ip: "172.16.13.70" },
              { mac: "fe:45:cc:9b:32:65", ip: "172.16.28.109" },
              { mac: "d6:95:01:60:ec:c3", ip: "172.16.6.91" },
              { mac: "c8:c7:50:75:7e:dd", ip: "172.16.6.219" },
            ],
            tipo: "AP",
          },
          {
            num: 49,
            mac: "78:8a:20:26:b5:e0",
            ip: "172.16.0.150",
            name: "FACET-IESTRUCTURAS",
            model: "U7MSH",
            uptime: 201739,
            cpu: 11,
            mem: 63,
            clientesap: [{ mac: "02:83:9c:27:23:37", ip: "172.16.4.77" }],
            tipo: "AP",
          },
          {
            num: 4,
            mac: "78:8a:20:26:b6:6e",
            ip: "172.16.0.153",
            name: "FACET-BLOCK4-P4",
            model: "U7MSH",
            uptime: 201787,
            cpu: 7,
            mem: 63,
            clientesap: [
              { mac: "34:de:1a:e1:0c:4e", ip: "172.16.19.175" },
              { mac: "84:a6:c8:8f:9b:b6", ip: "172.16.18.10" },
              { mac: "30:6a:85:7a:fc:1c", ip: "172.16.6.89" },
            ],
            tipo: "AP",
          },
          {
            num: 52,
            mac: "78:8a:20:26:b7:7f",
            ip: "172.16.0.130",
            name: "FACET-LAB.ENSAYO-MATERIALES",
            model: "U7MSH",
            uptime: 201753,
            cpu: 14,
            mem: 65,
            clientesap: [
              { mac: "e2:9c:f5:60:cf:93", ip: "172.16.21.78" },
              { mac: "94:2d:dc:99:44:e4", ip: "172.16.30.152" },
              { mac: "18:5e:0f:ba:c2:cd", ip: "172.17.1.109" },
            ],
            tipo: "AP",
          },
          { num: 51, mac: "b2:75:c1:cc:91:bf" },
          { num: 52, mac: "bc:5f:f4:d4:90:82", ip: "10.10.10.1" },
          { num: 50, mac: "00:08:54:69:a4:d3", ip: "10.10.11.190" },
          { num: 49, mac: "00:19:db:d5:c4:ee", ip: "10.10.10.87" },
          { num: 49, mac: "00:1d:92:04:7d:e0", ip: "10.10.11.109" },
          { num: 52, mac: "8c:89:a5:13:1c:68", ip: "10.10.11.51" },
          { num: 2, mac: "e0:d5:5e:84:59:6f", ip: "10.10.11.186" },
          { num: 2, mac: "00:1c:c0:f0:a8:3c", ip: "10.10.10.70" },
          { num: 50, mac: "00:08:54:69:99:10", ip: "10.10.10.171" },
          { num: 2, mac: "70:71:bc:6b:20:cc", ip: "10.10.10.162" },
          { num: 2, mac: "00:e0:4c:36:02:8b", ip: "10.10.10.224" },
          { num: 9, mac: "70:85:c2:b8:13:51", ip: "10.10.12.74" },
          { num: 52, mac: "2c:23:3a:9a:17:cc" },
          { num: 32, mac: "94:de:80:73:1e:4f", ip: "10.10.10.20" },
          { num: 1, mac: "40:01:c6:78:56:79" },
          { num: 2, mac: "bc:5f:f4:b2:c3:eb", ip: "10.10.10.201" },
          { num: 1, mac: "1c:1b:0d:d7:23:d5", ip: "10.10.11.117" },
          { num: 2, mac: "e0:69:95:56:d7:00", ip: "10.10.10.185" },
          { num: 1, mac: "40:01:c6:78:56:78", ip: "10.10.1.15" },
          { num: 52, mac: "d0:50:99:42:bf:78", ip: "10.10.10.24" },
          { num: 4, mac: "00:24:73:46:60:81" },
          { num: 2, mac: "00:1c:c0:f0:a8:a7", ip: "10.10.10.142" },
          { num: 2, mac: "50:e5:49:28:57:5d", ip: "10.10.10.255" },
          { num: 2, mac: "e0:69:95:56:d9:28", ip: "10.10.11.178" },
          { num: 2, mac: "20:fd:f1:78:fc:56" },
          { num: 2, mac: "00:26:b9:e0:c9:88", ip: "10.10.10.153" },
          { num: 50, mac: "00:19:66:74:a1:0f", ip: "10.10.12.82" },
          { num: 50, mac: "b4:2e:99:a6:39:e1", ip: "10.10.10.230" },
        ],
        tipo: "SW",
      },
      {
        mem: { $numberLong: "-9223372036854775808" },
        ip: "10.10.1.109",
        mac: "e0:63:da:2b:68:ae",
        model: "US48",
        name: "FAU-SW-AULAMAGNA",
        version: "5.64.8.13083",
        timestamp: { $date: "2021-10-12T14:05:00.053Z" },
        ports: [
          {
            num: 48,
            mac: "00:27:22:50:c2:60",
            ip: "172.16.0.43",
            name: "FAU-POSGRADO",
            model: "BZ2LR",
            mem: { $numberLong: "-9223372036854775808" },
            tipo: "AP",
          },
        ],
        tipo: "SW",
      },
      {
        cpu: 26,
        temp: 52,
        uptime: 4821444,
        fanlevel: 60,
        mem: 30,
        ip: "10.10.1.100",
        mac: "78:8a:20:fe:08:ee",
        model: "USXG",
        name: "CORESW-XG16",
        version: "5.64.8.13083",
        timestamp: { $date: "2021-10-12T14:05:00.053Z" },
        ports: [
          {
            num: 7,
            mac: "f0:9f:c2:d0:1e:23",
            ip: "172.16.0.106",
            name: "BIOING-INSIBIO",
            model: "U7MSH",
            uptime: 201770,
            cpu: 11,
            mem: 63,
            clientesap: [
              { mac: "ee:e4:28:e4:f7:e1", ip: "172.16.24.6" },
              { mac: "ee:1f:4b:23:2b:5e", ip: "172.16.5.234" },
              { mac: "90:73:5a:12:02:b6", ip: "172.16.6.130" },
              { mac: "64:6e:69:06:24:ac", ip: "172.16.7.28" },
              { mac: "34:2e:b7:8f:36:8f", ip: "172.16.14.93" },
              { mac: "14:96:e5:33:cf:72", ip: "172.16.26.165" },
              { mac: "2e:29:35:66:bc:9e", ip: "172.16.28.154" },
              { mac: "6a:7a:1a:78:15:55", ip: "172.16.14.164" },
              { mac: "24:46:c8:4f:d5:25", ip: "172.16.27.231" },
              { mac: "c8:f7:33:2a:b8:c2", ip: "172.16.3.154" },
              { mac: "08:cc:27:92:ad:a5", ip: "172.16.27.100" },
            ],
            tipo: "AP",
          },
          {
            num: 3,
            mac: "78:8a:20:26:b7:9a",
            ip: "172.16.0.145",
            name: "FACET-BLOCK4-P3",
            model: "U7MSH",
            uptime: 201764,
            cpu: 12,
            mem: 64,
            clientesap: [
              { mac: "80:30:49:39:17:71", ip: "172.16.24.205" },
              { mac: "6c:6a:77:d0:91:b6", ip: "172.16.28.98" },
            ],
            tipo: "AP",
          },
          {
            num: 11,
            mac: "f0:9f:c2:d0:1f:9c",
            ip: "172.16.0.108",
            name: "FAU-DTI-OF.MATIAS",
            model: "U7MSH",
            uptime: 201762,
            cpu: 11,
            mem: 65,
            clientesap: [{ mac: "bc:e9:2f:a9:69:44", ip: "172.16.11.224" }],
            tipo: "AP",
          },
          {
            num: 10,
            mac: "18:e8:29:56:6d:9c",
            ip: "172.16.0.137",
            name: "FACET-ANFITEATRO-A1",
            model: "U7MSH",
            uptime: 201761,
            cpu: 13,
            mem: 64,
            clientesap: [
              { mac: "80:35:c1:51:d0:6d", ip: "172.16.4.243" },
              { mac: "60:a4:d0:74:47:07", ip: "172.16.25.138" },
              { mac: "94:2d:dc:9e:29:6e", ip: "172.16.9.45" },
              { mac: "90:63:3b:e2:69:db", ip: "172.16.27.20" },
              { mac: "1a:8d:c1:eb:4d:bd", ip: "172.16.29.143" },
              { mac: "00:24:d6:06:d1:4c", ip: "172.16.9.80" },
              { mac: "ca:4e:41:56:4f:dc", ip: "172.16.11.255" },
              { mac: "ba:96:85:38:1a:93", ip: "172.16.5.26" },
              { mac: "c8:f3:19:3a:59:8b", ip: "172.16.5.85" },
              { mac: "5c:af:06:0a:70:49", ip: "172.16.26.106" },
              { mac: "a4:50:46:1b:a7:8b", ip: "172.16.7.21" },
              { mac: "c8:f3:19:3c:d3:ba", ip: "172.16.8.202" },
              { mac: "d4:63:c6:3e:77:40", ip: "172.16.26.116" },
              { mac: "44:03:2c:4a:28:92", ip: "172.16.10.55" },
              { mac: "50:e0:85:c7:78:e7", ip: "172.16.16.89" },
              { mac: "20:2d:07:01:0c:82", ip: "172.16.7.68" },
              { mac: "e6:8e:9f:65:9d:dc", ip: "172.16.20.82" },
              { mac: "14:96:e5:bd:e9:93", ip: "172.16.24.26" },
              { mac: "48:79:4d:b2:dd:79", ip: "172.16.6.9" },
              { mac: "64:89:f1:cf:ff:a1", ip: "172.16.25.182" },
              { mac: "20:32:6c:e6:30:26", ip: "172.16.11.52" },
              { mac: "64:c2:de:41:f0:31", ip: "172.16.7.24" },
              { mac: "30:6a:85:49:fd:3e", ip: "172.16.18.23" },
              { mac: "fa:6d:36:5c:27:70", ip: "172.16.22.216" },
              { mac: "c8:f3:19:36:6f:6f", ip: "172.16.19.70" },
              { mac: "e6:66:39:ce:43:88", ip: "172.16.11.242" },
              { mac: "f0:ee:10:83:d5:9c", ip: "172.16.19.105" },
              { mac: "08:cc:27:52:c4:e4", ip: "172.16.1.54" },
              { mac: "82:3a:de:ef:fc:aa", ip: "172.16.6.109" },
              { mac: "c8:c7:50:2c:72:3d", ip: "172.16.23.208" },
              { mac: "76:fc:39:13:cb:b1", ip: "172.16.8.144" },
              { mac: "48:c7:96:22:74:0f", ip: "172.16.13.210" },
              { mac: "52:42:be:e3:ce:bf", ip: "172.16.8.22" },
              { mac: "d8:ce:3a:e8:0d:8f", ip: "172.16.6.253" },
              { mac: "48:c7:96:3d:3a:6d", ip: "172.16.18.231" },
              { mac: "3a:78:90:d7:9f:7c", ip: "172.16.25.5" },
              { mac: "58:d9:c3:8a:d9:7c", ip: "172.16.17.234" },
              { mac: "b4:c4:fc:55:90:ab", ip: "172.16.9.44" },
              { mac: "c0:d9:62:a4:f8:98", ip: "172.16.13.200" },
              { mac: "0a:b3:30:4b:9b:dc", ip: "172.16.9.23" },
              { mac: "d4:c9:4b:c2:3c:de", ip: "172.16.24.152" },
              { mac: "dc:74:a8:e9:4b:c6", ip: "172.16.3.137" },
              { mac: "fe:26:1a:0e:00:c6", ip: "172.16.16.55" },
              { mac: "22:c5:23:ad:de:18", ip: "172.16.20.139" },
              { mac: "04:e5:98:5b:21:90", ip: "172.16.10.204" },
              { mac: "fc:19:99:90:14:f0", ip: "172.16.19.21" },
              { mac: "dc:74:a8:b0:79:a8", ip: "172.16.16.11" },
              { mac: "f4:8c:50:38:45:d2", ip: "172.16.3.110" },
              { mac: "b4:c4:fc:60:aa:74", ip: "172.16.9.191" },
              { mac: "20:32:6c:a9:21:4a", ip: "172.16.21.192" },
              { mac: "cc:f9:e4:cc:a9:70", ip: "172.16.2.12" },
              { mac: "b0:47:bf:78:7c:c7", ip: "172.16.15.64" },
              { mac: "14:96:e5:d1:bf:ff", ip: "172.16.6.101" },
              { mac: "6e:1e:08:d6:f8:77", ip: "172.16.19.208" },
            ],
            tipo: "AP",
          },
          {
            num: 11,
            mac: "00:27:22:50:c2:88",
            ip: "172.16.0.44",
            name: "FAU-Aula_Magna",
            model: "BZ2LR",
            uptime: 517815,
            cpu: 9,
            mem: 77,
            clientesap: [{ mac: "14:5f:94:cc:78:d6", ip: "172.16.7.157" }],
            tipo: "AP",
          },
          {
            num: 10,
            mac: "78:8a:20:23:80:cd",
            ip: "172.16.0.136",
            name: "FACET-ANFITEATRO-A2",
            model: "U7MP",
            uptime: 201778,
            cpu: 8,
            mem: 64,
            tipo: "AP",
          },
          {
            num: 2,
            mac: "78:8a:20:26:b1:e2",
            ip: "172.16.0.135",
            name: "FACET-BLOCK2-P2-Grosse",
            model: "U7MSH",
            uptime: 201706,
            cpu: 7,
            mem: 64,
            tipo: "AP",
          },
          {
            num: 3,
            mac: "78:8a:20:26:b6:96",
            ip: "172.16.0.144",
            name: "FACET-BLOCK4-P1-LAB.COMP.QUIMICA",
            model: "U7MSH",
            uptime: 201782,
            cpu: 11,
            mem: 64,
            clientesap: [
              { mac: "20:32:6c:a0:ab:e8", ip: "172.16.15.74" },
              { mac: "90:73:5a:1a:12:52", ip: "172.16.8.6" },
              { mac: "66:c3:c8:33:39:c8", ip: "172.16.10.72" },
              { mac: "9e:7a:9c:47:9a:f1", ip: "172.16.14.83" },
              { mac: "7a:1b:68:a9:b3:27", ip: "172.16.4.132" },
              { mac: "e2:63:4e:53:e6:78", ip: "172.16.6.149" },
              { mac: "94:39:e5:59:ce:c2", ip: "172.16.14.151" },
              { mac: "58:20:59:00:54:5d", ip: "172.16.14.34" },
              { mac: "8a:4e:55:b0:24:2d", ip: "172.16.30.177" },
              { mac: "82:87:b1:24:e2:64", ip: "172.16.19.185" },
              { mac: "de:72:ab:33:1c:1b", ip: "172.16.23.62" },
              { mac: "a8:51:5b:8b:00:89", ip: "172.16.27.200" },
              { mac: "dc:44:b6:08:e0:9e", ip: "172.16.4.134" },
              { mac: "e0:d0:83:09:ff:81", ip: "172.16.1.127" },
              { mac: "c6:e4:de:77:18:1e", ip: "172.16.20.29" },
              { mac: "de:c7:c2:4f:46:22", ip: "172.16.23.164" },
              { mac: "30:07:4d:37:07:16", ip: "172.16.28.59" },
              { mac: "a2:b6:be:3f:30:b6", ip: "172.16.12.89" },
              { mac: "b6:9f:51:51:9a:3d", ip: "172.16.2.250" },
            ],
            tipo: "AP",
          },
          {
            num: 10,
            mac: "78:8a:20:23:7f:ba",
            ip: "172.16.0.134",
            name: "FACET-ANFITEATRO-B2",
            model: "U7MP",
            uptime: 201739,
            cpu: 8,
            mem: 63,
            tipo: "AP",
          },
          { num: 8, mac: "00:1e:2a:47:bb:0f" },
          { num: 8, mac: "00:18:6e:e5:10:bb" },
          { num: 8, mac: "00:18:6e:e5:10:a0" },
          { num: 8, mac: "08:ed:b9:a0:ca:91", ip: "172.16.29.251" },
          { num: 8, mac: "de:9d:9e:41:71:98", ip: "172.16.23.221" },
          { num: 10, mac: "40:01:c6:78:df:a3" },
          { num: 8, mac: "04:d6:aa:d0:d2:f4", ip: "172.16.30.92" },
          { num: 8, mac: "c8:f3:19:39:92:d2", ip: "172.16.15.226" },
          { num: 12, mac: "5c:8a:38:63:cb:a2" },
          { num: 8, mac: "70:66:55:5f:42:07", ip: "172.16.9.37" },
          { num: 8, mac: "58:d9:c3:c1:96:f4", ip: "172.16.29.44" },
        ],
        tipo: "SW",
      },
      {
        cpu: 70,
        temp: 45,
        uptime: 7133458,
        fanlevel: 70,
        mem: 53,
        ip: "10.10.1.63",
        mac: "f0:9f:c2:66:6f:88",
        model: "US24P250",
        name: "FACE-MAINSW",
        version: "5.64.8.13083",
        timestamp: { $date: "2021-10-12T14:05:00.053Z" },
        ports: [
          {
            num: 24,
            mac: "80:2a:a8:83:bf:04",
            ip: "172.16.0.105",
            name: "FACE-BOX38",
            model: "U7LR",
            uptime: 201730,
            cpu: 8,
            mem: 63,
            clientesap: [
              { mac: "04:d3:95:e1:82:97", ip: "172.16.24.31" },
              { mac: "0a:e7:25:61:1d:87", ip: "172.16.5.32" },
              { mac: "90:73:5a:12:66:79", ip: "172.16.17.187" },
              { mac: "14:7d:da:af:0c:e6", ip: "172.16.29.152" },
            ],
            tipo: "AP",
          },
          {
            num: 10,
            mac: "80:2a:a8:83:bf:18",
            ip: "172.16.0.107",
            name: "FACE-ANFITEATRO-2",
            model: "U7LR",
            uptime: 201766,
            cpu: 9,
            mem: 63,
            tipo: "AP",
          },
          {
            num: 24,
            mac: "f0:9f:c2:dc:fe:14",
            ip: "172.16.0.133",
            name: "FACE-BOX19",
            model: "U7MSH",
            uptime: 201760,
            cpu: 9,
            mem: 63,
            clientesap: [
              { mac: "16:eb:95:14:49:6d", ip: "172.16.9.186" },
              { mac: "a2:83:16:f6:75:64", ip: "172.16.30.78" },
              { mac: "92:73:a6:6f:ab:dd", ip: "172.16.18.245" },
            ],
            tipo: "AP",
          },
          {
            num: 9,
            mac: "f0:9f:c2:dc:fd:52",
            ip: "172.16.0.117",
            name: "FACE-LABORATORIO",
            model: "U7MSH",
            uptime: 9311,
            cpu: 14,
            mem: 63,
            clientesap: [
              { mac: "98:b8:ba:0e:78:a0", ip: "172.16.10.206" },
              { mac: "0e:d5:ef:1d:a8:a2", ip: "172.16.18.149" },
              { mac: "10:f0:05:c6:4c:24", ip: "172.16.23.32" },
              { mac: "5e:b5:2d:19:14:65", ip: "172.16.1.208" },
              { mac: "d0:77:14:43:c5:8a", ip: "172.16.2.4" },
              { mac: "20:f4:78:3c:75:3c", ip: "172.16.22.249" },
              { mac: "22:1e:8f:e4:ec:fe", ip: "172.16.25.24" },
              { mac: "4a:5c:43:e9:d8:10", ip: "172.16.29.89" },
              { mac: "80:65:6d:e7:6a:15", ip: "172.16.28.35" },
              { mac: "88:29:9c:ea:76:93", ip: "172.16.19.170" },
              { mac: "7e:21:b1:8c:18:42", ip: "172.16.13.44" },
              { mac: "c6:d6:89:ad:c6:e0", ip: "172.16.8.87" },
              { mac: "32:b0:13:be:da:ac", ip: "172.16.30.29" },
              { mac: "64:89:f1:8a:60:e9", ip: "172.16.25.60" },
              { mac: "48:c7:96:a5:9a:2e", ip: "172.16.28.177" },
              { mac: "9c:b7:0d:3f:d9:b8", ip: "172.16.6.45" },
              { mac: "14:56:8e:a7:c2:4f", ip: "172.16.2.74" },
            ],
            tipo: "AP",
          },
          {
            num: 7,
            mac: "78:8a:20:b6:3b:88",
            ip: "172.16.0.118",
            name: "FACE-POSGRADO",
            model: "U7MSH",
            uptime: 201772,
            cpu: 10,
            mem: 63,
            clientesap: [
              { mac: "e0:d0:83:a7:57:55", ip: "172.16.19.59" },
              { mac: "a8:51:5b:19:5a:18", ip: "172.16.27.105" },
              { mac: "46:49:69:2e:85:bb", ip: "172.16.16.96" },
              { mac: "d4:c9:4b:0d:6e:29", ip: "172.16.2.156" },
              { mac: "20:32:6c:97:b2:54", ip: "172.16.16.7" },
              { mac: "d0:9c:7a:da:8a:18", ip: "172.16.24.141" },
              { mac: "16:68:bb:97:fe:9e", ip: "172.16.30.210" },
              { mac: "24:5a:b5:81:66:22", ip: "172.16.1.35" },
              { mac: "8c:e5:c0:25:14:b7", ip: "172.16.9.34" },
            ],
            tipo: "AP",
          },
          {
            num: 11,
            mac: "f0:9f:c2:dc:fc:cc",
            ip: "172.16.0.123",
            name: "FACE-TI",
            model: "U7MSH",
            uptime: 201746,
            cpu: 6,
            mem: 62,
            tipo: "AP",
          },
          {
            num: 24,
            mac: "18:e8:29:56:6f:b9",
            ip: "172.16.0.132",
            name: "FACE-BOX10",
            model: "U7MSH",
            uptime: 201779,
            cpu: 5,
            mem: 63,
            clientesap: [
              { mac: "c2:31:c5:7a:3a:93", ip: "172.16.14.227" },
              { mac: "c0:8c:71:96:ef:ed", ip: "172.16.4.203" },
              { mac: "da:7a:4a:c0:d7:ac", ip: "172.16.30.198" },
              { mac: "ec:aa:25:7f:4f:55", ip: "172.16.6.128" },
              { mac: "00:15:e9:b4:4b:c4", ip: "172.16.14.122" },
            ],
            tipo: "AP",
          },
          {
            num: 24,
            mac: "18:e8:29:56:72:78",
            ip: "172.16.0.152",
            name: "FACE-BOX1",
            model: "U7MSH",
            uptime: 201717,
            cpu: 9,
            mem: 64,
            clientesap: [
              { mac: "1a:26:fb:91:d3:83", ip: "172.16.22.159" },
              { mac: "1e:45:57:46:75:34", ip: "172.16.1.118" },
              { mac: "5c:af:06:0d:8a:81", ip: "172.16.3.68" },
              { mac: "5c:ba:ef:c7:8a:e3", ip: "172.16.5.242" },
              { mac: "50:9e:a7:53:18:dc", ip: "172.16.6.102" },
              { mac: "92:d0:f4:32:17:4f", ip: "172.16.22.24" },
              { mac: "50:50:a4:26:bf:96", ip: "172.16.14.214" },
              { mac: "08:cc:27:f3:36:f0", ip: "172.16.1.234" },
              { mac: "8c:f1:12:1f:0e:e9", ip: "172.16.29.50" },
              { mac: "30:4b:07:d1:49:6a", ip: "172.16.23.233" },
              { mac: "22:f9:6e:c8:df:96", ip: "172.16.4.69" },
              { mac: "fc:a6:21:8d:31:9e", ip: "172.16.25.170" },
              { mac: "c8:f3:19:3d:0d:80", ip: "172.16.28.122" },
              { mac: "00:0d:09:b1:1b:d8", ip: "172.16.11.110" },
              { mac: "5e:78:b8:b8:bd:4f", ip: "172.16.20.113" },
              { mac: "8e:7a:4a:f7:2c:db", ip: "172.16.24.191" },
              { mac: "62:8c:a6:46:f2:4f", ip: "172.16.23.168" },
              { mac: "14:96:e5:27:84:84", ip: "172.16.28.222" },
              { mac: "96:58:b6:d9:77:32", ip: "172.16.26.6" },
              { mac: "0e:c7:dc:db:c4:22", ip: "172.16.7.246" },
              { mac: "46:a3:c8:27:ce:0e", ip: "172.16.27.18" },
              { mac: "94:2d:dc:9e:fb:00", ip: "172.16.12.98" },
              { mac: "e4:11:5b:06:4b:40", ip: "172.16.27.187" },
              { mac: "14:96:e5:5e:6d:15", ip: "172.16.20.87" },
              { mac: "6e:b0:d7:95:2d:b2", ip: "172.16.4.167" },
              { mac: "7e:0a:e5:f2:7f:31", ip: "172.16.3.248" },
              { mac: "c0:17:4d:ea:a5:47", ip: "172.16.13.57" },
              { mac: "48:2c:a0:67:ef:4c", ip: "172.16.14.75" },
            ],
            tipo: "AP",
          },
          { num: 24, mac: "00:22:15:c9:2a:0a", ip: "10.15.10.177" },
          { num: 24, mac: "94:de:80:89:68:ad", ip: "10.15.10.83" },
          { num: 24, mac: "00:22:15:c9:25:0a", ip: "10.15.11.238" },
          { num: 24, mac: "00:15:c5:32:d3:83", ip: "10.15.11.106" },
          { num: 24, mac: "00:25:9c:51:8c:31" },
          { num: 24, mac: "bc:5f:f4:12:85:f4", ip: "10.15.10.73" },
          { num: 24, mac: "00:1d:92:ee:75:d5", ip: "10.15.11.237" },
          { num: 24, mac: "fc:aa:14:53:fe:08", ip: "10.15.10.32" },
          { num: 24, mac: "70:71:bc:0b:b6:12", ip: "10.15.10.91" },
          { num: 24, mac: "d0:50:99:89:5b:79", ip: "10.15.10.87" },
          { num: 24, mac: "00:25:22:c5:72:cc", ip: "10.15.10.11" },
          { num: 24, mac: "00:15:6d:60:91:f0", ip: "172.16.0.10" },
          { num: 24, mac: "90:e6:ba:d9:a2:ea", ip: "10.15.10.80" },
          { num: 24, mac: "98:4b:e1:35:30:da", ip: "10.15.2.15" },
          { num: 24, mac: "1c:1b:0d:7b:19:df", ip: "10.15.10.44" },
          { num: 24, mac: "d0:50:99:54:90:95", ip: "10.15.10.13" },
          { num: 24, mac: "fc:aa:14:c7:2d:80", ip: "10.15.10.10" },
          { num: 24, mac: "94:de:80:19:60:dc", ip: "10.15.10.162" },
          { num: 24, mac: "50:46:5d:4e:43:c9", ip: "10.15.10.71" },
          { num: 24, mac: "38:60:77:f9:e7:8c", ip: "10.15.10.7" },
          { num: 24, mac: "fc:34:97:c0:0f:2f", ip: "10.15.11.85" },
          { num: 24, mac: "94:de:80:8e:b4:a8", ip: "10.15.10.102" },
          { num: 24, mac: "00:19:66:fa:0e:d7", ip: "10.15.11.236" },
          { num: 24, mac: "74:d4:35:53:99:b1", ip: "10.15.11.241" },
          { num: 24, mac: "00:24:8c:eb:9e:dc", ip: "10.15.10.57" },
          { num: 24, mac: "94:de:80:66:44:70", ip: "10.15.10.39" },
          { num: 24, mac: "74:d4:35:cf:d1:c6", ip: "10.15.11.243" },
          { num: 24, mac: "00:1d:92:ee:71:34", ip: "10.15.10.117" },
          { num: 24, mac: "94:de:80:83:ac:df", ip: "10.15.10.5" },
          { num: 24, mac: "fc:aa:14:5e:a0:90", ip: "10.15.10.28" },
          { num: 24, mac: "30:9c:23:eb:7b:31", ip: "10.15.10.4" },
          { num: 24, mac: "94:de:80:66:44:92", ip: "10.15.10.58" },
          { num: 24, mac: "00:25:22:c5:78:b2", ip: "10.15.10.133" },
          { num: 24, mac: "b4:2e:99:3b:be:3a", ip: "10.15.10.213" },
          { num: 24, mac: "a0:8c:fd:f7:94:74", ip: "10.15.10.138" },
          { num: 24, mac: "ec:a8:6b:79:5d:2f", ip: "10.15.10.20" },
          { num: 24, mac: "fc:aa:14:53:fe:8b", ip: "10.15.10.47" },
          { num: 24, mac: "00:24:8c:eb:9e:d1", ip: "10.15.10.54" },
          { num: 24, mac: "fc:aa:14:c6:41:db", ip: "10.15.10.157" },
          { num: 24, mac: "d0:50:99:77:70:6a", ip: "10.15.10.23" },
          { num: 24, mac: "94:de:80:85:7a:45", ip: "10.15.10.67" },
          { num: 24, mac: "d0:50:99:21:95:58", ip: "10.15.10.221" },
          { num: 24, mac: "a0:b3:cc:a2:15:8e", ip: "10.15.2.2" },
          { num: 24, mac: "6c:c2:17:00:72:45", ip: "10.15.2.18" },
          { num: 24, mac: "70:71:bc:9b:57:dc", ip: "10.15.10.40" },
          { num: 24, mac: "70:71:bc:9d:2c:ee", ip: "10.15.10.155" },
          { num: 24, mac: "fc:aa:14:c7:2c:26", ip: "10.15.10.19" },
          { num: 24, mac: "d0:50:99:a4:86:9f", ip: "10.15.10.15" },
          { num: 24, mac: "94:de:80:85:62:36", ip: "10.15.10.34" },
          { num: 24, mac: "a0:1d:48:78:13:b6" },
          { num: 24, mac: "94:de:80:18:ff:b0", ip: "10.15.10.251" },
          { num: 24, mac: "fc:aa:14:c7:2d:8e", ip: "10.15.10.9" },
          { num: 24, mac: "38:60:77:f9:e5:2b", ip: "10.15.10.65" },
          { num: 24, mac: "00:19:d1:85:4a:2b", ip: "10.15.10.94" },
          { num: 24, mac: "00:1a:4d:1f:ad:90", ip: "10.15.10.31" },
          { num: 24, mac: "68:b5:99:4f:1a:c0", ip: "10.15.11.51" },
          { num: 24, mac: "00:40:f4:04:f6:9e", ip: "10.15.10.119" },
          { num: 24, mac: "64:70:02:03:fa:d3", ip: "10.15.10.62" },
          { num: 24, mac: "30:9c:23:8a:04:e0", ip: "10.15.10.70" },
          { num: 24, mac: "d0:50:99:21:cb:7d", ip: "10.15.10.1" },
          { num: 24, mac: "30:9c:23:eb:76:14", ip: "10.15.10.55" },
          { num: 24, mac: "94:de:80:66:44:a8", ip: "10.15.10.17" },
          { num: 24, mac: "00:1e:8c:b0:ed:07", ip: "10.15.10.153" },
          { num: 24, mac: "b4:2e:99:56:2a:e1", ip: "10.15.10.25" },
          { num: 24, mac: "00:25:22:c5:78:a3", ip: "10.15.10.18" },
          { num: 24, mac: "74:d4:35:0b:36:09", ip: "10.15.10.66" },
          { num: 24, mac: "48:0f:cf:c3:02:02", ip: "10.15.2.40" },
          { num: 24, mac: "fc:aa:14:5e:a0:95", ip: "10.15.10.194" },
          { num: 24, mac: "a0:8c:fd:f7:47:b6", ip: "10.15.2.6" },
          { num: 8, mac: "00:15:6d:60:92:13", ip: "172.16.0.39" },
        ],
        tipo: "SW",
      },
      {
        cpu: 80,
        temp: 61,
        uptime: 517844,
        mem: 55,
        ip: "10.10.1.107",
        mac: "b4:fb:e4:2e:8b:b1",
        model: "US48",
        name: "FAU-SW-BIENESTAR",
        version: "5.64.8.13083",
        timestamp: { $date: "2021-10-12T14:05:00.053Z" },
        ports: [
          {
            num: 48,
            mac: "18:e8:29:56:70:8f",
            ip: "172.16.0.128",
            name: "FAU-BIBLIOTECA",
            model: "U7MSH",
            uptime: 201778,
            cpu: 8,
            mem: 64,
            clientesap: [
              { mac: "be:8e:4f:3b:2c:01", ip: "172.16.3.78" },
              { mac: "9c:93:4e:43:81:d5", ip: "192.168.1.251" },
              { mac: "b4:bf:f6:95:96:23", ip: "172.16.5.60" },
              { mac: "80:ce:62:5e:80:25", ip: "192.168.1.4" },
            ],
            tipo: "AP",
          },
          { num: 1, mac: "e0:d5:5e:6b:fb:e5" },
          { num: 1, mac: "00:15:6d:3e:16:cf", ip: "172.16.0.32" },
          { num: 1, mac: "00:15:6d:3e:1f:52", ip: "172.16.0.45" },
          { num: 1, mac: "4c:5e:0c:71:d5:c6", ip: "10.10.2.254" },
          { num: 1, mac: "20:fd:f1:78:fc:3e", ip: "10.10.1.10" },
          { num: 1, mac: "fc:aa:14:c6:3c:c5", ip: "10.10.12.24" },
          { num: 1, mac: "34:40:b5:c8:5c:ba", ip: "10.10.4.2" },
          { num: 1, mac: "74:d4:35:0b:22:3b", ip: "10.10.10.242" },
          { num: 1, mac: "78:48:59:c3:63:fd", ip: "10.10.1.6" },
          { num: 1, mac: "e0:69:95:e4:c5:c8", ip: "10.10.4.232" },
          { num: 1, mac: "78:48:59:9f:c2:a7", ip: "10.10.1.58" },
          { num: 1, mac: "42:fe:a2:1b:36:38", ip: "192.168.0.2" },
          { num: 1, mac: "3c:4a:92:b2:17:3d", ip: "10.10.10.81" },
          { num: 1, mac: "3c:ef:8c:1a:50:a4", ip: "10.10.11.199" },
          { num: 1, mac: "00:21:5a:fd:9c:f1" },
          { num: 1, mac: "96:bc:7e:30:17:16", ip: "10.10.0.34" },
          { num: 1, mac: "78:48:59:19:5c:c3", ip: "10.10.1.59" },
          { num: 1, mac: "20:d8:0b:9f:01:78", ip: "170.210.208.254" },
          { num: 1, mac: "00:d0:b8:28:8f:87", ip: "10.15.0.52" },
          { num: 1, mac: "24:d9:21:cf:18:01" },
          { num: 1, mac: "d4:ae:52:93:c9:f3", ip: "10.10.13.6" },
          { num: 7, mac: "bc:5f:f4:4e:5f:94", ip: "10.10.10.9" },
          { num: 1, mac: "6c:3b:6b:7a:41:f7", ip: "200.45.169.66" },
          { num: 1, mac: "44:09:b8:2e:95:03", ip: "192.168.1.254" },
          { num: 1, mac: "2c:23:3a:9a:17:b2", ip: "10.10.1.51" },
          { num: 1, mac: "00:19:66:3a:e9:8e", ip: "10.10.13.173" },
          { num: 1, mac: "f8:d1:11:b5:25:a7", ip: "10.15.10.49" },
          { num: 1, mac: "00:21:5a:f6:e3:48", ip: "10.10.0.44" },
          { num: 47, mac: "bc:5f:f4:4e:6f:1f", ip: "10.10.10.122" },
          { num: 1, mac: "00:22:4d:83:ce:35", ip: "10.10.10.8" },
          { num: 20, mac: "bc:5f:f4:4e:6f:13", ip: "10.10.10.160" },
          { num: 1, mac: "d4:ca:6d:01:09:da", ip: "192.168.88.1" },
          { num: 1, mac: "68:bd:ab:0e:79:11", ip: "10.10.1.48" },
          { num: 1, mac: "b4:2e:99:56:2a:bd", ip: "10.15.10.192" },
          { num: 1, mac: "40:8d:5c:26:ec:84", ip: "10.10.12.127" },
          { num: 1, mac: "ec:8e:b5:7d:d4:df", ip: "10.10.0.27" },
          { num: 21, mac: "ec:a8:6b:72:c2:ce", ip: "10.10.11.38" },
          { num: 1, mac: "24:5e:be:25:44:5d", ip: "10.15.0.53" },
          { num: 1, mac: "00:25:22:c4:df:5a", ip: "10.15.0.31" },
          { num: 1, mac: "e2:a9:7c:29:36:ee", ip: "10.15.0.23" },
          { num: 1, mac: "40:01:c6:78:df:88", ip: "10.10.1.40" },
          { num: 1, mac: "b8:27:eb:15:17:d8", ip: "10.10.9.3" },
          { num: 1, mac: "00:1b:24:2d:ba:b0", ip: "200.45.169.96" },
          { num: 1, mac: "7e:8b:32:78:2e:10", ip: "10.15.0.26" },
          { num: 1, mac: "6c:ae:8b:75:c1:14", ip: "192.168.70.125" },
          { num: 1, mac: "00:0c:42:d2:6b:cf", ip: "10.10.0.40" },
          { num: 1, mac: "00:15:6d:9e:93:12", ip: "172.16.0.40" },
          { num: 1, mac: "90:67:1c:87:d9:f0", ip: "10.15.1.253" },
          { num: 1, mac: "74:d4:35:bd:15:ce", ip: "10.15.0.60" },
          { num: 1, mac: "40:01:c6:b9:d4:86" },
          { num: 1, mac: "00:60:35:1d:4a:f1", ip: "10.10.40.5" },
          { num: 1, mac: "6c:3b:6b:7a:41:f5", ip: "192.168.88.2" },
          { num: 1, mac: "38:60:77:3f:36:83", ip: "10.15.0.30" },
          { num: 1, mac: "70:85:c2:30:f0:bd", ip: "10.10.10.6" },
          { num: 1, mac: "40:8d:5c:7f:73:d0", ip: "10.10.10.196" },
          { num: 1, mac: "54:04:a6:6d:c1:de", ip: "10.10.10.108" },
          { num: 1, mac: "e0:69:95:e4:c4:63", ip: "10.10.9.11" },
          { num: 1, mac: "34:40:b5:c9:25:0a", ip: "10.10.4.3" },
          { num: 1, mac: "20:fd:f1:eb:da:1e", ip: "10.10.1.17" },
          { num: 39, mac: "00:1c:c0:20:3b:47", ip: "10.10.10.163" },
          { num: 1, mac: "e2:9a:b0:b0:2c:32", ip: "10.15.0.24" },
          { num: 1, mac: "00:1e:0b:0a:3b:ea", ip: "10.10.11.108" },
          { num: 1, mac: "4a:f0:aa:0d:be:58", ip: "10.10.4.101" },
          { num: 1, mac: "00:15:6d:3e:1f:83", ip: "172.16.0.49" },
          { num: 1, mac: "e8:f7:24:61:2b:5a", ip: "10.10.1.27" },
          { num: 41, mac: "fc:aa:14:74:8c:89", ip: "10.10.11.45" },
          { num: 1, mac: "92:2f:93:4d:a2:79", ip: "10.15.0.27" },
          { num: 1, mac: "18:c0:4d:20:23:92", ip: "10.10.10.106" },
          { num: 1, mac: "00:16:76:72:33:c7", ip: "10.15.10.24" },
          { num: 1, mac: "00:22:4d:a6:ac:d2", ip: "10.10.11.172" },
          { num: 1, mac: "00:19:e7:07:e7:0b", ip: "10.10.1.64" },
          { num: 1, mac: "6c:0b:84:70:2c:2c", ip: "192.168.0.253" },
          { num: 1, mac: "40:8d:5c:ef:be:b8", ip: "10.10.10.17" },
          { num: 33, mac: "00:1c:c0:bb:28:33", ip: "10.10.11.33" },
          { num: 1, mac: "00:68:eb:82:3f:71", ip: "10.10.0.22" },
          { num: 1, mac: "ec:8e:b5:7d:d4:bf", ip: "10.10.0.24" },
          { num: 45, mac: "00:80:ad:7b:e8:1f", ip: "10.10.10.178" },
          { num: 1, mac: "00:15:6d:3e:16:ee", ip: "172.16.0.31" },
          { num: 1, mac: "44:8a:5b:9e:85:4a", ip: "10.10.10.40" },
          { num: 1, mac: "74:d4:35:bd:15:cf", ip: "10.15.0.50" },
          { num: 1, mac: "d4:ca:6d:e1:91:03" },
          { num: 1, mac: "ac:1f:6b:6e:42:16", ip: "10.10.0.63" },
          { num: 1, mac: "18:c0:4d:20:15:09", ip: "10.10.10.175" },
          { num: 1, mac: "b6:63:a0:19:34:a4", ip: "10.10.0.31" },
          { num: 1, mac: "36:38:39:35:65:30", ip: "172.16.0.253" },
          { num: 1, mac: "b0:00:b4:0a:c6:d0", ip: "10.15.1.11" },
          { num: 1, mac: "6c:0b:84:70:23:5c", ip: "192.168.0.254" },
          { num: 1, mac: "9a:1c:e5:07:0d:3f", ip: "10.10.0.9" },
          { num: 17, mac: "ec:a8:6b:72:73:0a", ip: "10.10.11.183" },
          { num: 1, mac: "58:0a:20:a7:5e:ef", ip: "10.15.1.47" },
          { num: 1, mac: "b8:af:67:9a:4d:76", ip: "10.10.1.57" },
          { num: 1, mac: "b0:0c:d1:ba:a6:7c", ip: "10.15.2.11" },
          { num: 1, mac: "26:94:e4:87:2d:62", ip: "10.10.0.21" },
          { num: 1, mac: "36:ef:87:30:02:b3", ip: "10.10.0.36" },
          { num: 1, mac: "f6:d3:de:4a:29:9a", ip: "172.16.0.5" },
          { num: 1, mac: "d4:ae:52:93:c9:f5", ip: "192.168.0.120" },
          { num: 1, mac: "10:c3:7b:db:bb:05", ip: "10.10.11.91" },
          { num: 1, mac: "00:13:46:c4:2c:ef", ip: "10.10.10.32" },
          { num: 1, mac: "ec:8e:b5:7d:26:fc", ip: "10.15.2.12" },
          { num: 1, mac: "34:40:b5:c9:1a:fe" },
          { num: 1, mac: "d4:ca:6d:e1:91:04", ip: "200.45.169.249" },
          { num: 1, mac: "40:01:c6:b9:81:60", ip: "10.10.1.49" },
          { num: 1, mac: "00:0c:42:d2:6b:c6", ip: "10.15.0.1" },
          { num: 1, mac: "e8:40:f2:09:fd:25", ip: "10.10.11.59" },
          { num: 1, mac: "20:fd:f1:ee:85:8e", ip: "10.10.1.16" },
          { num: 9, mac: "40:f2:e9:d6:19:1c", ip: "10.10.13.172" },
          { num: 1, mac: "34:40:b5:c9:1a:fa", ip: "10.10.4.1" },
          { num: 9, mac: "40:f2:e9:d6:19:20", ip: "10.10.11.161" },
          { num: 1, mac: "50:0f:80:8c:e7:3f", ip: "200.45.169.254" },
          { num: 1, mac: "00:21:5e:09:66:36", ip: "192.168.0.1" },
          { num: 1, mac: "40:01:c6:78:d2:1e", ip: "10.10.1.41" },
          { num: 1, mac: "58:35:d9:0d:fc:be", ip: "10.15.1.46" },
          { num: 1, mac: "08:00:27:97:d8:91", ip: "10.10.10.85" },
          { num: 1, mac: "00:02:55:d6:92:b8", ip: "10.10.20.1" },
          { num: 1, mac: "5e:b7:9e:99:ac:c7", ip: "10.10.20.10" },
          { num: 1, mac: "00:24:73:46:60:67", ip: "10.10.1.38" },
          { num: 1, mac: "04:6c:9d:cb:b5:8f" },
          { num: 1, mac: "54:c4:15:e8:2d:15", ip: "10.10.0.72" },
        ],
        tipo: "SW",
      },
      {
        cpu: 78,
        temp: 60,
        uptime: 517851,
        mem: 55,
        ip: "10.10.1.13",
        mac: "b4:fb:e4:2f:c5:cb",
        model: "US48",
        name: "FACET-MAINSW-BLOCK2-PB",
        version: "5.64.8.13083",
        timestamp: { $date: "2021-10-12T14:05:00.053Z" },
        ports: [
          {
            num: 47,
            mac: "78:8a:20:26:b7:0d",
            ip: "172.16.0.151",
            name: "FACET-BLOCK2-P0-Of.2-0-2",
            model: "U7MSH",
            uptime: 517842,
            cpu: 10,
            mem: 65,
            tipo: "AP",
          },
          {
            num: 3,
            mac: "18:e8:29:56:51:23",
            ip: "172.16.0.138",
            name: "FACET-BLOCK2-P2",
            model: "U7MSH",
            uptime: 201778,
            cpu: 10,
            mem: 65,
            tipo: "AP",
          },
          {
            num: 3,
            mac: "78:8a:20:26:b7:5c",
            ip: "172.16.0.61",
            name: "FACET-BLOCK2-P2-Of.2-2-15",
            model: "U7MSH",
            uptime: 201777,
            cpu: 12,
            mem: 65,
            clientesap: [
              { mac: "a8:c8:3a:be:7d:82", ip: "172.16.4.157" },
              { mac: "7a:be:e6:75:2d:22", ip: "172.16.14.71" },
              { mac: "32:7f:e9:ce:9f:24", ip: "172.16.2.117" },
              { mac: "28:16:7f:e9:5c:40", ip: "172.16.2.92" },
              { mac: "f6:65:b6:3c:cb:62", ip: "172.16.30.180" },
            ],
            tipo: "AP",
          },
          {
            num: 48,
            mac: "78:8a:20:26:b2:73",
            ip: "172.16.0.126",
            name: "FACET-BLOCK2-P0-SEC.FISICA",
            model: "U7MSH",
            uptime: 201766,
            cpu: 8,
            mem: 65,
            tipo: "AP",
          },
          {
            num: 5,
            mac: "78:8a:20:26:b8:38",
            ip: "172.16.0.125",
            name: "FACET-BLOCK2-P1-BIBLIOTECA",
            model: "U7MSH",
            uptime: 201750,
            cpu: 7,
            mem: 62,
            tipo: "AP",
          },
          {
            num: 6,
            mac: "78:8a:20:26:b2:98",
            ip: "172.16.0.119",
            name: "FACET-BLOCK2-P3-Of.2-3-09",
            model: "U7MSH",
            uptime: 201781,
            cpu: 9,
            mem: 65,
            clientesap: [{ mac: "a4:07:b6:11:af:d7", ip: "172.16.23.112" }],
            tipo: "AP",
          },
          {
            num: 1,
            mac: "18:e8:29:56:72:1f",
            ip: "172.16.0.158",
            name: "FACET-BLOCK2-P4",
            model: "U7MSH",
            uptime: 201768,
            cpu: 8,
            mem: 63,
            clientesap: [
              { mac: "9c:ad:97:6c:ba:29", ip: "172.16.8.85" },
              { mac: "dc:bf:e9:18:65:a1", ip: "172.16.2.15" },
              { mac: "de:4e:76:eb:af:54", ip: "172.16.12.204" },
              { mac: "9c:30:5b:4b:56:a5", ip: "172.16.3.172" },
            ],
            tipo: "AP",
          },
          { num: 17, mac: "00:d8:61:30:2a:fe", ip: "10.10.10.88" },
          { num: 2, mac: "50:e5:49:37:c6:81", ip: "10.10.11.47" },
          { num: 3, mac: "e0:98:61:1a:52:6c" },
          { num: 15, mac: "bc:5f:f4:d2:01:30", ip: "10.10.10.86" },
          { num: 3, mac: "f4:30:b9:a2:7d:c3", ip: "10.10.11.137" },
          { num: 3, mac: "00:d8:61:2d:8a:41", ip: "10.10.10.51" },
          { num: 3, mac: "88:d7:f6:d9:08:a4", ip: "10.10.11.90" },
          { num: 21, mac: "00:d8:61:2d:8a:42", ip: "10.10.10.158" },
          { num: 5, mac: "e0:d5:5e:bc:4b:99", ip: "10.10.11.142" },
          { num: 2, mac: "e0:d5:5e:b5:7c:15", ip: "10.10.10.132" },
          { num: 6, mac: "00:1c:c5:ad:f1:ed" },
          { num: 13, mac: "1c:1b:0d:d7:24:87", ip: "10.10.11.89" },
          { num: 1, mac: "00:19:d1:aa:b9:69", ip: "10.10.11.40" },
          { num: 7, mac: "44:37:e6:9d:2b:cf", ip: "10.10.10.101" },
          { num: 2, mac: "ec:a8:6b:72:c2:29", ip: "10.10.11.127" },
          { num: 3, mac: "d0:27:88:9d:a3:49", ip: "10.10.10.64" },
          { num: 18, mac: "bc:5f:f4:d2:01:07", ip: "10.10.10.69" },
          { num: 5, mac: "00:50:04:09:f3:cd", ip: "10.10.11.87" },
        ],
        tipo: "SW",
      },
      {
        cpu: 77,
        temp: 66,
        uptime: 517780,
        mem: 55,
        ip: "10.10.1.103",
        mac: "b4:fb:e4:89:09:cd",
        model: "US48",
        name: "FAU-MAINSW-P1",
        version: "5.64.8.13083",
        timestamp: { $date: "2021-10-12T14:05:00.054Z" },
        ports: [
          {
            num: 48,
            mac: "78:8a:20:26:b4:43",
            ip: "172.16.0.48",
            name: "FAU-PISO1-SE",
            model: "U7MSH",
            uptime: 201782,
            cpu: 8,
            mem: 64,
            tipo: "AP",
          },
          {
            num: 6,
            mac: "18:e8:29:56:70:37",
            ip: "172.16.0.127",
            name: "FAU-DECANATO-M",
            model: "U7MSH",
            uptime: 201783,
            cpu: 10,
            mem: 64,
            clientesap: [
              { mac: "ca:51:36:8e:d4:8d", ip: "172.16.17.193" },
              { mac: "24:46:c8:7e:92:c6", ip: "172.16.12.52" },
              { mac: "a2:af:05:9a:f6:f0", ip: "172.16.2.224" },
              { mac: "b4:bf:f6:ac:a2:dd", ip: "172.16.7.195" },
              { mac: "bc:98:df:e3:19:2e", ip: "172.16.13.26" },
              { mac: "98:8d:46:b3:16:90", ip: "172.16.15.24" },
              { mac: "e8:5a:8b:3c:f0:d1", ip: "172.16.15.189" },
              { mac: "60:1d:91:78:2e:0e", ip: "172.16.17.190" },
              { mac: "20:32:6c:fa:fc:40", ip: "172.16.30.93" },
              { mac: "6a:50:39:8c:83:d9", ip: "172.16.15.204" },
              { mac: "7a:8c:7e:41:9a:67", ip: "172.16.6.35" },
            ],
            tipo: "AP",
          },
          {
            num: 7,
            mac: "18:e8:29:56:73:dd",
            ip: "172.16.0.129",
            name: "FAU-URBANISMO",
            model: "U7MSH",
            uptime: 9414,
            cpu: 13,
            mem: 64,
            clientesap: [
              { mac: "38:80:df:48:d1:82", ip: "172.16.12.48" },
              { mac: "c8:f3:19:3a:59:8e", ip: "172.16.6.37" },
              { mac: "3a:11:85:56:44:2f", ip: "172.16.15.172" },
              { mac: "10:89:fb:95:19:3a", ip: "172.16.3.88" },
              { mac: "a6:0e:e1:74:3a:35", ip: "172.16.8.47" },
              { mac: "20:f4:78:3c:6e:84", ip: "172.16.18.218" },
              { mac: "b2:5d:da:34:60:ce", ip: "172.16.29.177" },
              { mac: "cc:0d:f2:61:c5:ca", ip: "172.16.13.108" },
              { mac: "4a:cf:3e:b9:e4:82", ip: "172.16.12.202" },
              { mac: "24:41:8c:40:58:e9", ip: "172.16.29.47" },
              { mac: "a2:e8:8e:c8:9c:f3", ip: "172.16.27.156" },
              { mac: "58:c5:cb:a5:f0:17", ip: "172.16.19.15" },
              { mac: "60:36:dd:2d:d6:1f", ip: "172.16.11.210" },
              { mac: "e4:58:e7:98:f6:2d", ip: "172.16.2.202" },
              { mac: "90:b0:ed:39:19:c6", ip: "172.16.17.223" },
              { mac: "5e:d2:ed:01:01:df", ip: "172.16.29.127" },
              { mac: "28:cd:c4:dd:1c:95", ip: "172.16.17.201" },
              { mac: "48:c7:96:1b:a8:ff", ip: "172.16.22.120" },
              { mac: "f2:0f:b6:50:c2:e3", ip: "172.16.3.235" },
              { mac: "00:45:e2:0c:53:37", ip: "172.16.11.162" },
              { mac: "38:80:df:c1:d8:f5", ip: "172.16.4.64" },
              { mac: "dc:89:83:63:5d:c3", ip: "172.16.14.18" },
            ],
            tipo: "AP",
          },
          {
            num: 4,
            mac: "f0:9f:c2:d0:1d:10",
            ip: "172.16.0.47",
            name: "FAU-HISTORIA",
            model: "U7MSH",
            uptime: 201760,
            cpu: 6,
            mem: 63,
            tipo: "AP",
          },
          {
            num: 2,
            mac: "18:e8:29:56:71:65",
            ip: "172.16.0.141",
            name: "FAU-PISO2-SE",
            model: "U7MSH",
            uptime: 201792,
            cpu: 7,
            mem: 64,
            clientesap: [
              { mac: "90:73:5a:71:85:87", ip: "172.16.21.102" },
              { mac: "10:89:fb:ee:db:2c", ip: "172.16.10.61" },
            ],
            tipo: "AP",
          },
          { num: 2, mac: "fc:aa:14:74:8c:a3", ip: "10.10.10.77" },
          { num: 45, mac: "bc:5f:f4:4e:5f:b6", ip: "10.10.10.23" },
          { num: 5, mac: "78:48:59:b9:9b:b5", ip: "10.10.1.52" },
          { num: 4, mac: "94:de:80:ca:40:ff", ip: "10.10.10.184" },
          { num: 2, mac: "e0:d5:5e:30:1d:10", ip: "10.10.10.149" },
          { num: 2, mac: "d0:50:99:06:89:7b", ip: "10.10.10.44" },
          { num: 5, mac: "70:71:bc:9d:2c:0a", ip: "10.10.10.18" },
          { num: 5, mac: "bc:5f:f4:4e:5f:e4", ip: "10.10.10.46" },
          { num: 6, mac: "e0:69:95:e4:c4:a1", ip: "10.10.10.36" },
          { num: 7, mac: "40:8d:5c:04:aa:a8", ip: "10.10.13.170" },
          { num: 5, mac: "00:19:d1:48:d9:49", ip: "10.10.11.182" },
          { num: 6, mac: "94:de:80:66:44:82", ip: "10.10.10.28" },
          { num: 6, mac: "00:1e:37:33:5e:2c", ip: "10.10.10.91" },
          { num: 3, mac: "48:5b:39:5e:4e:49", ip: "10.10.10.128" },
          { num: 6, mac: "fc:aa:14:74:85:ac", ip: "10.10.11.179" },
          { num: 2, mac: "e0:cb:4e:8b:d9:ee", ip: "10.10.11.181" },
          { num: 2, mac: "e0:69:95:e4:c5:c1", ip: "10.10.10.25" },
          { num: 6, mac: "bc:5f:f4:4e:5f:c5", ip: "10.10.10.26" },
          { num: 6, mac: "00:19:d1:ff:e4:27", ip: "10.10.11.53" },
        ],
        tipo: "SW",
      },
      {
        cpu: 80,
        temp: 71,
        uptime: 517803,
        mem: 55,
        ip: "10.10.1.66",
        mac: "78:8a:20:df:ae:ef",
        model: "US48",
        name: "FACET-MAINSW-BLOCK3-PB",
        version: "5.64.8.13083",
        timestamp: { $date: "2021-10-12T14:05:00.054Z" },
        ports: [
          {
            num: 1,
            mac: "78:8a:20:23:7d:de",
            ip: "172.16.0.124",
            name: "FACET-BLOCK3-P1-DECANATO",
            model: "U7MP",
            uptime: 201784,
            cpu: 20,
            mem: 67,
            clientesap: [
              { mac: "8c:b8:4a:0a:a4:40", ip: "172.16.14.77" },
              { mac: "72:64:24:6d:a9:8d", ip: "172.16.15.176" },
              { mac: "a8:51:5b:60:65:dc", ip: "172.16.14.98" },
              { mac: "ca:3b:8c:72:de:4e", ip: "172.16.22.213" },
              { mac: "90:63:3b:24:4c:60", ip: "172.16.4.223" },
              { mac: "18:21:95:7a:41:7d", ip: "172.16.14.104" },
            ],
            tipo: "AP",
          },
          {
            num: 43,
            mac: "78:8a:20:26:b6:c6",
            ip: "172.16.0.157",
            name: "FACET-BLOCK3-P0-ALUMNOS",
            model: "U7MSH",
            uptime: 201767,
            cpu: 17,
            mem: 67,
            clientesap: [
              { mac: "00:b8:b6:6c:3a:38", ip: "172.16.19.104" },
              { mac: "ac:0d:1b:c5:17:91", ip: "172.16.15.67" },
              { mac: "70:18:8b:fb:23:18", ip: "172.16.10.227" },
              { mac: "70:5a:0f:a2:87:3d", ip: "172.16.28.155" },
              { mac: "24:46:c8:ae:4b:ba", ip: "172.16.29.187" },
            ],
            tipo: "AP",
          },
          {
            num: 45,
            mac: "18:e8:29:56:51:32",
            ip: "172.16.0.142",
            name: "FACET-BLOCK3-P1-SALA.AUDIOVISUALES",
            model: "U7MSH",
            mem: { $numberLong: "-9223372036854775808" },
            tipo: "AP",
          },
          {
            num: 52,
            mac: "78:8a:20:26:b6:3f",
            ip: "172.16.0.148",
            name: "FACET-ILUM-1",
            model: "U7MSH",
            uptime: 201771,
            cpu: 13,
            mem: 65,
            clientesap: [
              { mac: "60:6c:66:ab:55:f9", ip: "172.16.27.37" },
              { mac: "e4:58:b8:6a:32:40", ip: "172.16.1.157" },
              { mac: "38:2d:e8:84:40:58", ip: "172.16.26.72" },
              { mac: "1c:56:fe:b7:29:1e", ip: "172.16.21.24" },
              { mac: "54:f2:01:1b:34:f7", ip: "172.16.14.88" },
              { mac: "0c:d2:92:0c:60:25", ip: "172.16.30.82" },
            ],
            tipo: "AP",
          },
          {
            num: 33,
            mac: "18:e8:29:56:6b:d0",
            ip: "172.16.0.146",
            name: "FACET-BLOCK3-P2-Of.POSGRADO",
            model: "U7MSH",
            uptime: 201735,
            cpu: 10,
            mem: 64,
            clientesap: [
              { mac: "58:d9:c3:5f:80:a9", ip: "172.16.17.57" },
              { mac: "e8:5a:8b:a3:da:82", ip: "172.16.12.102" },
              { mac: "fa:d4:93:c9:51:38", ip: "172.16.6.42" },
              { mac: "62:58:d9:83:93:69", ip: "172.16.11.214" },
            ],
            tipo: "AP",
          },
          {
            num: 50,
            mac: "74:83:c2:c0:53:67",
            ip: "172.16.0.159",
            name: "FACET-POTENCIA-MEM",
            model: "U7PG2",
            uptime: 201769,
            cpu: 7,
            mem: 62,
            tipo: "AP",
          },
          {
            num: 52,
            mac: "78:8a:20:26:b6:c5",
            ip: "172.16.0.149",
            name: "FACET-ILUM-2",
            model: "U7MSH",
            uptime: 201721,
            cpu: 13,
            mem: 66,
            clientesap: [
              { mac: "24:fb:65:3d:fe:3b", ip: "172.16.2.118" },
              { mac: "54:13:79:1a:ad:34", ip: "172.16.1.246" },
              { mac: "8c:f1:12:73:2e:35", ip: "172.16.22.217" },
              { mac: "fc:d4:36:c8:f3:ed", ip: "172.16.23.45" },
              { mac: "98:9c:57:37:64:90", ip: "172.16.9.95" },
              { mac: "34:de:1a:c7:df:ee", ip: "172.16.12.171" },
              { mac: "42:ac:67:a1:7b:34", ip: "172.16.14.27" },
              { mac: "ac:5f:3e:45:55:f9", ip: "172.16.13.154" },
            ],
            tipo: "AP",
          },
          {
            num: 50,
            mac: "18:e8:29:56:71:4f",
            ip: "172.16.0.147",
            name: "FACET-POTENCIA",
            model: "U7MSH",
            uptime: 201761,
            cpu: 8,
            mem: 63,
            clientesap: [
              { mac: "18:fe:34:9f:ef:b9", ip: "172.16.12.18" },
              { mac: "74:e5:43:10:10:72", ip: "172.16.22.235" },
            ],
            tipo: "AP",
          },
          { num: 4, mac: "1c:1b:0d:52:df:74", ip: "10.10.10.152" },
          { num: 24, mac: "70:85:c2:5e:54:c3", ip: "10.10.12.43" },
          { num: 1, mac: "00:27:0e:1c:d5:f4", ip: "10.10.10.102" },
          { num: 1, mac: "00:1c:c0:6a:19:05", ip: "10.10.10.62" },
          { num: 17, mac: "00:d8:61:2d:87:48", ip: "10.10.10.117" },
          { num: 10, mac: "70:85:c2:5e:a6:6b", ip: "10.10.12.111" },
          { num: 1, mac: "d0:50:99:55:71:bf", ip: "10.10.10.10" },
          { num: 1, mac: "00:19:66:e9:6e:46", ip: "10.10.10.232" },
          { num: 52, mac: "1c:1b:0d:d7:24:54", ip: "10.10.10.143" },
          { num: 2, mac: "00:15:6d:3e:16:c7", ip: "172.16.0.24" },
          { num: 22, mac: "74:d4:35:0b:1e:10", ip: "10.10.10.125" },
          { num: 52, mac: "74:d0:2b:c6:e6:ae", ip: "10.10.10.205" },
          { num: 3, mac: "00:d8:61:2d:8a:7a", ip: "10.10.12.121" },
          { num: 1, mac: "a0:b3:cc:a1:82:eb", ip: "10.10.0.25" },
          { num: 52, mac: "d0:27:88:e3:f2:9a", ip: "10.10.10.31" },
          { num: 1, mac: "70:71:bc:0e:12:99", ip: "10.10.10.38" },
          { num: 52, mac: "fc:aa:14:21:12:1e", ip: "10.10.11.194" },
          { num: 46, mac: "00:0d:54:b0:30:c0" },
          { num: 47, mac: "70:71:bc:18:3a:51", ip: "10.10.10.75" },
          { num: 52, mac: "40:8d:5c:fc:63:3e", ip: "10.10.11.49" },
          { num: 1, mac: "00:1e:c9:20:34:71", ip: "10.10.12.233" },
          { num: 52, mac: "9c:dc:71:af:69:4b" },
          { num: 52, mac: "bc:5f:f4:3e:c2:65", ip: "10.10.10.126" },
          { num: 50, mac: "e8:f7:24:61:2b:8c" },
          { num: 33, mac: "88:8e:01:03:00:5f" },
          { num: 52, mac: "e0:69:95:a6:86:c5", ip: "10.10.10.226" },
          { num: 36, mac: "78:ac:c0:b2:a6:63", ip: "10.10.10.68" },
          { num: 34, mac: "3c:2a:f4:7d:37:f4", ip: "10.10.0.29" },
          { num: 35, mac: "00:1f:c6:99:ec:73", ip: "10.10.10.49" },
          { num: 52, mac: "80:ee:73:87:83:85", ip: "10.10.10.15" },
          { num: 52, mac: "00:25:ab:32:31:54", ip: "10.10.10.33" },
          { num: 1, mac: "e8:40:f2:d1:0d:9b", ip: "10.10.12.60" },
          { num: 52, mac: "00:13:8f:9b:7b:f4", ip: "10.10.11.152" },
          { num: 1, mac: "00:1c:c0:7f:d8:92", ip: "10.10.14.193" },
          { num: 52, mac: "40:b0:76:10:cd:2d" },
          { num: 17, mac: "d0:50:99:a7:73:28", ip: "10.10.11.166" },
          { num: 29, mac: "00:15:c5:36:88:b1", ip: "10.10.12.181" },
          { num: 42, mac: "78:ac:c0:ab:3f:2a", ip: "10.10.10.12" },
          { num: 52, mac: "d0:50:99:7b:84:eb", ip: "10.10.12.15" },
          { num: 1, mac: "70:71:bc:18:3a:1b", ip: "10.10.10.97" },
          { num: 33, mac: "00:1e:c1:90:35:e0" },
          { num: 1, mac: "00:1c:c5:86:2e:80" },
          { num: 30, mac: "00:25:22:3e:e9:35", ip: "10.10.10.19" },
          { num: 1, mac: "70:85:c2:4f:17:5a", ip: "10.10.11.140" },
          { num: 1, mac: "1c:1b:0d:d7:24:55", ip: "10.10.13.206" },
          { num: 47, mac: "74:d4:35:0b:1d:fe", ip: "10.10.10.104" },
          { num: 52, mac: "8c:dc:d4:b9:5d:16", ip: "10.10.11.147" },
          { num: 47, mac: "20:fd:f1:eb:da:4d" },
          { num: 13, mac: "00:1f:c6:99:f1:84", ip: "10.10.14.27" },
          { num: 19, mac: "70:85:c2:85:7c:1d", ip: "10.10.12.217" },
          { num: 6, mac: "70:71:bc:18:3a:2e", ip: "10.10.10.34" },
          { num: 33, mac: "30:9c:23:cd:1f:62", ip: "10.10.12.25" },
          { num: 33, mac: "30:9c:23:cd:1f:de", ip: "10.10.11.162" },
          { num: 52, mac: "40:01:c6:b9:d4:ba" },
          { num: 51, mac: "00:0a:e6:9e:c0:29", ip: "10.10.10.114" },
          { num: 1, mac: "b4:2e:99:43:e5:24", ip: "10.10.11.209" },
          { num: 47, mac: "94:de:80:60:80:c1", ip: "10.10.10.21" },
          { num: 52, mac: "3c:2a:f4:43:b1:1e", ip: "10.10.11.237" },
        ],
        tipo: "SW",
      },
      {
        cpu: 78,
        temp: 61,
        uptime: 517805,
        mem: 55,
        ip: "10.10.1.104",
        mac: "b4:fb:e4:2f:c0:3a",
        model: "US48",
        name: "FACET-SW-BLOCK1-P2",
        version: "5.64.8.13083",
        timestamp: { $date: "2021-10-12T14:05:00.054Z" },
        ports: [
          {
            num: 45,
            mac: "78:8a:20:26:b2:02",
            ip: "172.16.0.101",
            name: "FACET-BLOCK1-P2-Of.1-2-18",
            model: "U7MSH",
            uptime: 201761,
            cpu: 15,
            mem: 66,
            clientesap: [{ mac: "46:5f:54:23:f2:25", ip: "172.16.11.147" }],
            tipo: "AP",
          },
          {
            num: 47,
            mac: "78:8a:20:23:7f:ce",
            ip: "172.16.0.115",
            name: "FACET-BLOCK1-P2",
            model: "U7MP",
            uptime: 201738,
            cpu: 14,
            mem: 64,
            clientesap: [{ mac: "c0:d9:62:76:be:6b", ip: "172.16.22.237" }],
            tipo: "AP",
          },
          {
            num: 1,
            mac: "78:8a:20:26:b1:92",
            ip: "172.16.0.116",
            name: "FACET-BLOCK1-P2-LAB.TELECOM.",
            model: "U7MSH",
            uptime: 201790,
            cpu: 11,
            mem: 65,
            clientesap: [{ mac: "ee:fe:ef:7a:3f:fb", ip: "172.16.17.72" }],
            tipo: "AP",
          },
          { num: 26, mac: "00:00:e8:56:bd:e4", ip: "10.10.10.79" },
          { num: 48, mac: "00:15:6d:3f:1f:83" },
          { num: 2, mac: "00:e0:4c:00:3a:68", ip: "10.10.10.80" },
          { num: 1, mac: "00:1b:2a:2b:36:01", ip: "10.10.1.19" },
          { num: 13, mac: "00:19:66:d0:9b:b0", ip: "10.10.11.180" },
          { num: 10, mac: "4c:cc:6a:0b:6d:b3", ip: "10.10.12.180" },
          { num: 1, mac: "00:1b:2a:2b:36:40", ip: "10.10.1.19" },
          { num: 23, mac: "00:80:ad:09:0e:61", ip: "10.10.11.153" },
          { num: 29, mac: "00:27:0e:03:db:57", ip: "10.10.11.145" },
          { num: 48, mac: "52:c7:be:b8:ec:26", ip: "172.16.12.21" },
          { num: 14, mac: "bc:ae:c5:a4:4c:56", ip: "10.10.10.65" },
          { num: 48, mac: "52:c7:be:b3:33:81", ip: "172.16.1.81" },
          { num: 10, mac: "00:25:11:a4:ad:1f", ip: "10.10.0.240" },
          { num: 36, mac: "00:e0:4c:00:39:e3", ip: "10.10.13.61" },
        ],
        tipo: "SW",
      },
      {
        cpu: 77,
        temp: 56,
        uptime: 517822,
        mem: 55,
        ip: "10.10.1.105",
        mac: "b4:fb:e4:89:08:92",
        model: "US48",
        name: "FAU-SW-AULA-INFORMATICA",
        version: "5.64.8.13083",
        timestamp: { $date: "2021-10-12T14:05:00.054Z" },
        ports: [
          {
            num: 2,
            mac: "f0:9f:c2:d0:1d:be",
            ip: "172.16.0.109",
            name: "FAU-MATEMATICA-1rPISO_BLK_BIBLIOTECA",
            model: "U7MSH",
            uptime: 517822,
            cpu: 11,
            mem: 64,
            clientesap: [
              { mac: "94:39:e5:bd:03:d7", ip: "172.16.19.194" },
              { mac: "30:07:4d:a5:98:f4", ip: "172.16.30.41" },
              { mac: "cc:46:4e:a7:a7:ae", ip: "172.16.29.228" },
              { mac: "58:20:59:72:1d:1b", ip: "172.16.3.61" },
              { mac: "fc:a6:21:67:0a:35", ip: "172.16.1.255" },
              { mac: "4c:66:41:4c:03:3a", ip: "172.16.28.69" },
              { mac: "50:98:39:1d:49:62", ip: "172.16.25.167" },
              { mac: "24:92:0e:87:9c:6e", ip: "172.16.18.134" },
              { mac: "86:23:eb:18:0b:3a", ip: "172.16.25.57" },
              { mac: "aa:49:78:5f:fc:55", ip: "172.16.26.226" },
              { mac: "8c:f1:12:43:93:1e", ip: "172.16.27.106" },
              { mac: "a4:50:46:34:45:67", ip: "172.16.11.150" },
              { mac: "48:c7:96:b3:22:91", ip: "172.16.23.235" },
              { mac: "42:a7:5e:6c:40:44", ip: "172.16.19.227" },
              { mac: "48:c7:96:25:eb:8b", ip: "172.16.22.127" },
              { mac: "0a:c7:9e:63:5f:50", ip: "172.16.20.250" },
            ],
            tipo: "AP",
          },
          { num: 2, mac: "20:fd:f1:45:f8:af" },
          { num: 51, mac: "00:23:69:61:cd:23", ip: "10.10.0.42" },
          { num: 51, mac: "00:15:6d:3e:16:d4", ip: "172.16.0.56" },
        ],
        tipo: "SW",
      },
      {
        cpu: 78,
        temp: 62,
        uptime: 517767,
        mem: 55,
        ip: "10.10.1.108",
        mac: "e0:63:da:2b:66:83",
        model: "US48",
        name: "FAU-SW-ALUMNOS",
        version: "5.64.8.13083",
        timestamp: { $date: "2021-10-12T14:05:00.054Z" },
        ports: [
          {
            num: 1,
            mac: "18:e8:29:56:8b:6c",
            ip: "172.16.0.140",
            name: "FAU-ALUMNOS",
            model: "U7MSH",
            uptime: 201754,
            cpu: 9,
            mem: 65,
            clientesap: [
              { mac: "22:ca:1c:a9:3a:da", ip: "172.16.20.69" },
              { mac: "a4:07:b6:7e:4b:7b", ip: "172.16.18.204" },
              { mac: "6e:98:ba:f0:de:9c", ip: "172.16.6.52" },
              { mac: "0a:98:43:14:05:39", ip: "172.16.13.55" },
              { mac: "6c:c7:ec:93:ff:70", ip: "172.16.25.248" },
            ],
            tipo: "AP",
          },
          { num: 48, mac: "a2:0a:49:72:51:18", ip: "200.45.169.75" },
          { num: 23, mac: "bc:5f:f4:4e:5f:d9", ip: "10.10.10.56" },
          { num: 48, mac: "94:de:80:66:45:21", ip: "10.10.10.54" },
          { num: 48, mac: "34:40:b5:c9:25:0e", ip: "192.168.30.13" },
          { num: 48, mac: "70:85:c2:5e:32:5e", ip: "10.10.10.42" },
          { num: 48, mac: "70:85:c2:4e:69:bc", ip: "10.10.11.220" },
          { num: 48, mac: "9c:dc:71:af:69:48", ip: "10.10.10.29" },
          { num: 48, mac: "00:19:21:41:64:ef", ip: "10.10.10.32" },
          { num: 48, mac: "94:de:80:66:42:df", ip: "10.10.10.11" },
          { num: 48, mac: "00:1a:64:ec:55:b6" },
          { num: 48, mac: "78:48:59:a2:ec:77", ip: "10.10.1.5" },
          { num: 48, mac: "02:78:97:20:ec:0b", ip: "10.10.4.198" },
          { num: 48, mac: "92:51:3c:7d:76:fc", ip: "10.10.0.7" },
          { num: 48, mac: "20:fd:f1:45:f8:ae", ip: "10.10.1.42" },
          { num: 48, mac: "94:de:80:66:05:28", ip: "10.10.10.0" },
          { num: 48, mac: "70:85:c2:5e:a6:5d", ip: "10.10.11.165" },
          { num: 48, mac: "7a:28:95:95:5b:ea" },
          { num: 33, mac: "bc:5f:f4:4e:5f:e2", ip: "10.10.10.161" },
          { num: 48, mac: "32:32:32:32:66:38", ip: "10.10.0.202" },
          { num: 48, mac: "34:40:b5:c8:5c:be", ip: "192.168.30.12" },
          { num: 32, mac: "b4:2e:99:51:d1:51", ip: "10.10.10.61" },
          { num: 48, mac: "30:9c:23:cd:1e:89", ip: "10.10.11.32" },
          { num: 48, mac: "2c:23:3a:7e:22:a2" },
          { num: 48, mac: "d4:ca:6d:01:09:d4" },
          { num: 48, mac: "ea:97:31:3c:af:1c", ip: "10.10.0.28" },
          { num: 48, mac: "00:1c:c5:ad:f1:d3" },
          { num: 43, mac: "94:de:80:64:5d:c7", ip: "10.10.10.98" },
          { num: 48, mac: "78:48:59:a3:b7:4f" },
          { num: 48, mac: "58:35:d9:0a:ac:96", ip: "10.10.10.30" },
          { num: 48, mac: "36:64:62:35:36:36", ip: "10.10.0.205" },
          { num: 48, mac: "5c:8a:38:63:cb:88", ip: "10.10.1.61" },
          { num: 48, mac: "a0:b3:cc:a1:92:13", ip: "10.10.0.23" },
          { num: 48, mac: "68:b5:99:4f:2a:85", ip: "10.15.2.35" },
          { num: 44, mac: "00:1e:37:33:61:3d", ip: "10.10.10.55" },
          { num: 48, mac: "5c:8a:38:63:e8:48", ip: "10.10.1.60" },
          { num: 48, mac: "74:d4:35:0b:21:76", ip: "10.10.10.105" },
          { num: 35, mac: "18:c0:4d:20:24:60", ip: "10.10.10.119" },
        ],
        tipo: "SW",
      },
      {
        cpu: 81,
        temp: 61,
        uptime: 682113,
        mem: 55,
        ip: "10.10.1.101",
        mac: "b4:fb:e4:89:0a:03",
        model: "US48",
        name: "CORESW-US48",
        version: "5.64.8.13083",
        timestamp: { $date: "2021-10-12T14:05:00.054Z" },
        ports: [
          {
            num: 10,
            mac: "18:e8:29:56:6f:bb",
            ip: "172.16.0.139",
            name: "FACET-BLOCK1-P3",
            model: "U7MSH",
            uptime: 201768,
            cpu: 16,
            mem: 66,
            clientesap: [
              { mac: "b4:d1:da:c1:49:3f", ip: "172.16.4.38" },
              { mac: "80:30:49:61:0e:97", ip: "172.16.6.44" },
              { mac: "e0:dc:ff:04:61:d3", ip: "172.16.24.236" },
              { mac: "c8:ff:28:a7:33:45", ip: "172.16.12.25" },
            ],
            tipo: "AP",
          },
          {
            num: 8,
            mac: "78:8a:20:23:7c:07",
            ip: "172.16.0.113",
            name: "FACET-BLOCK1-P0-CTI",
            model: "U7MP",
            uptime: 201713,
            cpu: 16,
            mem: 68,
            tipo: "AP",
          },
          { num: 8, mac: "40:01:c6:b9:81:61" },
          { num: 31, mac: "6c:3b:6b:7a:41:f8", ip: "170.210.208.130" },
          { num: 4, mac: "e2:77:b0:f3:44:97", ip: "200.45.169.80" },
          { num: 1, mac: "32:33:62:39:38:66" },
          { num: 8, mac: "00:1b:24:2d:ba:ad", ip: "10.10.4.240" },
          { num: 30, mac: "78:48:59:be:43:eb", ip: "192.168.50.1" },
          { num: 10, mac: "00:0b:fd:cd:c0:80", ip: "10.10.1.54" },
          { num: 30, mac: "78:48:59:a9:90:c5", ip: "192.168.50.2" },
          { num: 21, mac: "98:be:94:0f:5d:2e", ip: "10.10.4.20" },
          { num: 24, mac: "6c:3b:6b:7a:41:f4", ip: "10.10.0.2" },
          { num: 1, mac: "aa:79:d7:66:f0:16" },
          { num: 11, mac: "44:37:e6:b4:83:96", ip: "192.168.1.100" },
          { num: 1, mac: "66:62:63:65:66:31" },
          { num: 4, mac: "42:41:61:ca:a4:1a" },
          { num: 10, mac: "00:0b:fd:cd:c0:99" },
          { num: 8, mac: "00:0c:29:c1:e5:ff", ip: "10.10.20.5" },
          { num: 10, mac: "e0:d5:5e:30:74:95", ip: "10.10.12.173" },
          { num: 1, mac: "6e:62:b1:49:9a:21" },
          { num: 4, mac: "46:ae:88:c5:db:bd", ip: "200.45.169.82" },
          { num: 4, mac: "e2:43:19:af:14:11" },
          { num: 4, mac: "42:e9:8a:3a:2f:37" },
          { num: 1, mac: "b6:1d:f9:ad:ec:92", ip: "10.10.0.67" },
          { num: 1, mac: "9e:21:94:67:b8:7c" },
          { num: 45, mac: "00:1b:24:3e:0b:d1", ip: "10.10.0.26" },
          { num: 1, mac: "32:62:33:38:61:36" },
        ],
        tipo: "SW",
      },
      {
        cpu: 77,
        temp: 61,
        uptime: 4821501,
        mem: 55,
        ip: "10.10.1.14",
        mac: "78:8a:20:df:ac:0a",
        model: "US48",
        name: "CORESW-US48-CTI",
        version: "5.64.8.13083",
        timestamp: { $date: "2021-10-12T14:05:00.054Z" },
        ports: [
          { num: 13, mac: "00:21:5e:09:66:34", ip: "10.10.4.21" },
          { num: 49, mac: "62:8d:8d:a5:85:ed", ip: "200.45.169.73" },
          { num: 7, mac: "44:37:e6:b4:83:72", ip: "10.10.0.17" },
        ],
        tipo: "SW",
      },
      {
        cpu: 70,
        temp: 67,
        uptime: 517831,
        mem: 52,
        ip: "10.10.1.106",
        mac: "b4:fb:e4:23:50:db",
        model: "US24",
        name: "FAU-SW-P4",
        version: "5.64.8.13083",
        timestamp: { $date: "2021-10-12T14:05:00.054Z" },
        ports: [
          {
            num: 24,
            mac: "18:e8:29:56:70:b7",
            ip: "172.16.0.143",
            name: "FAU-PISO4",
            model: "U7MSH",
            uptime: 201755,
            cpu: 10,
            mem: 65,
            clientesap: [
              { mac: "da:11:45:9c:fc:25", ip: "172.16.5.196" },
              { mac: "e2:4b:a0:81:85:2d", ip: "172.16.7.253" },
              { mac: "b0:52:16:5c:62:0b", ip: "172.16.9.128" },
            ],
            tipo: "AP",
          },
        ],
        tipo: "SW",
      },
    ],
  },
  numaps: 62,
  numclients: 880,
  numsws: 14,
  numusgs: 1,
  lat: -26.8198,
  lng: -65.2169,
};
