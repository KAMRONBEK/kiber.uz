import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FDatePicker from "../../../components/FormElements/FDatePicker";
import FTextField from "../../../components/FormElements/FTextField2";

// @ts-ignore
const OldFacturaForm = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography color="secondary" variant="h5" className="card-title">
        {t("oldInvoice")}
      </Typography>

      <div className="form-block">
        {/* @ts-ignore */}
        <FTextField
          formik={formik}
          name="oldFacturaDoc.oldFacturaId"
          label={t("idInvoice")}
          required
          style={{ width: "300px" }}
        />
        {/* @ts-ignore */}
        <FTextField
          formik={formik}
          name="oldFacturaDoc.oldFacturaNo"
          label={t("oldInvoiceNumber")}
          required
          style={{ width: "300px" }}
        />

        <FDatePicker
          label={t("oldInvoiceDate")}
          required
          name="oldFacturaDoc.oldFacturaDate"
          formik={formik}
          inputProps={{ style: { width: "300px" } }}
        />
      </div>
    </>
  );
};

export default OldFacturaForm;
