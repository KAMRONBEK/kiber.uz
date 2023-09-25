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
import { t } from "i18next";
import { useSelector } from "react-redux";

// @ts-ignore
const ProductsList = ({ products, setProducts }) => {
  // @ts-ignore
  const catalogList = useSelector((state) => state.measures.catalogList);

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

        let TotalSum = el.TotalSum;

        if (name === "Count") {
          TotalSum = Number(el.Count) * Number(el.Summa);
        }

        if (name === "Summa") {
          TotalSum = Number(el.Count) * Number(el.Summa);
        }

        return {
          ...el,
          TotalSum,
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
      ordNo: 1,
      name: "",
      summa: 0,
      count: 1,
      totalSum: 0,
      roadHaulageCost: 0,
      followDocuments: "",
      methodDefineWeight: "",
      loadClass: "",
      weightBrutto: 0,
      weightNetto: 0,
      catalogCode: "",
      catalogName: "",
      packageCode: "",
      packageName: "",
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
        OrdNo: index + 1,
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
            <th className="products__th"> {t("RoadHaulageCost")}*</th>
            <th className="products__th"> {t("FollowDocuments")}*</th>
            <th className="products__th"> {t("MethodDefineWeight")}*</th>
            <th className="products__th">{t("LoadClass")}*</th>
            <th className="products__th">{t("WeightBrutto")}*</th>
            <th className="products__th">{t("WeightNetto")}*</th>
            <th className="products__th"> {t("only")}*</th>
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
