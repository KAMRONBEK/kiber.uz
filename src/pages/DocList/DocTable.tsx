import {
  experimentalStyled,
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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NoDataComponent from "../../components/NoDataComponent";
import TableLoader from "../../components/TableLoader";
import TableTag from "../../components/TableTag";
import docService from "../../services/docService";
import {
  computeContractStatusColor,
  computeDocStatus,
  computeStatusColor,
} from "../../utils/getStatus";

const StledTableCell = experimentalStyled(TableCell)(({ theme }) => ({
  textAlign: "center",
  [`&.${tableCellClasses.stickyHeader}`]: {},
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

//@ts-ignore
const DocTable = ({ docType }) => {
  const history = useNavigate();
  const params = useParams();
  // @ts-ignore
  const userTin = useSelector((state) => state.auth.userTin);
  const [tableData, setTableData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const { t } = useTranslation();

  useEffect(() => {
    fetchDocList();
  }, [currentPage]);

  const fetchDocList = () => {
    setLoader(true);
    const data = {
      per_page: 10,
      page: currentPage,
      doc_type: docType,
      type: params.type,
      tin: userTin,
    };

    if (docType === "contract") delete data.type;

    docService
      .getDocList(data)
      //@ts-ignore
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
              <StledTableCell>{t("documentType")}</StledTableCell>
              <StledTableCell>{t("counterparty")}</StledTableCell>
              <StledTableCell>{t("numberData")}</StledTableCell>
              <StledTableCell>{t("dataCreation")}</StledTableCell>
            </TableRow>
          </TableHead>

          <TableBody style={{ position: "relative" }}>
            {tableData?.map((row, index) => (
              <StyledTableRow
                //@ts-ignore
                key={row.id}
                //@ts-ignore
                onClick={() => history(`/main/${row.doc_type}/${row.id}`)}
              >
                <TableCell align="center">
                  {(currentPage - 1) * 10 + index + 1}
                </TableCell>
                <TableCell align="center">
                  {/* @ts-ignore */}
                  <TableTag color={computeStatusColor(row.status)}>
                    {/* @ts-ignore */}
                    {row.doc_type === "contract"
                      ? computeContractStatusColor(
                          // @ts-ignore
                          row.Clients,
                          // @ts-ignore
                          row.sender,
                          userTin
                        )
                      : // @ts-ignore
                        computeDocStatus(row.status, params.type)}
                  </TableTag>
                </TableCell>
                {/* @ts-ignore */}
                <TableCell align="center">{row.doc_type}</TableCell>
                <TableCell align="center">
                  {/* @ts-ignore */}
                  {row.receiver} - {row.receiver_name}
                </TableCell>
                <TableCell align="center">
                  {/* @ts-ignore */}
                  {row.doc_number} от {row.doc_date}
                </TableCell>
                <TableCell align="center">
                  <TableTag>
                    {/* @ts-ignore */}
                    {row?.created_at
                      ? // @ts-ignore
                        moment(row?.created_at).format("HH:mm DD.MM.YYYY")
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

      <div className="pagination-container">
        <Pagination
          count={pageCount}
          color="primary"
          page={currentPage}
          onChange={(e, val) => setCurrentPage(val)}
        />
      </div>
    </Paper>
  );
};

export default DocTable;
