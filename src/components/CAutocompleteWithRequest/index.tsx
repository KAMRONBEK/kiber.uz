import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import productService from "../../services/productService";

// @ts-ignore
const CAutocompleteWithRequest = ({ label, value, onChange }) => {
  const [options, setOptions] = useState([]);
  // @ts-ignore
  const inputChangeHandler = (e, value) => {
    searchProduct(value);
  };
  // @ts-ignore
  const searchProduct = (searchText) => {
    productService.searchProduct(searchText).then((res) => {
      // @ts-ignore
      if (!res?.length) return [];
      setOptions(
        // @ts-ignore
        res.map((el) => ({
          label: `${el.mxikCode} -- ${el.positionName}`,
          value: el.mxikCode,
        }))
      );
    });
  };

  return (
    <Autocomplete
      value={value}
      fullWidth
      options={options}
      onInputChange={inputChangeHandler}
      noOptionsText="Нет данных"
      filterOptions={(x) => x}
      onChange={(_, val) => onChange(val)}
      renderInput={(params) => (
        <TextField {...params} type="search" label={label} />
      )}
    />
  );
};

export default CAutocompleteWithRequest;
