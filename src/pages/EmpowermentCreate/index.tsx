import { Button, Card, experimentalStyled } from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import {
  createEmpowermentDoc,
  saveDocToDraft,
  saveEmpowermentDoc,
} from "../../redux/thunks/docs.thunk";
import userService from "../../services/userService";
import AgentForm from "./forms/AgentForm";
import BuyerForm from "./forms/BuyerForm";
import DocForm from "./forms/DocForm";
import ProductsList from "./forms/ProductsList";
import SellerForm from "./forms/SellerForm";
import { initialValues } from "./model/initialValues";
import "./style.scss";
import { HighlightOff } from "@mui/icons-material";

const StyledCard = experimentalStyled(Card)(({ theme }) => ({
  display: "inline-block",
  padding: 15,
  marginBottom: 20,
  width: "100%",
}));

type UserData = {
  person: {
    tin: string;
    shortName: string;
    account: string;
    mfo: string;
    address: string;
    oked: string;
    districtId: number;
    director: string;
    accountant: string;
  };

  vatReg: {
    data: {
      vatRegCode: string;
      status: number;
    };
  };
};

const EmpowermentCreate = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showDoc, setShowDoc] = useState(false);
  const userData = useSelector(
    (state: { auth: { userData: UserData } }) => state.auth.userData
  );

  console.log({ userData });

  const draftData = location?.state;

  const { t } = useTranslation();

  const [products, setProducts] = useState(
    draftData?.productList ?? [
      {
        ordNo: 1,
        name: "",
        measureId: null,
        count: 0,
        catalogCode: "",
        catalogName: "",
      },
    ]
  );

  const saveDocument = () => {
    dispatch(
      // @ts-ignore
      saveEmpowermentDoc(formik.values, products)
    );
  };
  // @ts-ignore
  const onSubmit = (values) => {
    // @ts-ignore
    dispatch(createEmpowermentDoc(values, products));
  };

  const formik = useFormik({
    initialValues: draftData?.docData ?? {
      ...initialValues,
      buyerTin: userData.person.tin,
      buyer: {
        name: userData.person.shortName,
        account: userData.person.account,
        bankId: userData.person.mfo,
        address: userData.person.address,
        mobile: "",
        workPhone: "",
        oked: userData.person.oked,
        districtId: userData.person.districtId,
        director: userData.person.director,
        accountant: userData.person.accountant,
        branchCode: "",
        branchName: "",
        vatRegCode: userData.vatReg.data.vatRegCode,
        vatRegStatus: userData.vatReg.data.status,
      },
    },
    onSubmit,
  });
  // @ts-ignore
  const searchSeller = (tin) => {
    const token = localStorage.getItem("token");
    // @ts-ignore
    userService.searchUser(tin, JSON.parse(token)).then((res) => {
      const computedSeller = {
        ...formik.values.seller,
        // @ts-ignore
        name: res.person.shortName,
        // @ts-ignore
        account: res.person.account,
        // @ts-ignore
        bankId: res.person.mfo,
        // @ts-ignore
        address: res.person.address,
        // @ts-ignore
        oked: res.person.oked,
        // @ts-ignore
        districtId: res.person.districtId,
        // @ts-ignore
        director: res.person.director,
        // @ts-ignore
        accountant: res.person.accountant,
        // @ts-ignore
        vatRegCode: res.vatReg.data.vatRegCode,
        // @ts-ignore
        vatRegStatus: res.vatReg.data.status,
      };
      formik.setFieldValue("seller", computedSeller);
    });
  };
  // @ts-ignore
  const searchAgent = (tin) => {
    const token = localStorage.getItem("token");
    // @ts-ignore
    userService.searchUser(tin, JSON.parse(token)).then((res) => {
      const computedAgent = {
        // @ts-ignore
        ...formik.values.agent,
        // @ts-ignore
        fio: res.person.name,
        jobTitle: "",
        number: "",
        dateOfIssue: "",
        issuedBy: "",
      };

      formik.setFieldValue("agent", computedAgent);
    });
  };

  // @ts-ignore
  useEffect(() => {
    const sellerTin = formik.values.sellerTin;
    if (sellerTin?.length !== 9 && sellerTin?.length !== 14) return;
    searchSeller(sellerTin);
  }, [formik.values.sellerTin]);

  // @ts-ignore
  useEffect(() => {
    const agentTin = formik.values.agent.agentTin;
    if (agentTin?.length !== 9 && agentTin?.length !== 14) return;
    searchAgent(agentTin);
  }, [formik.values.agent.agentTin]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Header title={t("createPower")}>
        <Button
          variant="contained"
          color="error"
          onClick={() => history("/main/docs/sender")}
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

      <div className="EmpowermentCreate">
        <StyledCard elevation={12}>
          <DocForm formik={formik} />
        </StyledCard>

        <StyledCard elevation={12} style={{ display: "flex", gridGap: "50px" }}>
          <BuyerForm formik={formik} />
          <SellerForm formik={formik} />
        </StyledCard>

        <StyledCard elevation={12}>
          <AgentForm formik={formik} />
        </StyledCard>

        <StyledCard elevation={12}>
          <div className="content">
            <ProductsList products={products} setProducts={setProducts} />
          </div>
        </StyledCard>
      </div>
    </form>
  );
};

export default EmpowermentCreate;
