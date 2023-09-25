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
        <FTextField formik={formik} name="docNo" label="Документ №" />
        {/* @ts-ignore */}
        <FDatePicker formik={formik} name="docDate" label={t("documentDate")} />
        {/* @ts-ignore */}
        <FTextField
          formik={formik}
          name="documentName"
          label="Название документа"
        />
        <VerticalLine />
        {/* @ts-ignore */}
        <FTextField
          formik={formik}
          name="contractNo"
          label={t("contractNumber")}
        />
        {/* @ts-ignore */}
        <FDatePicker
          formik={formik}
          name="contractDate"
          label={t("contractDate")}
          maxDate={formik.values.docDate}
        />
      </div>
    </div>
  );
};

export default DocForm;
