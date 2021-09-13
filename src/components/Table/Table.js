import { ViewColumnSharp } from "@material-ui/icons";
import React from "react";
import { Table } from "reactstrap";
import "./Table.css";

// Recibe 2 props:
//  props.header: Array con los nombres de cada columna. Cada elemento tiene
//                { key: para identificar columna ; text: lo que se muestra en la tabla}
//  props.data: Array con elementos JSON que contiene la informacion de cada fila
const TableComponent = (props) => {
  const header = props.header.map((index) => {
    return <th>{index.text}</th>;
  });

  let data = [];

  // Esta funcion se encarga de ordenar los datos de acuerdo a header.key
  const dataTable = () => {
    props.data.forEach((index) => {
      const values = Object.entries(index);
      console.log("index", index);

      data.push(
        <tr>
          {props.header.map((head) => {
            const find = values.find((element) => element[0] === head.key);
            console.log(find);
            if (find) {
              if (typeof find[1] === "boolean") {
                if (find[1]) {
                  return <td>Activo</td>;
                } else {
                  return <td>Inactivo</td>;
                }
              } else {
                return <td>{find ? find[1] : null}</td>;
              }
            }
          })}
        </tr>
      );
    });
  };

  dataTable();
  console.log("data", data);

  return (
    <Table striped hover className="table">
      <thead>
        <tr>{header}</tr>
      </thead>
      <tbody>{data}</tbody>
    </Table>
  );
};

export default TableComponent;
