import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import FTextField from "../../../components/FormElements/FTextField2";
import FSelect from "../../../components/FormElements/FSelect";
// @ts-ignore
const SellerForm = ({ formik }) => {
  const { t } = useTranslation();
  const Categories = [
    {
      label: "Производитель",
      value: "1",
    },
    {
      label: "Импортер",
      value: "2",
    },
    {
      label: "Оптовая торговля",
      value: "3",
    },
    {
      label: "Розничная торговля",
      value: "4",
    },
    {
      label: "Посредник",
      value: "5",
    },
    {
      label: "Поставщик услуг",
      value: "6",
    },
    {
      label: "Другие",
      value: "7",
    },
  ];
  const Purposes = [
    {
      label: "Для собственных нужд",
      value: "1",
    },
    {
      label: "Для коммерческих целей",
      value: "2",
    },
    {
      label:
        "Предоставление товаров (услуг) физическим лицам в связи с выходом из состава участников, уменьшением их доли в уставном фонде или выкупом доли участника",
      value: "3",
    },
    {
      label: "Физическим лицам (при получении дивидендов в виде товаров)",
      value: "4",
    },
    {
      label: "Предоставление товаров (услуг) бесплатно",
      value: "5",
    },
    {
      label:
        "Предоставление товаров (услуг) акционеру при ликвидации юридического лица и выкупе эмитентом выпущенных эмитентом акций у акционера",
      value: "6",
    },
    {
      label: "Сдача товаров или иного имущества на переработку",
      value: "7",
    },
    {
      label:
        "Реализация или выдача безвозмездно талонов, дающих право на получение товаров (услуг)",
      value: "8",
    },
    {
      label: "Реализация основных средств и прочих активов",
      value: "9",
    },
    {
      label: "Реализация имущества предприятия как комплекса",
      value: "10",
    },
  ];
  return (
    <div style={{ flex: 1 }}>
      <Typography color="secondary" variant="h5" className="card-title">
        {t("yourData")}
      </Typography>
      <div className="content">
        {/* @ts-ignore */}
        <FTextField
          label={t("tinPinfl")}
          name="sellerTin"
          fullWidth
          formik={formik}
        />
        <div style={{ display: "flex", width: "35%", marginLeft: "10px" }}>
          <FormControlLabel
            sx={{ flex: "1" }}
            control={
              <Checkbox
                checked={formik.values.productList.hasExcise}
                onChange={(e) =>
                  formik.setFieldValue(
                    "productList.hasExcise",
                    e.target.checked
                  )
                }
                name="excise"
              />
            }
            label="Акциз"
          />
          <FormControlLabel
            sx={{ flex: "1" }}
            control={
              <Checkbox
                checked={formik.values.hasCommittent}
                onChange={(e) =>
                  formik.setFieldValue("hasCommittent", e.target.checked)
                }
                name="committent"
              />
            }
            label="Комиссионер"
          />
        </div>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          {/* <FSelect
            label={t("Категория Поставщика")}
            width={"300px"}
            formik={formik}
            name="seller.category"
            required
            options={Categories}
          /> */}
          {/* <FSelect
            label={t("Цель Реализации")}
            width={"300px"}
            formik={formik}
            name="realizationPurpose"
            required
            options={Purposes}
          /> */}
        </div>

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
          label={t("vatRegisttation")}
          name="seller.vatRegCode"
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
          required
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

        <Typography color="secondary" variant="h5" className="card-title">
          {t("goodReleased")}
        </Typography>
        {/* @ts-ignore */}

        {/* <FTextField
          label={t("tin")}
          style={{ width: "48%" }}
          name="itemReleasedDoc.itemReleasedTin"
          formik={formik}
        /> */}
        {/* @ts-ignore */}

        {/* <FTextField
          label={t("fio")}
          style={{ width: "48%" }}
          name="itemReleasedDoc.itemReleasedFio"
          formik={formik}
        /> */}
      </div>
    </div>
  );
};

export default SellerForm;
