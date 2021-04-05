import React, { Component } from "react";
import { Leaflet } from "leaflet";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "assets/css/styles.css";
import marker from "assets/img/switch.svg";

// Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";

// delete Leaflet.Icon.Default.prototype._getIconUrl;

// Leaflet.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png")
// });

export default class MapDisplay extends Component {
  state = {
    lat: -26.84174,
    lng: -65.23149,
    zoom: 16
  };

  render() {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1000);
    const position = [this.state.lat, this.state.lng];
    const myIcon = new L.Icon({
      iconUrl: marker,
      iconRetinaUrl: marker,
      popupAnchor: [-0, -0],
      iconSize: [70, 45]
    });
    const sw1 = {
      name: "Switch 1",
      position: {
        lat: -26.84279,
        lng: -65.23006
      }
    };
    const sw2 = {
      name: "Switch 2",
      position: {
        lat: -26.84185,
        lng: -65.22997
      }
    };
    const switches = [sw1, sw2];
    const showSwitches = switches.map(index => {
      return (
        <Marker position={index.position} icon={myIcon}>
          <Popup>{index.name}</Popup>
        </Marker>
      );
    });

    return (
      <MapContainer
        center={position}
        zoom={this.state.zoom}
        className="map-container"
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showSwitches}
        {console.log(showSwitches)}
      </MapContainer>
    );
  }
}
