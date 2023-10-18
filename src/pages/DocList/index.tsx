import { useState } from "react";
import Header from "../../components/Header";
import "./style.scss";
import {
  Button,
  Card,
  experimentalStyled,
  Menu,
  MenuItem,
  Stack,
  Tab,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ActDocTable from "./DocTable/ActDocTable";
import InvoiceDocTable from "./DocTable/InvoiceDocTable";
import EmpowermentDocTable from "./DocTable/EmpowermentDocTable";
import ContractDocTable from "./DocTable/ContractDocTable";
import Filters from "./Filters";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import WaybillDocTable from "./DocTable/WaybillDocTable";
import VerificationActDoc from "./DocTable/VerificationActDoc";
import {
  Add,
  BookOnline,
  Description,
  FileCopy,
  InsertDriveFile,
  TextSnippet,
} from "@mui/icons-material";
import PlaneDocTable from "./DocTable/PlaneDocTable";

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

const DocListPage = () => {
  const params = useParams();

  const [selectedTab, setSelectedTab] = useState("0");

  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  // @ts-ignore
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    // @ts-ignore
    setAnchorEl(null);
  };

  const history = useNavigate();

  const factureHandler = () => {
    history("/main/factura/create");
  };

  const actHandler = () => {
    history("/main/act/create");
  };
  const cActHandler = () => {
    history("/main/act-empowerment/create");
  };

  const empowermentHandler = () => {
    history("/main/empowerment/create");
  };

  const contractHandler = () => {
    history("/main/contract/create");
  };
  const waybillHandler = () => {
    history("/main/waybill/create");
  };
  const planeDocHandler = () => {
    history("/main/plane-doc/create");
  };

  const options = [
    {
      id: "facture",
      title: <p>{t("invoice")}</p>,
      path: factureHandler,
      icon: FileCopy,
    },
    {
      id: "act",
      title: <p>{t("acts")}</p>,
      path: actHandler,
      icon: Description,
    },
    {
      id: "act-empowerment",
      title: <p>Акт Сверки</p>,
      path: cActHandler,
      icon: Description,
    },
    {
      id: "empowerment",
      title: <p>{t("empowermentTwo")} </p>,
      path: empowermentHandler,
      icon: InsertDriveFile,
    },
    {
      id: "contract",
      title: <p>{t("treaty")}</p>,
      path: contractHandler,
      icon: TextSnippet,
    },
    {
      id: "waybill",
      title: <p>{t("waybill")}</p>,
      path: waybillHandler,
      icon: BookOnline,
    },
    {
      id: "plane-doc",
      title: <p>{t("Произвольный док")}</p>,
      path: planeDocHandler,
      icon: FileCopy,
    },
  ];

  return (
    <div className="DocListPage">
      <Header
        title={
          params.type === "sender" ? (
            params.type === "sender" ? (
              <p>{t("outgoingDocuments")}</p>
            ) : null
          ) : params.type === "receiver" ? (
            <p>{t("incomingDocuments")}</p>
          ) : null ? (
            params.type === "agent" ? (
              <p>{t("incomingDocuments")}</p>
            ) : null
          ) : (
            <p>{t("powerDocuments")}</p>
          )
        }
      >
     
          <Button
            variant="contained"
            startIcon={<Add />}
            size="medium"
            disableElevation
            onClick={handleClick}
          >
            Создать
          </Button>
  
      </Header>

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
              <Tab label={t("Произвольный док")} value="6" />
            </TabList>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"1rem"}
            >
              <Menu
                // @ts-ignore
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                PaperProps={{
                  style: {
                    marginTop: 5,
                    marginLeft: -140,
                    maxHeight: 48 * 6,
                    width: "27ch",
                  },
                }}
              >
                {options.map((option) => (
                  // @ts-ignore
                  <MenuItem key={option} onClick={option.path}>
                    <option.icon />
                    <text style={{ marginLeft: 10 }}>{option.title}</text>
                  </MenuItem>
                ))}
              </Menu>

              <Filters />
            </Stack>
          </StyledCard>
          <TabPanel sx={{ padding: "0" }} value="0">
            <InvoiceDocTable />
          </TabPanel>
          <TabPanel sx={{ padding: "0" }} value="1">
            <ActDocTable />
          </TabPanel>
          <TabPanel sx={{ padding: "0" }} value="2">
            <EmpowermentDocTable />
          </TabPanel>
          <TabPanel sx={{ padding: "0" }} value="3">
            <ContractDocTable />
          </TabPanel>
          <TabPanel sx={{ padding: "0" }} value="4">
            <VerificationActDoc />
          </TabPanel>
          <TabPanel sx={{ padding: "0" }} value="5">
            <WaybillDocTable />
          </TabPanel>
          <TabPanel sx={{ padding: "0" }} value="6">
            <PlaneDocTable />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default DocListPage;
