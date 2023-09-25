import { TextField } from "@mui/material";
import _ from "lodash";

//@ts-ignore
const FTextField = ({ formik, type, name, nestLevel = false, ...props }) => {
  return (
    <TextField
      size="small"
      type={type}
      value={_.get(formik.values, name)}
      name={name}
      onChange={formik.handleChange}
      error={_.get(formik.touched, name) && Boolean(_.get(formik.errors, name))}
      helperText={
        (_.get(formik.touched, name) && _.get(formik.errors, name)) ?? " "
      }
      {...props}
    />
  );
};

export default FTextField;
