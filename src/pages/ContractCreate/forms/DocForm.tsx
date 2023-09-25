import { Typography } from "@mui/material";
import FDatePicker from "../../../components/FormElements/FDatePicker";
import FTextField from "../../../components/FormElements/FTextField2";
import { useTranslation } from "react-i18next";

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
          name="contractDoc.contractName"
          label={t("denomination")}
          required
        />
        {/* @ts-ignore */}
        <FTextField
          formik={formik}
          name="contractDoc.contractNo"
          label={t("contractNumber")}
          required
        />
        {/* @ts-ignore */}
        <FTextField
          formik={formik}
          name="contractDoc.contractPlace"
          label={t("placeConclusion")}
          required
        />
        {/* @ts-ignore */}
        <FDatePicker
          label={t("dataConclusion")}
          required
          name="contractDoc.contractDate"
          formik={formik}
        />
        {/* @ts-ignore */}
        <FDatePicker
          label={t("validUntil")}
          required
          name="contractDoc.contractExpireDate"
          formik={formik}
        />
      </div>
    </>
  );
};

export default DocForm;
