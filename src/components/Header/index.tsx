import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import UserIcon from "@mui/icons-material/Person";

import ThemeSwitcher from "../ThemeSwitcher";
import "./style.scss";
import React, { useState } from "react";
import { ExitToApp, SupervisorAccount } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { settingsActions } from "../../redux/slices/settings.slice";

const ITEM_HEIGHT = 48;

//@ts-ignore
const Header = ({ title, children }) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { t } = useTranslation();
  // @ts-ignore
  const { name } = useSelector((state) => state.settings.lang);
  // const [language, setLanguage] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  //@ts-ignore
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    //@ts-ignore
    dispatch(authActions.logout());
    history("/");
  };

  const personalHandler = () => {
    history("/main/personal-area");
  };

  const options = [
    {
      id: "personal-area",
      title: <p>{t("personalArea")}</p>,
      path: personalHandler,
      icon: SupervisorAccount,
    },
    {
      id: "logout",
      title: <p>{t("exit")}</p>,
      path: logoutHandler,
      icon: ExitToApp,
    },
  ];
  //@ts-ignore
  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
    dispatch(
      settingsActions.changeLanguage({
        name: event.target.value,
        title: event.target.value === "Ру" ? "ru" : "uz",
      })
    );
  };
  return (
    <div className="Header">
      <Typography variant="h4" color="primary">
        {title}
      </Typography>
      <div className="right-side">
        <div
          style={{
            marginLeft: "10px",
            display: "flex",
            gridGap: "10px",
            marginRight: "15px",
          }}
        >
          {children}
        </div>
        <FormControl
          sx={{ minWidth: 90, color: "white", marginRight: 2 }}
          size="small"
        >
          <InputLabel id="demo-select-small" style={{ color: "black" }}>
            <p>{t("languages")}</p>
          </InputLabel>
          <Select
            value={name}
            label="Ru"
            onChange={handleChange}
            style={{ color: "black" }}
          >
            <MenuItem value="ru">Ру</MenuItem>
            <MenuItem value="uz">Uz</MenuItem>
          </Select>
        </FormControl>

        <ThemeSwitcher />

        <IconButton className="button" color="default" onClick={handleClick}>
          <UserIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4,
              width: "22ch",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            },
          }}
        >
          {options.map((option) => (
            //@ts-ignore
            <MenuItem key={option} onClick={option.path}>
              <option.icon />
              <text style={{ marginLeft: 10 }}>{option.title}</text>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default Header;
