import { ViewColumnSharp } from "@material-ui/icons";
import React from "react";
import { Table } from "reactstrap";
import "./Table.css"

// Recibe 2 props:
//  props.header: Array con los nombres de cada columan
//  props.data: Array con elementos JSON que contiene la informacion de cada fila
const TableComponent = (props) => {
  const header = props.header.map((index) => {
    return <th>{index}</th>;
  });

  let data = [];

  const dataTable = () => {
    props.data.forEach((index) => {
      const values = Object.values(index);
      data.push(
        <tr>
          {values.map((index2) => {
            if (typeof index2 === "boolean") {
              if (index2) {
                return <td>Activo</td>;
              } else {
                return <td>Inactivo</td>;
              }
            } else {
              return <td>{index2} </td>;
            }
          })}
        </tr>
      );
    });
  };

  dataTable();
  console.log(data);

  return (
    <Table striped hover className="table" >
      <thead>
        <tr>{header}</tr>
      </thead>
      <tbody>{data}</tbody>
    </Table>
  );
};

export default TableComponent;
