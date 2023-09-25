import {
  Autocomplete,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import MeasureAutocomplete from "../../../components/MeasureAutocomplete";
import DeleteIcon from "@mui/icons-material/Delete";
import CNumberField from "../../../components/CNumberField";

const ProductItem = ({
  //@ts-ignore
  product,
  //@ts-ignore
  index,
  //@ts-ignore
  changeHandler,
  //@ts-ignore
  removeProduct,
  //@ts-ignore
  products,
  //@ts-ignore
  computedCatalogList,
}) => {
  //@ts-ignore
  const countChangeHandler = (val) => {
    changeHandler(index, "count", val);

    const totalSumm = Number(val) * Number(product.summa);

    if (product.vat_rate < 1)
      return changeHandler(index, "totalSum", isNaN(totalSumm) ? 0 : totalSumm);
    const vatSumm = Number(product.vatRate) * totalSumm;

    const totalSummWithVat = totalSumm + vatSumm;

    changeHandler(index, "vatSum", isNaN(vatSumm) ? 0 : vatSumm);

    changeHandler(
      index,
      "totalSum",
      isNaN(totalSummWithVat) ? 0 : totalSummWithVat
    );
  };
  //@ts-ignore
  const summChangeHandler = (val) => {
    changeHandler(index, "summa", val);

    const totalSumm = Number(val) * Number(product.count);

    if (product.vat_rate < 1)
      return changeHandler(index, "totalSum", isNaN(totalSumm) ? 0 : totalSumm);
    const vatSumm = (Number(product.vatRate) * totalSumm) / 100;

    const totalSummWithVat = totalSumm + vatSumm;

    changeHandler(index, "vatSum", isNaN(vatSumm) ? 0 : vatSumm);

    changeHandler(
      index,
      "totalSum",
      isNaN(totalSummWithVat) ? 0 : totalSummWithVat
    );
  };
  //@ts-ignore
  const vatRateChangeHandler = (val) => {
    changeHandler(index, "vatRate", val);

    const totalSumm = Number(product.summa) * Number(product.count);

    if (val < 1) {
      changeHandler(index, "vatSum", 0);
      changeHandler(index, "totalSum", isNaN(totalSumm) ? 0 : totalSumm);
      changeHandler(index, "totalSum", isNaN(totalSumm) ? 0 : totalSumm);

      changeHandler(index, "withoutVat", val < 0 ? true : false);
    } else {
      const vatSumm = (Number(val) * totalSumm) / 100;

      const totalSummWithVat = totalSumm + vatSumm;

      changeHandler(index, "vatSum", isNaN(vatSumm) ? 0 : vatSumm);

      changeHandler(
        index,
        "totalSum",
        isNaN(totalSummWithVat) ? 0 : totalSummWithVat
      );
    }
  };

  return (
    <tr className="products__tr">
      <td className="products__td">{product.ordNo}</td>
      <td className="products__td">
        <Autocomplete
          options={computedCatalogList}
          onChange={(e, value) =>
            // @ts-ignore
            changeHandler(index, "catalogCode", value.value)
          }
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
        <CNumberField
          fullWidth
          value={product.count}
          //@ts-ignore
          onChange={(val) => {
            countChangeHandler(val);
          }}
        />
      </td>
      <td className="products__td">
        <CNumberField
          fullWidth
          value={product.summa.toLocaleString("en-US")}
          // @ts-ignore
          onChange={summChangeHandler}
        />
      </td>
      <td className="products__td">
        <FormControl fullWidth>
          <Select
            value={product.vatRate}
            onChange={(e) => vatRateChangeHandler(e.target.value)}
          >
            <MenuItem value={-1}>Без НДС</MenuItem>
            <MenuItem value={0}>0%</MenuItem>
            <MenuItem value={12}>12%</MenuItem>
          </Select>
        </FormControl>
      </td>
      <td className="products__td">
        <CNumberField fullWidth value={product.vatSum} />
      </td>

      <td className="products__td">
        <CNumberField
          fullWidth
          value={product.totalSum}
          // @ts-ignore
          onChange={(val) => changeHandler(index, "totalSum", val)}
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
