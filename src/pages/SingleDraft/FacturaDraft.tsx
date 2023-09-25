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
import { createFacturaDoc } from "../../redux/thunks/docs.thunk";

import "./styles.scss";
import moment from "moment";

const StyledCard = experimentalStyled(Card)(({ theme }) => ({
  display: "inline-block",
  padding: 15,
  marginBottom: 20,
  width: "100%",
}));

// @ts-ignore
const FacturaDraft = ({ products, formik, setShowDoc }) => {
  return (
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
          formik.values?.contract_doc.contract_no || "---"
        } от ${
          // @ts-ignore
          formik.values?.contract_doc.contract_date || "---"
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
                onClick={() => setShowDoc(false)}
              >
                Выйти
              </Button>
            </div>
          </div>
        </StyledCard>
        <div className="containerFactura">
          <div className="old-factura-block">
            {formik.values.factura_type} к ЭСФ №{" "}
            {formik.values.old_factura_doc.old_factura_no} от{" "}
            {formik.values.old_factura_doc.old_factura_date}
          </div>
          <div className="title">
            <p>Счет-фактура</p>
            <p>
              № {formik.values.factura_doc.factura_no} от{" "}
              {moment(formik.values.contract_doc.contract_date.$d).format(
                "YYYY-MM-DD"
              )}
            </p>
            <p>
              к договору № {formik.values.contract_doc.contract_no} от{" "}
              {moment(formik.values.contract_doc.contract_date.$d).format(
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
              <div className="value">{formik.values.seller_tin}</div>

              <div className="label">Регистрационный код плательщика НДС:</div>
              <div className="value">{formik.values.seller.vat_reg_code}</div>

              <div className="label">Р/С:</div>
              <div className="value">{formik.values.seller.account}</div>

              <div className="label">МФО:</div>
              <div className="value">{formik.values.seller.bank_id}</div>
            </div>

            <div className="buyer-side">
              <div className="label">Покупатель:</div>
              <div className="value">{formik.values.buyer.name}</div>

              <div className="label">Адрес:</div>
              <div className="value">{formik.values.buyer.address}</div>

              <div className="label">
                Идентификационный номер поставщика (ИНН):
              </div>
              <div className="value">{formik.values.buyer_tin}</div>

              <div className="label">Регистрационный код плательщика НДС:</div>
              <div className="value">{formik.values.buyer.vat_reg_code}</div>

              <div className="label">Р/С:</div>
              <div className="value">{formik.values.buyer.account}</div>

              <div className="label">МФО: </div>
              <div className="value">{formik.values.buyer.bank_id}</div>
            </div>

            <div className="single-side">
              <div className="single-side-type-block"></div>
            </div>
          </div>
          {/* @ts-ignore */}
          {products.map((item) => (
            <table cellSpacing="0" style={{ width: "100%" }} key={item.ord_no}>
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
                  <td>{item.ord_no}</td>
                  <td>
                    {item.catalog_code} -- {item.catalog_name}
                  </td>
                  <td>{item.bar_code}</td>
                  <td>{item.measure_id}</td>
                  <td>{item.count}</td>
                  <td>{item.base_summa}</td>
                  <td>{item.delivery_sum}</td>
                  <td>{item.vat_rate}</td>
                  <td>{item.delivery_sum_with_vat}</td>
                </tr>

                <tr>
                  <td className="bold" colSpan={8}>
                    Итого
                  </td>
                  <td className="center bold">
                    {formik.values.product_list.total}
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
                <b>Главный бухгалтер: {formik.values.seller.accountant}</b>
              </p>
              <p>
                <b>
                  Товар отпустил:{" "}
                  {formik.values.item_released_doc.item_released_fio}
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
  );
};

export default FacturaDraft;
