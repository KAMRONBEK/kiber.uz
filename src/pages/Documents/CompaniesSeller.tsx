import { Pagination } from "@mui/lab";
import {
  experimentalStyled,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  tableCellClasses,
  TableCell,
  TableBody,
  TextField,
  Button,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoDataComponent from "../../components/NoDataComponent";
import { productsAction } from "../../redux/slices/products.slice";
import lgotaService from "../../services/lgotaService";
const StyledTableContainer = experimentalStyled(TableContainer)(
  ({ theme }) => ({
    height: "calc(100vh - 212px)",
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

const CompaniesSeller = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [lgotaName, setLgotaName] = useState("");
  const [tin, setTin] = useState("");
  const [count, setCount] = useState(0);
  const companiesSellerPriviliged = useSelector(
    // @ts-ignore
    (state) => state.products.companiesSellerPriviliged
  );
  const dispatch = useDispatch();
  console.log(companiesSellerPriviliged);
  // @ts-ignore
  const { title } = useSelector((state) => state.settings.lang);
  useEffect(() => {
    // @ts-ignore
    fetchData(title, pageNumber);
  }, [pageNumber, title]);

  // @ts-ignore
  const fetchData = async (title, pageNumber) => {
    const res = await lgotaService.fetchCompaniesSeller(title, pageNumber);
    console.log(res);

    // @ts-ignore
    setCount(Math.ceil(res.count / 10));

    dispatch(productsAction.addCompaniesSeller(res.data));
  };

  console.log(companiesSellerPriviliged[0]);

  // @ts-ignore
  const submitHandler = (e) => {
    e.preventDefault();

    lgotaService
      .fetchCompaniesSeller(title, pageNumber, tin, lgotaName)
      .then((res) => dispatch(productsAction.addCompaniesSeller(res.data)));
  };

  return (
    <Paper className="DocTable" elevation={12} style={{ padding: "20px" }}>
      <form onSubmit={submitHandler}>
        <Stack
          direction={"row"}
          alignItems="center"
          justifyContent="center"
          margin="15px 0"
          gap={"50px"}
        >
          <TextField
            label={t("lgotaName")}
            id="standard-size-normal"
            // @ts-ignore
            placeholder={t("lgotaName")}
            variant="standard"
            value={lgotaName}
            // @ts-ignore
            onChange={(e) => setLgotaName(e.target.value)}
          />
          <TextField
            label={t("tin")}
            id="standard-size-normal"
            // @ts-ignore
            placeholder={t("tin")}
            variant="standard"
            value={tin}
            // @ts-ignore
            onChange={(e) => setTin(e.target.value)}
          />
          {/* @ts-ignore */}
          <Button
            type="submit"
            endIcon={<Search />}
            variant="outlined"
            sx={{ height: "calc(100% - 10px)" }}
          >
            Search
          </Button>
        </Stack>
      </form>
      <StyledTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StledTableCell
                sx={{ borderRadius: "8px 0 0 8px", maxWidth: "50px" }}
              >
                {t("productId")}
              </StledTableCell>
              <StledTableCell>{t("tinCompany")}</StledTableCell>
              <StledTableCell sx={{ maxWidth: "150px" }}>
                {t("nameOfCompany")}
              </StledTableCell>
              <StledTableCell sx={{ maxWidth: "100px" }}>
                {t("lgotaId")}
              </StledTableCell>
              <StledTableCell sx={{ maxWidth: "100px" }}>
                {t("newLgotaId")}
              </StledTableCell>
              <StledTableCell sx={{ borderRadius: "0 8px 8px 0" }}>
                {t("lgotaName")}
              </StledTableCell>
              <StledTableCell sx={{ borderRadius: "0 8px 8px 0" }}>
                {t("dateStart")}
              </StledTableCell>
              <StledTableCell sx={{ borderRadius: "0 8px 8px 0" }}>
                {t("dateEnd")}
              </StledTableCell>
            </TableRow>
          </TableHead>
          {/* @ts-ignore */}
          <TableBody sx={{ position: "relative" }}>
            {/* @ts-ignore */}
            {companiesSellerPriviliged?.map((row, index) => (
              <StyledTableRow key={row.tin}>
                <TableCell align="center" sx={{ maxWidth: "50px" }}>
                  {index + 1}
                </TableCell>
                <TableCell align="center">{row.tin}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center" sx={{ maxWidth: "50px" }}>
                  {row.lgotaId}
                </TableCell>
                <TableCell align="center" sx={{ maxWidth: "50px" }}>
                  {row.newLgotaId}
                </TableCell>
                <TableCell align="center">{row.lgotaName}</TableCell>
                <TableCell align="center">
                  {row.dateBegin.slice(0, 10)}
                </TableCell>
                <TableCell align="center">{row.dateEnd.slice(0, 10)}</TableCell>
              </StyledTableRow>
            ))}
            <NoDataComponent isVisible={!companiesSellerPriviliged?.length} />
          </TableBody>
        </Table>
      </StyledTableContainer>
      <Stack alignItems={"center"}>
        <Pagination
          count={count}
          color="primary"
          page={pageNumber}
          onChange={(e, val) => {
            console.log({ val });
            console.log({ e });

            setPageNumber(val);
          }}
        />
      </Stack>
    </Paper>
  );
};

export default CompaniesSeller;
