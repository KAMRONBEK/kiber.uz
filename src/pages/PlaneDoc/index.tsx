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
import { useEffect, useState } from "react";
import { createPlaneDoc, saveActDoc } from "../../redux/thunks/docs.thunk";
import userService from "../../services/userService";
import { useTranslation } from "react-i18next";

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

const PlaneDoc = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [fileName, setFileName] = useState("");
  const userData: UserData = useSelector(
    (state: { auth: { userData: UserData } }) => state.auth.userData
  );

  const draftData = location?.state;

  const { t } = useTranslation();
  //@ts-ignore
  const onSubmit = (values) => {
    // @ts-ignore
    dispatch(createPlaneDoc(values));
  };

  const formik = useFormik({
    initialValues: draftData ?? {
      ...initialValues,
      sellerTin: userData.person.tin,
      sellerName: userData.person.shortName,
    },
    onSubmit,
  });

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

  // @ts-ignore
  const handlePDFFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Make a fileInfo Object
      console.log("Called", reader);
      let baseURL = reader.result;

      formik.setFieldValue("document", baseURL);
      setFileName(file.name);
    };
  };

  useEffect(() => {
    searchBuyer();
  }, [formik.values.buyerTin]);

  console.log({ userData });
  useEffect(() => {}, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Header title={t("Создать произвольный документ")}>
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
          <Button fullWidth variant="contained">
            <label style={{ width: "100%", padding: "30px 15px" }}>
              {fileName.length > 1 ? (
                <h1>{fileName}</h1>
              ) : (
                <h1>Нажмите чтобы выбрать файл</h1>
              )}
              <input type="file" onChange={handlePDFFile} />
            </label>
          </Button>
        </StyledCard>
      </div>
    </form>
  );
};

export default PlaneDoc;
