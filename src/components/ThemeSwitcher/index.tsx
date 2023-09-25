import "./style.scss";
import moonIcon from "../../assets/icons/moon-icon.svg";
import sunIcon from "../../assets/icons/sun-icon.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { settingsActions } from "../../redux/slices/settings.slice";

const ThemeSwitcher = () => {
  //@ts-ignore
  const theme = useSelector((state) => state.settings.theme);
  const dispatch = useDispatch();

  const checkboxHandler = () => dispatch(settingsActions.switchTheme());

  return (
    <div className="ThemeSwitcher">
      <input
        type="checkbox"
        onChange={checkboxHandler}
        checked={theme === "dark"}
        id="themeCheckbox"
      />
      <label htmlFor="themeCheckbox">
        <div className="day">
          <img src={sunIcon} alt="sun-icon" />
        </div>
        <div className="night">
          <img src={moonIcon} alt="moon-icon" />
        </div>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
