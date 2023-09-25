import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FTextField from "../../../components/FormElements/FTextField2";

// @ts-ignore
const SellerForm = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <div style={{ flex: 1 }}>
      <Typography color="secondary" variant="h5" className="card-title">
        {t("partnerDate")}
      </Typography>
      <div className="content">
        {/* @ts-ignore */}
        <FTextField
          label={t("tinPinfl")}
          name="sellerTin"
          fullWidth
          formik={formik}
        />
        <Typography color="secondary" variant="h5" className="card-title">
          {t("company")}
        </Typography>
        {/* @ts-ignore */}
        <FTextField
          required
          label={t("name")}
          name="seller.name"
          formik={formik}
          fullWidth
        />
        {/* @ts-ignore */}
        <FTextField
          label={t("account")}
          name="seller.account"
          formik={formik}
          style={{ width: "48%" }}
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("bankId")}
          name="seller.bankId"
          formik={formik}
          style={{ width: "48%" }}
        />
        {/* @ts-ignore */}
        <FTextField
          label={t("address")}
          name="seller.address"
          formik={formik}
          fullWidth
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("director")}
          style={{ width: "48%" }}
          name="seller.director"
          formik={formik}
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("accountant")}
          style={{ width: "48%" }}
          name="seller.accountant"
          formik={formik}
        />
      </div>
    </div>
  );
};

export default SellerForm;
