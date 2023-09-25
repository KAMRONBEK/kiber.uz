import "./style.scss";
import { ReactComponent as KiberLogo } from "../../assets/images/kiber-logo-purple.svg";
import { useState, useEffect } from "react";
import ChildBlock from "./ChildBlock";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/auth.slice";
import { useTranslation } from "react-i18next";
import {
  Download,
  Upload,
  SupervisorAccount,
  Save,
  Settings,
  InsertDriveFile,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [openedBlock, setOpenedBlock] = useState(null);
  const [rightSideVisible, setRightSideVisible] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  //@ts-ignore
  const parentClickHandler = (element) => {
    if (element.children) {
      switchChildBlockHandler(element.id);
      if (!rightSideVisible) setRightSideVisible(true);
    } else setOpenedBlock(null);
  };
  //@ts-ignore
  const switchChildBlockHandler = (id) => {
    setOpenedBlock((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (!rightSideVisible) setOpenedBlock(null);
  }, [rightSideVisible]);

  const logoutHandler = () => {
    //@ts-ignore
    dispatch(authActions.logout());
  };

  const routes = [
    {
      id: "documents",
      // title: "Список документов",
      children: [
        {
          id: "sender",
          title: <p>{t("outgoing")}</p>,
          path: "/main/docs/sender",
          icon: Upload,
          isChild: true,
        },
        {
          id: "receiver",
          title: <p>{t("inbox")}</p>,
          path: "/main/docs/receiver",
          icon: Download,
          isChild: true,
        },
        {
          id: "agent",
          title: <p>{t("confidant")}</p>,
          path: "/main/docs/agent",
          icon: SupervisorAccount,
          isChild: true,
        },
        {
          id: "drafts",
          title: <p>{t("saved")}</p>,
          path: "/main/drafts",
          icon: Save,
          isChild: true,
        },
        {
          id: "my-products",
          title: <p>{t("myGoods")}</p>,
          path: "/main/settings/my-products",
          icon: Settings,
          isChild: true,
        },
        {
          id: "docs",
          title: <p>{t("documents")}</p>,
          path: "/main/documents",
          icon: InsertDriveFile,
          isChild: true,
        },
      ],
    },
  ];

  return (
    <div className={`Sidebar ${!rightSideVisible ? "close" : ""}`}>
      <div className="header">
        <div className="brand">
          <KiberLogo />
        </div>
      </div>

      <div className="nav-block" style={{ height: `calc(100vh - ${72}px)` }}>
        <div className="menu-element">
          {routes?.map((element) => (
            <div className="parent-block" key={element.id}>
              <div
                className="chapter-name"
                onClick={(e) => {
                  if (element.children) e.preventDefault();
                  parentClickHandler(element);
                }}
              >
                {/*@ts-ignore */}
                <div className="label">{element.title}</div>
              </div>

              {element.children && (
                <ChildBlock element={element} isVisible={true} />
              )}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <p className="version-text">
            <p>{t("kiberVersion")}</p> {t("version")}
          </p>
          <p className="text">{t("companyName")}</p>
          <Button variant="outlined" sx={{ width: "100%" }}>
            <a
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "14px",
                color: "inherit",
              }}
              href="https://t.me/kiberuz_savol_javoblar"
              target="_blank"
            >
              Служба поддержки <TelegramIcon sx={{ fontSize: "20px" }} />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
