import { LoadingButton } from "@mui/lab"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { signAction } from "../../redux/thunks/auth.thunk"
import "./style.scss"
import { useTranslation } from "react-i18next"

//@ts-ignore
export const useOnKeyPress = (callback, targetKey) => {
  useEffect(() => {
    //@ts-ignore
    const keyPressHandler = (event) => {
      if (event.key === targetKey) {
        callback()
      }
    }
    window.addEventListener("keydown", keyPressHandler)

    return () => {
      window.removeEventListener("keydown", keyPressHandler)
    }
  }, [callback, targetKey])
}
//@ts-ignore
const SignInPage = (submitHandlerSign) => {
  const history = useNavigate()
  const dispatch = useDispatch()
  //@ts-ignore
  const loader = useSelector((state) => state.loader.loginLoader)

  const [selectedKey, setSelectedKey] = useState(null)
  const [password, setPassword] = useState("")
  const [tin, setTin] = useState("")

  const { t } = useTranslation()

  const submitHandler = () => {
    //@ts-ignore
    dispatch(signAction(tin, password, "1"))
  }

  useOnKeyPress(submitHandler, "Enter")

  //@ts-ignore
  const formik = useFormik({})

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
  )
}

export default SignInPage
