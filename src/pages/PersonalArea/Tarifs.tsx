import { Button, TableContainer, experimentalStyled } from "@mui/material";
import { t } from "i18next";
import check from "../../assets/icons/check.svg";
import React, { useEffect, useState } from "react";
import lgotaService from "../../services/lgotaService";
const StyledTableContainer = experimentalStyled(TableContainer)(
  ({ theme }) => ({
    height: "calc(100vh - 180px)",
    backgroundColor: "#fff",
  })
);

const Tarifs = () => {
  const [data, setData] = useState([]);
  const fetchLgota = () => {
    // @ts-ignore
    lgotaService.fetchLgotaList().then((res) => setData(res));
  };
  useEffect(() => {
    fetchLgota();
  }, []);
  return (
    <div className="PersonalArea">
      <StyledTableContainer>
        <div className="price-section" id="tariffs">
          <h2 className="small-title">{t("chooseTarif")}</h2>
          <div className="area">
            {/* {tariffsList?.map((tariff) => ( */}
            {data.map((item, index) => (
              // @ts-ignore
              <div className="price-card" key={item.id}>
                <div className="header">
                  <div className="price-name"></div>
                  <div className="price-summ">
                    {/* @ts-ignore */}
                    {item.price} UZS
                    {/* @ts-ignore */}
                    <p className="price-summ-two">/ {item.limit} документ</p>
                  </div>
                </div>
                <div className="text">
                  <div className="check-icon-box">
                    <img src={check} alt="check" className="check-icon" />
                  </div>
                  <p
                    style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}
                  >
                    {/* @ts-ignore */}
                    {item.name.uz}
                  </p>
                </div>
                <div className="text">
                  <div className="check-icon-box">
                    <img src={check} alt="check" className="check-icon" />
                  </div>
                  <p
                    style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}
                  >
                    {/* @ts-ignore */}
                    {item.description.uz}
                  </p>
                </div>

                <div className="line"></div>
                <Button className="button" variant="outlined" color="inherit">
                  {t("buy")}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </StyledTableContainer>
    </div>
  );
};

export default Tarifs;
