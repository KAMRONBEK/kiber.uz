import {
  Autocomplete,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CNumberField from "../../../components/CNumberField";
import MeasureAutocomplete from "../../../components/MeasureAutocomplete";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

const ProductItem = ({
  // @ts-ignore
  product,
  // @ts-ignore
  products,
  // @ts-ignore
  removeProduct,
  // @ts-ignore
  index,
  // @ts-ignore
  changeHandler,
  // @ts-ignore
  computedCatalogList,
  // @ts-ignore
  hasExcise,
}) => {
  // @ts-ignore
  const countChangeHandler = (val) => {
    changeHandler(index, "count", val);
    const deliverySum = Number(val) * Number(product.summa);
    changeHandler(index, "deliverySum", isNaN(deliverySum) ? 0 : deliverySum);

    let vatSum = (Number(product.vatRate) * deliverySum) / 100;
    vatSum = isNaN(vatSum) || vatSum < 0 ? 0 : vatSum;
    changeHandler(index, "vatSum", vatSum);

    const deliverySumWithVat = vatSum + deliverySum;
    changeHandler(
      index,
      "deliverySumWithVat",
      isNaN(deliverySumWithVat) ? 0 : deliverySumWithVat
    );
  };
  // @ts-ignore
  const summaChangeHandler = (val) => {
    changeHandler(index, "summa", val);
    const deliverySum = Number(product.count) * Number(val);
    changeHandler(index, "deliverySum", isNaN(deliverySum) ? 0 : deliverySum);

    let vatSum = (Number(product.vatRate) * deliverySum) / 100;
    vatSum = isNaN(vatSum) || vatSum < 0 ? 0 : vatSum;
    changeHandler(index, "vatSum", vatSum);

    const deliverySumWithVat = vatSum + deliverySum;
    changeHandler(
      index,
      "deliverySumWithVat",
      isNaN(deliverySumWithVat) ? 0 : deliverySumWithVat
    );
  };
  // @ts-ignore
  const vatRateChangeHandler = (val) => {
    changeHandler(index, "vatRate", Number(val));

    if (val < 0) changeHandler(index, "withoutVat", false);
    else changeHandler(index, "withoutVat", true);

    let vatSum = (Number(val) * Number(product.deliverySum)) / 100;
    vatSum = isNaN(vatSum) || vatSum < 0 ? 0 : vatSum;
    changeHandler(index, "vatSum", vatSum);

    const deliverySumWithVat = vatSum + Number(product.deliverySum);
    changeHandler(
      index,
      "deliverySumWithVat",
      isNaN(deliverySumWithVat) ? 0 : deliverySumWithVat
    );
  };

  return (
    <tr className="products__tr">
      <td className="products__td">{index + 1}</td>

      <td className="products__td">
        <Autocomplete
          options={computedCatalogList}
          // @ts-ignore
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} label="" />}
          renderOption={(props, option, { inputValue }) => {
            // @ts-ignore
            const matches = match(option.label, inputValue);
            // @ts-ignore
            const parts = parse(option.label, matches);

            return (
              <li {...props}>
                <div>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              </li>
            );
          }}
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
        <TextField
          fullWidth
          value={product.barcode}
          onChange={(e) => changeHandler(index, "barcode", e.target.value)}
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
          onChange={countChangeHandler}
        />
      </td>
      <td className="products__td">
        <CNumberField
          fullWidth
          value={product.summa.toLocaleString("en-US")}
          // @ts-ignore
          onChange={summaChangeHandler}
        />
      </td>
      <td className="products__td">
        <CNumberField
          fullWidth
          value={product.deliverySum.toLocaleString("en-US")}
          disabled
        />
      </td>
      <td className="products__td">
        <FormControl fullWidth>
          <Select
            value={product.vatRate}
            onChange={(e) => vatRateChangeHandler(e.target.value)}
          >
            <MenuItem value={"-1"}>Без НДС</MenuItem>
            <MenuItem value={"0"}>0%</MenuItem>
            <MenuItem value={"12"}>12%</MenuItem>
          </Select>
        </FormControl>
      </td>
      <td className="products__td">
        <CNumberField
          disabled
          fullWidth
          value={product.vatSum.toLocaleString("en-US")}
        />
      </td>

      {hasExcise && (
        <>
          <td className="products__td">
            <CNumberField
              fullWidth
              value={product.exciseRate.toLocaleString("en-US")}
              // @ts-ignore
              onChange={(val) => changeHandler(index, "exciseRate", val)}
            />
          </td>

          <td className="products__td">
            <CNumberField
              fullWidth
              value={product.exciseSum.toLocaleString("en-US")}
              disabled
            />
          </td>
        </>
      )}

      <td className="products__td">
        <CNumberField
          fullWidth
          value={product.deliverySumWithVat.toLocaleString("en-US")}
          // @ts-ignore
          onChange={(val) => changeHandler(index, "deliverySumWithVat", val)}
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
