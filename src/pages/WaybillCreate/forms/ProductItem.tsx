import {
  Autocomplete,
  IconButton,
  TableCell,
  TableRow,
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

    changeHandler(index, "totalSum", isNaN(totalSumm) ? 0 : totalSumm);
  };
  //@ts-ignore
  const summChangeHandler = (val) => {
    changeHandler(index, "summa", val);

    const totalSumm = Number(val) * Number(product.count);

    changeHandler(index, "totalSum", isNaN(totalSumm) ? 0 : totalSumm);
  };
  //@ts-ignore

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
          value={product.summa}
          // @ts-ignore
          onChange={summChangeHandler}
        />
      </td>
      <td className="products__td">
        <CNumberField
          fullWidth
          value={product.roadHaulageCost}
          // @ts-ignore
          onChange={(val) => changeHandler(index, "roadHaulageCost", val)}
        />
      </td>
      <td className="products__td">
        <TextField
          fullWidth
          value={product.FollowDocuments}
          onChange={(e) =>
            changeHandler(index, "followDocuments", e.target.value)
          }
        />
      </td>
      <td className="products__td">
        <TextField
          fullWidth
          value={product.MethodDefineWeight}
          onChange={(e) =>
            changeHandler(index, "methodDefineWeight", e.target.value)
          }
        />
      </td>
      <td className="products__td">
        <TextField
          fullWidth
          value={product.LoadClass}
          onChange={(e) => changeHandler(index, "loadClass", e.target.value)}
        />
      </td>
      <td className="products__td">
        <TextField
          fullWidth
          value={product.WeightBrutto}
          onChange={(e) => changeHandler(index, "weightBrutto", e.target.value)}
        />
      </td>
      <td className="products__td">
        <TextField
          fullWidth
          value={product.WeightNetto}
          onChange={(e) => changeHandler(index, "weightNetto", e.target.value)}
        />
      </td>
      <td className="products__td">
        <CNumberField
          fullWidth
          value={product.count * product.summa}
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
