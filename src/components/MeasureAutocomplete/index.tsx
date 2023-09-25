import { Autocomplete, TextField } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";

// @ts-ignore
const MeasureAutocomplete = ({ value, onChange = () => {} }) => {
  // @ts-ignore
  const options = useSelector((state) => state.measures.measureList);

  const localValue = useMemo(() => {
    // @ts-ignore
    return options.find((option) => option.value === value);
  }, [value, options]);

  return (
    <Autocomplete
      id="disabled-options-demo"
      options={options}
      value={localValue}
      getOptionLabel={(option) => option.label ?? ""}
      fullWidth
      // @ts-ignore
      onChange={(_, val) => onChange(val?.value ?? null)}
      renderInput={(params) => <TextField {...params} label="" />}
    />
  );
};

export default MeasureAutocomplete;
