import { Button, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FTextField from "../../../components/FormElements/FTextField2";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
let id = 2;
// @ts-ignore
const BuyerForm = ({ formik, searchClient, index }) => {
  const { t } = useTranslation();
  const addClient = () => {
    const newClient = {
      id: id,
      tin: "",
      name: "",
      address: "",
      workPhone: "",
      mobile: "",
      fax: "",
      oked: "",
      account: "",
      bankId: "",
      fizTin: "",
      fio: "",
      branchCode: "",
      branchName: "",
    };
    id++;
    // @ts-ignore
    formik.setFieldValue("clients", [...formik.values.clients, newClient]);
  };

  const removeProduct = () => {
    // @ts-ignore
    formik.setFieldValue(
      "clients",
      // @ts-ignore
      formik.values.clients.filter((_, i) => i !== index)
    );
  };
  return (
    <div style={{ flex: 1 }}>
      <Typography color="secondary" variant="h5" className="card-title">
        {t("documentData")}
      </Typography>
      <div className="content client-block">
        {/* @ts-ignore */}
        <FTextField
          label={t("tinPinfl")}
          name={`clients[${index}].tin`}
          fullWidth
          formik={formik}
          // @ts-ignore
          onChange={(e) => {
            formik.handleChange(e);
            if (e.target.value?.length === 9 || e.target.value?.length === 14) {
              searchClient(e.target.value, index);
            }
          }}
        />
        {/* @ts-ignore */}
        <FTextField
          required
          label={t("name")}
          name={`clients[${index}].name`}
          formik={formik}
          fullWidth
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("fizTin")}
          name={`clients[${index}].fizTin`}
          formik={formik}
          style={{ width: "48%" }}
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("fio")}
          name={`clients[${index}].fio`}
          formik={formik}
          style={{ width: "48%" }}
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("oked")}
          name={`clients[${index}].oked`}
          formik={formik}
          style={{ width: "48%" }}
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("account")}
          name={`clients[${index}].account`}
          formik={formik}
          style={{ width: "48%" }}
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("bankId")}
          name={`clients[${index}].bankId`}
          formik={formik}
          style={{ width: "48%" }}
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("address")}
          name={`clients[${index}].address`}
          formik={formik}
          fullWidth
          required
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("workPhone")}
          style={{ width: "48%" }}
          name={`clients[${index}].workPhone`}
          formik={formik}
        />
        {/* @ts-ignore */}

        <FTextField
          label={t("mobile")}
          style={{ width: "48%" }}
          name={`clients[${index}].mobile`}
          formik={formik}
        />
      </div>
      <Stack direction="row" gap="5px">
        <Button onClick={addClient}>
          <AddCircle fontSize="large" />
        </Button>
        {formik.values.clients.length > 1 && (
          <Button color="error" onClick={removeProduct}>
            <RemoveCircle fontSize="large" />
          </Button>
        )}
      </Stack>
    </div>
  );
};

export default BuyerForm;
