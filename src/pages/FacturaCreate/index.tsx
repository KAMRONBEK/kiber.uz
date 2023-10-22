import {
  Box,
  Button,
  Card,
  experimentalStyled,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { showAlert } from "../../redux/thunks/alert.thunk";
import {
  createFacturaDoc,
  saveDocToDraft,
} from "../../redux/thunks/docs.thunk";
import draftService from "../../services/draftService";
import userService from "../../services/userService";
import BuyerForm from "./forms/BuyerForm";
import DocForm from "./forms/DocForm";
import FacturaEmpowermentForm from "./forms/FacturaEmpowermentForm";
import FacturaType from "./forms/FacturaType";
import OldFacturaForm from "./forms/OldFacturaForm";
import ProductList from "./forms/ProductList";
import SellerForm from "./forms/SellerForm";
import { initialValues } from "./model/initialValues";
import "./style.scss";
const StyledCard = experimentalStyled(Card)(({ theme }) => ({
  display: "inline-block",
  padding: 15,
  marginBottom: 20,
  width: "100%",
}));

// @ts-ignore
const FacturaCreate = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showDoc, setShowDoc] = useState(false);
  // @ts-ignore
  const { title } = useSelector((state) => state.settings.lang);
  const [status, setStatus] = useState();
  const [suspend, setSuspend] = useState();

  type UserData = {
    person: {
      tin: string;
      shortName: string;
      account: string;
      mfo: string;
      address: string;
      oked: string;
      districtId: number;
      director: string;
      accountant: string;
    };
    taxGap: {
      taxGap: unknown;
    };
    vatReg: {
      data: {
        vatRegCode: string;
        status: number;
      };
    };
  };

  const userData = useSelector(
    (state: { auth: { userData: UserData } }) => state.auth.userData
  );
  const draftData = location?.state;

  const { t } = useTranslation();
  const [tempDisable, setTempDisable] = useState(true);
  console.log({ draftData });

  const onSubmit = (values: any) => {
    if (formik.values.facturaType === 4 && productList[0].origin === 0) {
      // @ts-ignore
      dispatch(showAlert("Нужно указать происхождение товара"));
    } else {
      console.log("he");
      // @ts-ignore
      dispatch(createFacturaDoc(values, productList));
    }
  };

  const formik = useFormik({
    initialValues: draftData ?? {
      ...initialValues,
      sellerTin: userData.person.tin,
      seller: {
        name: userData.person.shortName,
        account: userData.person.account,
        bankId: userData.person.mfo,
        address: userData.person.address,
        mobile: "",
        workPhone: "",
        oked: userData.person.oked,
        districtId: userData.person.districtId,
        director: userData.person.director,
        accountant: userData.person.accountant,
        branchCode: "",
        branchName: "",
        vatRegCode: userData.vatReg.data.vatRegCode,
        vatRegStatus: userData.vatReg.data.status,
      },
    },
    onSubmit,
  });
  const [productList, setProductList] = useState(
    draftData?.productList.products ?? [
      {
        id: 1,
        ordNo: 1,
        committentName: "",
        committentTin: "",
        committentVatRegCode: "",
        catalogCode: "",
        catalogName: "",
        barcode: "",
        lgotaId: null,
        name: "",
        serial: "",
        baseSumma: 0,
        profitRate: 0,
        count: 0,
        summa: 0,
        exciseRate: 0,
        exciseSum: 0,
        deliverySum: 0,
        lgotaVatSum: 0,
        packageCode: "",
        deliverySumWithVat: 0,
        packageName: "",
        origin: 0,
        withoutVat: true, // true - если “Без НДС”
      },
    ]
  );

  const isSingleSide = useMemo(() => {
    return !!formik.values.singleSidedType;
  }, [formik.values.singleSidedType]);

  const hasExcise = useMemo(() => {
    return formik.values.productList.hasExcise;
  }, [formik.values.productList.hasExcise]);
  const hasCommittent = useMemo(() => {
    return formik.values.hasCommittent;
  }, [formik.values.hasCommittent]);

  const oldFacturaDocVisible = useMemo(() => {
    const selectedFacturaType = formik.values.facturaType;
    const correctionalFacturaTypes = [1, 4, 5, 6];
    return correctionalFacturaTypes.includes(selectedFacturaType);
  }, [formik.values.facturaType]);

 

  const searchBuyer = (tin: any) => {
    const token = localStorage.getItem("token");
    setTempDisable(true);
    userService
      // @ts-ignore
      .searchUser(tin, JSON.parse(token))
      .then((res) => {
        const computedBuyer = {
          ...formik.values.buyer,
          // @ts-ignore
          name: res.person.shortName,
          // @ts-ignore
          account: res.person.account,
          // @ts-ignore
          bankId: res.person.mfo,
          // @ts-ignore
          address: res.person.address,
          // @ts-ignore
          oked: res.person.oked,
          // @ts-ignore
          districtId: res.person.districtId,
          // @ts-ignore
          director: res.person.director,
          // @ts-ignore
          accountant: res.person.accountant,
          // @ts-ignore
          vatRegCode: res.vatReg.data.vatRegCode,
          // @ts-ignore
          vatRegStatus: res.vatReg.data.status,
        };
        formik.setFieldValue("buyer", computedBuyer);
        // @ts-ignore
        setStatus(res.vatReg.data.active);
        // @ts-ignore
        setSuspend(res.vatReg.data.suspended);
      });

    setTempDisable(false);
  };

  console.log(JSON.stringify(productList,null,2));
  

  const saveDocument = () => {
    // @ts-ignore
    dispatch(saveDocToDraft(formik.values, productList, "factura"));
    setShowDoc(true);
  };
  const deleteSavedDoc = () => {
    // @ts-ignore
    draftService
      .deleteDraft(draftData.id, "factura")
      .then((res) => history("/"));
  };
  // @ts-ignore
  useEffect(() => {
    const buyerTin = formik.values.buyerTin;
    if (buyerTin?.length !== 9 && buyerTin?.length !== 14) {
      setTempDisable(true);
    } else {
      searchBuyer(buyerTin);
      formik.setFieldValue("productList.hasLgota", true);
    }
  }, [formik.values.buyerTin]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Header title={t("createInvoice")}>
        <Button
          variant="contained"
          color="error"
          onClick={() => history("/main/docs/sender")}
        >
          {t("back")}
        </Button>
        {draftData ? (
          <Button variant="contained" color="error" onClick={deleteSavedDoc}>
            {t("delete")}
          </Button>
        ) : (
          <Button variant="contained" color="warning" onClick={saveDocument}>
            {t("seve")}
          </Button>
        )}
        <Button variant="contained" type="submit">
          {t("subscribe")}
        </Button>
      </Header>

      <div className="FacturaCreate">
        <StyledCard elevation={12}>
          <FacturaType formik={formik} />
        </StyledCard>

        {oldFacturaDocVisible && (
          <StyledCard elevation={12}>
            <OldFacturaForm formik={formik} />
          </StyledCard>
        )}

        <StyledCard elevation={12}>
          {/* @ts-ignore */}
          <DocForm formik={formik} />
        </StyledCard>

        <StyledCard elevation={12}>
          <Typography
            color="primary"
            variant="h5"
            style={{
              textAlign: "center",
              marginBottom: 15,
              marginRight: 90,
              fontWeight: "bold",
            }}
          >
            Статус:
            {status
              ? t("docActive")
              : suspend
              ? t("docTempNotActive")
              : t("docNotActive")}
          </Typography>
          <Box style={{ display: "flex", gridGap: "50px" }}>
            <SellerForm formik={formik} />
            {
              <BuyerForm
                formik={formik}
                disabled={isSingleSide}
                disableInput={tempDisable}
              />
            }
          </Box>
        </StyledCard>

        <StyledCard elevation={12}>
          <FacturaEmpowermentForm formik={formik} />
        </StyledCard>

        <StyledCard elevation={12}>
          <ProductList
            hasExcise={hasExcise}
            productList={productList}
            setProductList={setProductList}
            formik={formik}
            hasCommittent={hasCommittent}
          />
        </StyledCard>
        {showDoc && (
          <div
            style={{
              position: "absolute",
              background: "white",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
            }}
          >
            {/* @ts-ignore */}
            <Header
              // @ts-ignore
              title={`Фактура № ${
                formik.values?.contractDoc.contractNo || "---"
              } от ${
                // @ts-ignore
                formik.values?.contractDoc.contractDate || "---"
              }`}
            ></Header>

            <div style={{ padding: "20px" }}>
              <StyledCard elevation={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {/* <TableTag color={statusColor}>{docStatus}</TableTag> */}
                  <div style={{ display: "flex", gridGap: "10px" }}>
                    {/* @ts-ignore */}
                    <a download target="_blank" rel="noreferrer">
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => setShowDoc(false)}
                      >
                        Редактировать
                      </Button>
                    </a>
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => formik.handleSubmit}
                        type="submit"
                      >
                        Подписать
                      </Button>
                    </>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setShowDoc(false);
                        navigate("/");
                      }}
                    >
                      Выйти
                    </Button>
                  </div>
                </div>
              </StyledCard>
              <div className="containerFactura">
                <div className="old-factura-block">
                  {formik.values.facturaType} к ЭСФ №{" "}
                  {formik.values.oldFacturaDoc.oldFacturaNo} от{" "}
                  {formik.values.oldFacturaDoc.oldFacturaDate}
                </div>
                <div className="title">
                  <p>Счет-фактура</p>
                  <p>
                    № {formik.values.facturaDoc.facturaNo} от{" "}
                    {moment(formik.values.contractDoc.contractDate.$d).format(
                      "YYYY-MM-DD"
                    )}
                  </p>
                  <p>
                    к договору № {formik.values.contractDoc.contractNo} от{" "}
                    {moment(formik.values.contractDoc.contractDate.$d).format(
                      "YYYY-MM-DD"
                    )}
                  </p>
                </div>

                <div className="info-block">
                  <div className="seller-side">
                    <div className="label">Поставщик:</div>
                    <div className="value"> {formik.values.seller.name}</div>

                    <div className="label">Адрес:</div>
                    <div className="value">{formik.values.seller.address}</div>

                    <div className="label">
                      Идентификационный номер поставщика (ИНН):
                    </div>
                    <div className="value">{formik.values.sellerTin}</div>

                    <div className="label">
                      Регистрационный код плательщика НДС:
                    </div>
                    <div className="value">
                      {formik.values.seller.vatRegCode}
                    </div>

                    <div className="label">Р/С:</div>
                    <div className="value">{formik.values.seller.account}</div>

                    <div className="label">МФО:</div>
                    <div className="value">{formik.values.seller.bankId}</div>
                  </div>

                  <div className="buyer-side">
                    <div className="label">Покупатель:</div>
                    <div className="value">{formik.values.buyer.name}</div>

                    <div className="label">Адрес:</div>
                    <div className="value">{formik.values.buyer.address}</div>

                    <div className="label">
                      Идентификационный номер поставщика (ИНН):
                    </div>
                    <div className="value">{formik.values.buyerTin}</div>

                    <div className="label">
                      Регистрационный код плательщика НДС:
                    </div>
                    <div className="value">
                      {formik.values.buyer.vatRegCode}
                    </div>

                    <div className="label">Р/С:</div>
                    <div className="value">{formik.values.buyer.account}</div>

                    <div className="label">МФО: </div>
                    <div className="value">{formik.values.buyer.bankId}</div>
                  </div>

                  <div className="single-side">
                    <div className="single-side-type-block"></div>
                  </div>
                </div>
                {/* @ts-ignore */}
                {productList.map((item) => (
                  <table
                    cellSpacing="0"
                    style={{ width: "100%" }}
                    key={item.ordNo}
                  >
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>
                          Идентификационный код и название по Единому
                          электронному национальному каталогу товаров (услуг)
                        </th>
                        <th>Штрих-код товара/услуги</th>
                        <th>Единица измерения</th>
                        <th>Количество</th>
                        <th>Цена</th>
                        <th>Стоимость поставки</th>
                        <th>НДС</th>
                        <th>Стоимость поставки с учетом НДС</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>{item.ordNo}</td>
                        <td>
                          {item.catalogCode} -- {item.catalogName}
                        </td>
                        <td>{item.barCode}</td>
                        <td>{item.measureId}</td>
                        <td>{item.count}</td>
                        <td>{item.baseSumma}</td>
                        <td>{item.deliverySum}</td>
                        <td>{item.vatRate}</td>
                        <td>{item.deliverySumWithVat}</td>
                      </tr>

                      <tr>
                        <td className="bold" colSpan={8}>
                          Итого
                        </td>
                        <td className="center bold">
                          {formik.values.productList.total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ))}
                <div className="humans-wrapper">
                  <div className="humans">
                    <p>
                      <b>Руководитель: {formik.values.seller.director}</b>
                    </p>
                    <p>
                      <b>
                        Главный бухгалтер: {formik.values.seller.accountant}
                      </b>
                    </p>
                    <p>
                      <b>
                        Товар отпустил:{" "}
                        {formik.values.itemReleasedDoc.itemReleasedFio}
                      </b>
                    </p>
                  </div>
                  <div className="humans">
                    <p>
                      <b>Руководитель: {formik.values.buyer.director}</b>
                    </p>
                    <p>
                      <b>Главный бухгалтер: {formik.values.buyer.accountant}</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default FacturaCreate;
