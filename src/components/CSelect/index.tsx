import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

// @ts-ignore
const CSelect = ({
  // @ts-ignore
  value,
  onChange = () => {},
  // @ts-ignore
  style,
  // @ts-ignore
  label,
  // @ts-ignore
  options,
  // @ts-ignore
  id,
  // @ts-ignore
  variant,
  // @ts-ignore
  required,
  // @ts-ignore
  error,
  // @ts-ignore
  helperText,
  ...props
}) => {
  return (
    <FormControl fullWidth style={style}>
      <InputLabel
        required={required}
        size="small"
        id={"CSelect-" + id + "-label"}
      >
        {label}
      </InputLabel>
      <Select
        labelId={"CSelect-" + id + "-label"}
        value={value}
        label={label}
        onChange={onChange}
        variant={variant}
        error={error}
        size="small"
        {...props}
      >
        {
          // @ts-ignore
          options?.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};

export default CSelect;
