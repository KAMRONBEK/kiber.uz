import {
  Button,
  Card,
  Modal,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import "./style.scss";

//@ts-ignore
const ActModal = ({ type, setModalType }) => {
  return (
    <Modal
      open={!!type}
      onClose={() => setModalType(null)}
      className="modal-wrapper"
    >
      <Card className="modal-card">
        <Typography variant="h5">
          {type === "REJECT"
            ? "Bu hujjatni rad etishni tasdiqlaysizmi?"
            : "Bu hujjatni qabul qilishni tasdiqlaysizmi?"}
        </Typography>
        {type === "REJECT" && (
          <TextField
            style={{ marginTop: "20px" }}
            fullWidth
            label="Sababini kiriting"
          />
        )}

        <div className="modal-btns-group" style={{ marginTop: "30px" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => setModalType("REJECT")}
            style={{ marginRight: "20px" }}
          >
            Bekor qilish
          </Button>
          <Button variant="contained" onClick={() => setModalType("REJECT")}>
            Tasdiqlash
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default ActModal;
