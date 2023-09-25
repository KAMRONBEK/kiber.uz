import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import "./style.scss";

const FullPageLoader = () => {
  //@ts-ignore
  const isVisible = useSelector((state) => state.loader.fullPageLoader);
  if (!isVisible) return null;
  return (
    <div className="FullPageLoader">
      <CircularProgress />
    </div>
  );
};

export default FullPageLoader;
