import React from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Select from "./Select"
import TextArea from "./TextArea";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    case "select":
      return <Select {...rest} />;
    case 'textarea':
      return <TextArea {...rest} />

    default:
      return null;
  }
}

export default FormikControl;
