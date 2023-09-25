import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FTextField from "../../../components/FormElements/FTextField2";
//@ts-ignore
const BuyerForm = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <div style={{ flex: 1 }}>
      <Typography variant="h5" className="card-title" color="secondary">
        {t("partnerDate")}
      </Typography>
      {/* @ts-ignore */}
      <FTextField
        style={{ width: "90%" }}
        formik={formik}
        name="partnerTin"
        label={t("tinPinfl")}
      />

      <Typography variant="h5" className="card-title" color="secondary">
        {t("portnerCompany")}
      </Typography>
      {/* @ts-ignore */}
      <FTextField
        style={{ width: "90%" }}
        formik={formik}
        name="partnerName"
        label={t("name")}
      />
    </div>
  );
};

export default BuyerForm;
