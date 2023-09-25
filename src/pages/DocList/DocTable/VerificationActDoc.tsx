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
  [`&.${tableCellClasses.stickyHeader}`]: {
    // backgroundColor: theme.palette.primary.main,
    // color: "#fff",
    // border: '1px solid #fff'
  },
}));

const StyledTableRow = experimentalStyled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
  // hide last border
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

const VerificationActDoc = () => {
  const history = useNavigate();
  const params = useParams();
  // @ts-ignore
  const [tableData, setTableData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  // @ts-ignore
  const userData = useSelector((state) => state.auth.userData);
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
      .getVerificationActDocList(data)
      .then((res) => {
        setTableData(res.data);
        // @ts-ignore
        setPageCount(Math.ceil(res.count / 10));
      })
      .finally(() => setLoader(false));
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
                  history(`/main/verification-act/${row.verificationActId}`)
                }
              >
                <TableCell align="center">
                  {(currentPage - 1) * 10 + index + 1}
                </TableCell>
                <TableCell align="center">
                  {/* @ts-ignore */}
                  <TableTag color={computeStatusColor(row.status)}>
                    {/* @ts-ignore */}
                    {row.status === "act"
                      ? computeContractStatusColor(
                          // @ts-ignore
                          row.clients,
                          // @ts-ignore
                          row.sender,
                          userData.person.tin
                        ) // @ts-ignore
                      : computeDocStatus(row.status, params.type)}
                  </TableTag>
                </TableCell>
                <TableCell align="center">
                  {/* @ts-ignore */}
                  {row.ownerTin} - {row.partnerTin}
                </TableCell>
                <TableCell align="center">
                  {/* @ts-ignore */}
                  {row.verificationActDoc.verificationActNo} от
                  {/* @ts-ignore */}
                  {row.verificationActDoc.verificationActDate}
                </TableCell>
                <TableCell align="center">
                  <TableTag>
                    {/* @ts-ignore */}
                    {row?.createdAt
                      ? //@ts-ignore
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

export default VerificationActDoc;
