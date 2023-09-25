import { Typography } from "@mui/material";
import FTextField from "../../../components/FormElements/FTextField2";
import { initialValues } from "../model/initialValues";
import { useTranslation } from "react-i18next";
// @ts-ignore
const PartsForm = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <div style={{ flex: 1 }}>
      <Typography color="secondary" variant="h5" className="card-title">
        {t("content")}
      </Typography>
      {/* @ts-ignore */}
      {formik.values?.parts?.map((part, index) => (
        <div key={index} className="content client-block ">
          {/* @ts-ignore */}
          <FTextField
            label={t("header")}
            name={`parts[${index}].title`}
            fullWidth
            formik={formik}
          />
          {/* @ts-ignore */}
          <FTextField
            label={t("text")}
            name={`parts[${index}].body`}
            fullWidth
            multiline
            rows={5}
            formik={formik}
          />
        </div>
      ))}
    </div>
  );
};

export default PartsForm;
