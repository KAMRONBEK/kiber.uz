import { Typography } from "@mui/material";
import FDatePicker from "../../../components/FormElements/FDatePicker";
import FTextField from "../../../components/FormElements/FTextField2";

// @ts-ignore
const OldFacturaForm = ({ formik }) => {
  return (
    <>
      <Typography color="secondary" variant="h5" className="card-title">
        Данные старой счет фактуры
      </Typography>

      <div className="form-block">
        {/* @ts-ignore */}
        <FTextField
          formik={formik}
          name="oldFacturaDoc.oldFacturaId"
          label="ID старой счет фактуры"
          required
          style={{ width: "300px" }}
        />
        {/* @ts-ignore */}

        <FTextField
          formik={formik}
          name="oldFacturaDoc.oldFacturaNo"
          label="Номер старой счет фактуры"
          required
          style={{ width: "300px" }}
        />

        <FDatePicker
          label="Дата старой счет фактуры"
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
