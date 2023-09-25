import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@mui/material";
import ContractItem from "./ContractItem";
import { AddCircle } from "@mui/icons-material";
import FTextField from "../../../components/FormElements/FTextField2";
// @ts-ignore
const ContractList = ({ contracts, formik, partner, owner, dispatch }) => {
  console.log({ contracts });

  // const addTable = () => {
  const newTable = {
    contractNo: 1,
    contractDate: "",
    verificationActContractItems: [
      {
        ownerOperationDate: "2012-01-06",
        ownerOperationName: "",
        ownerDebit: "",
        ownerCredit: "",
        partnerOperationDate: "",
        partnerOperationName: "",
        partnerDebit: "",
        partnerCredit: "",
      },
    ],
    openBalance: {
      ownerDebit: "0",
      ownerCredit: "0",
      partnerDebit: "0",
      partnerCredit: "0",
    },
    closeBalance: {
      ownerDebit: "0",
      ownerCredit: "0",
      partnerDebit: "0",
      partnerCredit: "0",
    },
    totalBalance: {
      ownerDebit: "0",
      ownerCredit: "0",
      partnerDebit: "0",
      partnerCredit: "0",
    },
  };

  // @ts-ignore

  const changeHandler = (index, name, value) => {
    dispatch({ type: "changeValue", index, name, value });
  };

  // @ts-ignore
  const removeTable = (index) => {
    dispatch({ type: "removeTable", payload: index });
  };
  const addTable = () => {
    dispatch({ type: "addTable", payload: newTable });
  };

  return (
    <div className="ProductList">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <TableCell sx={{ background: "white" }}>
                По данным {owner} MCHJ, сум
              </TableCell>

              <TableCell sx={{ background: "white" }}>
                По данным {partner}, сум
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell>Документ</TableCell>
              <TableCell>Дебет</TableCell>
              <TableCell>Кредит</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Документ</TableCell>
              <TableCell>Дебит</TableCell>
              <TableCell>Кредит</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* @ts-ignore */}
            {contracts.map((contract, index) => (
              <ContractItem
                index={index}
                contract={contract}
                contracts={contracts}
                changeHandler={changeHandler}
                removeItem={removeTable}
                dispatch={dispatch}
              />
            ))}
          </TableBody>
        </Table>
        <TableRow>
          <TableCell>
            <Button
              variant="outlined"
              startIcon={<AddCircle />}
              onClick={addTable}
            >
              Добавить новую таблица
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>
            <Typography
              variant="h6"
              className="card-title"
              color="secondary"
              sx={{ textAlign: "center" }}
            >
              Обороты за период:
            </Typography>
          </TableCell>
          <TableCell>
            {/* @ts-ignore */}
            <FTextField formik={formik} name="turnoverBalance.ownerDebit" />
          </TableCell>
          <TableCell>
            {/* @ts-ignore */}
            <FTextField formik={formik} name="turnoverBalance.ownerCredit" />
          </TableCell>
          <TableCell colSpan={2}>
            <Typography variant="h6" className="card-title" color="secondary">
              Обороты за период:
            </Typography>
          </TableCell>
          <TableCell>
            {/* @ts-ignore */}
            <FTextField formik={formik} name="turnoverBalance.partnerDebit" />
          </TableCell>
          <TableCell>
            {/* @ts-ignore */}
            <FTextField formik={formik} name="turnoverBalance.partnerCredit" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>
            <Typography
              variant="h6"
              className="card-title"
              color="secondary"
              sx={{ textAlign: "center" }}
            >
              Сальдо (конечное) по договору:
            </Typography>
          </TableCell>
          <TableCell>
            {/* @ts-ignore */}
            <FTextField formik={formik} name="closeBalance.ownerDebit" />
          </TableCell>
          <TableCell>
            {/* @ts-ignore */}
            <FTextField formik={formik} name="closeBalance.ownerCredit" />
          </TableCell>
          <TableCell colSpan={2}>
            <Typography variant="h6" className="card-title" color="secondary">
              Сальдо (конечное) по договору:
            </Typography>
          </TableCell>
          <TableCell>
            {/* @ts-ignore */}
            <FTextField formik={formik} name="closeBalance.partnerDebit" />
          </TableCell>
          <TableCell>
            {/* @ts-ignore */}

            <FTextField formik={formik} name="closeBalance.partnerCredit" />
          </TableCell>
        </TableRow>
      </TableContainer>
    </div>
  );
};

export default ContractList;
