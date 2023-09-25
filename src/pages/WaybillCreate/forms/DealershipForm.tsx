import { Stack } from "@mui/system";
import { Typography, Box } from "@mui/material";
import { t } from "i18next";
import FTextField from "../../../components/FormElements/FTextField2";

// @ts-ignore
const DealershipForm = ({ formik }) => {
  return (
    <div>
      <Stack gap={"5rem"} direction="row">
        <Box sx={{ flex: "1" }}>
          <Typography
            paddingBottom="1rem"
            color="secondary"
            variant="h5"
            className="card-title"
          >
            {t("customer")}
          </Typography>
          {/* @ts-ignore */}
          <FTextField
            label={t("tin")}
            name="customerTin"
            formik={formik}
            fullWidth
          />
          {/* @ts-ignore */}
          <FTextField
            label={t("name")}
            name="customerName"
            disabled
            formik={formik}
            fullWidth
          />
          {/* @ts-ignore */}
          <FTextField
            label={t("tin")}
            name="sellerTin"
            formik={formik}
            fullWidth
          />
          {/* @ts-ignore */}
          <FTextField
            label={t("sender")}
            name="sellerName"
            disabled
            formik={formik}
            fullWidth
          />
          {/* @ts-ignore */}
          <FTextField
            label={t("firstAddressTo")}
            name="pointDocs[0].pointOfLoading"
            formik={formik}
            fullWidth
          />
          {/* @ts-ignore */}
          <FTextField
            label={t("secondAddressTo")}
            name="pointDocs[1].pointOfLoading"
            formik={formik}
            fullWidth
          />
          {/* @ts-ignore */}
          <FTextField
            label={t("otherAddress")}
            name="pointOfRedirectName"
            formik={formik}
            fullWidth
          />
          {/* @ts-ignore */}
          <FTextField
            label={t("submitted")}
            name="giverFio"
            formik={formik}
            fullWidth
          />
          {/* @ts-ignore */}
          <FTextField
            label={t("TakerDriverFio")}
            name="takerDriverFio"
            formik={formik}
            fullWidth
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            paddingBottom="1rem"
            color="secondary"
            variant="h5"
            className="card-title"
          >
            {t("dealer")}
          </Typography>
          {/* @ts-ignore */}
          <FTextField
            label={t("name")}
            name="carrierName"
            formik={formik}
            disabled
            fullWidth
          />
          {/* @ts-ignore */}
          <FTextField
            label={t("tin")}
            name="carrierTin"
            formik={formik}
            fullWidth
          />
          {/* @ts-ignore */}
          <FTextField
            label={t("tin")}
            name="buyerTin"
            formik={formik}
            fullWidth
          />
          {/* @ts-ignore */}
          <FTextField
            label={t("getter")}
            name="buyerName"
            formik={formik}
            disabled
            fullWidth
          />
          {/* @ts-ignore */}
          <FTextField
            label={t("firstAddressDrop")}
            name="pointDocs[0].pointOfUnloading"
            formik={formik}
            fullWidth
          />
          {/* @ts-ignore */}
          <FTextField
            label={t("secondAddressDrop")}
            name="pointDocs[1].pointOfUnloading"
            formik={formik}
            fullWidth
          />
          {/* @ts-ignore */}
          <FTextField
            label={t("otherAddress")}
            name="pointOfRedirectAddress"
            formik={formik}
            fullWidth
          />
          {/* @ts-ignore */}
          <FTextField
            label={t("driver")}
            name="giverDriverFio"
            formik={formik}
            fullWidth
          />
          {/* @ts-ignore */}
          <FTextField
            label={t("recieved")}
            name="takerFio"
            formik={formik}
            fullWidth
          />
          <Typography
            paddingBottom="1rem"
            color="secondary"
            variant="h5"
            className="card-title"
          >
            {t("distance")}
          </Typography>
          <Stack direction="row" gap={"1rem"}>
            {/* @ts-ignore */}
            <FTextField
              label={t("overall")}
              name="deliveryDistanceDoc.deliveryDistance"
              formik={formik}
              fullWidth
            />
            {/* @ts-ignore */}
            <FTextField
              label={t("inCity")}
              name="deliveryDistanceDoc.deliveryDistanceInCity"
              formik={formik}
              fullWidth
            />
          </Stack>
        </Box>
      </Stack>
      <Typography
        paddingBottom="1rem"
        color="secondary"
        variant="h5"
        className="card-title"
      >
        {t("specialNotes")}
      </Typography>
      {/* @ts-ignore */}
      <FTextField
        label={t("specialNotes")}
        name="specialNotes"
        formik={formik}
        fullWidth
      />
    </div>
  );
};

export default DealershipForm;
