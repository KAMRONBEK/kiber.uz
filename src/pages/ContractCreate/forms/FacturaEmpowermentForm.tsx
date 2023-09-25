import { Switch, Typography } from "@mui/material";
import { useState } from "react";
import FDatePicker from "../../../components/FormElements/FDatePicker";
import FTextField from "../../../components/FormElements/FTextField2";

// @ts-ignore
const FacturaEmpowermentForm = ({ formik }) => {
  const [hasEmpowerment, setHasEmpowerment] = useState(false);

  return (
    <>
      <Typography color="secondary" variant="h5" className="card-title">
        Доверенность
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
            label="Номер доверенности"
            style={{ flex: 1 }}
          />
          <FDatePicker
            formik={formik}
            name="facturaEmpowermentDoc.empowermentDateOfIssue"
            label="Дата доверенности"
            inputProps={{ style: { flex: 1 } }}
          />
          {/* @ts-ignore */}
          <FTextField
            formik={formik}
            name="facturaEmpowermentDoc.agentTin"
            label="ИНН отв. лица"
            style={{ flex: 1 }}
          />
          {/* @ts-ignore */}
          <FTextField
            formik={formik}
            name="facturaEmpowermentDoc.agentFio"
            label="Ф.И.О. отв. лица"
            style={{ flex: 1 }}
          />
        </div>
      )}
    </>
  );
};

export default FacturaEmpowermentForm;
