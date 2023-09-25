import { experimentalStyled, alpha } from "@mui/material";
import PropTypes from "prop-types";
// material

// ----------------------------------------------------------------------

// @ts-ignore
const RootStyle = experimentalStyled("span")(({ theme, styleProps }) => {
  const isLight = theme.palette.mode === "light";
  const { color, variant } = styleProps;

  // @ts-ignore
  const styleFilled = (color) => ({
    // @ts-ignore
    color: theme.palette[color].contrastText,
    // @ts-ignore
    backgroundColor: theme.palette[color].main,
  });
  // @ts-ignore
  const styleOutlined = (color) => ({
    // @ts-ignore
    color: theme.palette[color].main,
    backgroundColor: "transparent",
    // @ts-ignore
    border: `1px solid ${theme.palette[color].main}`,
  });

  // @ts-ignore
  const styleGhost = (color) => ({
    // @ts-ignore
    color: theme.palette[color][isLight ? "dark" : "light"],
    // @ts-ignore
    backgroundColor: alpha(theme.palette[color].main, 0.16),
  });

  return {
    minHeight: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 8,
    cursor: "default",
    alignItems: "center",
    whiteSpace: "nowrap",
    display: "inline-flex",
    justifyContent: "center",
    padding: theme.spacing(2, 2),
    color: theme.palette.grey[800],
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightBold,

    ...(color !== "default"
      ? {
          ...(variant === "filled" && { ...styleFilled(color) }),
          ...(variant === "outlined" && { ...styleOutlined(color) }),
          ...(variant === "ghost" && { ...styleGhost(color) }),
        }
      : {
          ...(variant === "outlined" && {
            backgroundColor: "transparent",
            color: theme.palette.text.primary,
            // @ts-ignore
            border: `1px solid ${theme.palette.grey[500_32]}`,
          }),
          ...(variant === "ghost" && {
            color: isLight
              ? theme.palette.text.secondary
              : theme.palette.common.white,
            // @ts-ignore
            backgroundColor: theme.palette.grey[500_16],
          }),
        }),
  };
});

// ----------------------------------------------------------------------

export default function TableTag({
  color = "primary",
  variant = "ghost",
  // @ts-ignore
  children,
  ...other
}) {
  return (
    // @ts-ignore
    <RootStyle styleProps={{ color, variant }} {...other}>
      {children}
    </RootStyle>
  );
}

TableTag.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
  ]),
  variant: PropTypes.oneOf(["filled", "outlined", "ghost"]),
};
