import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import BuyerFormSelect from "../../../components/FormElements/BuyerFormSelect";
import FTextField from "../../../components/FormElements/FTextField2";
import docService from "../../../services/docService";

// @ts-ignore
const BuyerForm = ({ formik, disabled, disableInput }) => {
  const { t } = useTranslation();
  const [dataLot, setDataLot] = useState<any>("YX-D-");
  const [lot, setLot] = useState("");
  const [lots, setLots] = useState<any>([]);
  const [chackbox, setChackbox] = useState(false);
  // @ts-ignore
  const userData = useSelector((state) => state.auth.userData);

  const { values } = formik;

  const { buyer } = values;
  // useEffect(() => {
  //   if (buyer.account.length === 26) {
  //     setHasLot(true);
  //   } else {
  //     setHasLot(false);
  //   }
  // }, [buyer]);

  useEffect(() => {
    const fetchData = async () => {
      if (lot.length > 5) {
        try {
          const res: any = await docService.getLotType({
            buyerTin: `${(formik.values, "buyerTin")}`,
            lotId: lot,
          });
          setDataLot(res[0]?.prefix);

          if (res) {
            getLots(res[0]?.prefix);
          }
        } catch (error) {
          console.log("=================Errpr===================");
          console.log("error", error);
          console.log("=================Error===================");
        }
      }
      // @ts-ignore
    };
    fetchData();
  }, [lot]);

  const getLots = async (e: any) => {
    try {
      let res = await docService.getLot({
        buyerTin: `${(formik.values, "buyerTin")}`,
        lotId: `${e}${lot}`,
      });
      //@ts-ignoreø
      setLots(res?.products);
    } catch (error) {
      console.log("error", error);
    }
  };

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
        {!disableInput ? (
          <div style={{ display: "flex", width: "35%", marginLeft: "10px" }}>
            <FormControlLabel
              sx={{ flex: "1" }}
              control={
                <Checkbox
                  checked={chackbox}
                  onChange={() => {
                    setChackbox((a) => !a);
                  }}
                  name="excise"
                />
              }
              label="Лот мавжуд"
            />
          </div>
        ) : null}

        {chackbox ? (
          <>
            <TextField
              name="Наименование инвестиционного ID"
              value={lot}
              size="small"
              fullWidth
              label="Наименование инвестиционного ID"
              // @ts-ignore
              onChange={(e) => {
                formik.setFieldValue("lotId", `${dataLot + e.target.value}`);
                setLot(e.target.value);
              }}
            />
            <BuyerFormSelect
              label="Лот"
              width={"300px"}
              name="lotIdType"
              options={lots ? lots : []}
              formik={formik}
            />
          </>
        ) : null}

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
