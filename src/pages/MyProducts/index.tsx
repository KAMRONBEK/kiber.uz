import {
  Button,
  Card,
  experimentalStyled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CAutocompleteWithRequest from "../../components/CAutocompleteWithRequest";
import Header from "../../components/Header";
import { fetchCatalogList } from "../../redux/thunks/measures.thunk";
import productService from "../../services/productService";
import "./style.scss";
import { showAlert } from "../../redux/thunks/alert.thunk";

const StyledCard = experimentalStyled(Card)(({ theme }) => ({
  display: "inline-block",
  padding: 15,
  marginBottom: 20,
  width: "100%",
}));

const MyProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  // @ts-ignore
  const catalogList = useSelector((state) => state.measures.catalogList);
  console.log({ catalogList });

  const dispatch = useDispatch();
  // @ts-ignore
  const userTin = useSelector((state) => state.auth.userTin);

  const { t } = useTranslation();
  console.log({ userTin });
  const addProduct = () => {
    const computedData = {
      // @ts-ignore
      mxikCode: selectedProduct?.value,
      tin: userTin,
    };

    productService.addProduct(computedData).then((res) => {
      setSelectedProduct(null);
      // @ts-ignore
      dispatch(showAlert(t("productAdded"), "success"));

      // @ts-ignore
      dispatch(fetchCatalogList());
    });
  };

  return (
    <div className="MyProducts">
      {/* @ts-ignore */}
      <Header title={t("myGoods")}></Header>

      <div className="form-wrapper">
        <StyledCard elevation={12}>
          <div className="searchBlock">
            <CAutocompleteWithRequest
              label={t("enterNameCode")}
              value={selectedProduct}
              onChange={setSelectedProduct}
            />
            <Button
              variant="contained"
              className="addBtn"
              disabled={!selectedProduct}
              onClick={addProduct}
            >
              {t("add")}
            </Button>
          </div>
        </StyledCard>

        <StyledCard elevation={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("classifierCode")}</TableCell>
                <TableCell>{t("classifierName")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* @ts-ignore */}
              {catalogList.map((product) => (
                <TableRow>
                  <TableCell>{product.mxikCode}</TableCell>
                  <TableCell>{product.positionName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledCard>
      </div>
    </div>
  );
};

export default MyProducts;
