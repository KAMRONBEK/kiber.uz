import {
  Add,
  BookOnline,
  Description,
  FileCopy,
  InsertDriveFile,
  TextSnippet,
} from "@mui/icons-material";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import {
  experimentalStyled,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NoDataComponent from "../../../components/NoDataComponent";
import TableLoader from "../../../components/TableLoader";
import TableTag from "../../../components/TableTag";
import docService from "../../../services/docService";
import {
  computeContractStatusColor,
  computeDocStatus,
  computeStatusColor,
} from "../../../utils/getStatus";

const StledTableCell = experimentalStyled(TableCell)(({ theme }) => ({
  textAlign: "center",
  [`&.${tableCellClasses.stickyHeader}`]: {},
}));

const StyledTableRow = experimentalStyled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {},
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableContainer = experimentalStyled(TableContainer)(
  ({ theme }) => ({
    height: "calc(100vh - 280px)",
    position: "relative",
  })
);

const ITEM_HEIGHT = 48;

const ContractDocTable = () => {
  const history = useNavigate();
  const params = useParams();
  const [tableData, setTableData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  // @ts-ignore
  const userData = useSelector((state) => state.auth.userData);
  //filters

  // @ts-ignore
  const originalFilters = useSelector((state) => state.filter);

  const filters = JSON.parse(JSON.stringify(originalFilters));

  const { t } = useTranslation();

  useEffect(() => {
    Object.keys(filters).map((key) => {
      let newKey = `${key.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`
      )}`;

      filters[newKey] = filters[key];
      delete filters[key];
    });

    fetchDocList(filters);
  }, [currentPage, originalFilters]);
  // @ts-ignore
  const fetchDocList = (filters) => {
    setLoader(true);
    const data = {
      type: params.type,
      tin: userData.person.tin,
      ...filters,
    };

    docService
      .getContractDocList(data)
      .then((res) => {
        setTableData(res.data);
        // @ts-ignore
        setPageCount(Math.ceil(res.count / 10));
      })
      .finally(() => setLoader(false));
  };

  const [anchorEl, setAnchorEl] = React.useState(false);
  const open = Boolean(anchorEl);
  // @ts-ignore
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    // @ts-ignore
    setAnchorEl(null);
  };

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

  return (
    <Paper className="DocTable" elevation={12} style={{ padding: "20px" }}>
      <StyledTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StledTableCell>{t("no")}</StledTableCell>
              <StledTableCell>{t("status")}</StledTableCell>
              <StledTableCell>{t("counterparty")}</StledTableCell>
              <StledTableCell>{t("numberData")}</StledTableCell>
              <StledTableCell>{t("dataCreation")}</StledTableCell>
            </TableRow>
          </TableHead>

          <TableBody style={{ position: "relative" }}>
            {tableData?.map((row, index) => (
              <StyledTableRow
                // @ts-ignore
                key={row.id}
                onClick={() =>
                  // @ts-ignore
                  history(`/main/contract/${row.contractId}`)
                }
              >
                <TableCell align="center">
                  {(currentPage - 1) * 10 + index + 1}
                </TableCell>
                <TableCell align="center">
                  {/* @ts-ignore */}
                  <TableTag color={computeStatusColor(row.status)}>
                    {/* @ts-ignore */}
                    {row.status === "contract"
                      ? computeContractStatusColor(
                          // @ts-ignore
                          row.Clients,
                          // @ts-ignore
                          row.sender,
                          userData.person.tin
                        )
                      : // @ts-ignore
                        computeDocStatus(row.status, params.type)}
                    {/* {row.status} */}
                  </TableTag>
                </TableCell>
                <TableCell align="center">
                  {/* @ts-ignore */}
                  {row.owner.tin} - {row.owner.name}
                </TableCell>
                <TableCell align="center">
                  {/* @ts-ignore */}
                  {row.contractDoc.contractNo} от {/* @ts-ignore */}
                  {row.contractDoc.contractDate}
                </TableCell>
                <TableCell align="center">
                  <TableTag>
                    {/* @ts-ignore */}
                    {row?.createdAt
                      ? // @ts-ignore
                        moment(row?.createdAt).format("HH:mm DD.MM.YYYY")
                      : "---"}
                  </TableTag>
                </TableCell>
              </StyledTableRow>
            ))}

            <NoDataComponent isVisible={!tableData?.length} />
          </TableBody>
        </Table>

        <TableLoader isVisible={loader} />
      </StyledTableContainer>

      {userData.person.tin.substring(0, 1) === "5" ? null : (
        <div className="pagination-container">
          <Pagination
            count={pageCount}
            color="primary"
            page={currentPage}
            onChange={(e, val) => setCurrentPage(val)}
          />
        </div>
      )}
    </Paper>
  );
};

export default ContractDocTable;
