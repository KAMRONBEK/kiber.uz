import { Card, experimentalStyled, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { initialValues } from "./model/initialValues";
import "./style.scss";
import Header from "../../components/Header";
import DocForm from "./forms/DocForm";
import SellerForm from "./forms/SellerForm";
import BuyerForm from "./forms/BuyerForm";
import FTextField from "../../components/FormElements/FTextField2";
import { useEffect, useState } from "react";
import generateActText from "../../utils/generateActText";
import ProductsList from "./forms/ProductsList";
import {
  createActDoc,
  saveActDoc,
  saveDocToDraft,
} from "../../redux/thunks/docs.thunk";
import userService from "../../services/userService";
import { useTranslation } from "react-i18next";

import ActDraft from "../SingleDraft/ActDraft";

const StyledCard = experimentalStyled(Card)(({ theme }) => ({
  display: "inline-block",
  padding: 15,
  marginBottom: 20,
}));

type UserData = {
  person: {
    tin: string;
    shortName: string;
  };
};

const ActCreate = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showDoc, setShowDoc] = useState(false);

  const userData: UserData = useSelector(
    (state: { auth: { userData: UserData } }) => state.auth.userData
  );

  const draftData = location?.state;

  const { t } = useTranslation();
  //@ts-ignore
  const onSubmit = (values) => {
    // @ts-ignore
    dispatch(createActDoc(values, products));
  };

  const formik = useFormik({
    initialValues: draftData ?? {
      ...initialValues,
      sellerTin: userData.person.tin,
      sellerName: userData.person.shortName,
    },
    onSubmit,
  });

  const [products, setProducts] = useState(
    draftData?.productList.products ?? [
      {
        ordNo: 1,
        catalogCode: "",
        catalogName: "",
        name: "",
        count: 0,
        summa: 0,
        vatRate: 15,
        withoutVat: true,
        totalSum: 0,
      },
    ]
  );
  console.log({ draftData });

  const searchBuyer = () => {
    const tin = formik.values.buyerTin;
    const token = localStorage.getItem("token");

    if (tin?.length !== 9 && tin?.length !== 14) return null;
    userService
      // @ts-ignore
      .searchUser(tin, JSON.parse(token)) // @ts-ignore
      .then((res) => formik.setFieldValue("buyerName", res.person.shortName));
  };

  const saveDocument = () => {
    // @ts-ignore
    dispatch(saveActDoc(formik.values, products, false));
    history("/main/drafts");
  };

  const updateDoc = () => {
    dispatch(
      // @ts-ignore
      saveActDoc(formik.values, products, true)
    );
    history("/main/drafts");
  };

  useEffect(() => {
    formik.setFieldValue(
      "actDoc.actText",
      generateActText(formik.values.sellerName, formik.values.buyerName)
    );
  }, [formik.values.buyerName, formik.values.sellerName]);

  useEffect(() => {
    searchBuyer();
  }, [formik.values.buyerTin]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Header title={t("createAct")}>
        <Button
          variant="contained"
          color="error"
          onClick={() => history("/main/docs/sender")}
        >
          {t("back")}
        </Button>
        {draftData ? (
          <Button variant="contained" color="warning" onClick={updateDoc}>
            {t("seve")}
          </Button>
        ) : (
          <Button variant="contained" color="warning" onClick={saveDocument}>
            {t("seve")}
          </Button>
        )}
        <Button variant="contained" type="submit">
          {t("subscribe")}
        </Button>
      </Header>

      <div className="ActCreate">
        <StyledCard elevation={12}>
          <DocForm formik={formik} />
        </StyledCard>

        <StyledCard elevation={12} style={{ display: "flex", gridGap: "30px" }}>
          <SellerForm formik={formik} />

          <BuyerForm formik={formik} />
        </StyledCard>

        <StyledCard>
          <Typography variant="h5" className="card-title" color="secondary">
            {t("textAct")}
          </Typography>
          {/* @ts-ignore */}
          <FTextField
            multiline
            rows={4}
            fullWidth
            formik={formik}
            name="actDoc.actText"
            label={t("documentText")}
          />
        </StyledCard>

        <StyledCard>
          <ProductsList products={products} setProducts={setProducts} />
        </StyledCard>
      </div>
      {showDoc && (
        <ActDraft formik={formik} products={products} setShowDoc={setShowDoc} />
      )}
    </form>
  );
};

export default ActCreate;
