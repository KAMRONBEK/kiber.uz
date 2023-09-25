import { Switch, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FSelect from "../../../components/FormElements/FSelect";
import FSwitch from "../../../components/FormElements/FSwitch";

// @ts-ignore
const FacturaType = ({ formik }) => {
  const { t } = useTranslation();
  const facturaTypes = [
    {
      label: t("standard"),
      value: 0,
    },
    {
      label: t("additional"),
      value: 1,
    },
    {
      label: t("compensationExp"),
      value: 2,
    },
    {
      label: t("noPayment"),
      value: 3,
    },

    {
      label: t("corrected"),
      value: 4,
    },
    {
      label: t("correctedExp"),
      value: 5,
    },
    {
      label: t("additionalExp"),
      value: 6,
    },
  ];

  const singleSidedTypes = [
    {
      label: t("phisFace"),
      value: 1,
    },
    {
      label: t("eksportServiceFrom"),
      value: 2,
    },
    {
      label: t("importService"),
      value: 3,
    },
    {
      label: t("financeService"),
      value: 4,
    },
    {
      label: t("belowMarket"),
      value: 5,
    },
    {
      label: t("belowTax"),
      value: 6,
    },
    {
      label: t("eskportServiceIn"),
      value: 7,
    },
    {
      label: t("realizationGov"),
      value: 8,
    },
    {
      label: t("destroyAksiz"),
      value: 9,
    },
    {
      label: t("otherIncome"),
      value: 10,
    },
    {
      label: t("recycleAksiz"),
      value: 11,
    },
    {
      label: t("reuseAksiz"),
      value: 12,
    },
    {
      label: t("priceDifferenceAksiz"),
      value: 13,
    },
  ];

  return (
    <>
      <Typography
        onClick={() => console.log("VALUES ===> ", formik.values)}
        color="secondary"
        variant="h5"
        className="card-title"
      >
        {t("invoiceType")}
      </Typography>
      <div className="form-block">
        <FSelect
          label={t("invoiceType")}
          width={"300px"}
          formik={formik}
          name="facturaType"
          options={facturaTypes}
        />

        <div>
          <Switch
            checked={formik.values.singleSidedType}
            onChange={(e, val) =>
              formik.setFieldValue("singleSidedType", val ? 1 : 0)
            }
            id="single-sided-type"
          />
          <label htmlFor="single-sided-type">{t("unilateralInvoice")}</label>
        </div>

        {!!formik.values.singleSidedType && (
          <FSelect
            label={t("unilateralDocument")}
            width={"300px"}
            formik={formik}
            name="singleSidedType"
            options={singleSidedTypes}
          />
        )}
        {/* @ts-ignore */}
        <FSwitch
          label={t("exciseInvoice")}
          formik={formik}
          name="productList.hasExcise"
        />
      </div>
    </>
  );
};

export default FacturaType;
