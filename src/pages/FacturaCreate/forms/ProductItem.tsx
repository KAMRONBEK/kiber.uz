import {
  Autocomplete,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CNumberField from "../../../components/CNumberField";
import lgotaService from "../../../services/lgotaService";
import { useEffect, useMemo, useState } from "react";
type propsType = {
  product?: any;
  products?: any;
  removeProduct?: any;
  index?: any;
  changeHandler?: any;
  computedCatalogList?: any;
  hasExcise?: any;
  formik?: any;
  hasCommittent?: any;
};
const ProductItem = (props: propsType) => {
  let {
    product,
    products,
    removeProduct,
    index,
    changeHandler,
    computedCatalogList,
    hasExcise,
    formik,
    hasCommittent,
  } = props;
  const [lgotaList, setLgotaList] = useState<any>([]);
  console.log(JSON.stringify(computedCatalogList, null, 2));

  const countChangeHandler = (val: any) => {
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
    if (val < 0) {
      changeHandler(index, "withoutVat", true);

      formik.setFieldValue("productList.hasVat", false);
    } else {
      changeHandler(index, "vatRate", Number(val));
      changeHandler(index, "withoutVat", false);
    }

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
  // console.log("formik===", JSON.stringify(formik, null, 2));
  const tinsSecond = formik?.values?.buyerTin !== "" ? false : true;

  const searchLgotaId = (mxik = "") => {
    lgotaService
      .fetchLgotaNew({
        mxik: [mxik],
        tins: tinsSecond
          ? [formik?.values?.sellerTin]
          : [formik?.values?.sellerTin, formik?.values?.buyerTin],
        checkDate: formik.values.facturaDoc.facturaDate,
      })
      .then((res: any) => {
        const lgotas = [];
        for (let i = 0; i < res.product[`${mxik}`].withoutVat.length; i++) {
          lgotas.push(res.product[`${mxik}`].withoutVat[i]);
        }
        for (
          let i = 0;
          i < res.company[`${formik?.values?.sellerTin}`]?.sellerLgotas?.length;
          i++
        ) {
          lgotas.push(
            res.company[`${formik?.values?.sellerTin}`]?.sellerLgotas[i]
          );
        }
        for (
          let i = 0;
          i < res.company[`${formik?.values?.buyerTin}`]?.sellerLgotas?.length;
          i++
        ) {
          lgotas.push(
            res.company[`${formik?.values?.buyerTin}`]?.buyerLgotas[i]
          );
        }
        setLgotaList(lgotas);
        console.log("lgotas", lgotas);

        // setLgotaList(res[`${mxik}`].withoutVat);
      });
  };

  useEffect(() => {
    if (product.catalogCode !== "") searchLgotaId(product.catalogCode);
  }, [product.catalogCode]);

  const computedLgotaList = useMemo(() => {
    if (!lgotaList?.length) return [];

    return lgotaList.map((lgota: any) => ({
      label: `${lgota.lgotaName}`,

      value: lgota.lgotaId,
    }));
  }, [lgotaList]);

  useEffect(() => {
    if (product.vatRate !== 0) {
      changeHandler(index, "lgotaName", null);
      changeHandler(index, "lgotaId", null);
    }
  }, [product.vatRate]);

  console.log(formik.values);

  return (
    <tr className="products__tr">
      <td className="products__td">{index + 1}</td>
      {hasCommittent && (
        <>
          <td className="products__td">
            <TextField
              fullWidth
              value={product.committentName}
              onChange={(e) =>
                changeHandler(index, "committentName", e.target.value)
              }
            />
          </td>

          <td className="products__td">
            <TextField
              fullWidth
              value={product.committentTin}
              onChange={(e) =>
                changeHandler(index, "committentTin", e.target.value)
              }
            />
          </td>
          <td className="products__td">
            <TextField
              fullWidth
              value={product.committentVatRegCode}
              onChange={(e) =>
                changeHandler(index, "committentVatRegCode", e.target.value)
              }
            />
          </td>
        </>
      )}
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
        <TextField
          fullWidth
          value={product.barcode}
          onChange={(e) => changeHandler(index, "barcode", e.target.value)}
        />
      </td>

      <td className="products__td">
        <CNumberField
          fullWidth
          value={product.packageCode}
          // @ts-ignore
          onChange={(val) => {
            changeHandler(index, "packageCode", `${val}`);
          }}
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
          value={product.summa}
          // @ts-ignore
          onChange={summaChangeHandler}
        />
      </td>
      <td className="products__td">
        <CNumberField fullWidth value={product.deliverySum} disabled />
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
        <CNumberField disabled fullWidth value={product.vatSum} />
      </td>

      {hasExcise && (
        <>
          <td className="products__td">
            <CNumberField
              fullWidth
              value={product.exciseRate}
              // @ts-ignore
              onChange={(val) => changeHandler(index, "exciseRate", val)}
            />
          </td>

          <td className="products__td">
            <CNumberField fullWidth value={product.exciseSum} disabled />
          </td>
        </>
      )}

      <td className="products__td">
        {/* @ts-ignore */}
        <Autocomplete
          options={computedLgotaList}
          onChange={(e, value) => {
            // @ts-ignore
            changeHandler(index, "lgotaId", `${value.value}`);
            // @ts-ignore
            changeHandler(index, "lgotaName", value.label);
          }}
          renderInput={(params) => (
            <TextField {...params} value={product.lgotaId} />
          )}
        />
      </td>

      <td className="products__td">
        <CNumberField
          // @ts-ignore

          value={Math.round(product.deliverySumWithVat)}
        />
      </td>
      <td className="products__td">
        <FormControl fullWidth>
          <Select
            value={product.origin}
            onChange={(e) => changeHandler(index, "origin", e.target.value)}
          >
            <MenuItem value={1}>Производство от себя</MenuItem>
            <MenuItem value={2}>Выкуплено</MenuItem>
            <MenuItem value={3}>Предоставление услуги</MenuItem>
            <MenuItem value={4}>Не участвую</MenuItem>
          </Select>
        </FormControl>
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
