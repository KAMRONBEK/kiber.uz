import { Card, experimentalStyled, Tab, TableContainer } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { t } from "i18next";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import lgotaService from "../../services/lgotaService";
import ProductsWithoutVat from "./ProductsWithoutVat";
import ProductsWithZeroVat from "./ProductsWithZeroVat";
import CompaniesSeller from "./CompaniesSeller";
import CompaniesBuyer from "./CompaniesBuyer";
import ProductsNotIncluded from "./ProductsNotIncluded";
import Compensations from "./Compensations";

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

const Documents = () => {
  const [selectedTab, setSelectedTab] = useState("0");

  return (
    <div className="Documents">
      {/* @ts-ignore */}
      <Header title={t("documents")}></Header>
      <div
        style={{ padding: "20px", display: "flex", flexDirection: "column" }}
      >
        {/* @ts-ignore */}
        <TabContext value={selectedTab}>
          <StyledCard elevation={12}>
            <TabList onChange={(e, val) => setSelectedTab(val)}>
              <Tab
                label={t("productsWithoutVat")}
                value="0"
                sx={{ maxWidth: "150px" }}
              />
              <Tab
                label={t("productsWithZeroVat")}
                value="1"
                sx={{ maxWidth: "170px" }}
              />
              <Tab
                label={t("companiesSeller")}
                value="2"
                sx={{ maxWidth: "170px" }}
              />
              <Tab
                label={t("companiesBuyer")}
                value="3"
                sx={{ maxWidth: "170px" }}
              />
              <Tab
                label={t("productsNotIncluded")}
                value="4"
                sx={{ maxWidth: "150px" }}
              />
              <Tab label={t("compensations")} value="5" />
            </TabList>
          </StyledCard>
          <TabPanel value="0">
            <ProductsWithoutVat />
          </TabPanel>
          <TabPanel value="1">
            <ProductsWithZeroVat />
          </TabPanel>
          <TabPanel value="2">
            <CompaniesSeller />
          </TabPanel>
          <TabPanel value="3">
            <CompaniesBuyer />
          </TabPanel>
          <TabPanel value="4">
            <ProductsNotIncluded />
          </TabPanel>
          <TabPanel value="5">
            <Compensations />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default Documents;
