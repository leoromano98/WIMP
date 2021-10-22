// @DOC:
// this.state.showModal === 0 => no mostrar modal
// this.state.showModal === 1 => mostrar AGREGAR switch
// this.state.showModal === 2 =>  mostrar MODIFICAR switch

// showSwitches : dibuja los switches ya guardados

import React, { Component, useState, useEffect } from "react";
import { Map, Leaflet } from "leaflet";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
  MapConsumer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import marker from "../../assets/img/switch.svg";
import TableComponent from "../../components/Table/Table";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import {
  getTopology,
  listarSwitches,
  createSwitch,
  modifySwitch,
  formatDate,
  ubicarSwitch,
} from "../../api/auth";
import { findDOMNode } from "react-dom";
import zIndex from "@material-ui/core/styles/zIndex";

let myIcon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor: [-0, -0],
  iconSize: [70, 45],
});

//@DOC: Click en el mapa, añade icono (switch)
function MyComponent({ saveMarkers }) {
  window.scrollTo({ top: 0, behavior: "smooth" });

  var marker;

  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      marker = new L.marker([lat, lng], { icon: myIcon });
      map.addLayer(marker);
      saveMarkers([lat, lng]);
      // L.marker([lat, lng], { icon: myIcon }).addTo(map);
      console.log("markerbrop", marker);
    },
  });
  return null;
}

// @DOC: Definir estado del dispositivo. (AL FINAL SE USA OTRO METODO)
// mark1 = tiempo en minutos que cambia a estado 'advertencia'
// mark2 = tiempo en minutos que cambia a estado 'desconectado'
// ---CONECTADO---|---ADVERTENCIA---|---DESCONECTADO---
//              mark1             mark2
// const putState = (timestamp) => {
//   const time = new Date(timestamp);
//   const now = new Date();
//   const difference = (now.getTime() - time.getTime()) / 1000; //obtengo diferencia en segundos entre un tiempo y otro
//   const mark1 = 15;
//   const mark2 = 30;
//   if (difference < mark1 * 60) {
//     return "Activo";
//   } else {
//     if (difference < mark2 * 60) {
//       return "Advertencia";
//     }
//     return "Desconectado";
//   }
// };

const putState = (timestamp) => {
  const time = new Date(timestamp);
  const now = new Date();
  const difference = (now.getTime() - time.getTime()) / 1000; //obtengo diferencia en segundos entre un tiempo y otro
  const mark1 = 15;
  const mark2 = 30;
  if (difference < mark1 * 60) {
    return "Activo";
  } else {
    if (difference < mark2 * 60) {
      return "Advertencia";
    }
    return "Desconectado";
  }
};

export default class MapDisplay extends Component {
  state = {
    showModal: 0,
    newSwitch: {
      name: "a",
      position: {
        lat: 0,
        lng: 0,
      },
      parent: "a",
    },
    map: {
      lat: -26.84174,
      lng: -65.23149,
      zoom: 17,
    },
    selectedSwitch: null,
    newName: null,
    newModel: null,
    newParent: null,
    newLat: null,
    newLng: null,
    switches: [],
    new: null,
    modifyParent: null,
    showSwitches: null,
  };

  async getSwitches() {
    var response = await listarSwitches();
    const switches = response;
    console.log("switches", switches);
    switches.forEach((index) => {
      index.formatedDate = formatDate(index.timestamp);
      if (index?.mem < 0) {
        index.state = "Inactivo";
      } else {
        index.state = "Activo";
      }
      if (!index.fanlevel) {
        index.fanlevel = "-";
      }
      if (!index.cpu) {
        index.cpu = "-";
      }
      if (!index.temp) {
        index.temp = "-";
      }
      if (!index.lat || !index.lng) {
        index.lat = 0;
        index.lng = 0;
      }
    });
    this.setState({
      switches: switches,
    });
    this.updateLines();
    return switches;
  }

  componentDidMount() {
    this.getSwitches().then((response) => {
      let positions = [];
      const showSwitches = [];
      // for (var i = 0; i < response.length; i++) {
      //   positions.push({ lat: 0, lng: 0 });
      // }

      response.forEach((index) => {
        const switchPos = { lat: index.lat, lng: index.lng };
        positions.push(switchPos);
      });

      // LA IDEA ES: 1 GUARDAR EN ESTADO LAS POSICIONES VACIAS, 2 CREAR MARCADORES QEU APUNTEN AL ESTADO DE POSICIONES,
      // 3 ACTUALIZAR ESTADO DE POSICIONES CON LAS VERDADERAS, 4 CUANDO MODIFIQUE ESTADO DE POSICIONES DEBERIAN MOVERSE

      this.setState({
        positions: positions,
      });

      console.log(this.state.positions);

      var i = 0;
      response.forEach((index) => {
        console.log("cabeza", this.state.positions[i], index);
        showSwitches.push(
          <Marker
            position={this.state.positions[i]}
            icon={this.myIcon}
            onClick={this.handleClick}
            id={index.mac}
            draggable={false}
          >
            <Popup>
              {index.name}
              <br />
              {index.mac}
            </Popup>
          </Marker>
        );
        i++;
      });
      this.setState({
        showSwitches: showSwitches,
      });
    });
  }

  //@DOC: Click en el mapa, añade icono (switch)
  // MyComponent = ({ saveMarkers }) => {
  //   console.log("si!");
  //   // const map = useMapEvents({
  //   //   click: (e) => {
  //   //     const { lat, lng } = e.latlng;
  //   //     saveMarkers([lat, lng]);
  //   //     L.marker([lat, lng], { icon: myIcon }).addTo(map);
  //   //   },
  //   // });
  //   // if(this.state.)
  //   return null;
  // };

  // @DOC: Funcion que se ejecuta al hacer clic en el mapa
  saveMarkers = (newMarkerCoords) => {
    // this.setState({
    //   showModal: 1,
    //   newLat: newMarkerCoords[0],
    //   newLng: newMarkerCoords[1],
    //   newName: null,
    //   newModel: null,
    //   newParent: null,
    // });

    alert("guardar lat y lng por hTTP ");
    ubicarSwitch(
      this.state.selectedSwitch.mac,
      newMarkerCoords[0],
      newMarkerCoords[1]
    );

    // @LEO
    // for each .props.id === this.state.selectedSwitch.mac => position = {newposition}
    const findIndex = this.state.showSwitches.findIndex(
      (index) => index.props.id === this.state.selectedSwitch.mac
    );
    const newPositions = this.state.positions;
    newPositions[findIndex] = {
      lat: newMarkerCoords[0],
      lng: newMarkerCoords[1],
    };

    this.setState({
      positions: newPositions,
      selectedSwitch: null,
      rerender: !this.state.rerender,
    });

    //TODO: PUT lat y lng; hacer get de todos los sw; recargar mapa
    this.getSwitches();
  };

  myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [70, 45],
  });

  updateLines = () => {
    if (this.state.switches.length !== 0) {
      const drawLines = this.state.switches.map((index) => {
        if (index._pid) {
          let parentIndex = this.state.switches.findIndex(
            (i) => index._pid === i._id
          );
          console.log("parentIndex", parentIndex);
          if (parentIndex >= 0) {
            return (
              <Polyline
                positions={[
                  [
                    this.state.switches[parentIndex].lat,
                    this.state.switches[parentIndex].lng,
                  ],
                  [index.lat, index.lng],
                ]}
                color={"red"}
              />
            );
          }
        } else {
          return null;
        }
      });
      this.setState({
        drawLines: drawLines,
      });
    }
  };

  handleInfoButton = (event) => {
    console.log("a", event.target.id);
  };

  handlePositionButton = (event) => {
    console.log("B ", event.target.id, this.state.switches);
    const findSwitch = this.state.switches.find(
      (element) => element.name === event.target.id
    );

    const findIndex = this.state.switches.findIndex(
      (element) => element.name === event.target.id
    );
    console.log('index',findIndex)

    const newShowSwitches = this.state.showSwitches;
    newShowSwitches[findIndex] = (
      <Marker
        position={this.state.positions[findIndex]}
        icon={this.myIcon}
        onClick={this.handleClick}
        id={this.state.switches[findIndex].mac}
        draggable={true}
      >
        {console.log("holi", this.state.positions[findIndex], this.state.switches[findIndex])}
        <Popup>
          {this.state.switches[findIndex].name}
          <br />
          {this.state.switches[findIndex].mac}
        </Popup>
      </Marker>
    );

    this.setState({
      selectedSwitch: findSwitch,
      showSwitches: newShowSwitches
    });

    console.log('mamut', this.state.showSwitches, newShowSwitches)

  };

  // DraggableMarker = () => {
  //   const [draggable, setDraggable] = useState(false)
  //   const [position, setPosition] = useState(center)
  //   const markerRef = useRef(null)
  //   const eventHandlers = useMemo(
  //     () => ({
  //       dragend() {
  //         const marker = markerRef.current
  //         if (marker != null) {
  //           setPosition(marker.getLatLng())
  //         }
  //       },
  //     }),
  //     [],
  //   )
  //   const toggleDraggable = useCallback(() => {
  //     setDraggable((d) => !d)
  //   }, [])

  //   return (
  //     <Marker
  //       draggable={draggable}
  //       eventHandlers={eventHandlers}
  //       position={position}
  //       ref={markerRef}>
  //       <Popup minWidth={90}>
  //         <span onClick={toggleDraggable}>
  //           {draggable
  //             ? 'Marker is draggable'
  //             : 'Click here to make marker draggable'}
  //         </span>
  //       </Popup>
  //     </Marker>
  //   )
  // }

  render() {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1000);

    const position = [this.state.map.lat, this.state.map.lng];

    console.log("!!", this.state.showSwitches);

    if (this.state.switches.length !== 0) {
      var tableData = JSON.parse(JSON.stringify(this.state.switches));
      tableData.forEach((element) => {
        delete element["_id"];
        delete element["_pid"];
        delete element["lat"];
        delete element["lng"];
      });
    }

    const header = [
      { key: "state", text: "Estado", colors: "true" },
      { key: "model", text: "Modelo" },
      { key: "name", text: "Nombre" },
      { key: "cpu", text: "CPU" },
      { key: "fanlevel", text: "FAN" },
      { key: "mem", text: "MEM" },
      { key: "temp", text: "TEMP" },
      { key: "formatedDate", text: "Ult. Actualizacion" },
      // {
      //   key: "info",
      //   text: "Informacion",
      //   isButton: true,
      //   handler: this.handleInfoButton,
      // },
      {
        key: "position",
        text: "Asignar ubicacion",
        isButton: true,
        handler: this.handlePositionButton,
      },
    ];

    const getParentId = (nameParent) => {
      var parentId = this.state.switches.find(
        (index) => index.nombre === nameParent
      )?._id;
      return parentId;
    };

    const getParentName = (parentId) => {
      var parentName = this.state.switches.find(
        (index) => index._id === parentId
      )?.nombre;
      console.log(parentName);
      return parentName;
    };

    var drawLines = this.state.drawLines;
    // const updateLines = () => {
    //   if (this.state.switches.length !== 0) {
    //     drawLines = this.state.switches.map((index) => {
    //       if (index._pid) {
    //         let parentIndex = this.state.switches.findIndex(
    //           (i) => index._pid === i._id
    //         );
    //         return (
    //           <Polyline
    //             positions={[
    //               [
    //                 this.state.switches[parentIndex].lat,
    //                 this.state.switches[parentIndex].lng,
    //               ],
    //               [index.lat, index.lng],
    //             ]}
    //             color={"red"}
    //           />
    //         );
    //       } else {
    //         return null;
    //       }
    //     });
    //   }
    // };

    const handleClose = () => {
      this.setState({
        showModal: 0,
        newSwitch: null,
        switchToModify: null,
        modifyParent: null,
      });
    };

    const handleAccept = () => {
      // If agregar switch
      if (this.state.showModal === 1) {
        let newSwitch = {
          nombre: this.state.newName,
          modelo: this.state.newModel,
          lat: this.state.newLat,
          lng: this.state.newLng,
        };
        if (this.state.newParent) {
          const padre = this.state.switches.find(
            (index) => index.nombre === this.state.newParent
          );
          newSwitch["idPadre"] = padre._id;
          newSwitch["_pid"] = padre._id;
        }

        createSwitch(newSwitch);

        const array = this.state.switches;
        array.push(newSwitch);
        this.setState(
          {
            switches: array,
            showModal: 0,
            newSwitch: null,
          },
          this.updateLines()
        );
      } else {
        //Else modificar switch
        const findIndex = this.state.switches.findIndex(
          (index) => index._id === this.state.switchToModify._id
        );
        var auxSwitches = this.state.switches;
        var newData = this.state.switchToModify;
        newData.nombre = this.state.newName
          ? this.state.newName
          : newData.nombre;
        newData.modelo = this.state.newModel
          ? this.state.newModel
          : newData.modelo;
        if (this.state.newParent) {
          newData._pid = getParentId(this.state.newParent);
        } else {
          delete newData["_pid"];
        }
        auxSwitches[findIndex] = newData;

        modifySwitch(newData);
      }
    };

    const handleNameChange = (event) => {
      this.setState({
        newName: event.target.value,
      });
    };

    const handleModelChange = (event) => {
      this.setState({
        newModel: event.target.value,
      });
    };

    const handleParentChange = (event) => {
      if (event.target.value === "-") {
        this.setState({
          newParent: null,
        });
      } else {
        this.setState({
          newParent: event.target.value,
        });
      }
    };

    // @DOC: Para modificar switch
    const handleTableButtonClick = (event) => {
      // toggleModal();
      // const modelo = event.target.parentElement.cells[1].outerText;

      const nombre = event.target.parentElement.cells[2].outerText;
      const modify = this.state.switches.find(
        (index) => index.nombre === nombre
      );
      var aux = null;
      if (modify._pid) {
        aux = this.state.switches.find(
          (index) => index._id === modify._pid
        ).nombre;
      }

      this.setState({
        newName: modify.nombre,
        newModel: modify.modelo,
        newParent: getParentName(modify._pid),
        switchToModify: modify,
        showModal: 2,
        // modifyParent: aux,
      });
    };

    const handleOverlayClick = () => {
      this.setState({ selectedSwitch: null });
    };

    let parentOptions = [<option>-</option>];
    this.state.switches.map((index) => {
      return parentOptions.push(<option>{index.nombre}</option>);
    });

    return (
      <>
        <div
          className="overlay"
          style={{ display: this.state.selectedSwitch ? "block" : "none" }}
          onClick={handleOverlayClick}
        ></div>
        <MapContainer
          center={position}
          zoom={this.state.map.zoom}
          className="map-container"
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.showSwitches}
          {this.state.drawLines}
          {this.state.selectedSwitch ? (
            <MyComponent saveMarkers={this.saveMarkers} />
          ) : null}
        </MapContainer>
        {/* <Modal show={this.state.showModal > 0} onHide={handleClose}>
          <Modal.Header className="modal-header">
            <Modal.Title>Asignar posicion?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre del switch</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Switch 10"
                  onChange={handleNameChange}
                  value={this.state.newName}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Modelo del switch</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ubiquiti 10"
                  onChange={handleModelChange}
                  value={this.state.newModel}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Padre de: </Form.Label>
                <Form.Control
                  as="select"
                  onChange={handleParentChange}
                  value={this.state.newParent}
                >
                  {parentOptions}
                </Form.Control>
              </Form.Group>
            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="info" onClick={handleAccept}>
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal> */}
        {this.state.switches.length !== 0 ? (
          <TableComponent
            header={header}
            data={tableData}
            btnClick={handleTableButtonClick}
          />
        ) : null}
      </>
    );
  }
}
