import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FDatePicker from "../../../components/FormElements/FDatePicker";
import FTextField from "../../../components/FormElements/FTextField2";
//@ts-ignore
const DocForm = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography variant="h5" className="card-title" color="secondary">
        {t("documentData")}
      </Typography>
      <div className="form-block">
        {/* @ts-ignore */}
        <FTextField
          formik={formik}
          name="verificationActDoc.verificationActNo"
          label="Акт №"
        />
        {/* @ts-ignore */}
        <FDatePicker
          formik={formik}
          name="verificationActDoc.verificationActDate"
          label={t("documentDate")}
        />
      </div>
    </div>
  );
};

export default DocForm;
