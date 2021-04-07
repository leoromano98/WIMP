import React, { Component } from "react";
import { Map, Leaflet } from "leaflet";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline
} from "react-leaflet";
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
    map: {
      lat: -26.84174,
      lng: -65.23149,
      zoom: 16
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
          lat: -26.84230,
          lng: -65.22767
        },
        parent: "Switch 1"
      }
    ]
  };

  render() {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1000);

    const position = [this.state.map.lat, this.state.map.lng];
    const myIcon = new L.Icon({
      iconUrl: marker,
      iconRetinaUrl: marker,
      popupAnchor: [-0, -0],
      iconSize: [70, 45]
    });
    // const sw1 = {
    //   name: "Switch 1",
    //   position: {
    //     lat: -26.84279,
    //     lng: -65.23006
    //   }
    // };
    // const sw2 = {
    //   name: "Switch 2",
    //   position: {
    //     lat: -26.84185,
    //     lng: -65.22997
    //   }
    // };
    // const switches = [sw1, sw2];
    const showSwitches = this.state.switches.map(index => {
      return (
        <Marker position={index.position} icon={myIcon}>
          <Popup>{index.name}</Popup>
        </Marker>
      );
    });

    const drawLines = this.state.switches.map(index => {
      console.log(index.name)
      if (index.parent !== "") {
        let parentIndex = this.state.switches.findIndex(
          i => index.parent === i.name
        );
        console.log(parentIndex)
        return (
          <Polyline
            // key={"id1"}
            positions={[
              [
                this.state.switches[parentIndex].position.lat,
                this.state.switches[parentIndex].position.lng
              ],
              [
                index.position.lat,
                index.position.lng
              ]
            ]}
            color={"red"}
          />
        );
      }
      else{
        console.log("Sin padre")
        return null;
      }
    });

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
        {/* <Polyline
          key={"id1"}
          positions={[
            [
              this.state.switches[0].position.lat,
              this.state.switches[0].position.lng
            ],
            [
              this.state.switches[1].position.lat,
              this.state.switches[1].position.lng
            ]
          ]}
          color={"red"}
        /> */}
        {drawLines}
      </MapContainer>
    );
  }
}
