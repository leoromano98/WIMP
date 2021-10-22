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
import markerLight from "../../assets/img/switchLight.svg";
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
    draggable: true,
    showSwitchesAux: null,
    newPos: null,
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

      response.forEach((index) => {
        const switchPos = { lat: index.lat, lng: index.lng };
        positions.push(switchPos);
      });

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
        showSwitchesAux: showSwitches,
      });
    });
  }

  // @LEO: funcion para guardar ubicacion del sw:
  handleSavePosition = () => {
    //inicio
    var i = 0;
    const newShowSwitches = [];
    this.state.switches.forEach((index) => {
      newShowSwitches.push(
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
    //fiin

    ubicarSwitch(
      this.state.selectedSwitch.mac,
      this.state.newPos.lat,
      this.state.newPos.lng
    );

    this.setState({
      selectedSwitch: null,
      showSwitches: newShowSwitches,
    });
  };

  myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [70, 45],
  });

  myIconLight = new L.Icon({
    iconUrl: markerLight,
    iconRetinaUrl: markerLight,
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
    this.setState({
      draggable: true,
      showSwitches: null,
    });
    console.log("B ", event.target.id, this.state.switches);
    const findSwitch = this.state.switches.find(
      (element) => element.name === event.target.id
    );

    const findIndex = this.state.switches.findIndex(
      (element) => element.name === event.target.id
    );
    console.log("index", findIndex);

    const newShowSwitches = [];

    var i = 0;
    this.state.switches.forEach((index) => {
      newShowSwitches.push(
        <Marker
          position={this.state.positions[i]}
          icon={index.name === event.target.id ? this.myIconLight : this.myIcon}
          onClick={this.handleClick}
          id={index.mac}
          draggable={index.name === event.target.id}
          eventHandlers={{
            drag: (event) => {
              this.setState({
                newPos: event.latlng,
              });
            },
          }}
        >
          {console.log(index.name, event.target.id)}
          {index.name === event.target.id ? console.log("see") : null}
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
      selectedSwitch: findSwitch,
      showSwitches: newShowSwitches,
    });

    console.log("update showsw", this.state.showSwitches);
  };

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
        <div
          className="overlay"
          style={{ display: this.state.selectedSwitch ? "block" : "none" }}
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
        </MapContainer>
        {this.state.selectedSwitch ? (
          <Button
            color="success"
            onClick={this.handleSavePosition}
            className="save-position"
          >
            GUARDAR
          </Button>
        ) : null}
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
