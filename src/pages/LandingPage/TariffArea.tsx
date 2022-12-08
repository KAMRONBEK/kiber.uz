import { useEffect, useState } from "react"
import landingServive from "../../services/landingService"
import { Button, Icon } from "@mui/material"
import check from "../../assets/icons/check.svg"
import { useTranslation } from "react-i18next"

const TariffArea = () => {
  const [tariffsList, setTariffsList] = useState([])

  const { t } = useTranslation()

  useEffect(() => {
    const fetchTariffsList = () => {
      // landingServive.getTariffsList().then((res) => setTariffsList(res))
    }

    fetchTariffsList()
  }, [])

  return (
    <div className="price-section" id="tariffs">
      <h2 className="small-title">{t("uniqueTariffs")}</h2>
      <div className="area">
        {/* {tariffsList?.map((tariff) => ( */}
        <div className="price-card" style={{ height: 250 }}>
          <div className="header">
            <div className="price-name">
              {/* {tariff?.name?.ru.substring(0, 6)}
                <p> {tariff?.name?.ru.substring(6)}</p> */}
            </div>
            <div className="price-summ">
              {/* {tariff?.price} сум<p className="price-summ-two">/ док.</p> */}
              {/* 0 {t("som")} */}
              {t("free")}
              {/* <p className="price-summ-two">{t("dock")}</p> */}
            </div>
          </div>
          <div className="text">
            <div className="check-icon-box">
              <img src={check} alt="check" className="check-icon" />
            </div>
            <p style={{ fontSize: 12 }}>
              {/* {t("sendUp")} */}
              {t("freePlan")}
            </p>
          </div>
          <div className="line"></div>
          <Button
            className="button"
            style={{ marginRight: 12 }}
            variant="outlined"
            color="inherit"
          >
            {t("buy")}
          </Button>
        </div>
        <div className="price-card">
          <div className="header">
            <div className="price-name"></div>
            <div className="price-summ">
              300 UZS
              <p className="price-summ-two">/ документ</p>
            </div>
          </div>
          <div className="text">
            <div className="check-icon-box">
              <img src={check} alt="check" className="check-icon" />
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>
              {t("appliesAll")}
            </p>
          </div>
          <div className="text">
            <div className="check-icon-box">
              <img src={check} alt="check" className="check-icon" />
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>
              {t("allDocument")}
            </p>
          </div>
          <div className="text">
            <div className="check-icon-box">
              <img src={check} alt="check" className="check-icon" />
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6 }}>
              {t("documentSending")}
            </p>
          </div>
          <div className="line"></div>
          <Button className="button" variant="outlined" color="inherit">
            {t("buy")}
          </Button>
        </div>
        <div className="price-card" style={{ height: 350 }}>
          <div className="header">
            <div className="price-name"></div>
            <div className="price-summ">
              250 000 UZS
              <p className="price-summ-two">/ месяц</p>
            </div>
          </div>
          <div className="text">
            <div className="check-icon-box">
              <img src={check} alt="check" className="check-icon" />
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.6, marginBottom: 10 }}>
              {t("sendPurchase")}
            </p>
          </div>
          <div className="text">
            <div className="check-icon-box">
              <img src={check} alt="check" className="check-icon" />
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.6 }}>{t("getAccess")}</p>
          </div>
          <div className="line"></div>
          <Button className="button" variant="outlined" color="inherit">
            {t("buy")}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TariffArea
