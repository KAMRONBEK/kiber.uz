import {
  Button,
  Card,
  experimentalStyled,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { TuneOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { filterAction } from "../../redux/slices/filter.slice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StyledCard = experimentalStyled(Card)(({ theme }) => ({
  padding: theme.spacing(1.5, 1.5),
  marginBottom: 15,
  display: "inline-block",
  borderRadius: 12,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const Filters = () => {
  const history = useNavigate();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  //@ts-ignore
  const onContractNumber = (contractNumber) => {
    dispatch(filterAction.contractNumber(contractNumber));
  };
  //@ts-ignore
  const onDocumentNumber = (documentNumber) => {
    dispatch(filterAction.documentNumber(documentNumber));
  };
  //@ts-ignore
  const onDocumentSum = (documentSum) => {
    dispatch(filterAction.documentSum(documentSum));
  };
  //@ts-ignore
  const onFromDate = (fromDate) => {
    dispatch(filterAction.fromDate(fromDate));
  };
  //@ts-ignore
  const onToDate = (toDate) => {
    dispatch(filterAction.toDate(toDate));
  };
  //@ts-ignore
  const onDocumentFromDate = (documentFromDate) => {
    dispatch(filterAction.documentFromDate(documentFromDate));
  };
  //@ts-ignore
  const onDocumentToDate = (documentToDate) => {
    dispatch(filterAction.documentToDate(documentToDate));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="Filters">
      <Button
        startIcon={<TuneOutlined />}
        variant="outlined"
        color="primary"
        size="large"
        onClick={handleOpen}
        style={{
          width: 150,
          height: 40,
          marginBottom: 4,
          fontWeight: "bold",
          textTransform: "capitalize",
          borderRadius: "8px",
        }}
      >
        {t("filter")}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        BackdropProps={{
          style: {
            backgroundColor: "rgba(0, 0, 0, 0)",
            background: "rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Box sx={style}>
          <div
            style={{
              marginBottom: -15,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <input
              type="date"
              onChange={(fromDate) => onFromDate(fromDate.target.value)}
              style={{
                width: "50%",
                height: 35,
                marginRight: 20,
                borderRadius: 8,
                borderWidth: 0.5,
                paddingLeft: 10,
                marginBottom: 20,
              }}
            />
            <input
              type="date"
              onChange={(toDate) => onToDate(toDate.target.value)}
              style={{
                width: "50%",
                height: 35,
                borderRadius: 8,
                borderWidth: 0.5,
                paddingLeft: 10,
                marginBottom: 20,
              }}
            />
          </div>

          <Typography variant="h5">{t("document")}</Typography>

          <div
            style={{
              marginTop: 15,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <input
              type="text"
              onChange={(e) => onDocumentNumber(e.target.value)}
              //@ts-ignore
              placeholder={t("number")}
              style={{
                width: "50%",
                marginRight: 20,
                height: 35,
                borderRadius: 8,
                borderWidth: 0.5,
                paddingLeft: 10,
                marginBottom: 20,
              }}
            />

            <input
              //@ts-ignore
              placeholder={t("sum")}
              onChange={(e) => onDocumentSum(e.target.value)}
              style={{
                width: "50%",
                height: 35,
                borderRadius: 8,
                borderWidth: 0.5,
                paddingLeft: 10,
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <input
              type="date"
              onChange={(e) => onDocumentFromDate(e.target.value)}
              style={{
                width: "50%",
                height: 35,
                marginRight: 20,
                borderRadius: 8,
                borderWidth: 0.5,
                paddingLeft: 10,
                marginBottom: 20,
              }}
            />

            <input
              type="date"
              onChange={(e) => onDocumentToDate(e.target.value)}
              style={{
                width: "50%",
                height: 35,
                borderRadius: 8,
                borderWidth: 0.5,
                paddingLeft: 10,
                marginBottom: 20,
              }}
            />
          </div>

          <Typography
            variant="h5"
            style={{
              marginTop: -10,
            }}
          >
            {t("treaty")}
          </Typography>

          <div
            style={{
              marginTop: 15,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <input
              //@ts-ignore
              placeholder={t("number")}
              onChange={(e) => onContractNumber(e.target.value)}
              style={{
                width: "50%",
                marginRight: 20,
                height: 35,
                borderRadius: 8,
                borderWidth: 0.5,
                paddingLeft: 10,
                marginBottom: 20,
              }}
            />

            <input
              type="date"
              style={{
                width: "50%",
                height: 35,
                borderRadius: 8,
                borderWidth: 0.5,
                paddingLeft: 10,
                marginBottom: 20,
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => {
                handleClose();
              }}
              style={{ width: 180, marginRight: 20 }}
            >
              {t("clear")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleClose}
              style={{ width: 180 }}
            >
              {t("apply")}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Filters;
