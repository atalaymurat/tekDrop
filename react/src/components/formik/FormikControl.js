import React from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Select from "./Select"
import TextArea from "./TextArea";
import ReactSelect from "./ReactSelect";
import DatePicker from "./DatePicker"

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
    case 'reactSelect':
      return <ReactSelect {...rest} />
    case 'date':
      return < DatePicker {...rest} />

    default:
      return null;
  }
}

export default FormikControl;
