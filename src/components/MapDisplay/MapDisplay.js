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
    const array = this.state.switches;
    const newSwitch = {
      name: "Switch 10",
      position: {
        lat: newMarkerCoords[0],
        lng: newMarkerCoords[1]
      },
      parent: "Switch 1"
    };
    array.push(newSwitch);
    this.setState({
      switches: array
    });
    console.log(this.state);
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
            // key={"id1"}
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

    console.log(this.state);
    return (
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
    );
  }
}
