import { Typography } from "@mui/material";
import FTextField from "../../../components/FormElements/FTextField2";
import { useTranslation } from "react-i18next";

// @ts-ignore
const SellerForm = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <div style={{ flex: 1 }}>
      <Typography color="secondary" variant="h5" className="card-title">
        {t("yourData")}
      </Typography>
      <div className="content">
        {/* @ts-ignore */}
        <FTextField
          label={t("tinPinfl")}
          name="owner.tin"
          fullWidth
          formik={formik}
        />
        {/* @ts-ignore */}
        <FTextField
          required
          label={t("name")}
          name="owner.name"
          formik={formik}
          fullWidth
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("fizTin")}
          name="owner.fizTin"
          formik={formik}
          style={{ width: "48%" }}
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("fio")}
          name="owner.fio"
          formik={formik}
          style={{ width: "48%" }}
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("oked")}
          name="owner.oked"
          formik={formik}
          style={{ width: "48%" }}
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("account")}
          name="owner.account"
          formik={formik}
          style={{ width: "48%" }}
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("bankId")}
          name="owner.bankId"
          formik={formik}
          style={{ width: "48%" }}
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("address")}
          name="owner.address"
          formik={formik}
          fullWidth
          required
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("workPhone")}
          style={{ width: "48%" }}
          name="owner.workPhone"
          formik={formik}
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("mobile")}
          style={{ width: "48%" }}
          name="owner.mobile"
          formik={formik}
        />
      </div>
    </div>
  );
};

export default SellerForm;
