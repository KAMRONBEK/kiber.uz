import {
  Add,
  Description,
  FileCopy,
  InsertDriveFile,
  RemoveCircle,
  TextSnippet,
  BookOnline,
} from "@mui/icons-material";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import {
  Backdrop,
  Box,
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
// @ts-ignore
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
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

const StledTableCell = experimentalStyled(TableCell)(({ theme }) => ({
  textAlign: "center",
  [`&.${tableCellClasses.stickyHeader}`]: {},

  backgroundImage: `${
    // @ts-ignore
    theme === "light" && "linear-gradient(to bottom, #F4F6F8 0%, #F4F6F8 100%);"
  }`,
  // @ts-ignore
  background: `${theme === "dark" && "#212b36"}`,
  lineHeight: "1.5rem",
  fontSize: "0.875rem",
  fontWeight: "600",
  borderBottom: "none",
  position: "sticky",
  top: "0",
  zIndex: "2",
  color: "#637381",
}));

const ITEM_HEIGHT = 48;

const InvoiceDocTable = () => {
  // @ts-ignore
  const theme = useSelector((state) => state.settings.theme);
  const { t } = useTranslation();
  const facturaTypes = [
    {
      label: t("standard"),
      value: 0,
    },
    {
      label: t("additional"),
      value: 1,
    },
    {
      label: t("compensationExp"),
      value: 2,
    },
    {
      label: t("noPayment"),
      value: 3,
    },

    {
      label: t("corrected"),
      value: 4,
    },
    {
      label: t("correctedExp"),
      value: 5,
    },
    {
      label: t("additionalExp"),
      value: 6,
    },
  ];

  const history = useNavigate();
  const params = useParams();
  const [tableData, setTableData] = useState<any>([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [newFilter, setNewFilter] = useState<any>();
  // @ts-ignore
  const userData = useSelector((state) => state.auth.userData);
  //filters

  // @ts-ignore
  const originalFilters = useSelector((state) => state.filter);

  const filters = JSON.parse(JSON.stringify(originalFilters));
  // console.log("filters", JSON.stringify(filters, null, 2));

  useEffect(() => {
    Object.keys(filters).map((key) => {
      let newKey = `${key.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`
      )}`;

      filters[newKey] = filters[key];
      delete filters[key];
    });
  }, [currentPage, originalFilters]);

  const fetchDocList = async (filters: any) => {
    const data = {
      type: params.type,
      tin: userData.person.tin,
      ...filters,
    };

    await docService
      .getInvoiceDocList(data)
      // @ts-ignore
      .then((res) => {
        setTableData(res.data);
        // @ts-ignore
        setPageCount(Math.ceil(res.count / 10));
      })
      .finally();
  };

  useEffect(() => {
    fetchDocList(filters);
  }, []);

  const tinId = params.type === "sender" ? true : false;

  return (
    <Paper className="DocTable" elevation={12} style={{ padding: "20px" }}>
      <StyledTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StledTableCell sx={{ borderRadius: "8px 0 0 8px" }}>
                {t("no")}
              </StledTableCell>
              <StledTableCell>{t("status")}</StledTableCell>
              <StledTableCell>{t("Отправитель")}</StledTableCell>
              <StledTableCell>{t("Получатель")}</StledTableCell>
              <StledTableCell>{t("Тип СФ")}</StledTableCell>
              <StledTableCell>{t("numberData")}</StledTableCell>
              <StledTableCell sx={{ borderRadius: "0 8px 8px 0" }}>
                {t("dataCreation")}
              </StledTableCell>
            </TableRow>
          </TableHead>

          <TableBody style={{ position: "relative" }}>
            {tableData?.map((row: any, index: number) => (
              <StyledTableRow
                // @ts-ignore
                key={row.id}
                onClick={() => {
                  // @ts-ignore
                  if (row.status !== 0) {
                    // @ts-ignore
                    history(`/main/invoice/${row.facturaId}`, {
                      state: tinId ? row?.sellerTin : row?.buyerTin,
                    });
                  } else {
                    // @ts-ignore
                    history(`/main/factura/create`, {
                      // @ts-ignore
                      state: row,
                      // @ts-ignore
                    });
                  }
                }}
              >
                <TableCell align="center">
                  {(currentPage - 1) * 10 + index + 1}
                </TableCell>
                <TableCell align="center">
                  {/* @ts-ignore */}
                  <TableTag color={computeStatusColor(row.status)}>
                    {
                      // @ts-ignore
                      row.status === "invoice"
                        ? computeContractStatusColor(
                            // @ts-ignore
                            row.Clients,
                            // @ts-ignore
                            row.sender,
                            userData.person.tin
                          ) // @ts-ignore
                        : computeDocStatus(row.status, params.type)
                    }
                    {/* {row.currentStateId} */}
                  </TableTag>
                </TableCell>

                <TableCell align="center">
                  {/* @ts-ignore */}
                  {row.sellerTin} - {row.seller.name}
                </TableCell>
                <TableCell align="center">
                  {/* @ts-ignore */}
                  {row.buyerTin} - {row.buyer.name}
                </TableCell>
                <TableCell align="center">
                  {
                    facturaTypes.find(
                      // @ts-ignore
                      (item) => item.value === Number(row.facturaType)
                    )?.label
                  }
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
        <Box className="pagination-container">
          <Pagination
            count={pageCount}
            color="primary"
            page={currentPage}
            onChange={(e, val) => setCurrentPage(val)}
          />
        </Box>
      )}
    </Paper>
  );
};

export default InvoiceDocTable;
