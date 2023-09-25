import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { id } from "date-fns/locale";
import _ from "lodash";

// @ts-ignore
const FSelect = ({ formik, name, label, width, options, ...props }) => {
  return (
    <FormControl style={{ width }}>
      {/* @ts-ignore */}
      <InputLabel id={id} style={{ marginTop: -6 }}>
        {label}
      </InputLabel>
      <Select
        // @ts-ignore
        labelId={id}
        value={_.get(formik.values, name)}
        label={label}
        size="small"
        sx={{ textAlign: "left" }}
        onChange={(e) => formik.setFieldValue(name, e.target.value)}
      >
        {
          // @ts-ignore
          options.map((option) => (
            <MenuItem value={option.value}>{option.label}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};

export default FSelect;
