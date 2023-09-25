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
  actAcceptDoc,
  actRejectDoc,
  actRemoveDoc,
  saveActDoc,
} from "../../redux/thunks/docs.thunk";
import docService from "../../services/docService";
import { computeStatusColor } from "../../utils/getStatus";
import { baseURL } from "../../utils/reqGenerator";
import moment from "moment";

const StyledCard = experimentalStyled(Card)(({ theme }) => ({
  display: "inline-block",
  padding: 15,
  marginBottom: 20,
  width: "100%",
}));

const ActPreview = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // @ts-ignore
  const userTin = useSelector((state) => state.auth.userTin);

  const [docData, setDocData] = useState(null);
  const [laoder, setLoader] = useState(true);
  const [type, setType] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [signedFile, setSignedFile] = useState(null);

  const fetchDocData = () => {
    docService
      .getActData(params.id)
      // @ts-ignore
      .then((res) => {
        console.log({ res });
        // @ts-ignore
        setDocData(res);
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

  const statusColor = useMemo(() => {
    if (!statusId) return null;
    return computeStatusColor(statusId);
  }, [statusId]);

  const pdfUrl = useMemo(() => {
    if (!docData) return null;
    // @ts-ignore
    return `${baseURL}/act/pdf/${docData.actId}`;
  }, [docData]);

  const acceptHandler = () => {
    // @ts-ignore
    dispatch(actAcceptDoc(signedFile, params.id));
  };
  const copyHanlder = () => {
    // @ts-ignore
    dispatch(saveActDoc(docData, docData.productList.products));
  };

  const rejectHandler = () => {
    // @ts-ignore
    dispatch(actRejectDoc(docData, params.id, "Sababi nomalum"));
  };

  const removeHandler = () => {
    dispatch(
      // @ts-ignore
      actRemoveDoc({ ActId: params.id, SellerTin: userTin }, "act", params.id)
    );
  };

  useEffect(() => {
    fetchDocData();
  }, []);

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
        title={`Акт № ${docData?.actDoc.actNo || "---"} от ${
          // @ts-ignore
          docData?.actDoc.actDat || "---"
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
            {/* <TableTag color={statusColor}>{docData?.status}</TableTag> */}
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
              {type === "receiver" &&
                // @ts-ignore
                docData?.status === 15 && (
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

              {
                // @ts-ignore
                docData?.status === 0 && (
                  <>
                    <a download target="_blank" rel="noreferrer">
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() =>
                          navigate(`/main/act/create`, {
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
            <div className="containerAct">
              <div className="title">
                <p>АКТ ВЫПОЛНЕННЫХ РАБОТ</p>
                <p>
                  {" "}
                  {/* @ts-ignore */}
                  {/* @ts-ignore */}№ {docData.actDoc.actNo} от{" "}
                  {/* @ts-ignore */}
                  {moment(docData.actDoc.actDate).format(
                    "HH:mm DD.MM.YYYY"
                  )}{" "}
                </p>
                <p>
                  {/* @ts-ignore */}
                  по договору № {docData.contractDoc.contractNo} от{" "}
                  {/* @ts-ignore */}
                  {moment(docData.contractDoc.contractDate).format(
                    "HH:mm DD.MM.YYYY"
                  )}
                </p>
              </div>
              {/* @ts-ignore */}
              <p className="description">{docData.actDoc.actText}</p>
              {/* @ts-ignore */}
              {docData.productList.products.map((product) => (
                <table
                  cellSpacing="0"
                  style={{ width: "100%" }}
                  key={product.ordNo}
                >
                  <thead>
                    <tr>
                      <th>№ </th>
                      <th>Наименование товаров (услуг)</th>
                      <th>Единица измерения</th>
                      <th>Количество</th>
                      <th>Цена</th>
                      <th>Сумма</th>
                    </tr>
                    <tr>
                      <th>1</th>
                      <th>2</th>
                      <th>3</th>
                      <th>4</th>
                      <th>5</th>
                      <th>6</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="center">{product.ordNo}</td>
                      <td>{product.name}</td>
                      <td>{product.packageName}</td>
                      <td>{product.count}</td>
                      <td>{product.summa}</td>
                      <td>{product.totalSum}</td>
                    </tr>

                    <tr>
                      <td className="bold" colSpan={5}>
                        Итого
                      </td>
                      <td className="center bold">{product.totalSum}</td>
                    </tr>
                  </tbody>
                </table>
              ))}

              <p>Стороны претензий друг к другу не имеют.</p>
              <p>Стоимость принятой работы по акту составляет: {}</p>

              <div className="humans">
                <p>
                  {/* @ts-ignore */}
                  <b>Исполнитель: {docData.sellerName}</b>
                </p>
                <p>
                  {/* @ts-ignore */}
                  <b>Заказчик: {docData.buyerName}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActPreview;
