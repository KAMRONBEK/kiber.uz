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

const WaybillDraft = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // @ts-ignore

  const location = useLocation();
  const draftData = location?.state?.data;
  console.log({ draftData });

  const acceptHandler = () => {
    // @ts-ignore
    navigate(`/main/waybill/create`, {
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
                    navigate(`/main/waybill/create`, {
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
        <div className="containerWaybill">
          <h1>Документ подписан:</h1>

          <h1 className="underline"></h1>
          <p>идентификатор электронного документа</p>
          <div className="title">
            <p>ТОВАРНО-ТРАНСПОРТНАЯ НАКЛАДНАЯ</p>
            <div className="flex" style={{ gap: "1rem" }}>
              <p>К договору № {draftData.docData.ContractDoc.ContractNo}</p>
              <p>К путевому листу № {draftData.docData.WaybillDoc.WaybillNo}</p>
            </div>
            <div className="flex" style={{ gap: "1rem" }}>
              <p>
                {moment(draftData.docData.WaybillDoc.WaybillDate.$d).format(
                  "YYYY-MM-DD"
                )}
              </p>
              <p>
                {moment(draftData.docData.ContractDoc.ContractDate.$d).format(
                  "YYYY-MM-DD"
                )}
              </p>
            </div>

            <div className="flex gap-1">
              <p className="bold">Тип перевозки</p>
              <p>
                Со склада на склад <input type="checkbox" />
              </p>
              <p>
                От продавца к покупателю <input type="checkbox" />
              </p>
              <p>
                {" "}
                Сводная на всю смену <input type="checkbox" />
              </p>
            </div>
            <div className="flex">
              <div className="flex gap-1" style={{ marginRight: "1rem" }}>
                <p>Автомобиль:</p>
              </div>
              <div className="flex gap-1">
                <p>госномер:</p>
                <p>{draftData.docData.TruckDoc.TruckRegNo}</p>
              </div>
              <div className="flex gap-1">
                <p>модель:</p>
                <p>{draftData.docData.TruckDoc.TruckModel}</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex gap-1">
                <p>
                  {" "}
                  Полуприцеп: <input type="checkbox" />
                </p>
                <p>
                  {" "}
                  Прицеп: <input type="checkbox" />
                </p>
              </div>
              <div className="flex gap-1">
                <p>госномер:</p>
                <p>{draftData.docData.TrailerDoc.TrailerRegNo}</p>
              </div>
              <div className="flex gap-1">
                <p>модель:</p>
                <p>{draftData.docData.TrailerDoc.TrailerModel}</p>
              </div>
            </div>

            <div className="flex" style={{ justifyContent: "space-between" }}>
              <div className="flex" style={{ marginRight: "200px" }}>
                <div>
                  <p>Заказчик: </p>
                  <p>ИНН:</p>
                  <p>Грузоотправитель:</p>
                  <p>ИНН:</p>
                  <p>Пункт погрузки 1:</p>
                  <p>Пункт погрузки 2:</p>
                  <p>Переадресовка:</p>
                </div>

                <div>
                  <p>{draftData.docData.CustomerName}</p>
                  <p>{draftData.docData.CustomerTin}</p>
                  <p>{draftData.docData.SellerName}</p>
                  <p>{draftData.docData.SellerTin}</p>
                  <p>{draftData.docData.PointDocs[0].PointOfLoading}</p>
                  <p>{draftData.docData.PointDocs[1].PointOfLoading}</p>
                  <p>{draftData.docData.PointOfRedirectAddress}</p>
                </div>
              </div>

              <div className="flex gap-1">
                <div>
                  <p>Грузоотправитель/Перевозчик:</p>
                  <p>ИНН:</p>
                  <p>Грузополучатель:</p>
                  <p>ИНН:</p>
                  <p>Пункт разгрузки 1:</p>
                  <p>Пункт разгрузки 2:</p>
                  <p>Адрес нового грузополучателя:</p>
                </div>

                <div>
                  <p>{draftData.docData.CarrierName}</p>
                  <p>{draftData.docData.CarrierTin}</p>
                  <p>{draftData.docData.BuyerName}</p>
                  <p>{draftData.docData.BuyerTin}</p>
                  <p>{draftData.docData.PointDocs[0].PointOfUnloading}</p>
                  <p>{draftData.docData.PointDocs[1].PointOfUnloading}</p>
                  <p>{draftData.docData.PointOfRedirectName}</p>
                </div>
              </div>
            </div>
          </div>
          {/* @ts-ignore */}
          {draftData.productList.map((product) => (
            <table cellSpacing="1">
              <thead>
                <tr>
                  <th>№</th>
                  <th>
                    Идентификационный код и название по Единому электронному
                    национальному каталогу товаров (услуг)
                  </th>

                  <th>Наименование товаров (услуг)</th>
                  <th>Единица измерения</th>
                  <th>Стоимость за единицу товара</th>
                  <th>Количество</th>
                  <th>Общая стоимость груза</th>
                  <th>Стоимость автоперевозки</th>
                  <th>С грузом следуют документы</th>
                  <th>Способ опред. массы</th>
                  <th>Класс груза</th>
                  <th>брутто</th>
                  <th>нетто</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="center">{product.OrdNo}</td>
                  <td> {product.Name}</td>
                  <td>{product.MeasureId}</td>
                  <td>{product.Count}</td>
                  <td>{product.Summa}</td>
                  <td>{product.TotalSum}</td>
                  <td>{product.TotalSum}</td>
                  <td>{product.TotalSum}</td>
                  <td>{product.TotalSum}</td>
                  <td>{product.TotalSum}</td>
                  <td>{product.TotalSum}</td>
                  <td>{product.TotalSum}</td>
                  <td>{product.TotalSum}</td>
                </tr>

                <tr>
                  <td className="bold" colSpan={6}>
                    Итого
                  </td>
                  <td className="center bold">{product.TotalSum}</td>
                  <td className="center bold">{product.TotalSum}</td>
                  <td className="center bold">{product.TotalSum}</td>
                  <td className="center bold">{product.TotalSum}</td>
                  <td className="center bold">{product.TotalSum}</td>
                  <td className="center bold">{product.TotalSum}</td>
                  <td className="center bold">{product.TotalSum}</td>
                </tr>
              </tbody>
            </table>
          ))}

          <div className="flex" style={{ justifyContent: "space-between" }}>
            <div>
              <div
                className="flex"
                style={{ justifyContent: "flex-start", gap: "0.5rem" }}
              >
                <p>Особые отметки: </p>
                <p>{"otmetka"}</p>
              </div>
              <div
                className="flex"
                style={{ justifyContent: "flex-start", gap: "0.5rem" }}
              >
                <p>Сдал: </p>
                <p>{"sdal"}</p>
              </div>
              <div
                className="flex"
                style={{ justifyContent: "flex-start", gap: "0.5rem" }}
              >
                <p>Принял вод./эксп.: </p>
                <p>{"prinyal"}</p>
              </div>
            </div>
            <div>
              <div
                className="flex"
                style={{ justifyContent: "flex-start", gap: "0.5rem" }}
              >
                <p>Сдал вод./эксп.: </p>
                <p>{"otmetka"}</p>
              </div>
              <div
                className="flex"
                style={{ justifyContent: "flex-start", gap: "0.5rem" }}
              >
                <p>Принял: </p>
                <p>{"sdal"}</p>
              </div>
              <div
                className="flex"
                style={{ justifyContent: "flex-start", gap: "0.5rem" }}
              >
                <p>Расстояние перевозок: </p>
                <p>{"prinyal"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaybillDraft;
