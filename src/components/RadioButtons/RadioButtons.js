import { useState, useEffect } from "react";
import { Col, FormGroup, Label, Input } from "reactstrap";

const RadioButtons = (props) => {
  const handleSelectedButton = (event) => {
    props.selected(event.target.id);
  };

  let options = [];
  if (props.options) {
    props.options.forEach((index) => {
      options.push(
        <FormGroup check>
          <Label check>
            <Input
              id={index.id}
              type="radio"
              name="radio"
              onClick={handleSelectedButton}
              defaultChecked={index.id === "ranking"}
            />{" "}
            {index.text}
          </Label>
        </FormGroup>
      );
    });
  }

  return (
    <FormGroup tag="fieldset" row>
      <legend className="col-form-label col-sm-2">{props.legend}</legend>
      <Col sm={10}>{options}</Col>
    </FormGroup>
  );
};

export default RadioButtons;
