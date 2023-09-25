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
  planeDocAcceptDoc,
  planeDocRejectDoc,
  planeDocRemoveDoc,
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

const PlaneDocPreview = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // @ts-ignore
  const userTin = useSelector((state) => state.auth.userTin);

  const [docData, setDocData] = useState(null);
  const [laoder, setLoader] = useState(true);
  const [type, setType] = useState(null);

  const fetchDocData = () => {
    docService
      .getPlaneDocData(params.id)
      // @ts-ignore
      .then((res) => {
        console.log({ res });
        // @ts-ignore
        setDocData(res);
        // @ts-ignore
        setStatusId(res.status);
        // @ts-ignore
        if (userTin === res.sellerTin) setType("sender");
        // @ts-ignore
        else if (userTin === res.buyerTin) setType("receiver");
      })
      .finally(() => setLoader(false))
      // @ts-ignore
      .catch((err) => console.log({ err }));
  };

  console.log({ type });

  const acceptHandler = () => {
    // @ts-ignore
    dispatch(planeDocAcceptDoc(params.id));
  };
  const copyHanlder = () => {
    // @ts-ignore
    // dispatch(saveActDoc(docData));
  };

  const rejectHandler = () => {
    // @ts-ignore
    dispatch(planeDocRejectDoc("docData", params.id, "Sababi nomalum"));
  };

  const removeHandler = () => {
    dispatch(
      // @ts-ignore
      planeDocRemoveDoc(params.id)
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
        title={`Произвольный документ № ${docData?.docNo || "---"} от ${
          // @ts-ignore
          docData?.docDate || "---"
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
              <a download target="_blank" rel="noreferrer">
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
                <p>ПРОИЗВОЛЬНЫЙ ДОКУМЕНТ</p>
                <p>
                  {" "}
                  {/* @ts-ignore */}
                  {/* @ts-ignore */}№ {docData.docNo} от {/* @ts-ignore */}
                  {moment(docData.docDate).format("HH:mm DD.MM.YYYY")}
                </p>
                <p>
                  {/* @ts-ignore */}
                  по договору № {docData.contractNo} от {/* @ts-ignore */}
                  {moment(docData.contractDate).format("HH:mm DD.MM.YYYY")}
                </p>
              </div>
              {/* @ts-ignore */}
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

export default PlaneDocPreview;
