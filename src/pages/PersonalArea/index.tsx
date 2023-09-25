import Header from "../../components/Header";
import "./style.scss";
import EditProfile from "./EditProfile";
import { Card, experimentalStyled, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useEffect, useState } from "react";
import Statistic from "./Statistic";
import userInfo from "../../services/searchUserApi";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { initialValues } from "./model/initialValues";
import { useTranslation } from "react-i18next";
import Tarifs from "./Tarifs";

const StyledCard = experimentalStyled(Card)(({ theme }) => ({
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  paddingTop: theme.spacing(1),
  marginBottom: 15,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: 12,
}));

const PersonalArea = (props: {}) => {
  // @ts-ignore
  const userData = useSelector((state) => state.auth.userData);

  const [selectedTab, setSelectedTab] = useState("0");
  const [userPersonal, setUserPersonal] = useState(null);

  const { t } = useTranslation();
  // @ts-ignore
  const formik = useFormik({
    initialValues: {
      ...initialValues,
      tin: userData.person.tin,
      name: userData.person.director,
      account: userData.person.account,
      mfo: userData.person.mfo,
      balance: userData.person.balance,
      email: userData.person.email,
      photo: userData.person.photo,
      phone: userData.person.phone,
    },
  });

  // @ts-ignore
  const searchUser = (tin) => {
    // @ts-ignore
    userInfo.userInfo(tin).then((res) => {
      setUserPersonal({
        ...formik.values,
        // @ts-ignore
        id: res.id,
        // @ts-ignore
        tin: res.tin,
        // @ts-ignore
        photo: res.photo,
        // @ts-ignore
        name: res.fullName,
        // @ts-ignore
        address: res.address,
        // @ts-ignore
        phone: res.phone,
        // @ts-ignore
        account: res.account,
        // @ts-ignore
        mfo: res.mfo,
        // @ts-ignore
        password: res.password,
      });

      const computedClient = {
        ...formik.values,
        // @ts-ignore
        id: res.id,
        // @ts-ignore
        tin: res.tin,
        // @ts-ignore
        photo: res.photo,
        // @ts-ignore
        name: res.fullName,
        // @ts-ignore
        phone: res.phone,
        // @ts-ignore
        account: res.account,
        // @ts-ignore
        mfo: res.mfo,
        // @ts-ignore
        email: res.email,
        // @ts-ignore
        balance: res.balance,
      };

      // @ts-ignore
      formik.setValues(computedClient);
      console.log(formik);
    });
  };
  useEffect(() => {
    // @ts-ignore
    const userTin = formik.values.tin;
    if (userTin?.length !== 9 && userTin?.length !== 14) return;
    searchUser(userTin);
    // @ts-ignore
  }, [formik.values.tin]);

  const onSubmit = () => {
    try {
      userInfo.userUpdate(JSON.stringify(formik.values));
    } catch (err) {
      console.log(err);
    }
  };

  const onImage = () => {
    try {
      // @ts-ignore
      userInfo.userUpdateImage(userPersonal.id, formik.values.photo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitPassword = () => {
    try {
      // @ts-ignore
      userInfo.userPassword(userPersonal.id, formik.values.password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="PersonalArea">
        {/* @ts-ignore */}
        <Header title={t("personalArea")}></Header>

        <div
          style={{ padding: "20px", display: "flex", flexDirection: "column" }}
        >
          <TabContext value={selectedTab}>
            <StyledCard elevation={12}>
              <TabList onChange={(e, val) => setSelectedTab(val)}>
                <Tab label={t("Statistics")} value="1" />
                <Tab label={t("userData")} value="0" />
                <Tab label={t("tarifs")} value="2" />
              </TabList>
            </StyledCard>
            <TabPanel value="0">
              <EditProfile
                formik={formik}
                handleSubmit={onSubmit}
                imageHandleSubmit={onImage}
                handleSubmitPassword={handleSubmitPassword}
              />
            </TabPanel>
            <TabPanel value="1">
              <Statistic />
            </TabPanel>
            <TabPanel value="2">
              <Tarifs />
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </form>
  );
};

export default PersonalArea;
