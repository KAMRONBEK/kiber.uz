import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useTranslation } from "react-i18next";

let id = 2;
// @ts-ignore
const ProductList = ({ productList, setProductList, hasExcise }) => {
  // @ts-ignore
  const catalogList = useSelector((state) => state.measures.catalogList);

  const { t } = useTranslation();

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
    setProductList((prev) => {
      // @ts-ignore
      const result = prev.map((el, i) => {
        return i === index ? { ...el, [name]: value } : el;
      });
      return result;
    });
  };

  const addProduct = () => {
    const newProduct = {
      id: id,
      ordNo: 1,
      catalogCode: "",
      catalogName: "",
      barcode: "",
      name: "",
      measureId: 1,
      count: 0,
      summa: 0,
      deliverySum: 0,
      vatRate: 15,
      vatSum: 0,
      deliverySumWithVat: 0,
      withoutVat: true, // true - если “Без НДС”
    };
    id++;
    // @ts-ignore
    setProductList((prev) => [...prev, newProduct]);
  };
  // @ts-ignore
  const removeProduct = (index) => {
    // @ts-ignore
    setProductList((prev) => prev.filter((_, i) => i !== index));
  };

  const computedTotalSumm = useMemo(() => {
    let total = 0;
    // @ts-ignore
    productList.forEach((product) => {
      total += product.deliverySumWithVat;
    });
    return total;
  }, [productList]);

  return (
    <div className="ProductsList">
      {/* <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell style={{ minWidth: "300px" }}>
                {t("nameGoods")}*
              </TableCell>
              <TableCell style={{ minWidth: "300px" }} align="center">
                {t("productIdentification")}*
              </TableCell>
              <TableCell style={{ minWidth: "150px" }} align="center">
                {t("barCode")}
              </TableCell>

              <TableCell style={{ minWidth: "200px" }} align="center">
                {t("unitMeasurements")}*
              </TableCell>

              <TableCell style={{ minWidth: "100px" }} align="center">
                {t("qty")}
              </TableCell>

              <TableCell style={{ minWidth: "150px" }} align="center">
                {t("price")}*
              </TableCell>

              <TableCell style={{ minWidth: "150px" }} align="center">
                {t("deliveryCost")}*
              </TableCell>

              <TableCell style={{ minWidth: "100px" }} align="center">
                {t("vat")}, %
              </TableCell>

              <TableCell style={{ minWidth: "150px" }} align="center">
                {t("vatSum")}*
              </TableCell>

              {hasExcise && (
                <>
                  <TableCell style={{ minWidth: "100px" }} align="center">
                    {t("exciseRate")} %
                  </TableCell>

                  <TableCell style={{ minWidth: "100px" }} align="center">
                    {t("exciseSum")}
                  </TableCell>
                </>
              )}

              <TableCell style={{ minWidth: "150px" }} align="center">
                {t("only")}*
              </TableCell>

              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            
            {productList.map((product, index) => (
              <ProductItem
                key={product.id}
                products={productList}
                index={index}
                product={product}
                changeHandler={changeHandler}
                // @ts-ignore
                catalogList={catalogList}
                computedCatalogList={computedCatalogList}
                removeProduct={removeProduct}
                hasExcise={hasExcise}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      <table className="products__table">
        <thead className="products__thead">
          <tr className="products__tr">
            <th className="products__th"> No</th>
            <th className="products__th"> {t("productIdentification")}*</th>
            <th className="products__th"> {t("nameGoods")}*</th>
            <th className="products__th"> {t("barCode")}</th>
            <th className="products__th">{t("unitMeasurements")}*</th>
            <th className="products__th"> {t("qty")}</th>
            <th className="products__th">{t("price")}*</th>
            <th className="products__th">{t("deliveryCost")}*</th>
            <th className="products__th">{t("vat")}, %</th>
            <th className="products__th">{t("vatSum")}*</th>
            {hasExcise && (
              <>
                <th className="products__th">{t("exciseRate")} %</th>

                <th className="products__th">{t("exciseSum")}</th>
              </>
            )}
            <th className="products__th"> {t("only")}</th>
            <th className="products__th"></th>
          </tr>
        </thead>
        <tbody>
          {/* @ts-ignore */}
          {productList.map((product, index) => (
            <ProductItem
              key={product.id}
              products={productList}
              index={index}
              product={product}
              changeHandler={changeHandler}
              // @ts-ignore
              catalogList={catalogList}
              computedCatalogList={computedCatalogList}
              removeProduct={removeProduct}
              hasExcise={hasExcise}
            />
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        <Typography variant="h5" color="primary">
          {t("total")}: {computedTotalSumm}{" "}
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

export default ProductList;
