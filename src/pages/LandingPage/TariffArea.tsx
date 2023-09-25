import { useEffect, useState } from "react";
import landingServive from "../../services/landingService";
import { Button, Icon } from "@mui/material";
import check from "../../assets/icons/check.svg";
import { useTranslation } from "react-i18next";
import lgotaService from "../../services/lgotaService";

const TariffArea = () => {
  const [tariffsList, setTariffsList] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchTariffsList = () => {
      // landingServive.getTariffsList().then((res) => setTariffsList(res))
    };

    fetchTariffsList();
  }, []);
  const [data, setData] = useState([]);
  const fetchLgota = () => {
    // @ts-ignore
    lgotaService.fetchLgotaList().then((res) => setData(res.data));
  };
  useEffect(() => {
    fetchLgota();
  }, []);
  console.log({ data });

  return (
    <div className="price-section" id="tariffs">
      <h2 className="small-title">{t("uniqueTariffs")}</h2>
      <div className="area">
        {/* {tariffsList?.map((tariff) => ( */}
        {/* @ts-ignore */}
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
              <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>
                {/* @ts-ignore */}
                {item.name.uz}
              </p>
            </div>
            <div className="text">
              <div className="check-icon-box">
                <img src={check} alt="check" className="check-icon" />
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>
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
  );
};

export default TariffArea;
