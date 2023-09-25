import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@mui/material";
import ProductItem from "./ProductItem";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// @ts-ignore
const ProductsList = ({ products, setProducts }) => {
  // @ts-ignore
  const catalogList = useSelector((state) => state.measures.catalogList);

  const { t } = useTranslation();

  const computedCatalogList = useMemo(() => {
    if (!catalogList.length) return [];
    // @ts-ignore
    return catalogList.map((catalog) => ({
      label: `${catalog?.mxikCode} - ${catalog?.groupName}`,
      value: catalog?.mxikCode,
    }));
  }, [catalogList]);
  // @ts-ignore
  const changeHandler = (index, name, value) => {
    // @ts-ignore
    setProducts((prev) => {
      // @ts-ignore
      const result = prev.map((el, i) => {
        if (i !== index) return el;

        let totalSum = el.totalSum;

        if (name === "count") {
          totalSum = Number(el.count) * Number(el.summa);
        }

        if (name === "summa") {
          totalSum = Number(el.count) * Number(el.summa);
        }

        return {
          ...el,
          totalSum,
          [name]: value,
        };
      });
      return result;
    });
  };

  const totalProductSum = useMemo(() => {
    let summ = 0;
    // @ts-ignore
    products.forEach((product) => (summ += product.totalSum));
    return summ;
  }, [products]);

  const addProduct = () => {
    const newProduct = {
      ordNo: products.length + 1,
      name: "",
      count: 0,
      summa: 0,
      ndsPersent: 0,
      ndsSumma: 0,
      totalSum: 0,
    };
    // @ts-ignore
    setProducts((prev) => [...prev, newProduct]);
  };
  // @ts-ignore
  const removeProduct = (index) => {
    // @ts-ignore
    setProducts((prev) => prev.filter((_, i) => i !== index));
    // @ts-ignore
    setProducts((prev) =>
      // @ts-ignore
      prev.map((el, index) => ({
        ...el,
        ordNo: index + 1,
      }))
    );
  };

  return (
    <div className="ProductsList">
      <table className="products__table">
        <thead className="products__thead">
          <tr className="products__tr">
            <th className="products__th"> No</th>
            <th className="products__th"> {t("productIdentification")}*</th>
            <th className="products__th"> {t("nameGoods")}*</th>
            <th className="products__th"> {t("qty")}</th>
            <th className="products__th">{t("price")}*</th>
            <th className="products__th">{t("vat")}, %</th>
            <th className="products__th">{t("vatSum")}*</th>
            <th className="products__th"> {t("only")}</th>
            <th className="products__th"></th>
          </tr>
        </thead>
        <tbody>
          {/* @ts-ignore */}
          {products.map((product, index) => (
            <ProductItem
              products={products}
              product={product}
              index={index}
              changeHandler={changeHandler}
              removeProduct={removeProduct}
              computedCatalogList={computedCatalogList}
            />
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        <Typography variant="h5" color="primary">
          {t("total")}: {totalProductSum}{" "}
        </Typography>
        <div className="btns-area">
          <Button
            variant="outlined"
            startIcon={<AddCircleIcon />}
            onClick={addProduct}
          >
            {t("addNewProduct")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
