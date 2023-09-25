import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FDatePicker from "../../../components/FormElements/FDatePicker";
import FTextField from "../../../components/FormElements/FTextField2";

// @ts-ignore
const AgentForm = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography color="secondary" variant="h5" className="card-title">
        {t("confidant")}
      </Typography>

      <div className="content">
        {/*  @ts-ignore */}
        <FTextField
          required
          label={t("tinPinfl")}
          name="agent.agentTin"
          formik={formik}
          style={{ width: "32%" }}
        />
        {/*  @ts-ignore */}

        <FTextField
          style={{ width: "32%" }}
          required
          label={t("fio")}
          name="agent.fio"
          formik={formik}
        />
        {/*  @ts-ignore */}
        <FTextField
          style={{ width: "32%" }}
          label={t("jopTitle")}
          name="agent.jobTitle"
          formik={formik}
        />
        {/*  @ts-ignore */}
        <FTextField
          style={{ width: "32%" }}
          label={t("seriesPassword")}
          name="agent.passport.number"
          formik={formik}
        />
        {/*  @ts-ignore */}
        <FDatePicker
          style={{ width: "32%" }}
          label={t("dateOfIssue")}
          name="agent.passport.dateOfIssue"
          formik={formik}
        />
        {/*  @ts-ignore */}
        <FTextField
          style={{ width: "32%" }}
          label={t("issueBy")}
          name="agent.passport.issuedBy"
          formik={formik}
        />
      </div>
    </>
  );
};

export default AgentForm;
