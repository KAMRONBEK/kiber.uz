import { Autocomplete, IconButton, TextField } from "@mui/material";
import CNumberField from "../../../components/CNumberField";
import MeasureAutocomplete from "../../../components/MeasureAutocomplete";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductItem = ({
  // @ts-ignore
  product,
  // @ts-ignore
  index,
  // @ts-ignore
  changeHandler,
  // @ts-ignore
  removeProduct,
  // @ts-ignore
  products,
  // @ts-ignore,
  catalogList,
}) => {
  return (
    <tr className="products__tr">
      <td className="products__td">{product.ordNo}</td>
      <td className="products__td">
        <Autocomplete
          options={catalogList}
          onChange={(e, value) => {
            console.log({ value });
            // @ts-ignore
            changeHandler(index, "catalogCode", value.value);
          }}
          value={product.catalogCode + product.catalogName}
          renderInput={(params) => <TextField {...params} />}
        />
      </td>
      <td className="products__td">
        <TextField
          fullWidth
          value={product.name}
          onChange={(e) => changeHandler(index, "name", e.target.value)}
        />
      </td>
      <td className="products__td">
        <MeasureAutocomplete
          value={product.measureId}
          // @ts-ignore
          onChange={(val) => changeHandler(index, "measureId", `${val}`)}
        />
      </td>
      <td className="products__td">
        <CNumberField
          fullWidth
          value={product.count}
          // @ts-ignore
          onChange={(val) => {
            changeHandler(index, "count", val);
          }}
        />
      </td>

      <td className="products__td">
        {products.length > 1 && (
          <IconButton color="error" onClick={() => removeProduct(index)}>
            <DeleteIcon />
          </IconButton>
        )}
      </td>
    </tr>
  );
};

export default ProductItem;
