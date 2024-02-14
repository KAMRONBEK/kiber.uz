import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { id } from "date-fns/locale";
import _ from "lodash";

// @ts-ignore
const BuyerFormSelect = ({ formik, name, label, width, options }) => {
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
      >
        {options.map((option: any) => (
          <MenuItem value={option.summa}>{option.productName}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BuyerFormSelect;
