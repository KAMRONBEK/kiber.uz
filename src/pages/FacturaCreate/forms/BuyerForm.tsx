import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { id } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import FTextField from "../../../components/FormElements/FTextField2";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FSelect from "../../../components/FormElements/FSelect";

// @ts-ignore
const BuyerForm = ({ formik, disabled, disableInput }) => {
  const { t } = useTranslation();
  const [hasLot, setHasLot] = useState(false);
  const [lot, setLot] = useState("");
  const [lots, setLots] = useState([]);
  // @ts-ignore
  const userData = useSelector((state) => state.auth.userData);

  const { values } = formik;
  const { buyer } = values;
  useEffect(() => {
    if (buyer.account.length === 26) {
      setHasLot(true);
    } else {
      setHasLot(false);
    }
  }, [buyer]);

  useEffect(() => {
    const fetchData = async () => {
      if (lot.length > 5) {
        const response = await fetch(
          `https://kiber.uz/api/investment?lang=ru&sellerTin=${userData.person.tin}&buyerTin=${formik.values.buyerTin}&objectId=${lot}`
        );

        const body = await response.json();
        if (body.hasOwnProperty("lots")) {
          // @ts-ignore
          setLots((prev) => {
            // @ts-ignore
            let arr = [];
            // @ts-ignore
            body.lots.map((item) => {
              let obj = {};
              // @ts-ignore
              obj.label = item.lotPrefix;
              // @ts-ignore
              obj.value = item.lotPrefix + item.lotNumber;
              arr.push(obj);
            });
            // @ts-ignore
            return arr;
          });
        }
      }
      // @ts-ignore
    };
    fetchData();
  }, [lot]);

  return (
    <div style={{ flex: 1, visibility: disabled ? "hidden" : "visible" }}>
      <Typography color="secondary" variant="h5" className="card-title">
        {t("partnerDate")}
      </Typography>
      <div className="content">
        {/* @ts-ignore */}
        <FTextField
          label={t("tinPinfl")}
          name="buyerTin"
          fullWidth
          formik={formik}
          disabled={disabled}
        />
        {hasLot && (
          <>
            <TextField
              name="Наименование инвестиционного ID"
              value={lot}
              size="small"
              fullWidth
              label="Наименование инвестиционного ID"
              // @ts-ignore
              onChange={(e) => setLot(e.target.value)}
            />
            <FSelect
              label="Лот"
              width={"300px"}
              formik={formik}
              name="lotId"
              options={lots}
            />
          </>
        )}
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
          disabled={disableInput}
        />
        {/* @ts-ignore */}
        <FTextField
          label={t("vatRegisttation")}
          name="buyer.vatRegCode"
          formik={formik}
          fullWidth
          disabled={disableInput}
        />
        {/* @ts-ignore */}
        <FTextField
          label={t("account")}
          name="buyer.account"
          formik={formik}
          style={{ width: "48%" }}
          disabled={disableInput}
        />
        {/* @ts-ignore */}
        <FTextField
          label={t("bankId")}
          name="buyer.bankId"
          formik={formik}
          style={{ width: "48%" }}
          disabled={disableInput}
        />
        {/* @ts-ignore */}
        <FTextField
          label={t("address")}
          name="buyer.address"
          formik={formik}
          fullWidth
          required
          disabled={disableInput}
        />
        {/* @ts-ignore */}
        <FTextField
          label={t("director")}
          style={{ width: "48%" }}
          name="buyer.director"
          formik={formik}
          disabled={disableInput}
        />
        {/* @ts-ignore */}
        <FTextField
          label={t("accountant")}
          style={{ width: "48%" }}
          name="buyer.accountant"
          formik={formik}
          disabled={disableInput}
        />

        <FormControl style={{ width: "520px" }}>
          {/* @ts-ignore */}
          <InputLabel style={{ marginTop: -6 }} id={id}>
            Filial
          </InputLabel>
          <Select
            // @ts-ignore
            labelId={id}
            label="Filial"
            size="small"
          ></Select>
        </FormControl>
      </div>
    </div>
  );
};

export default BuyerForm;
