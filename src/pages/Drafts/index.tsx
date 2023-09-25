import { Card, experimentalStyled, Paper, Stack, Tab } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

import { useTranslation } from "react-i18next";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ActTable from "./DraftTable/ActTable";
import FacturaTable from "./DraftTable/FacturaTable";
import WaybillTable from "./DraftTable/WaybillTable";
import EmpowermentTable from "./DraftTable/EmpowermentTable";
import ContractTable from "./DraftTable/ContractTable";
import VerificationActTable from "./DraftTable/VerificationActTable";

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

const DraftsPage = () => {
  const [selectedTab, setSelectedTab] = useState("0");
  const { t } = useTranslation();
  return (
    <div>
      {/* @ts-ignore */}
      <Header title={t("saved")} />
      <div
        style={{ padding: "20px", display: "flex", flexDirection: "column" }}
      >
        <TabContext value={selectedTab}>
          <StyledCard elevation={5}>
            <TabList onChange={(e, val) => setSelectedTab(val)}>
              <Tab label={t("invoices")} value="0" />
              <Tab label={t("acts")} value="1" />
              <Tab label={t("empowerment")} value="2" />
              <Tab label={t("contract")} value="3" />
              <Tab label={t("checkedActs")} value="4" />
              <Tab label={t("ttu")} value="5" />
            </TabList>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"1rem"}
            ></Stack>
          </StyledCard>
          <TabPanel sx={{ padding: "0" }} value="0">
            <FacturaTable />
          </TabPanel>
          <TabPanel sx={{ padding: "0" }} value="1">
            <ActTable />
          </TabPanel>
          <TabPanel sx={{ padding: "0" }} value="2">
            <EmpowermentTable />
          </TabPanel>
          <TabPanel sx={{ padding: "0" }} value="3">
            <ContractTable />
          </TabPanel>
          <TabPanel sx={{ padding: "0" }} value="4">
            <VerificationActTable />
          </TabPanel>
          <TabPanel sx={{ padding: "0" }} value="5">
            <WaybillTable />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default DraftsPage;
