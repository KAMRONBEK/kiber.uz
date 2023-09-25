import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import "./style.scss";

interface Alerts {
  id: number;
  title: string;
  type: string;
}

const Alerts = () => {
  const alerts = useSelector(
    (state: { alert: { alerts: [Alerts] } }) => state.alert.alerts
  );
  return (
    <div className="Alerts">
      {/* @ts-ignore */}
      {alerts.map((alert) => (
        // @ts-ignore
        <Alert className="alert shake-animation" severity={alert.type}>
          {alert.title}
        </Alert>
      ))}
    </div>
  );
};

export default Alerts;
