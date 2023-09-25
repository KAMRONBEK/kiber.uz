import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  experimentalStyled,
  Typography,
} from "@mui/material";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import {
  createWaybillDoc,
  saveDocToDraft,
  saveWaybillDoc,
} from "../../redux/thunks/docs.thunk";
import { useLocation, useNavigate } from "react-router-dom";
import { t } from "i18next";
import DocForm from "./forms/DocForm";
import CarForm from "./forms/CarForm";
import DealershipForm from "./forms/DealershipForm";
import "./styles.scss";
import { initialValues } from "./model/initialValues";
import ProductsList from "./forms/ProductsList";
import userService from "../../services/userService";
import moment from "moment";

const StyledCard = experimentalStyled(Card)(({ theme }) => ({
  display: "inline-block",
  padding: 15,
  marginBottom: 20,
  width: "100%",
}));

const WaybillCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showDoc, setShowDoc] = useState(false);
  // @ts-ignore
  const userData = useSelector((state) => state.auth.userData);
  const draftData = location?.state;

  // @ts-ignore
  const onSubmit = (values) => {
    // @ts-ignore
    dispatch(createWaybillDoc(values, products, userData.person.tin));
  };

  const formik = useFormik({
    initialValues: draftData?.docData ?? {
      ...initialValues,
      carrierTin: userData.person.tin,
      carrierName: userData.person.shortName,
    },
    onSubmit,
  });
  const saveDocument = () => {
    dispatch(
      // @ts-ignore
      saveWaybillDoc(formik.values, products, "waybill")
    );
  };

  const searchCustomer = () => {
    const tin = formik.values.customerTin;
    const token = localStorage.getItem("token");
    if (tin?.length !== 9 && tin?.length !== 14) return null;
    userService
      // @ts-ignore
      .searchUser(tin, JSON.parse(token))
      // @ts-ignore
      .then((res) =>
        // @ts-ignore
        formik.setFieldValue("customerName", res.person.shortName)
      );
  };
  const searchSeller = () => {
    const tin = formik.values.sellerTin;
    const token = localStorage.getItem("token");
    if (tin?.length !== 9 && tin?.length !== 14) return null;
    userService
      // @ts-ignore
      .searchUser(tin, JSON.parse(token))
      // @ts-ignore
      .then((res) =>
        // @ts-ignore
        formik.setFieldValue("sellerName", res.person.shortName)
      );
  };
  const searchBuyer = () => {
    const tin = formik.values.buyerTin;
    const token = localStorage.getItem("token");
    if (tin?.length !== 9 && tin?.length !== 14) return null;
    userService
      // @ts-ignore
      .searchUser(tin, JSON.parse(token))
      // @ts-ignore
      .then((res) =>
        // @ts-ignore
        formik.setFieldValue("buyerName", res.person.shortName)
      );
  };

  useEffect(() => {
    searchSeller();
  }, [formik.values.sellerTin]);
  useEffect(() => {
    searchBuyer();
  }, [formik.values.buyerTin]);
  useEffect(() => {
    searchCustomer();
  }, [formik.values.customerTin]);

  const [products, setProducts] = useState([
    {
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
    },
  ]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Header title={t("newTransportNo")}>
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate("/main/docs/sender")}
        >
          {t("back")}
        </Button>
        <Button variant="contained" color="warning" onClick={saveDocument}>
          {t("seve")}
        </Button>
        <Button variant="contained" type="submit">
          {t("subscribe")}
        </Button>
      </Header>

      <div className="VatCreate">
        <StyledCard elevation={12}>
          {/* @ts-ignore */}
          <DocForm formik={formik} />
        </StyledCard>
        <StyledCard elevation={12}>
          {/* @ts-ignore */}
          <CarForm formik={formik} />
        </StyledCard>
        <StyledCard elevation={12}>
          {/* @ts-ignore */}
          <DealershipForm formik={formik} />
        </StyledCard>

        <StyledCard>
          <ProductsList products={products} setProducts={setProducts} />
        </StyledCard>
      </div>
    </form>
  );
};

export default WaybillCreate;
