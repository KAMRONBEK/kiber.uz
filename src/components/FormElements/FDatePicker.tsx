// import { DatePicker, LocalizationProvider } from "@mui/lab";
import { TextField } from "@mui/material";
import get from "lodash/get";
import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  DateTimePicker,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
//@ts-ignore
const FDatePicker = ({ formik, name, label, inputProps, ...props }) => {
  const [calendarVisible, setCalendarVisible] = useState(false);

  return (
    <DatePicker
      inputFormat="DD.MM.YYYY"
      mask="__.__.____"
      toolbarFormat="DD.MM.YYYY"
      value={get(formik.values, name)}
      // @ts-ignore
      name={name}
      //@ts-ignore
      onChange={(value) => formik.setFieldValue(name, value)}
      {...props}
      //@ts-ignore
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          error={get(formik.touched, name) && Boolean(get(formik.errors, name))}
          helperText={
            (get(formik.touched, name) && get(formik.errors, name)) ?? " "
          }
          {...inputProps}
          label={label}
        />
      )}
    />
  );
};

export default FDatePicker;
