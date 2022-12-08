import "./style.scss";
import Logo from "../../assets/images/kiber-logo-white.svg";
import kiber from "../../assets/images/kiber.svg";
import MainSectionImage from "../../assets/images/Devices.png";
import { Link } from "react-router-dom";
import MobilePreview from "../../assets/images/Content.png";
import TariffArea from "./TariffArea";
import {
  ArrowRightAlt,
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
import appStore from "../../assets/images/appStore.svg";
import googlePlay from "../../assets/images/googlePlay.svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const LandingPage = () => {
  const [language, setLanguage] = useState("");

  const { t } = useTranslation();

  //@ts-ignore
  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value)
    setLanguage(event.target.value)
  }

  return (
    <div className="LandingPage" id="connecting">
      <div className="header-wrapper">
        <div className="container header ">
          <div className="logo">
            <a href="#connecting">
              <img src={Logo} alt="logo" className="logo-img" />
            </a>
          </div>
          <div className="navbar">
            <a href="#connecting">
              <div className="nav-item">{t("connection")}</div>
            </a>
            <a href="#tariffs">
              <div className="nav-item">{t("tariff")}</div>
            </a>
            <a href="#works">
              <div className="nav-item">{t("workingMethod")}</div>
            </a>
          </div>
          <div className="btns-rows">
            <FormControl
              sx={{ minWidth: 70, color: "white", marginRight: 2 }}
              size="small"
            >
              <InputLabel id="demo-select-small" style={{ color: "white" }}>
                {t("languages")}
              </InputLabel>
              <Select
                value={language}
                label="RU"
                onChange={handleChange}
                style={{ color: "white" }}
              >
                <MenuItem value="ru">Ру</MenuItem>
                <MenuItem value="uz">Uz</MenuItem>
              </Select>
            </FormControl>
            <Link to="/login" style={{ marginRight: "20px" }} className="btn">
              <b>{t("enter")}</b>
            </Link>
          </div>
        </div>
      </div>

      <div className="section main-section container ">
        <div className="side left">
          <div className="main-block">
            <h1 className="title">{t("systemElectronicDocument")}</h1>
            <p className="subtitle">{t("kiberInformation")}</p>
          </div>
        </div>
        <div className="side right">
          <img
            id="works"
            className="main-section-image"
            src={MainSectionImage}
            alt="main-section"
          />
        </div>
      </div>

      <div className="information container">
        <p className="information-title">{t("kiberMethod")}</p>

        <div className="information-container">
          <div className="information-box">
            <h1 className="title">{t("kiberSystem")}</h1>
            <p className="text">{t("systemInformation")}</p>
          </div>
          <div className="information-box">
            <h1 className="title">{t("kiberQ_A")}</h1>
            <p className="text">{t("q_aInformation")}</p>
          </div>
          <div className="information-box">
            <h1 className="title">{t("IndividualConsultations")}</h1>
            <p className="text">{t("IndividualConsultationsInformation")}</p>
          </div>
        </div>
      </div>

      <div className="mobile-container container">
        <div className="mobile-side">
          <div className="mobile-title">{t("shareDocumentsPhone")}</div>
          <div className="mobile-text">
            {t("shareDocumentsPhoneInformation")}
          </div>
          <div className="image-box">
            <img className="image" src={appStore} alt="appStore" />
            <img className="image" src={googlePlay} alt="googlePlayd" />
          </div>
        </div>

        <div className="mobile-side image">
          <img src={MobilePreview} alt="mobile-preview" className="img" />
        </div>
      </div>

      <TariffArea />

      <div className="onec-section-wrapper">
        <div className="onec-section container">
          <h2 className="small-title">{t("loginWorld")}</h2>
          <div className="text">
            <p className="title">{t("downloadMobile")}</p>
          </div>
          <div className="btns-rows">
            <Link to="/login" style={{ borderColor: "white" }} className="btn">
              <b>{t("enter")}</b>
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-wrapper">
        <div className="footer container">
          <div className="side">
            <img className="side-logo" src={kiber} alt="logo" />
            <p className="version-text">{t("electronicDocument")}</p>
          </div>
          <div className="side">
            <div className="title">{t("system")}</div>
            <a href="#connecting">
              <p className="text">{t("connection")}</p>
            </a>
            <a href="#tariffs">
              <p className="text">{t("tariff")}</p>
            </a>
            <a href="#tutorials">
              <p className="text">{t("workingMethod")}</p>
            </a>
          </div>

          <div className="side">
            <div className="title">{t("support")}</div>
            <p className="text">{t("faq")}</p>
            <p className="text">{t("UsersManual")}</p>
            <p className="text">{t("feedback")}</p>
            {/* <p className="text">Контакты</p> */}
          </div>

          <div className="side">
            <div className="title">{t("followUs")}</div>
            <div className="side-icon-container">
              <div className="side-icon-box">
                <Facebook />
              </div>
              <div className="side-icon-box">
                <Twitter />
              </div>
              <div className="side-icon-box">
                <Instagram />
              </div>
              <div className="side-icon-box">
                <LinkedIn />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t("servicesLicensed")}</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
