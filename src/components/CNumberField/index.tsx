import { TextField } from "@mui/material";

// @ts-ignore
const CNumberField = ({ value, onChange = () => {}, ...props }) => {
  // @ts-ignore
  const changeHandler = (e) => {
    const val = e.target.value?.replace(",", ".");
    // @ts-ignore
    if (/^[\d.,:]*$/.test(val)) onChange(val);
  };
  // @ts-ignore
  const blurHandler = (e) => {
    const val = e.target.value;
    // @ts-ignore
    onChange(Number(val.replace(",", ".")) || 0);
  };

  return (
    <TextField
      {...props}
      value={value}
      onChange={changeHandler}
      onBlur={blurHandler}
    />
  );
};

export default CNumberField;
