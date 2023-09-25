import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ProductItem from "./ProductItem";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useMemo } from "react";

// @ts-ignore
const ProductsList = ({ products, setProducts }) => {
  // @ts-ignore
  const catalogList = useSelector((state) => state.measures.catalogList);

  const { t } = useTranslation();

  // @ts-ignore
  const computedCatalogList = useMemo(() => {
    if (!catalogList?.length) return [];
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
        return i === index ? { ...el, [name]: value } : el;
      });
      return result;
    });
  };

  const addProduct = () => {
    const newProduct = {
      ordNo: products.length + 1,
      name: "",
      measureId: null,
      count: 0,
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
            <th className="products__th">{t("unitMeasurements")}*</th>
            <th className="products__th"> {t("qty")}</th>
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
              catalogList={computedCatalogList}
            />
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        <div></div>
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
