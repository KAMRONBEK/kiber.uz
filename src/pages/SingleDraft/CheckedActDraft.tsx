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

const CheckedActDraft = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // @ts-ignore

  const location = useLocation();
  const draftData = location?.state?.data;
  console.log({ draftData });

  const acceptHandler = () => {
    // @ts-ignore
    navigate(`/main/act-empowerment/create`, {
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
                    navigate(`/main/act-empowerment/create`, {
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
        <div className="containerChecked">
          <div className="title">
            <p>АКТ СВЕРКИ</p>
            <p>№ от </p>
          </div>
          <p className="description"></p>

          <table cellSpacing="0" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th colSpan={4}>По данным "DOKTOR MAHKAMOV" MCHJ, сум</th>
                <th colSpan={4}>По данным HUMO-A-SERVIS MCHJ, сум</th>
              </tr>
              <tr>
                <th>Дата</th>
                <th>Документ</th>
                <th>Дебет</th>
                <th>Кредит</th>
                <th>Дата</th>
                <th>Документ</th>
                <th>Дебет</th>
                <th>Кредит</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={2}>Сальдо начальное:</td>
                <td>0</td>
                <td>0</td>
                <td colSpan={2}>Сальдо начальное:</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td colSpan={8} className="center">
                  № от
                </td>
              </tr>
              <tr>
                <td colSpan={2}>Сальдо начальное по договору:</td>
                <td>0</td>
                <td>0</td>
                <td colSpan={2}>Сальдо начальное по договору:</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>0</td>
                <td>0</td>
                <td></td>
                <td></td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td colSpan={2}>Сальдо конечное по договору:</td>
                <td>0</td>
                <td>0</td>
                <td colSpan={2}>Сальдо конечное по договору:</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td colSpan={2}>Обороты за период:</td>
                <td>0</td>
                <td>0</td>
                <td colSpan={2}>Обороты за период:</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td colSpan={2}>Сальдо конечное :</td>
                <td>0</td>
                <td>0</td>
                <td colSpan={2}>Сальдо конечное :</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>

          <p>Стороны претензий друг к другу не имеют.</p>
          <p>Стоимость принятой работы по акту составляет:</p>

          <div className="humans">
            <p>
              <b>Исполнитель: </b>{" "}
            </p>
            <p>
              <b>Заказчик: </b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckedActDraft;
