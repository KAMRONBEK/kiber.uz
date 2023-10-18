import { LoadingButton } from "@mui/lab";
import { Button, Checkbox, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ESPList from "../../components/ESPList";
import { registerAction } from "../../redux/thunks/auth.thunk";
import "./style.scss";

const RegistrationPage = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  //@ts-ignore
  const loader = useSelector((state) => state.loader.loginLoader);
  const [selectedKey, setSelectedKey] = useState(null);
  const [checkBoxValue, setCheckboxValue] = useState(false);
  const [open, setOpen] = useState(true);

  const submitHandler = () => {
    //@ts-ignore
    dispatch(registerAction(selectedKey));
  };

  return (
    <div className="LoginPage">
      <div className="top">
        {/*@ts-ignore */}
        <ESPList onChange={setSelectedKey} />
        <div className="checkbox-area">
          <Checkbox
            id="checkbox"
            value={checkBoxValue}
            onChange={(_, val) => setCheckboxValue(val)}
          />
          <label htmlFor="checkbox">Я согласен с условиями</label>
          <text
            onClick={() => setOpen(!open)}
            style={{ color: "royalblue", marginLeft: 10, cursor: "pointer" }}
          >
            публичной оферты
          </text>
        </div>
      </div>

      <div className="btns-row">
        <Button
          onClick={() => history("/login")}
          variant="contained"
          size="large"
          className="btn secondary-btn"
        >
          Уже есть аккаунт?
        </Button>
        <LoadingButton
          onClick={submitHandler}
          variant="contained"
          size="large"
          className="btn"
          loading={loader}
          disabled={!selectedKey || !checkBoxValue}
        >
          Регистрироваться
        </LoadingButton>
      </div>
      {!open ? (
        <div
          style={{
            flex: 1,
            position: "absolute",
            zIndex: 99,
            justifyContent: "center",
            marginLeft: 30,
          }}
        >
          <iframe
            src="https://kiber.uz/offer/uz.pdf"
            frameBorder="0"
            scrolling="auto"
            style={{ width: "350%", height: 600 }}
            title="Good"
          />
          <button
            onClick={() => setOpen(!open)}
            type="button"
            className="btn btn-warning"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default RegistrationPage;
