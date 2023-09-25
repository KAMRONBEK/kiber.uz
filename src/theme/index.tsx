import PropTypes from "prop-types";
import { useMemo } from "react";
import shape from "./shape";
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import componentsOverride from "./overrides";
import shadows, { customShadows } from "./shadows";
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { ruRU } from "@mui/material/locale";

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node,
};

// @ts-ignore
export default function ThemeConfig({ children }) {
  // @ts-ignore
  const appTheme = useSelector((state) => state.settings.theme);
  const isLight = appTheme === "light";

  const themeOptions = useMemo(
    () => ({
      palette: isLight
        ? { ...palette.light, mode: "light" }
        : { ...palette.dark, mode: "dark" },
      shape,
      typography,
      breakpoints,
      direction: "left",
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight]
  );
  // @ts-ignore
  const theme = createTheme(themeOptions, ruRU);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* @ts-ignore */}
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
