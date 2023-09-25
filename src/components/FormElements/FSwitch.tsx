import { Switch } from "@mui/material";
import { useMemo } from "react";
import generateRandomNumber from "../../utils/genereateRandomNumber";
import _ from "lodash";
// @ts-ignore
const FSwitch = ({ formik, name, label, labelProps, ...props }) => {
  const randomId = useMemo(() => {
    return generateRandomNumber();
  }, []);

  return (
    <div>
      <Switch
        id={`switch-${randomId}`}
        {...props}
        checked={_.get(formik.values, name)}
        onChange={(e, val) => formik.setFieldValue(name, val)}
      />
      <label htmlFor={`switch-${randomId}`} {...labelProps}>
        {label}
      </label>
    </div>
  );
};

export default FSwitch;
