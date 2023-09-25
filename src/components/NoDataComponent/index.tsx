import "./style.scss";
import InboxIcon from "@mui/icons-material/Inbox";
import { experimentalStyled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const StyledTitle = experimentalStyled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
}));

// @ts-ignore
const NoDataComponent = ({ isVisible }) => {
  const { t } = useTranslation();

  if (!isVisible) return null;

  return (
    <div className="NoDataComponent">
      <div className="block">
        <div className="icon">
          <InboxIcon color="disabled" style={{ fontSize: "50" }} />
        </div>
        <StyledTitle variant="body1">{t("noDocument")}</StyledTitle>
      </div>
    </div>
  );
};

export default NoDataComponent;
