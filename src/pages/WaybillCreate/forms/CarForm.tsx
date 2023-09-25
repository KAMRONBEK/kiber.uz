import React from "react";

import { Stack } from "@mui/system";
import { t } from "i18next";
import FTextField from "../../../components/FormElements/FTextField2";
import FSwitch from "../../../components/FormElements/FSwitch";
import { TextField, Typography } from "@mui/material";
import FSelect from "../../../components/FormElements/FSelect";

// @ts-ignore
const CarForm = ({ formik }) => {
  const TrailerType = [
    {
      label: t("trailer"),
      value: "0",
    },
    {
      label: t("semiTrailer"),
      value: "1",
    },
  ];

  return (
    <Stack gap={"1rem"}>
      <Typography color="secondary" variant="h5" className="card-title">
        {t("transport")}
      </Typography>
      <Stack direction="row" gap={"1rem"}>
        {/* @ts-ignore */}
        <FTextField
          label={t("carGovNo")}
          name="truckDoc.truckRegNo"
          formik={formik}
        />
        {/* @ts-ignore */}
        <FTextField
          label={t("type")}
          name="truckDoc.truckModel"
          formik={formik}
        />
      </Stack>

      {/* @ts-ignore */}

      <Stack direction="row" gap={"1rem"}>
        {/* @ts-ignore */}
        <FTextField
          label={t("govNo")}
          name="trailerDoc.trailerRegNo"
          formik={formik}
        />
        {/* @ts-ignore */}
        <FTextField
          label={t("type")}
          name="trailerDoc.trailerModel"
          formik={formik}
        />
      </Stack>

      <Stack direction="row" gap={"1rem"}>
        {/* @ts-ignore */}
        <FTextField label={t("driverName")} name="driverFio" formik={formik} />
      </Stack>
      <Stack direction="row" gap={"1rem"}>
        {/* @ts-ignore */}
        <FSelect
          name="trailerDoc.trailerType"
          label={t("trailerType")}
          width={"210px"}
          formik={formik}
          options={TrailerType}
        />
      </Stack>
      <Stack direction="row" gap={"1rem"}>
        {/* @ts-ignore */}
        <FSwitch label={t("shiftForm")} formik={formik} name="isShiftOverall" />
        {formik.values.isShiftOverall && (
          <TextField
            type="number"
            variant="outlined"
            value={formik.values.departuresCount}
            // @ts-ignore
            onChange={(e) =>
              formik.setFieldValue("departuresCount", e.target.value)
            }
          />
        )}
      </Stack>
    </Stack>
  );
};

export default CarForm;
