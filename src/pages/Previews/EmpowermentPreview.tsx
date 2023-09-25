import {
  Button,
  Card,
  CircularProgress,
  experimentalStyled,
} from "@mui/material";
// @ts-ignore
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import MPDFViewer from "../../components/PDFViewer";
import {
  empowermentAcceptDoc,
  empowermentRejectDoc,
  empowermentRemoveDoc,
  saveEmpowermentDoc,
} from "../../redux/thunks/docs.thunk";
import docService from "../../services/docService";
import { computeDocStatus, computeStatusColor } from "../../utils/getStatus";
import { baseURL } from "../../utils/reqGenerator";

const StyledCard = experimentalStyled(Card)(({ theme }) => ({
  display: "inline-block",
  padding: 15,
  marginBottom: 20,
  width: "100%",
}));

const EmpowermentPreview = () => {
  const params = useParams();
  const dispatch = useDispatch();
  // @ts-ignore
  const userTin = useSelector((state) => state.auth.userTin);
  // @ts-ignore
  const userData = useSelector((state) => state.auth.userData);
  // @ts-ignore
  const options = useSelector((state) => state.measures.measureList);

  const [docData, setDocData] = useState([]);
  const [laoder, setLoader] = useState(true);
  const [type, setType] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [signedFile, setSignedFile] = useState(null);
  console.log({ docData });

  const fetchDocData = () => {
    docService
      .getEmpowermentData(params.id)
      // @ts-ignore
      .then((res) => {
        console.log({ res });
        // @ts-ignore
        setDocData(res);
        // @ts-ignore
        setStatusId(res.status);
        // @ts-ignore
        setSignedFile(res.buyerSign);
        // @ts-ignore
        if (userTin === res.sellerTin) setType("sender");
        // @ts-ignore
        else if (userTin === res.buyerTin) setType("receiver");
        // @ts-ignore
        else if (userData.person.personalNum === res.agent.agentTin)
          // @ts-ignore
          setType("agent");
      })
      .finally(() => setLoader(false));
  };

  console.log({ userTin });

  const acceptHandler = (who: string) => {
    // @ts-ignore

    dispatch(
      // @ts-ignore
      empowermentAcceptDoc(
        signedFile,
        params.id,
        who,
        // @ts-ignore
        docData.agent.agentEmpowermentId
      )
    );
  };
  // @ts
  const rejectHandler = (who: string) => {
    // @ts-ignore

    dispatch(
      // @ts-ignore
      empowermentRejectDoc(
        docData,
        // "empowerment",
        params.id,
        "Sababi nomalum",
        who,
        // @ts-ignore
        docData.agent.agentEmpowermentId
      )
    );
  };

  const removeHandler = () => {
    dispatch(
      // @ts-ignore
      empowermentRemoveDoc(
        { EmpowermentId: params.id, BuyerTin: userTin },
        "empowerment",
        params.id
      )
    );
  };

  const copyHanlder = () => {
    // @ts-ignore
    dispatch(saveEmpowermentDoc(docData, docData.productList.products));
  };

  useEffect(() => {
    fetchDocData();
  }, []);

  console.log({ type });

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
        title={`Доверенность № ${
          // @ts-ignore
          docData?.empowermentDoc.empowermentNo || "---"
        } от ${
          // @ts-ignore
          docData?.empowermentDoc.empowermentDateOfIssue
            ? // @ts-ignore
              moment(docData.empowermentDoc.empowermentDateOfIssue).format(
                "DD.MM.YYYY"
              )
            : "---"
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
            <div style={{ display: "flex", gridGap: "10px" }}>
              {/* @ts-ignore */}
              <a download target="_blank" rel="noreferrer">
                <Button variant="contained" color="warning">
                  Скачать PDF
                </Button>
              </a>
              <Button variant="contained" color="primary" onClick={copyHanlder}>
                Дублировать
              </Button>

              <>
                {type === "agent" &&
                  // @ts-ignore
                  docData?.status === 7 && (
                    <>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => rejectHandler("agent")}
                      >
                        Отказать
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => acceptHandler("agent")}
                      >
                        Принять
                      </Button>
                    </>
                  )}

                {type === "sender" &&
                  // @ts-ignore
                  docData?.status === 8 && (
                    <>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => rejectHandler("buyer")}
                      >
                        Отказать
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => acceptHandler("buyer")}
                      >
                        Принять
                      </Button>
                    </>
                  )}
              </>
              {/* @ts-ignore */}
              {type === "receiver" && docData?.status === (7 || 8) && (
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
        <div className="containerEmp">
          <div className="title">
            <p>
              {/* @ts-ignore */}
              ДОВЕРЕННОСТЬ № {docData.empowermentDoc.empowermentNo}
            </p>
          </div>

          <div className="info-block">
            <div className="row">
              <p className="bold">
                {/* @ts-ignore */}
                Организация: {docData.buyer.name}
              </p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">
                Дата выдачи:{" "}
                {moment(
                  // @ts-ignore
                  docData.empowermentDoc.empowermentDateOfIssue
                ).format("YYYY-MM-DD")}
              </p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">
                Доверенность действительна до:{" "}
                {moment(
                  // @ts-ignore
                  docData.empowermentDoc.empowermentDateOfExpire
                ).format("YYYY-MM-DD")}
              </p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">
                {/* @ts-ignore */}
                Наименование потребителя: {docData.buyer.name}
              </p>
              <p></p>
            </div>

            <div className="row">
              {/* @ts-ignore */}
              <p className="bold">Адрес: {docData.buyer.address}</p>
              <p></p>
            </div>

            <div className="row">
              {/* @ts-ignore */}
              <p className="bold">ИНН: {docData.buyerTin}</p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">
                {/* @ts-ignore */}
                Номер счета: {docData.buyer.account}
              </p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">Доверенность выдана:</p>
              <p>
                {/* @ts-ignore */}
                <b>Должность: {docData.agent.jobTitle}</b>
                <span></span>
                {/* @ts-ignore */}
                <b>ФИО: {docData.agent.Fio}</b>
                <span></span>
                {/* @ts-ignore */}
                <b>ИНН: {docData.agent.agentTin}</b>
                <span></span>
              </p>
            </div>

            <div className="row">
              <p className="bold">
                {/* @ts-ignore */}
                Серия и номер паспорта: {docData.agent.number}
              </p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">
                {/* @ts-ignore */}
                Кем выдан: {docData.agent.issuedBy}
              </p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">
                Дата выдачи: {/* @ts-ignore */}
                {moment(docData.agent.dateOfIssue).format("YYYY-MM-DD")}
              </p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">
                {/* @ts-ignore */}
                На получение от: {docData.seller.name}
              </p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">Материальных ценностей по договору: </p>
              <p>
                {/* @ts-ignore */}
                {/* @ts-ignore */}№ {docData.contractDoc.contractNo} от{" "}
                {/* @ts-ignore */}
                {moment(docData.contractDoc.contractDate).format("YYYY-MM-DD")}
              </p>
            </div>
          </div>

          <div className="title" style={{ marginBottom: "10px" }}>
            <p>Перечень товарно-материальных ценностей, подлежащих получению</p>
          </div>
          {/* @ts-ignore */}
          {docData.productList.products.map((product) => (
            <table
              cellSpacing="0"
              style={{ width: "100%" }}
              key={product.ordNo}
            >
              <thead>
                <tr>
                  <th>№</th>
                  <th>Наименование товаров</th>
                  <th>Единица измерения</th>
                  <th>Количество</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="center">{product.ordNo}</td>
                  <td>{product.name}</td>
                  <td>
                    {
                      options.find(
                        // @ts-ignore
                        (option) => option.value === product.measureId
                      ).label
                    }
                  </td>
                  <td>{product.count}</td>
                </tr>
              </tbody>
            </table>
          ))}

          <div className="signatures">
            <p>Подпись получившего: __________________________</p>
            <p>Руководитель: __________________________</p>
            <p>Глав. бух: __________________________</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpowermentPreview;
