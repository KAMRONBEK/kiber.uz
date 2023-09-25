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
      <div>
        <div className="form-block">
          {/* @ts-ignore */}
          <FTextField
            formik={formik}
            name="empowermentDoc.empowermentNo"
            label={t("empowermentNomber")}
            required
          />
          {/* @ts-ignore */}

          <FDatePicker
            label={t("dateIssue")}
            required
            name="empowermentDoc.empowermentDateOfIssue"
            formik={formik}
          />
          {/* @ts-ignore */}

          <FDatePicker
            label={t("validUntil")}
            required
            name="empowermentDoc.empowermentDateOfExpire"
            formik={formik}
            minDate={formik.values.empowermentDoc.empowermentDateOfIssue}
          />
        </div>

        <div className="form-block">
          {/* @ts-ignore */}
          <FTextField
            formik={formik}
            name="contractDoc.contractNo"
            label={t("contractNumber")}
            required
          />
          {/* @ts-ignore */}

          <FDatePicker
            label={t("contractDate")}
            required
            name="contractDoc.contractDate"
            formik={formik}
            maxDate={formik.values.empowermentDoc.empowermentDateOfIssue}
          />
        </div>
      </div>
    </>
  );
};

export default DocForm;
