import { AddCircle, RemoveCircle } from "@mui/icons-material";
import {
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import VerificationItem from "./VerificationItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

const ContractItem = ({
  // @ts-ignore
  contracts,
  // @ts-ignore
  contract,
  // @ts-ignore
  index,
  // @ts-ignore
  changeHandler,
  // @ts-ignore
  removeItem,
  // @ts-ignore
  dispatch,
}) => {
  // @ts-ignore
  const itemChangeHandler = (indexEl, name, value) => {
    dispatch({ type: "changeItemValue", index, indexEl, name, value });
  };
  const newLine = {
    ownerOperationDate: "2012-01-06",
    ownerOperationName: "",
    ownerDebit: "",
    ownerCredit: "",
    partnerOperationDate: "",
    partnerOperationName: "",
    partnerDebit: "",
    partnerCredit: "",
  };
  const addNewLine = () => {
    dispatch({ type: "addItem", index, payload: newLine });
  };

  const removeHandler = () => {
    dispatch({ type: "removeItem", index });
  };

  return (
    <>
      <TableRow>
        <TableCell>
          {/* @ts-ignore */}
          <DatePicker
            inputFormat="DD.MM.YYYY"
            mask="__.__.____"
            toolbarFormat="DD.MM.YYYY"
            value={contract.contractDate}
            // @ts-ignore
            onChange={(value) => {
              changeHandler(
                index,
                "contractDate",
                moment(`${value.$d}`).format("YYYY-MM-DD")
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                onChange={(e) => console.log({ e })}
              />
            )}
          />
        </TableCell>
        <TableCell>
          <TextField
            variant="standard"
            value={contract.contractNo}
            onChange={(e) => changeHandler(index, "contractNo", e.target.value)}
          />
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
            Сальдо (начальное) по договору:
          </Typography>
        </TableCell>
        <TableCell>
          <TextField
            variant="standard"
            value={contract.openBalance.ownerDebit}
            onChange={(e) =>
              changeHandler(index, "openBalance ownerDebit", e.target.value)
            }
          />
        </TableCell>
        <TableCell>
          <TextField
            variant="standard"
            value={contract.openBalance.ownerCredit}
            onChange={(e) =>
              changeHandler(index, "openBalance ownerCredit", e.target.value)
            }
          />
        </TableCell>
        <TableCell colSpan={2}>
          <Typography variant="h6" className="card-title" color="secondary">
            Сальдо (начальное) по договору:
          </Typography>
        </TableCell>
        <TableCell>
          <TextField
            variant="standard"
            value={contract.openBalance.partnerDebit}
            onChange={(e) =>
              changeHandler(index, "openBalance partnerDebit", e.target.value)
            }
          />
        </TableCell>
        <TableCell>
          <TextField
            variant="standard"
            value={contract.openBalance.partnerCredit}
            onChange={(e) =>
              changeHandler(index, "openBalance partnerCredit", e.target.value)
            }
          />
        </TableCell>
      </TableRow>

      {/* @ts-ignore */}
      {contract.verificationActContractItems.map((item, index) => (
        <VerificationItem
          item={item}
          index={index}
          changeHandler={itemChangeHandler}
          items={contract}
        />
      ))}

      <TableRow>
        <TableCell colSpan={2}>
          <Typography
            variant="h6"
            className="card-title"
            color="secondary"
            sx={{ textAlign: "center" }}
          >
            Итого по договору:
          </Typography>
        </TableCell>
        <TableCell>
          <TextField
            variant="standard"
            value={contract.totalBalance.ownerDebit}
            onChange={(e) =>
              changeHandler(index, "totalBalance ownerDebit", e.target.value)
            }
          />
        </TableCell>
        <TableCell>
          <TextField
            variant="standard"
            value={contract.totalBalance.ownerCredit}
            onChange={(e) =>
              changeHandler(index, "totalBalance ownerCredit", e.target.value)
            }
          />
        </TableCell>
        <TableCell colSpan={2}>
          <Typography variant="h6" className="card-title" color="secondary">
            Итого по договору:
          </Typography>
        </TableCell>
        <TableCell>
          <TextField
            variant="standard"
            value={contract.totalBalance.partnerDebit}
            onChange={(e) =>
              changeHandler(index, "totalBalance partnerDebit", e.target.value)
            }
          />
        </TableCell>
        <TableCell>
          <TextField
            variant="standard"
            value={contract.totalBalance.partnerCredit}
            onChange={(e) =>
              changeHandler(index, "totalBalance partnerCredit", e.target.value)
            }
          />
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
          <TextField
            variant="standard"
            value={contract.closeBalance.ownerDebit}
            onChange={(e) =>
              changeHandler(index, "closeBalance ownerDebit", e.target.value)
            }
          />
        </TableCell>
        <TableCell>
          <TextField
            variant="standard"
            value={contract.closeBalance.ownerCredit}
            onChange={(e) =>
              changeHandler(index, "closeBalance ownerCredit", e.target.value)
            }
          />
        </TableCell>
        <TableCell colSpan={2}>
          <Typography variant="h6" className="card-title" color="secondary">
            Сальдо (конечное) по договору:
          </Typography>
        </TableCell>
        <TableCell>
          <TextField
            variant="standard"
            value={contract.closeBalance.partnerDebit}
            onChange={(e) =>
              changeHandler(index, "closeBalance partnerDebit", e.target.value)
            }
          />
        </TableCell>
        <TableCell>
          <TextField
            variant="standard"
            value={contract.closeBalance.partnerCredit}
            onChange={(e) =>
              changeHandler(index, "closeBalance partnerCredit", e.target.value)
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4}>
          <Button
            variant="outlined"
            startIcon={<AddCircle />}
            onClick={addNewLine}
            color="success"
          >
            Строка
          </Button>

          <Button
            variant="outlined"
            sx={{ marginLeft: "30px" }}
            startIcon={<RemoveCircle />}
            onClick={removeHandler}
            color="error"
          >
            Строка
          </Button>
        </TableCell>
      </TableRow>
      {contracts.length > 1 && (
        <TableRow>
          <Button
            variant="outlined"
            sx={{ marginLeft: "30px" }}
            startIcon={<RemoveCircle />}
            onClick={() => {
              removeItem(index);
            }}
            color="error"
          >
            Таблица
          </Button>
        </TableRow>
      )}
    </>
  );
};

export default ContractItem;
