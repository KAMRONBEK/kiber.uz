import {
  Button,
  Card,
  CircularProgress,
  experimentalStyled,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import {
  invoiceAcceptDoc,
  invoiceRejectDoc,
  invoiceRemoveDoc,
  saveFacturaDoc,
} from "../../redux/thunks/docs.thunk";
import docService from "../../services/docService";
import { baseURL } from "../../utils/reqGenerator";
import moment from "moment";

const StyledCard = experimentalStyled(Card)(({ theme }) => ({
  display: "inline-block",
  padding: 15,
  marginBottom: 20,
  width: "100%",
}));

const FacturaPreview = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // @ts-ignore
  const userTin = useSelector((state) => state.auth.userTin);

  const [docData, setDocData] = useState({});
  const [laoder, setLoader] = useState(true);
  const [type, setType] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [signedFile, setSignedFile] = useState(null);

  const fetchDocData = () => {
    docService
      .getInvoiceData(params.id)
      // @ts-ignore
      .then((res) => {
        console.log({ res });
        // @ts-ignore
        setDocData((prev) => {
          return {
            ...res,
            // incomeType: 0,
            // buyer: {
            //   // @ts-ignore
            //   ...res.buyer,
            //   category: 1,
            //   bankId: "00446",
            // },
          };
        });
        // setDocData(res);
        // @ts-ignore
        setStatusId(res.status);
        // @ts-ignore
        setSignedFile(res.sellerSign);
        // @ts-ignore
        if (userTin === res.sellerTin) setType("sender");
        // @ts-ignore
        else if (userTin === res.buyerTin) setType("receiver");
      })
      .finally(() => setLoader(false))
      // @ts-ignore
      .catch((err) => console.log({ err }));
  };

  const pdfUrl = useMemo(() => {
    if (!docData) return null;
    // @ts-ignore
    return `${baseURL}/invoice/pdf/${docData.facturaId}`;
  }, [docData]);

  const acceptHandler = () => {
    // @ts-ignore
    dispatch(invoiceAcceptDoc(signedFile, params.id));
  };

  const rejectHandler = () => {
    // @ts-ignore
    dispatch(invoiceRejectDoc(docData, params.id, "Sababi nomalum"));
  };

  const removeHandler = () => {
    dispatch(
      // @ts-ignore
      invoiceRemoveDoc(
        { FacturaId: params.id, SellerTin: userTin },
        "invoice",
        params.id
      )
    );
  };

  const copyHanlder = () => {
    // @ts-ignore
    dispatch(saveFacturaDoc(docData, docData.productList.products));
  };

  useEffect(() => {
    fetchDocData();
  }, []);

  console.log({ docData });

  if (laoder)
    return (
      <div
        style={{
          width: "100%",
          minHeight: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );

  return (
    <div>
      {/* @ts-ignore */}
      <Header
        // @ts-ignore
        title={`Фактура № ${docData?.contractDoc.contractNo || "---"} от ${
          // @ts-ignore
          moment(docData.contractDoc.contractDate).format("YYYY-MM-DD") || "---"
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
              <a download href={pdfUrl} target="_blank" rel="noreferrer">
                <Button variant="contained" color="warning">
                  Скачать PDF
                </Button>
              </a>
              <Button variant="contained" color="primary" onClick={copyHanlder}>
                Дублировать
              </Button>
              {
                // @ts-ignore
                docData?.status === 0 && (
                  <>
                    <a download target="_blank" rel="noreferrer">
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() =>
                          navigate(`/main/factura/create`, {
                            // @ts-ignore
                            state: docData,
                            // @ts-ignore
                          })
                        }
                      >
                        Редактировать
                      </Button>
                    </a>
                  </>
                )
              }
              {/* @ts-ignore */}
              {type === "receiver" && docData?.status === 15 && (
                <>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={rejectHandler}
                  >
                    Отказать
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={acceptHandler}
                  >
                    Принять
                  </Button>
                </>
              )}
              {/* @ts-ignore */}
              {type === "sender" && docData?.status === 15 && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={removeHandler}
                >
                  Отменить
                </Button>
              )}
            </div>
          </div>
        </StyledCard>
        {/* @ts-ignore */}
        <div
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          {/* @ts-ignore */}
          <div style={{ padding: "20px" }}>
            <div className="containerFactura">
              <div className="old-factura-block">
                {/* @ts-ignore */}
                {docData.facturaType} к ЭСФ № {/* @ts-ignore */}
                {docData.oldFacturaDoc.oldFacturaNo} от {/* @ts-ignore */}
                {docData.oldFacturaDoc.oldFacturaDate}
              </div>
              <div className="title">
                <p>Счет-фактура</p>
                <p>
                  {/* @ts-ignore */}
                  {/* @ts-ignore */}№ {docData.facturaDoc.facturaNo} от{" "}
                  {/* @ts-ignore */}
                  {moment(docData.contractDoc.contractDate).format(
                    "YYYY-MM-DD"
                  )}
                </p>
                <p>
                  {/* @ts-ignore */}к договору №{" "}
                  {docData.contractDoc.contractNo} от {/* @ts-ignore */}
                  {moment(docData.contractDoc.contractDate.$d).format(
                    "YYYY-MM-DD"
                  )}
                </p>
              </div>

              <div className="info-block">
                <div className="seller-side">
                  <div className="label">Поставщик:</div>
                  {/* @ts-ignore */}
                  <div className="value"> {docData.seller.name}</div>

                  <div className="label">Адрес:</div>
                  {/* @ts-ignore */}
                  <div className="value">{docData.seller.address}</div>

                  <div className="label">
                    Идентификационный номер поставщика (ИНН):
                  </div>
                  {/* @ts-ignore */}
                  <div className="value">{docData.sellerTin}</div>

                  <div className="label">
                    Регистрационный код плательщика НДС:
                  </div>
                  {/* @ts-ignore */}
                  <div className="value">{docData.seller.vatRegCode}</div>

                  <div className="label">Р/С:</div>
                  {/* @ts-ignore */}
                  <div className="value">{docData.seller.account}</div>

                  <div className="label">МФО:</div>
                  {/* @ts-ignore */}
                  <div className="value">{docData.seller.bankId}</div>
                </div>

                <div className="buyer-side">
                  <div className="label">Покупатель:</div>
                  {/* @ts-ignore */}
                  <div className="value">{docData.buyer.name}</div>

                  <div className="label">Адрес:</div>
                  {/* @ts-ignore */}
                  <div className="value">{docData.buyer.address}</div>

                  <div className="label">
                    Идентификационный номер поставщика (ИНН):
                  </div>
                  {/* @ts-ignore */}
                  <div className="value">{docData.buyerTin}</div>

                  <div className="label">
                    Регистрационный код плательщика НДС:
                  </div>
                  {/* @ts-ignore */}
                  <div className="value">{docData.buyer.vatRegCode}</div>

                  <div className="label">Р/С:</div>
                  {/* @ts-ignore */}
                  <div className="value">{docData.buyer.account}</div>

                  <div className="label">МФО: </div>
                  {/* @ts-ignore */}
                  <div className="value">{docData.buyer.bankId}</div>
                </div>

                <div className="single-side">
                  <div className="single-side-type-block"></div>
                </div>
              </div>
              {/* @ts-ignore */}
              {docData.productList.products.map((item) => (
                <table
                  cellSpacing="0"
                  style={{ width: "100%" }}
                  key={item.ordNo}
                >
                  <thead>
                    <tr>
                      <th>№</th>
                      <th>
                        Идентификационный код и название по Единому электронному
                        национальному каталогу товаров (услуг)
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
                      <td>{item.packageCode}</td>
                      <td>{item.packageName}</td>
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
                        {/* @ts-ignore */}
                        {item.deliverySumWithVat}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
              <div className="humans-wrapper">
                <div className="humans">
                  <p>
                    {/* @ts-ignore */}
                    <b>Руководитель: {docData.seller.director}</b>
                  </p>
                  <p>
                    {/* @ts-ignore */}
                    <b>Главный бухгалтер: {docData.seller.accountant}</b>
                  </p>
                  <p>
                    <b>
                      Товар отпустил: {/* @ts-ignore */}
                      {docData.itemReleasedDoc.itemReleasedFio}
                    </b>
                  </p>
                </div>
                <div className="humans">
                  <p>
                    {/* @ts-ignore */}
                    <b>Руководитель: {docData.buyer.director}</b>
                  </p>
                  <p>
                    {/* @ts-ignore */}
                    <b>Главный бухгалтер: {docData.buyer.accountant}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacturaPreview;
