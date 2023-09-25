import React from "react";
import { Stack } from "@mui/system";
import { Button, Card, Typography, Box } from "@mui/material";
import { t } from "i18next";
import FTextField from "../../../components/FormElements/FTextField2";
import FSelect from "../../../components/FormElements/FSelect";
import FDatePicker from "../../../components/FormElements/FDatePicker";
// @ts-ignore
const DocForm = ({ formik }) => {
  const CarrierType = [
    {
      label: t("fromCtoC"),
      value: 0,
    },
    {
      label: t("fromStoB"),
      value: 1,
    },
  ];
  const TransportType = [
    {
      label: t("car"),
      value: 0,
    },
    {
      label: t("train"),
      value: 1,
    },
  ];
  return (
    <Stack gap={"1rem"}>
      <Typography color="secondary" variant="h5" className="card-title">
        {t("transportNo")}
      </Typography>
      <Stack direction="row" gap={"1rem"}>
        {/* @ts-ignore */}
        <FTextField
          label={t("transportNo")}
          name="waybillDoc.waybillNo"
          formik={formik}
        />
        {/* @ts-ignore */}
        <FDatePicker
          label={t("date")}
          name="waybillDoc.waybillDate"
          formik={formik}
        />
        <FSelect
          name="deliveryType"
          label={t("carriageType")}
          width={"210px"}
          formik={formik}
          options={CarrierType}
        />
      </Stack>

      {/* @ts-ignore */}

      <Typography color="secondary" variant="h5" className="card-title">
        {t("contract")}
      </Typography>
      <Stack direction="row" gap={"1rem"}>
        {/* @ts-ignore */}
        <FTextField
          label={t("contractNo")}
          name="contractDoc.contractNo"
          formik={formik}
        />
        {/* @ts-ignore */}
        <FDatePicker
          label={t("date")}
          name="contractDoc.contractDate"
          formik={formik}
        />
      </Stack>

      <Typography color="secondary" variant="h5" className="card-title">
        {t("roadList")}
      </Typography>
      <Stack direction="row" gap={"1rem"}>
        {/* @ts-ignore */}
        <FTextField
          label={t("roadNo")}
          name="tripTicketDoc.tripTicketNo"
          formik={formik}
        />
        {/* @ts-ignore */}
        <FDatePicker
          label={t("date")}
          name="tripTicketDoc.tripTicketDate"
          formik={formik}
        />
        <FSelect
          name="transportType"
          label={t("transportType")}
          width={"300px"}
          formik={formik}
          options={TransportType}
        />
      </Stack>
    </Stack>
  );
};

export default DocForm;
