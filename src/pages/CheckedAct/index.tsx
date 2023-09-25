import { Card, experimentalStyled, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";
import Header from "../../components/Header";
import { useEffect, useReducer, useState } from "react";
import generateActText from "../../utils/generateActText";

import {
  createActDoc,
  createVerificationActDoc,
  saveDocToDraft,
  saveVerificationActDoc,
} from "../../redux/thunks/docs.thunk";
import userService from "../../services/userService";
import { useTranslation } from "react-i18next";
import BuyerForm from "./forms/BuyerForm";
import SellerForm from "./forms/SellerForm";
import DocForm from "./forms/DocForm";
import FTextField from "../../components/FormElements/FTextField2";
import { initialValues } from "./model/initialValues";
import ContractList from "./forms/ContractList";
import { initialState } from "./model/initialStateContract";
import { contractReducer } from "./model/reducers";

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

const CheckedAct = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userData: UserData = useSelector(
    (state: { auth: { userData: UserData } }) => state.auth.userData
  );

  const draftData = location?.state;
  const { t } = useTranslation();
  //@ts-ignore
  const onSubmit = (values) => {
    // @ts-ignore
    dispatch(createVerificationActDoc(values, state));
  };

  const formik = useFormik({
    initialValues: draftData?.docData ?? {
      ...initialValues,
      ownerName: userData.person.shortName,
      ownerTin: userData.person.tin,
    },
    onSubmit,
  });
  // @ts-ignore
  const [state, dispatchReducer] = useReducer(contractReducer, initialState);

  const searchBuyer = () => {
    const tin = formik.values.partnerTin;
    const token = localStorage.getItem("token");
    if (tin?.length !== 9 && tin?.length !== 14) return null;
    userService
      // @ts-ignore
      .searchUser(tin, JSON.parse(token))

      .then((res) => {
        // @ts-ignore
        formik.setFieldValue("partnerName", res.person.shortName);
        // @ts-ignore
        formik.setFieldValue("partnerFizTin", res.person.directorPinfl);
      });
  };

  const searchOwner = () => {
    const tin = userData.person.tin;
    const token = localStorage.getItem("token");
    userService
      // @ts-ignore
      .searchUser(tin, JSON.parse(token))
      // @ts-ignore
      .then((res) =>
        // @ts-ignore
        formik.setFieldValue("ownerFizTin", res.person.directorPinfl)
      );
  };

  const saveDocument = () => {
    dispatch(
      // @ts-ignore
      saveVerificationActDoc(formik.values, state)
    );
  };

  useEffect(() => {
    formik.setFieldValue(
      "verificationActDoc.verificationActText",
      generateActText(formik.values.ownerName, formik.values.partnerName)
    );
  }, [formik.values.buyerName, formik.values.sellerName]);

  useEffect(() => {
    searchBuyer();
    searchOwner();
  }, [formik.values.partnerTin]);

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
        <Button
          variant="contained"
          color="warning"
          onClick={() => saveDocument()}
        >
          {t("seve")}
        </Button>
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
            name="verificationActDoc.verificationActText"
            label={t("documentText")}
          />
        </StyledCard>

        <StyledCard>
          <ContractList
            contracts={state}
            // setContracts={setContracts}
            dispatch={dispatchReducer}
            partner={formik.values.PartnerName}
            owner={formik.values.OwnerName}
            formik={formik}
          />
        </StyledCard>
      </div>
    </form>
  );
};

export default CheckedAct;
