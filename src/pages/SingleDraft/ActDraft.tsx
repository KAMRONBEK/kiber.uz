import {
  Button,
  Card,
  CircularProgress,
  experimentalStyled,
} from "@mui/material";

import Header from "../../components/Header";

import "./styles.scss";
import moment from "moment";

const StyledCard = experimentalStyled(Card)(({ theme }) => ({
  display: "inline-block",
  padding: 15,
  marginBottom: 20,
  width: "100%",
}));
// @ts-ignore
const ActDraft = ({ formik, setShowDoc, products }) => {
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
        title={`Акт № ${formik.values.contractDoc.contractNo || "---"} от ${
          // @ts-ignore
          moment(formik.values.contractDoc.contractDate).format(
            "HH:mm DD.MM.YYYY"
          ) || "---"
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
                  type="submit"
                  onClick={() => formik.handleSubmit}
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
        <div className="containerAct">
          <div className="title">
            <p>АКТ ВЫПОЛНЕННЫХ РАБОТ</p>
            <p>
              № {formik.values.actDoc.actNo} от{" "}
              {moment(formik.values.actDoc.actDate).format("HH:mm DD.MM.YYYY")}{" "}
            </p>
            <p>
              по договору № {formik.values.contractDoc.contractNo} от{" "}
              {moment(formik.values.contractDoc.contractDate).format(
                "HH:mm DD.MM.YYYY"
              )}
            </p>
          </div>

          <p className="description">{formik.values.actDoc.actText}</p>
          {/* @ts-ignore */}
          {products.map((product) => (
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
                  <td>{product.measureId}</td>
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
              <b>Исполнитель: {formik.values.sellerName}</b>
            </p>
            <p>
              <b>Заказчик: {formik.values.buyerName}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActDraft;
