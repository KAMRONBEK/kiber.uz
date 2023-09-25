import "./style.scss";
import Logo from "../../assets/images/kiber-logo-purple.svg";
import document from "../../assets/images/document.png";
import login from "../../assets/images/login.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { Button } from "@mui/material";

//@ts-ignore
const AuthLayout = ({ children }) => {
  const history = useNavigate();
  const location = useLocation();

  const isLoginPage = useMemo(() => {
    return location.pathname.includes("login");
  }, []);

  return (
    <div className="AuthLayout">
      <div className="header">
        <img src={Logo} alt="logo" onClick={() => history("/")} />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="right-side">{children}</div>
        {isLoginPage ? null : (
          <div className="left-side">
            <img src={document} alt="document" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
