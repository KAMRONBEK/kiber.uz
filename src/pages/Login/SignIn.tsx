import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { signAction } from "../../redux/thunks/auth.thunk";
import "./style.scss";

export const useOnKeyPress = (callback: any, targetKey: unknown) => {
  useEffect(() => {
    const keyPressHandler = (event: { key: unknown }) => {
      if (event?.key === targetKey) {
        callback();
      }
    };
    window.addEventListener("keydown", keyPressHandler);

    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [callback, targetKey]);
};

const SignInPage = () => {
  const dispatch: any = useDispatch();

  const loader = useSelector((state: any) => state?.loader?.loginLoader);

  const [password, setPassword] = useState("");
  const [tin, setTin] = useState("");

  const { t } = useTranslation();

  const submitHandler = () => {
    dispatch(signAction(tin, password, "1"));
  };

  useOnKeyPress(submitHandler, "Enter");

  // const formik = useFormik({});
  return (
    <div className="LoginPage">
      <div className="sign-box">
        {/* <FTextField
          label={t("login")}
          // name="tin"
          formik={formik}
          style={{ width: 430 }}
        /> */}
        {/* <FTextField
          label={t("parol")}
          // name="password"
          formik={formik}
          style={{ width: 430 }}
        /> */}

        <input
          value={tin}
          //@ts-ignore
          placeholder={t("tinTwo")}
          onChange={(e) => setTin(e.target.value)}
          style={{
            width: 430,
            height: 30,
            borderRadius: 8,
            borderWidth: 0.5,
            paddingLeft: 10,
          }}
        />

        <input
          value={password}
          //@ts-ignore
          placeholder={t("parol")}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: 430,
            height: 30,
            marginTop: 20,
            borderRadius: 8,
            borderWidth: 0.5,
            paddingLeft: 10,
          }}
        />

        <LoadingButton
          onClick={submitHandler}
          variant="contained"
          size="large"
          className="btn"
          loading={loader}
          disabled={!tin || !password}
        >
          {t("enter")}
        </LoadingButton>
      </div>
    </div>
  );
};

export default SignInPage;
