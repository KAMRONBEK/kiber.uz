import React, { useEffect, useState } from "react";
import {
  Card,
  experimentalStyled,
  IconButton,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { t } from "i18next";
import draftService from "../../../services/draftService";
import { useTranslation } from "react-i18next";
import TableTag from "../../../components/TableTag";
import NoDataComponent from "../../../components/NoDataComponent";
import TableLoader from "../../../components/TableLoader";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableContainer = experimentalStyled(TableContainer)(
  ({ theme }) => ({
    height: "calc(100vh - 150px)",
    position: "relative",
  })
);

const EmpowermentTable = () => {
  const userTin = useSelector(
    (state: { auth: { userTin: string } }) => state.auth.userTin
  );
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [loader, setLoader] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    fetchDocList();
  }, []);

  const fetchDocList = () => {
    setLoader(true);

    draftService
      .getDraftsList("empowerment", userTin)
      .then((res) => {
        // @ts-ignore
        setTableData(res.data);
      })
      .finally(() => setLoader(false));
  };
  // @ts-ignore
  const deleteDraft = (e, id) => {
    e.stopPropagation();
    setLoader(true);

    draftService
      .deleteDraft(id, "empowerment")
      .then((res) => {
        // @ts-ignore
        setTableData((prev) => prev.filter((el) => el.id !== id));
      })
      .finally(() => setLoader(false));
  };
  console.log({ tableData });
  return (
    <Paper elevation={12} style={{ padding: "20px" }}>
      <StyledTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StledTableCell>No</StledTableCell>
              <StledTableCell>{t("document")}</StledTableCell>
              <StledTableCell>{t("dataCreation")}</StledTableCell>
              <StledTableCell></StledTableCell>
            </TableRow>
          </TableHead>

          <TableBody style={{ position: "relative" }}>
            {tableData?.map((row, index) => (
              <StyledTableRow
                // @ts-ignore
                key={row.id}
                onClick={() =>
                  // @ts-ignore
                  navigate(`/main/empowerment/${row.empowermentId}`)
                }
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  {/* @ts-ignore */}
                  {t(row.empowermentDoc.empowermentNo)}
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
                <TableCell align="center">
                  <IconButton
                    color="error"
                    // @ts-ignore
                    onClick={(e) => deleteDraft(e, row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}

            <NoDataComponent isVisible={!tableData?.length} />
          </TableBody>
        </Table>

        <TableLoader isVisible={loader} />
      </StyledTableContainer>
    </Paper>
  );
};

export default EmpowermentTable;
