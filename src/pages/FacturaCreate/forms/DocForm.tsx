import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FDatePicker from "../../../components/FormElements/FDatePicker";
import FTextField from "../../../components/FormElements/FTextField2";
import VerticalLine from "../../../components/VerticalLine";

// @ts-ignore
const DocForm = ({ formik }) => {
  const { t } = useTranslation();
  return (
    <>
      <Typography color="secondary" variant="h5" className="card-title">
        {t("documentData")}
      </Typography>
      <div className="form-block">
        {/* @ts-ignore */}
        <FTextField
          formik={formik}
          name="facturaDoc.facturaNo"
          label={t("invoiceNumber")}
          required
        />
        {/* @ts-ignore */}
        <FDatePicker
          label={t("documentDate")}
          required
          name="facturaDoc.facturaDate"
          formik={formik}
        />
        {/* @ts-ignore */}
        <>
          <VerticalLine />
          {/* @ts-ignore */}
          <FTextField
            formik={formik}
            name="contractDoc.contractNo"
            label={t("contractNumber")}
            required
          />
          {/* @ts-ignore */}
          <FDatePicker
            formik={formik}
            label={t("contractDate")}
            name="contractDoc.contractDate"
            maxDate={formik.values.facturaDoc.facturaDate}
            required
          />
        </>
      </div>
    </>
  );
};

export default DocForm;
