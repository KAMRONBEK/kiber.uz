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

const ContractDraft = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // @ts-ignore

  const location = useLocation();
  const draftData = location?.state?.data;
  console.log({ draftData });

  const acceptHandler = () => {
    // @ts-ignore
    navigate(`/main/contract/create`, {
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
                    navigate(`/main/contract/create`, {
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
        <div className="containerContract">
          <div className="title">
            <p>{draftData.docData.contractDoc.contractName}</p>
            <p>Договор № {draftData.docData.contractDoc.contractNo}</p>
          </div>

          <div className="subtitle">
            <div className="left">
              <p>{draftData.docData.contractDoc.contractPlace}</p>
              <p>(место заключения договора)</p>
            </div>
            <div className="right">
              <p>{draftData.docData.contractDoc.contractDate}</p>
              <p>(дата заключения договора)</p>
            </div>
          </div>

          <div className="info-block">
            {draftData.docData.ownerName} (именуемое в дальнейшем – Исполнитель)
            в лице директора {draftData.docData.owner.fio}, с одной стороны, и
            (именуемое в дальнейшем – Заказчик) в лице директора , с другой
            стороны, вместе именуемые Стороны, а по отдельности - Сторона,
            заключили настоящий договор о следующем:
          </div>

          <strong>
            По настоящему договору Заказчик оплачивает и принимает, а
            Исполнитель поставляет товар(услуг) на следующих условиях:
          </strong>
          {/* @ts-ignore */}
          {draftData.productList.map((product) => (
            <table cellSpacing="0" style={{ width: "100%" }}>
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
                  <td>{product.ordNo}</td>
                  <td>
                    {product.catalogCode} "--" {product.catalogName}
                  </td>
                  <td>{product.barCode}</td>
                  <td>{product.measureId}</td>
                  <td>{product.count}</td>
                  <td>{product.summa}</td>
                  <td>{product.deliverySum}</td>
                  <td>{product.vatRate}</td>
                  <td>{product.deliverySumWithVat}</td>
                </tr>
                <tr>
                  <td className="bold" colSpan={8}>
                    Итого
                  </td>
                  <td className="center bold"></td>
                </tr>
              </tbody>
            </table>
          ))}

          <p className="bold">
            Общая сумма договора составляет Сто пятнадцать тысяч сум 00 тийин
            (сумма прописью)
          </p>

          <div className="part-title"></div>
          <div className="part-body"></div>

          <div className="title">
            <p>Юридические адреса и реквизиты сторон</p>
          </div>

          <div className="humans-wrapper">
            <div className="humans">
              <p>
                <b>Исполнитель: </b>
              </p>
              <p>
                <b>Наименование:{draftData.docData.owner.name} </b>
              </p>
              <p>
                <b>Адрес:{draftData.docData.owner.address} </b>
              </p>
              <p>
                <b>Тел:{draftData.docData.owner.workPhone} </b>
              </p>
              <p>
                <b>Факс:{draftData.docData.owner.fax} </b>
              </p>
              <p>
                <b>ИНН:{draftData.docData.owner.tin} </b>
              </p>
              <p>
                <b>ОКЭД: {draftData.docData.owner.oked}</b>
              </p>
              <p>
                <b>Р/С: {draftData.docData.owner.account}</b>
              </p>
              <p>
                <b>Банк: </b>
              </p>
              <p>
                <b>МФО: {draftData.docData.owner.bankId} </b>
              </p>
            </div>
            <div className="humans">
              <p>
                <b>Заказчик: </b>
              </p>

              <p>
                <b>Исполнитель: </b>
              </p>
              <p>
                <b>Наименование: </b>
              </p>
              <p>
                <b>Адрес: </b>
              </p>
              <p>
                <b>Тел: </b>
              </p>
              <p>
                <b>Факс: </b>
              </p>
              <p>
                <b>ИНН: </b>
              </p>
              <p>
                <b>ОКЭД: </b>
              </p>
              <p>
                <b>Р/С: </b>
              </p>
              <p>
                <b>Банк: </b>
              </p>
              <p>
                <b>МФО: </b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDraft;
