import { ViewColumnSharp } from "@material-ui/icons";
import React, { useEffect } from "react";
import { Table } from "reactstrap";
import "./Table.css";
import { Button } from "reactstrap";
import { Animated } from "react-animated-css";
import Pagination from "@mui/material/Pagination";

// Recibe 2 props:
//  props.header: Array con los nombres de cada columna. Cada elemento tiene
//                { key: para identificar columna ; text: lo que se muestra en la tabla}
//  props.data: Array con elementos JSON que contiene la informacion de cada fila
const TableComponent = (props) => {
  const [page, setPage] = React.useState(1);
  const [smallData, setSmallData] = React.useState(null);
  const handleChange = (event,value) => {
    setPage(value);
  };

  const header = props.header.map((index) => {
    return <th>{index.text}</th>;
  });
  
  let data = []

  // Esta funcion se encarga de ordenar los datos de acuerdo a header.key
  const dataTable = () => {
    props.data.forEach((index) => {
      const values = Object.entries(index);
      const style = {
        backgroundColor: "unset",
        fontWeight: "bold",
      };
      data.push(
        <tr id={index._id}>
          {props.header.map((head) => {
            const find = values.find((element) => element[0] === head.key); //Busco coincidencias entre header.key y el key de los datos
            if (find) {
              if (typeof find[1] === "boolean") {
                //Si es dato booleano, mostrar activo o inactivo
                if (find[1]) {
                  return <td>Activo</td>;
                } else {
                  return <td>Inactivo</td>;
                }
              } else {
                if (head.colors) {
                  //Si existe head.colors, es porque asigno verde amarillo o rojo
                  switch (find[1]) {
                    case "Activo":
                      style.backgroundColor = "#66b266";
                      break;
                    case "Advertencia":
                      style.backgroundColor = "#eeef14";
                      break;
                    default:
                      style.backgroundColor = "#ff3232"; //Descoenctado
                      break;
                  }
                  return <td style={style}>{find[1]}</td>;
                }
                return <td>{find ? find[1] : null}</td>; //Si no existe head.colors, llevo dato sin asignar color
              }
            } else {
              //Si no hay coincidencias, es porque no hay dato para mostrar ENTONCES es un boton
              return (
                <td>
                  <Button id={index.name} onClick={head.handler}>
                    {head.text}
                  </Button>
                </td>
              );
            }
          })}
        </tr>
      );
    });
  };

  dataTable();
  
  useEffect(() => {
    if (props.paginate) {
      setSmallData(data.slice((page - 1) * 10, page * 10));
      console.log('repeat?', data,header)
    }
  }, [page]);

  return (
    <Animated animationIn="zoomIn" animationInDuration={600} isVisible={true}>
      <Table striped hover className="table">
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody>{props.paginate ? smallData : data}</tbody>
      </Table>
      {props.paginate ? (
        <Pagination count={parseInt(data.length/10)} page={page} onChange={handleChange} />
      ) : null}
    </Animated>
  );
};

export default TableComponent;
