import { Switch, Typography } from "@mui/material";
import FSelect from "../../../components/FormElements/FSelect";
import FSwitch from "../../../components/FormElements/FSwitch";
import factuaTypes from "../model/facturaTypes";
import singleSidedTypes from "../model/singleSidedTypes";

// @ts-ignore
const FacturaType = ({ formik }) => {
  return (
    <>
      <Typography
        onClick={() => console.log("VALUES ===> ", formik.values)}
        color="secondary"
        variant="h5"
        className="card-title"
      >
        Тип фактуры
      </Typography>
      <div className="form-block">
        <FSelect
          label="Тип фактуры"
          width={"300px"}
          formik={formik}
          name="facturaType"
          options={factuaTypes}
        />

        <div>
          <Switch
            checked={formik.values.singleSidedType}
            onChange={(e, val) =>
              formik.setFieldValue("singleSidedType", val ? 1 : 0)
            }
            id="single-sided-type"
          />
          <label htmlFor="single-sided-type">Односторонняя счёт-фактура</label>
        </div>

        {!!formik.values.singleSidedType && (
          <FSelect
            label="Тип одностороннего документа"
            width={"300px"}
            formik={formik}
            name="singleSidedType"
            options={singleSidedTypes}
          />
        )}
        {/* @ts-ignore */}
        <FSwitch
          label="Счёт-фактура с акцизным налогом"
          formik={formik}
          name="productList.hasExcise"
        />
      </div>
    </>
  );
};

export default FacturaType;
