import Alerts from "./components/Alerts";

// @ts-ignore
const AlertProvider = ({ children }) => {
  return (
    <>
      <Alerts />
      {children}
    </>
  );
};

export default AlertProvider;
