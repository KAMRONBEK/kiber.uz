import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Autocomplete,
  Button,
  Checkbox,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ESPList from "../../components/ESPList";
import FTextField from "../../components/FormElements/FTextField2";
import { loginAction, registerAction } from "../../redux/thunks/auth.thunk";
import SignInPage from "./SignIn";
import "./style.scss";
import { Person, VpnKey } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import i18n from "../../language/i18n";

const LoginPage = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  //@ts-ignore
  const loader = useSelector((state) => state.loader.loginLoader);
  const [selectedKey, setSelectedKey] = useState(null);
  const [selectedTab, setSelectedTab] = useState("0");
  const [color, setColor] = useState("");
  const [open, setOpen] = useState(true);
  const [checkBoxValue, setCheckboxValue] = useState(false);
  //@ts-ignore
  const isRegistered = useSelector((state) => state.auth.isRegistered);

  const { t } = useTranslation();

  const submitHandler = () => {
    if (isRegistered) {
      //@ts-ignore
      dispatch(loginAction(selectedKey, "2"));
    } else {
      //@ts-ignore
      dispatch(registerAction(selectedKey));
    }
  };

  //@ts-ignore
  const keys = useSelector((state) => state.espKey.keysList);

  const computedKeys = useMemo(() => {
    if (!keys?.length) return [];
    //@ts-ignore
    return keys.map((key) => ({
      ...key,
      validTo: moment(key.validTo).format("DD.MM.YYYY"),
      expired: moment() > moment(key.validTo),
    }));
  }, [keys]);

  //@ts-ignore
  const changeHandler = (option) => {
    if (option.expired) return null;
    setSelectedKey(option);
  };

  useEffect(() => {
    setSelectedKey(selectedKey);
  }, [selectedKey]);

  // const formik = useFormik({})

  const checkLanguage = () => {
    // eslint-disable-next-line default-case
    switch (i18n.language) {
      case "ru":
        return "https://kiber.uz/terms/ru.pdf";
      case "uz":
        return "https://kiber.uz/terms/uz.pdf";
    }
  };

  return (
    <div className="LoginPage">
      {/* <div className="top">
        {/* <Typography className="title" variant="h1" color="royalblue">
          Вход в систему
        </Typography> */}
      {/* <ESPList onChange={setSelectedKey} /> */}
      {/* </div> */}

      <div className="box">
        <text className="title">{t("loginSystem")}</text>

        <TabContext value={selectedTab}>
          <TabList onChange={(e, val) => setSelectedTab(val)}>
            <div
              className="tab"
              style={{
                borderColor: color ? "#7D91A9" : "#3E68BA",
                marginRight: 10,
              }}
              onClick={() => {
                setSelectedTab("0");
                //@ts-ignore
                setColor(false);
              }}
            >
              <VpnKey
                style={{
                  marginRight: 10,
                }}
                color={color ? "disabled" : "primary"}
              />
              <Tab
                style={{ color: color ? "#7D91A9" : "#3E68BA" }}
                label={t("whithKey")}
                value="0"
              ></Tab>
            </div>
            <div
              className="tab"
              style={{
                borderColor: color ? "#3E68BA" : "#7D91A9",
                marginLeft: 10,
              }}
              onClick={() => {
                setSelectedTab("1");
                //@ts-ignore
                setColor(true);
              }}
            >
              <Person
                style={{
                  marginRight: 10,
                }}
                color={color ? "primary" : "disabled"}
              />
              <Tab
                style={{ color: color ? "#3E68BA" : "#7D91A9" }}
                label={t("withPassword")}
                value="1"
              />
            </div>
          </TabList>

          <TabPanel value="0">
            <div className="login-box">
              <Autocomplete
                sx={{ width: 430 }}
                options={computedKeys}
                //@ts-ignore
                getOptionLabel={(option) => option.CN + "    " + option.TIN}
                onChange={(_event, option) => {
                  setSelectedKey(option);
                }}
                value={selectedKey}
                renderOption={(props, option) => (
                  //@ts-ignore
                  <div
                    {...props}
                    className="esp-block"
                    style={{
                      marginTop: 5,
                      cursor: "pointer",
                    }}
                    //@ts-ignore
                    key={option.serialNumber}
                    // onClick={() => changeHandler(option)}
                  >
                    <text
                      style={{
                        marginLeft: 20,
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {/*@ts-ignore */}
                      {option.CN}
                    </text>
                    <div
                      style={{
                        display: "flex",
                        marginTop: 5,
                        marginBottom: 15,
                      }}
                    >
                      <text style={{ marginLeft: 20, color: "#8692ad" }}>
                        {/*@ts-ignore */}
                        {option.TIN}
                      </text>
                      <text style={{ marginLeft: 20, color: "#8692ad" }}>
                        {/*@ts-ignore */}
                        {option.O ? (
                          <div className="row">
                            {/*@ts-ignore */}
                            <span className="value">{option.O}</span>
                          </div>
                        ) : null}
                      </text>
                      <text style={{ marginLeft: 20, color: "#8692ad" }}>
                        {/*@ts-ignore */}
                        {option.validTo}
                      </text>
                    </div>
                  </div>
                )}
                renderInput={(params) => (
                  <TextField {...params} label={t("chooseKey")} />
                )}
              />

              {!isRegistered ? (
                <div className="checkbox-area">
                  <Checkbox
                    id="checkbox"
                    value={checkBoxValue}
                    onChange={(_, val) => setCheckboxValue(val)}
                  />
                  <label htmlFor="checkbox">{t("iAgree")}</label>
                  <text
                    onClick={() => setOpen(!open)}
                    style={{
                      color: "royalblue",
                      marginLeft: 10,
                      cursor: "pointer",
                    }}
                  >
                    {t("publicOffer")}
                  </text>
                </div>
              ) : null}

              <LoadingButton
                onClick={submitHandler}
                variant="contained"
                size="large"
                className="btn"
                loading={loader}
                disabled={!isRegistered ? !checkBoxValue : !selectedKey}
              >
                {!isRegistered ? <p>{t("register")}</p> : <p>{t("enter")}</p>}
              </LoadingButton>
            </div>
          </TabPanel>
          <TabPanel value="1">
            <SignInPage />
          </TabPanel>
        </TabContext>
      </div>
      {!open ? (
        <div
          style={{
            flex: 1,
            position: "absolute",
            zIndex: 99,
            justifyContent: "center",
            marginRight: 950,
          }}
        >
          <iframe
            src={checkLanguage()}
            frameBorder="0"
            scrolling="auto"
            style={{ width: "350%", height: 600 }}
            title="Good"
          />
          <button
            onClick={() => setOpen(!open)}
            type="button"
            // class="btn btn-warning"
            data-bs-dismiss="modal"
          >
            {t("close")}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default LoginPage;