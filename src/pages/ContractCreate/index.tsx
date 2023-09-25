import { Button, Card, experimentalStyled } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import {
  createContractDoc,
  saveContractDoc,
  saveDocToDraft,
} from "../../redux/thunks/docs.thunk";
import userService from "../../services/userService";
import BuyerForm from "./forms/BuyerForm";
import DocForm from "./forms/DocForm";
import PartsForm from "./forms/PartsForm";
import ProductList from "./forms/ProductList";
import SellerForm from "./forms/SellerForm";
import { initialValues } from "./model/initialValues";
import "./style.scss";

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
    directorPinfl: number;
  };
  taxGap: {
    taxGap: unknown;
  };
  vatReg: {
    data: {
      vatRegCode: string;
      status: number;
    };
  };
};

const ContractCreate = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userData = useSelector(
    (state: { auth: { userData: UserData } }) => state.auth.userData
  );

  const draftData = location?.state;

  const { t } = useTranslation();

  // @ts-ignore
  const onSubmit = (values) => {
    // @ts-ignore

    dispatch(createContractDoc(values, productList));
  };

  const formik = useFormik({
    initialValues: draftData ?? {
      ...initialValues,
      owner: {
        tin: userData.person.tin,
        name: userData.person.shortName,
        address: userData.person.address,
        workPhone: "",
        mobile: "",
        fax: "",
        oked: userData.person.oked,
        account: userData.person.account,
        bankId: userData.person.mfo,
        fizTin: `${userData.person.directorPinfl}`,
        fio: userData.person.director,
        branchCode: "",
        branchName: "",
        vatRegCode: userData.vatReg.data.vatRegCode,
        vatRegStatus: userData.vatReg.data.status,
      },
    },
    onSubmit,
  });

  const [productList, setProductList] = useState(
    draftData?.products ?? [
      {
        id: 1,
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
      },
    ]
  );

  // @ts-ignore
  const searchClient = (tin, index) => {
    const token = localStorage.getItem("token");

    // @ts-ignore
    userService.searchUser(tin, JSON.parse(token)).then((res) => {
      const computedClient = {
        ...formik.values.clients[index],
        // @ts-ignore
        tin: res.person.tin,
        // @ts-ignore

        name: res.person.shortName,
        // @ts-ignore

        address: res.person.address,
        workPhone: "",
        mobile: "",
        fax: "",
        // @ts-ignore
        oked: res.person.oked,
        // @ts-ignore
        account: res.person.account,
        // @ts-ignore
        bankId: res.person.mfo,
        // @ts-ignore
        fizTin: `${res.person.directorPinfl}`,
        // @ts-ignore
        fio: res.person.director,
        branchCode: "",
        branchName: "",
      };

      formik.setFieldValue(`clients.${index}`, computedClient);
    });
  };

  const saveDocument = () => {
    dispatch(
      // @ts-ignore
      saveContractDoc(formik.values, productList)
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Header title={t("createContract")}>
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

      <div className="FacturaCreate">
        <StyledCard elevation={12}>
          {/*   @ts-ignore */}
          <DocForm formik={formik} />
        </StyledCard>

        <StyledCard elevation={12} style={{ display: "flex", gridGap: "50px" }}>
          <SellerForm formik={formik} />
          <div style={{ flex: 1 }}>
            {/* @ts-ignore */}
            {formik.values.clients.map((item, index) => (
              <BuyerForm
                key={item.id}
                formik={formik}
                searchClient={searchClient}
                index={index}
              />
            ))}
          </div>
        </StyledCard>

        <StyledCard elevation={12}>
          {/*   @ts-ignore */}
          <ProductList
            productList={productList}
            setProductList={setProductList}
          />
        </StyledCard>

        <StyledCard elevation={12}>
          {/*   @ts-ignore */}
          <PartsForm formik={formik} />
        </StyledCard>
      </div>
    </form>
  );
};

export default ContractCreate;
