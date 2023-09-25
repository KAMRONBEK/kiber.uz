import { CircularProgress } from "@mui/material";
import "./style.scss";

const TableLoader = ({ isVisible = false }) => {
  if (!isVisible) return null;

  return (
    <div className="TableLoader">
      <CircularProgress />
    </div>
  );
};

export default TableLoader;
