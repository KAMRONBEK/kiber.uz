import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // @ts-ignore
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// @ts-ignore
const ProductList = ({
  // @ts-ignore
  productList,
  // @ts-ignore
  setProductList,
  // @ts-ignore
  hasExcise,
  // @ts-ignore
  formik,
  // @ts-ignore
  hasCommittent,
}) => {
  // @ts-ignore
  const catalogList = useSelector((state) => state.measures.catalogList);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { t } = useTranslation();

  const computedCatalogList = useMemo(() => {
    if (!catalogList?.length) return [];
    return catalogList.map((catalog: { mxikCode: any; groupName: any }) => ({
      label: `${catalog?.mxikCode} - ${catalog?.groupName}`,
      value: catalog?.mxikCode,
    }));
  }, [catalogList]);

  const changeHandler = (index: any, name: any, value: any) => {
    setProductList((prev: any[]) => {
      const result = prev.map((el, i) => {
        return i === index ? { ...el, [name]: value } : el;
      });
      return result;
    });
  };

  const addProduct = () => {
    const newProduct = {
      ordNo: 1,
      committentName: "",
      committentTin: "",
      committentVatRegCode: "",
      catalogCode: "",
      catalogName: "",
      barcode: "",
      lgotaId: null,
      lgotaVatSum: 0,
      packageCode: "",
      name: "",
      serial: "",
      baseSumma: 0,
      profitRate: 0,
      count: 0,
      summa: 0,
      exciseRate: 0,
      exciseSum: 0,
      deliverySum: 0,
      vatRate: 15,
      vatSum: 0,
      deliverySumWithVat: 0,
      origin: 0,
      withoutVat: true, // true - если “Без НДС”
    };
    // @ts-ignore
    setProductList((prev) => [...prev, newProduct]);
  };

  const removeProduct = (index: any) => {
    setProductList((prev: any[]) => prev?.filter((_, i) => i !== index));
  };
  const computedTotalSumm = useMemo(() => {
    let total = 0;
    productList.forEach((product: { deliverySumWithVat: number }) => {
      total += product.deliverySumWithVat;
    });
    return total;
  }, [productList]);

  useEffect(() => {
    const updateDimension = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [windowWidth]);

  return (
    <div
      className="ProductsList"
      style={{ overflowX: windowWidth > 1550 ? "hidden" : "scroll" }}
    >
      <table className="products__table">
        <thead className="products__thead">
          <tr className="products__tr">
            <th className="products__th"> No</th>
            {hasCommittent && (
              <>
                <th className="products__th">Название Коммиссиона</th>

                <th className="products__th">ИНН Комиссиона</th>
                <th className="products__th">
                  Рег. код плательщика НДС комитента
                </th>
              </>
            )}
            <th className="products__th onlywidth">
              {t("productIdentification")}*
            </th>
            <th className="products__th"> {t("nameGoods")}</th>
            <th className="products__th onlywidth"> {t("barCode")}</th>
            <th className="products__th"> {t("packageCode")}</th>
            <th className="products__th"> {t("qty")}</th>
            <th className="products__th onlywidth">{t("price")}*</th>
            <th className="products__th">{t("deliveryCost")}*</th>
            <th className="products__th">{t("vat")}, %</th>
            <th className="products__th">{t("vatSum")}*</th>

            {hasExcise && (
              <>
                <th className="products__th">{t("exciseRate")} %</th>

                <th className="products__th">{t("exciseSum")}</th>
              </>
            )}
            <th className="products__th">{t("privilege")}</th>
            <th className="products__th onlywidth">{t("only")}</th>
            <th className="products__th">{t("Происхождение товара")}</th>
            <th className="products__th"></th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product: any[], index: number) => (
            <ProductItem
              products={productList}
              index={index}
              product={product}
              changeHandler={changeHandler}
              computedCatalogList={computedCatalogList}
              removeProduct={removeProduct}
              hasExcise={hasExcise}
              formik={formik}
              hasCommittent={hasCommittent}
            />
          ))}
        </tbody>
      </table>
      <div className="table-foter">
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
