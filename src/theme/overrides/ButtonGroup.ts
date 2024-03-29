// ----------------------------------------------------------------------

import { alpha } from "@mui/system";
// @ts-ignore
export default function ButtonGroup(theme) {
  return {
    MuiButtonGroup: {
      variants: [
        {
          props: { variant: "contained", color: "inherit" },
          style: { boxShadow: theme.customShadows.z8 },
        },
        {
          props: { variant: "contained", color: "primary" },
          style: { boxShadow: theme.customShadows.primary },
        },
        {
          props: { disabled: true },
          style: {
            boxShadow: "none !important",
            "& .MuiButtonGroup-grouped.Mui-disabled": {
              color: `${theme.palette.action.disabled} !important`,
              borderColor: `${theme.palette.action.disabledBackground} !important`,
              "&.MuiButton-contained": {
                backgroundColor: theme.palette.action.disabledBackground,
              },
            },
          },
        },
      ],

      styleOverrides: {
        root: {
          "&:hover": {
            boxShadow: "none",
          },
        },
        grouped: {
          borderColor: `${theme.palette.grey[500_32]} !important`,
        },
        groupedContained: {
          color: theme.palette.grey[800],
        },
        groupedContainedPrimary: {
          color: theme.palette.primary.contrastText,
          borderColor: `${theme.palette.primary.dark} !important`,
        },
        groupedOutlinedPrimary: {
          borderColor: `${alpha(theme.palette.primary.main, 0.48)} !important`,
        },
        groupedTextPrimary: {
          borderColor: `${theme.palette.primary.main} !important`,
        },
      },
    },
  };
}
