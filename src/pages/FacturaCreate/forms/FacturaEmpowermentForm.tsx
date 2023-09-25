import { Switch, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import FDatePicker from "../../../components/FormElements/FDatePicker";
import FTextField from "../../../components/FormElements/FTextField2";

// @ts-ignore
const FacturaEmpowermentForm = ({ formik }) => {
  const [hasEmpowerment, setHasEmpowerment] = useState(false);

  const { t } = useTranslation();

  return (
    <>
      <Typography color="secondary" variant="h5" className="card-title">
        {t("empowermentTwo")}
        <Switch
          checked={hasEmpowerment}
          onChange={(_, val) => setHasEmpowerment(val)}
        />
      </Typography>

      {hasEmpowerment && (
        <div className="form-block">
          {/* @ts-ignore */}
          <FTextField
            formik={formik}
            name="facturaEmpowermentDoc.empowermentNo"
            label={t("empowermentNomber")}
            style={{ flex: 1 }}
          />
          {/* @ts-ignore */}
          <FDatePicker
            formik={formik}
            name="facturaEmpowermentDoc.empowermentDateOfIssue"
            label={t("empowermentData")}
            inputProps={{ style: { flex: 1 } }}
          />
          {/* @ts-ignore */}
          <FTextField
            formik={formik}
            name="facturaEmpowermentDoc.agentTin"
            label={t("tinFace")}
            style={{ flex: 1 }}
          />
          {/* @ts-ignore */}
          <FTextField
            formik={formik}
            name="facturaEmpowermentDoc.agentFio"
            label={t("fioFace")}
            style={{ flex: 1 }}
          />
        </div>
      )}
    </>
  );
};

export default FacturaEmpowermentForm;
