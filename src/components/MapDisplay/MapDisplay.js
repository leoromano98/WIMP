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
  MapConsumer
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "assets/css/styles.css";
import marker from "assets/img/switch.svg";
import { Modal, Button, Form } from "react-bootstrap";

let myIcon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor: [-0, -0],
  iconSize: [70, 45]
});

function MyComponent({ saveMarkers }) {
  const map = useMapEvents({
    click: e => {
      const { lat, lng } = e.latlng;
      L.marker([lat, lng], { icon: myIcon }).addTo(map);
      saveMarkers([lat, lng]);
    }
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
        lng: 0
      },
      parent: "a"
    },
    map: {
      lat: -26.84174,
      lng: -65.23149,
      zoom: 17
    },
    switches: [
      {
        name: "Switch 1",
        position: {
          lat: -26.84279,
          lng: -65.23006
        },
        parent: ""
      },
      {
        name: "Switch 2",
        position: {
          lat: -26.84185,
          lng: -65.22997
        },
        parent: "Switch 1"
      },
      {
        name: "Switch 3",
        position: {
          lat: -26.83931,
          lng: -65.23337
        },
        parent: "Switch 1"
      },
      {
        name: "Switch 4",
        position: {
          lat: -26.8423,
          lng: -65.22767
        },
        parent: "Switch 1"
      }
    ],
    new: null
  };

  saveMarkers = newMarkerCoords => {
    this.setState({
      showModal: true,
      newSwitch: {
        position: {
          lat: newMarkerCoords[0],
          lng: newMarkerCoords[1]
        }
      }
    });
  };

  myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [70, 45]
  });

  render() {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1000);

    const position = [this.state.map.lat, this.state.map.lng];

    const showSwitches = this.state.switches.map(index => {
      return (
        <Marker
          position={index.position}
          icon={this.myIcon}
          onClick={this.handleClick}
        >
          <Popup>{index.name}</Popup>
        </Marker>
      );
    });

    const drawLines = this.state.switches.map(index => {
      if (index.parent !== "") {
        let parentIndex = this.state.switches.findIndex(
          i => index.parent === i.name
        );
        return (
          <Polyline
            positions={[
              [
                this.state.switches[parentIndex].position.lat,
                this.state.switches[parentIndex].position.lng
              ],
              [index.position.lat, index.position.lng]
            ]}
            color={"red"}
          />
        );
      } else {
        return null;
      }
    });

    const handleClose = () =>
      this.setState({
        showModal: false,
        newSwitch: null
      });

    const handleAccept = () => {
      const array = this.state.switches;
      array.push(this.state.newSwitch);
      this.setState({
        switches: array,
        showModal: false,
        newSwitch: null
      });
    };

    const handleNameChange = (event) =>{
      this.setState({
        newSwitch:{
          name: event.target.value,
          position: this.state.newSwitch.position,
          parent: this.state.newSwitch.parent
        }
      })
    }

    const handleParentChange = (event) =>{
      this.setState({
        newSwitch:{
          name: this.state.newSwitch.name,
          position: this.state.newSwitch.position,
          parent: event.target.value
        }
      })
    }

    let parentOptions = this.state.switches.map(index => {
      return <option>{index.name}</option>;
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
          {drawLines}

          <MyComponent saveMarkers={this.saveMarkers} />
        </MapContainer>
        <Modal show={this.state.showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar switch</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Woohoo, you're reading this text in a modal!
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre del switch</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Switch 10 (el diego)"
                  onChange={handleNameChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Padre de: </Form.Label>
                <Form.Control as="select"
                  onChange={handleParentChange}
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
      </>
    );
  }
}
