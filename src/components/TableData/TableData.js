import React from "react";

// // reactstrap components
// import { Container, Nav, NavItem, NavLink } from "reactstrap";

function TableData(props) {
  let data = {
    dispositive: null,
    description: null,
    date: null
  };

  let dataArray = props.data;

  let tr = null;
  tr = dataArray.map(index => {
    return (<tr>
      <td>{index.dispositive}</td>
      <td>{index.description}</td>
      <td>{index.date}</td>
    </tr>);
  });

  return(
    <tbody>
      {tr}
    </tbody>
  )
}

export default TableData;
