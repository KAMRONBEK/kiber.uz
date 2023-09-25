import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FTextField from "../../../components/FormElements/FTextField2";
// @ts-ignore
const SellerForm = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <div style={{ flex: 1 }}>
      <Typography variant="h5" className="card-title" color="secondary">
        {t("yourData")}
      </Typography>
      {/* @ts-ignore */}
      <FTextField
        InputProps={{
          readOnly: true,
        }}
        style={{ width: "90%" }}
        formik={formik}
        name="sellerTin"
        label={t("tinPinfl")}
      />

      <Typography variant="h5" className="card-title" color="secondary">
        {t("company")}
      </Typography>
      {/* @ts-ignore */}
      <FTextField
        InputProps={{
          readOnly: true,
        }}
        style={{ width: "90%" }}
        formik={formik}
        name="sellerName"
        label={t("name")}
      />
    </div>
  );
};

export default SellerForm;
