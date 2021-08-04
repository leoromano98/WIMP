import { API_HOST, TOKEN } from "../utils/constant";
import jwtDecode from "jwt-decode";

export function deactivateSwitch() {
  var token = getTokenApi();

  var data = {
    idSwitch : "6109466ed13c2240886c75c4"
  }
  
  const url = `${API_HOST}/switches/desactivar`;
  console.log(token)

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Authorization': "Bearer " + token
    },
    body: JSON.stringify(data)
  };

  
  return fetch(url, params)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response)
        return response;
      }
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}


export function activateSwitch() {
  var token = getTokenApi();

  var data = {
    idSwitch : "610409d67d4b4bdbf3b636cc"
  }
  
  const url = `${API_HOST}/switches/activar`;
  console.log(token)

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Authorization': "Bearer " + token
    },
    body: JSON.stringify(data)
  };

  
  return fetch(url, params)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response)
        return response;
      }
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}


export function createUser() {
  var token = getTokenApi();

  var data = {
    email: "elpingudo@gmail.com",
    usuario: "El PITUDO",
    password: "12345678"
  }
  
  const url = `${API_HOST}/usuarios/crear`;
  console.log(token)

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': "Bearer " + token
    },
    body: JSON.stringify(data)
  };

  
  return fetch(url, params)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response)
        return response;
      }
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}



export function createSwitch() {
  var token = getTokenApi();

  var data = {
     lat : 111,
     lng : 222,
     nombre : "El suich hijo ?????",
     modelo : "Super Super Sayayin 3",
     idPadre: "61093c9ad13c2240886c75c2"
  }
  
  const url = `${API_HOST}/switches/crear`;
  console.log(token)

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': "Bearer " + token
    },
    body: JSON.stringify(data)
  };

  
  return fetch(url, params)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response)
        return response;
      }
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

export function modifySwitch() {
  var token = getTokenApi();

  var data = {
    idSwitch : "610409d67d4b4bdbf3b636cc",
     lat : 100,
     lng : 200,
     nombre : "Pingudo5",
     modelo : "Pingudo3000 Super Sayayin 3",
  }
  
  const url = `${API_HOST}/switches/modificar`;
  console.log(token)

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Authorization': "Bearer " + token
    },
    body: JSON.stringify(data)
  };

  
  return fetch(url, params)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response)
        return response;
      }
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

export function deleteSwitch() {
  var token = getTokenApi();
  var idSwitch = "610409a57d4b4bdbf3b636cb";
  const url = `${API_HOST}/switches/borrar?idSwitch=`+idSwitch;
  console.log(token)

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      'Authorization': "Bearer " + token
    },
  };

  return fetch(url, params)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response.json())
        return response.json();
      }
    })
    .then(result => {
      console.log(result)
      return result;
    })
    .catch(err => {
      console.log(err)
      return err;
    });
}

export function getTopology() {
  var token = getTokenApi();
  const url = `${API_HOST}/switches/topologia`;
  console.log(token)

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': "Bearer " + token
    },
  };

  return fetch(url, params)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response.json())
        return response.json();
      }
    })
    .then(result => {
      return result;
    })
    .catch(err => {
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
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userTemp)
  };

  return fetch(url, params)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

export function signInApi(user,password) {
  const url = `${API_HOST}/usuarios/iniciar-sesion`;

  const data = {
    usuario: user,
    password: password
  };

  const params = {
    method: "POST",
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return fetch(url, params)
    .then(response => {
        console.log("aqui: ", response)
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { message: "Usuario o contraseña incorrectos" };
    })
    .then(result => {
      return result;
    })
    .catch(err => {
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
  console.log(timeout)
  if (timeout < 0) {
    return true;
  }
  return false;
}