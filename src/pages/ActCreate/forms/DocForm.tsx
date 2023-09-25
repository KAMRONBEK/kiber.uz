import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FDatePicker from "../../../components/FormElements/FDatePicker";
import FTextField from "../../../components/FormElements/FTextField2";
import VerticalLine from "../../../components/VerticalLine";
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
        <FTextField formik={formik} name="actDoc.actNo" label="Акт №" />
        {/* @ts-ignore */}
        <FDatePicker
          formik={formik}
          name="actDoc.actDate"
          label={t("documentDate")}
        />
        <VerticalLine />
        {/* @ts-ignore */}
        <FTextField
          formik={formik}
          name="contractDoc.contractNo"
          label={t("contractNumber")}
        />
        {/* @ts-ignore */}
        <FDatePicker
          formik={formik}
          name="contractDoc.contractDate"
          label={t("contractDate")}
          maxDate={formik.values.actDoc.actDate}
        />
      </div>
    </div>
  );
};

export default DocForm;
