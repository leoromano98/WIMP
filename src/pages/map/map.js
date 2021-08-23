// import "./map.css";

// const Map = () => {

//   return (
//     <h1>LOGIN PAGE!</h1>
//   );
// };

// export default Map;
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
import { getTopology, createSwitch } from "../../api/auth";

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
    showModal: false,
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
  };

  async componentDidMount() {
    var response = await getTopology();
    this.setState({
      switches: response,
    });
    console.log("Switches: ", response);
    this.updateLines();
  }

  saveMarkers = (newMarkerCoords) => {
    this.setState({
      showModal: true,
      newLat: newMarkerCoords[0],
      newLng: newMarkerCoords[1],
    });
  };

  myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [70, 45],
  });

  updateLines = () => {
    console.log("updatelines");
    if (this.state.switches.length !== 0) {
      console.log();
      const drawLines = this.state.switches.map((index) => {
        if (index._pid) {
          let parentIndex = this.state.switches.findIndex(
            (i) => index._pid === i._id
          );
          if (parentIndex > 0) {
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

    console.log(this.state.switches);

    if (this.state.switches.length !== 0) {
      var tableData = JSON.parse(JSON.stringify(this.state.switches));
      tableData.forEach((element) => {
        delete element["_id"];
        delete element["_pid"];
        delete element["lat"];
        delete element["lng"];
      });
    }

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
        showModal: false,
        newSwitch: null,
      });
    };

    const handleAccept = () => {
      //TODO: this must update DB
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
        console.log(padre);
        newSwitch["idPadre"] = padre._id;
      }

      createSwitch(newSwitch);

      const array = this.state.switches;
      array.push(newSwitch);
      this.setState(
        {
          switches: array,
          showModal: false,
          newSwitch: null,
        },
        this.updateLines()
      );
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
        <Modal show={this.state.showModal} onHide={handleClose}>
          <Modal.Header className="modal-header">
            <Modal.Title>Agregar switch</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre del switch</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Switch 10 (el diego)"
                  onChange={handleNameChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Modelo del switch</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ubiquiti 10"
                  onChange={handleModelChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Padre de: </Form.Label>
                <Form.Control as="select" onChange={handleParentChange}>
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
          <TableComponent header={Object.keys(tableData[0])} data={tableData} />
        ) : null}
      </>
    );
  }
}
