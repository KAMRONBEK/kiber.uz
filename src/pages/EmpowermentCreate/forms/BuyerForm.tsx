import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FTextField from "../../../components/FormElements/FTextField2";

// @ts-ignore
const BuyerForm = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <div style={{ flex: 1 }}>
      <Typography color="secondary" variant="h5" className="card-title">
        {t("yourData")}
      </Typography>
      <div className="content">
        {/* @ts-ignore */}
        <FTextField
          required
          InputProps={{
            readOnly: true,
          }}
          label={t("tinPinfl")}
          name="buyerTin"
          formik={formik}
          fullWidth
        />

        <Typography color="secondary" variant="h5" className="card-title">
          {t("company")}
        </Typography>
        {/* @ts-ignore */}

        <FTextField
          required
          label={t("name")}
          name="buyer.name"
          formik={formik}
          fullWidth
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("account")}
          name="buyer.account"
          formik={formik}
          style={{ width: "48%" }}
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("bankId")}
          name="buyer.bankId"
          formik={formik}
          style={{ width: "48%" }}
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("address")}
          name="buyer.address"
          formik={formik}
          fullWidth
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("director")}
          style={{ width: "48%" }}
          name="buyer.director"
          formik={formik}
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("accountant")}
          style={{ width: "48%" }}
          name="buyer.accountant"
          formik={formik}
        />
      </div>
    </div>
  );
};

export default BuyerForm;
