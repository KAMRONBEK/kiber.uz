import { useSelector } from "react-redux";
import ThemeConfig from "./theme";
// import DateAdapter from '@mui/lab/AdapterMoment';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// @ts-ignore
const MaterialProvider = ({ children }) => {
  // @ts-ignore
  const theme = useSelector((state) => state.settings.theme);

  return (
    // @ts-ignore
    <div className={theme === "dark" && "night-mode"}>
      <ThemeConfig>
        {/* @ts-ignore */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </ThemeConfig>
    </div>
  );
};

export default MaterialProvider;
