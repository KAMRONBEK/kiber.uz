import {
  Button,
  Card,
  CircularProgress,
  experimentalStyled,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";

import "./styles.scss";
import moment from "moment";

const StyledCard = experimentalStyled(Card)(({ theme }) => ({
  display: "inline-block",
  padding: 15,
  marginBottom: 20,
  width: "100%",
}));

const EmpowermentDraft = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // @ts-ignore

  const location = useLocation();
  const draftData = location?.state?.data;
  console.log({ draftData });

  const acceptHandler = () => {
    // @ts-ignore
    navigate(`/main/empowerment/create`, {
      // @ts-ignore
      state: draftData,
    });
  };

  const removeHandler = () => {};

  return (
    <div>
      {/* @ts-ignore */}
      <Header
        // @ts-ignore
        title={`Доверенность`}
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
                  onClick={() =>
                    navigate(`/main/empowerment/create`, {
                      // @ts-ignore
                      state: draftData,
                    })
                  }
                >
                  Редактировать
                </Button>
              </a>
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={acceptHandler}
                >
                  Подписать
                </Button>
              </>
              <Button
                variant="contained"
                color="error"
                onClick={() => navigate(-1)}
              >
                Отменить
              </Button>
            </div>
          </div>
        </StyledCard>
        <div className="containerEmp">
          <div className="title">
            <p>
              ДОВЕРЕННОСТЬ № {draftData.docData.empowermentDoc.empowermentNo}
            </p>
          </div>

          <div className="info-block">
            <div className="row">
              <p className="bold">
                Организация: {draftData.docData.buyer.name}
              </p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">
                Дата выдачи:{" "}
                {moment(
                  draftData.docData.empowermentDoc.empowermentDateOfIssue.$d
                ).format("YYYY-MM-DD")}
              </p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">
                Доверенность действительна до:{" "}
                {moment(
                  draftData.docData.empowermentDoc.empowermentDateOfExpire.$d
                ).format("YYYY-MM-DD")}
              </p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">
                Наименование потребителя: {draftData.docData.buyer.name}
              </p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">Адрес: {draftData.docData.buyer.address}</p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">ИНН: {draftData.docData.buyerTin}</p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">
                Номер счета: {draftData.docData.buyer.account}
              </p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">Доверенность выдана:</p>
              <p>
                <b>Должность: {draftData.docData.agent.jobTitle}</b>
                <span></span>
                <b>ФИО: {draftData.docData.agent.Fio}</b>
                <span></span>
                <b>ИНН: {draftData.docData.agent.agentTin}</b>
                <span></span>
              </p>
            </div>

            <div className="row">
              <p className="bold">
                Серия и номер паспорта: {draftData.docData.agent.number}
              </p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">
                Кем выдан: {draftData.docData.agent.issuedBy}
              </p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">
                Дата выдачи:{" "}
                {moment(draftData.docData.agent.dateOfIssue.$d).format(
                  "YYYY-MM-DD"
                )}
              </p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">
                На получение от: {draftData.docData.seller.name}
              </p>
              <p></p>
            </div>

            <div className="row">
              <p className="bold">Материальных ценностей по договору: </p>
              <p>
                № {draftData.docData.contractDoc.contractNo} от{" "}
                {moment(draftData.docData.contractDoc.contractDate.$d).format(
                  "YYYY-MM-DD"
                )}
              </p>
            </div>
          </div>

          <div className="title" style={{ marginBottom: "10px" }}>
            <p>Перечень товарно-материальных ценностей, подлежащих получению</p>
          </div>
          {/* @ts-ignore */}
          {draftData.productList.map((product) => (
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
                  <td>{product.measureId}</td>
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

export default EmpowermentDraft;
