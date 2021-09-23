// @DOC:
// this.state.showModal === 0 => no mostrar modal
// this.state.showModal === 1 => mostrar AGREGAR switch
// this.state.showModal === 2 =>  mostrar MODIFICAR switch

import React, { Component } from "react";
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
import { getTopology, createSwitch, modifySwitch } from "../../api/auth";

let myIcon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor: [-0, -0],
  iconSize: [70, 45],
});

//@DOC: On click, add icon to map (switch)
function MyComponent({ saveMarkers }) {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      saveMarkers([lat, lng]);
      L.marker([lat, lng], { icon: myIcon }).addTo(map);
    },
  });
  return null;
}

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
    newName: null,
    newModel: null,
    newParent: null,
    newLat: null,
    newLng: null,
    switches: [],
    new: null,
    modifyParent: null,
  };

  async componentDidMount() {
    var response = await getTopology();
    this.setState({
      switches: response,
    });
    console.log("Switches: ", response);
    this.updateLines();
  }

  // @DOC: Funcion que se ejecuta al hacer clic en el mapa
  saveMarkers = (newMarkerCoords) => {
    this.setState({
      showModal: 1,
      newLat: newMarkerCoords[0],
      newLng: newMarkerCoords[1],
      newName: null,
      newModel: null,
      newParent: null,
    });
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

  render() {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1000);

    const position = [this.state.map.lat, this.state.map.lng];

    const showSwitches = this.state.switches.map((index) => {
      return (
        <Marker
          position={[index.lat, index.lng]}
          icon={this.myIcon}
          onClick={this.handleClick}
        >
          <Popup>{index.nombre}</Popup>
        </Marker>
      );
    });

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
      { key: "estado", text: "Estado" },
      { key: "modelo", text: "Modelo" },
      { key: "nombre", text: "Nombre" },
      { key: "fecha", text: "Fecha" },
      { key: "button", text: "Informacion" },
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

    let parentOptions = [<option>-</option>];
    this.state.switches.map((index) => {
      return parentOptions.push(<option>{index.nombre}</option>);
    });

    return (
      <>
        <MapContainer
          center={position}
          zoom={this.state.map.zoom}
          className="map-container"
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {showSwitches}
          {this.state.drawLines}

          <MyComponent saveMarkers={this.saveMarkers} />
        </MapContainer>
        <Modal show={this.state.showModal > 0} onHide={handleClose}>
          <Modal.Header className="modal-header">
            <Modal.Title>
              {this.state.showModal === 1 ? "Agregar" : "Modificar"} switch
            </Modal.Title>
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
        </Modal>
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
