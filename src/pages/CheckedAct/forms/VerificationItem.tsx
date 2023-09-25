import { TableCell, TableRow, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

// @ts-ignore
const VerificationItem = ({ item, changeHandler, items, index }) => {
  return (
    <TableRow>
      <TableCell>
        <DatePicker
          inputFormat="DD.MM.YYYY"
          mask="__.__.____"
          toolbarFormat="DD.MM.YYYY"
          value={item.ownerOperationDate}
          // @ts-ignore
          onChange={(value) => {
            changeHandler(
              index,
              "ownerOperationDate",
              moment(`${value.$d}`).format("YYYY-MM-DD")
            );
          }}
          // @ts-ignore
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          value={item.ownerOperationName}
          onChange={(e) =>
            changeHandler(index, "ownerOperationName", e.target.value)
          }
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          value={item.ownerDebit}
          onChange={(e) => changeHandler(index, "ownerDebit", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          value={item.ownerCredit}
          onChange={(e) => changeHandler(index, "ownerCredit", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <DatePicker
          inputFormat="DD.MM.YYYY"
          mask="__.__.____"
          toolbarFormat="DD.MM.YYYY"
          value={item.partnerOperationDate}
          // @ts-ignore
          onChange={(value) => {
            changeHandler(
              index,
              "partnerOperationDate",
              moment(`${value.$d}`).format("YYYY-MM-DD")
            );
          }}
          // @ts-ignore
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          value={item.partnerOperationName}
          onChange={(e) =>
            changeHandler(index, "partnerOperationName", e.target.value)
          }
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          value={item.partnerDebit}
          onChange={(e) => changeHandler(index, "partnerDebit", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          value={item.partnerCredit}
          onChange={(e) =>
            changeHandler(index, "partnerCredit", e.target.value)
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default VerificationItem;
