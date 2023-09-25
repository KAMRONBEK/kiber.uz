import {
  Box,
  Button,
  experimentalStyled,
  Modal,
  TableContainer,
  Typography,
} from "@mui/material";
import "./style.scss";
import UserIcon from "@mui/icons-material/Person";
import React, { memo, useState } from "react";
import FTextField from "../../components/FormElements/FTextField2";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const StyledTableContainer = experimentalStyled(TableContainer)(
  ({ theme }) => ({
    height: "calc(100vh - 180px)",
    backgroundColor: "#fff",
  })
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  p: 3,
  paddingLeft: 3,
  borderRadius: 2,
};

const EditProfile = ({
  // @ts-ignore
  formik,
  // @ts-ignore
  handleSubmit,
  // @ts-ignore
  imageHandleSubmit,
  // @ts-ignore
  handleSubmitPassword,
}) => {
  // @ts-ignore
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  const { t } = useTranslation();

  const [edit, setEdit] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [openPassword, setOpenPassword] = React.useState(false);

  const [selectedImage, setSelectedImage] = useState(formik.values.photo);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenPassword = () => setOpenPassword(true);
  const handleClosePassword = () => setOpenPassword(false);
  console.log({ formik });

  return (
    <div className="PersonalArea">
      <StyledTableContainer>
        <div className="edit-container">
          <div style={{ display: "flex", alignItems: "center" }}>
            {selectedImage ? (
              <div>
                <img alt="upload" className="round-box" src={selectedImage} />
              </div>
            ) : (
              <div className="round-box">
                <UserIcon fontSize="large" />
              </div>
            )}

            <div className="name-box">
              <p className="name">
                {userData.person.director === null
                  ? userData.person.name
                  : userData.person.director}
              </p>
              <p className="user-position">{t("userPosition")}</p>
              <div className="button-container">
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={handleOpen}
                >
                  {t("editFoto")}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  style={{ marginLeft: 15 }}
                  onClick={handleOpenPassword}
                >
                  {t("changePassword")}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ marginLeft: 15 }}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  {t("seve")}
                </Button>
              </div>
            </div>
          </div>
          <div className="input-box">
            <div>
              <Typography variant="h6" className="card-title">
                {t("tin")}
              </Typography>
              {/* @ts-ignore */}
              <FTextField
                // InputProps={{
                //   readOnly: edit,
                // }}
                label={t("tin")}
                name="tin"
                formik={formik}
                style={{ width: 300 }}
              />
              <Typography variant="h6" className="card-title">
                {t("position")}
              </Typography>
              {/* @ts-ignore */}
              <FTextField
                // InputProps={{
                //   readOnly: edit,
                // }}
                label={t("position")}
                name="position"
                formik={formik}
                style={{ width: 300 }}
              />
              <Typography variant="h6" className="card-title">
                {t("bankAccount")}
              </Typography>
              {/* @ts-ignore */}
              <FTextField
                // InputProps={{
                //   readOnly: edit,
                // }}
                label={t("bankAccount")}
                name="account"
                formik={formik}
                style={{ width: 300 }}
              />
              <Typography variant="h6" className="card-title">
                {t("mfi")}
              </Typography>
              {/* @ts-ignore */}
              <FTextField
                // InputProps={{
                //   readOnly: edit,
                // }}
                label={t("mfi")}
                name="mfo"
                formik={formik}
                style={{ width: 300 }}
              />
            </div>
            <div style={{ marginLeft: 100 }}>
              {!!formik.values.phone && (
                <Typography variant="h6" className="card-title">
                  {t("phoneNumber")}
                </Typography>
              )}
              {/* @ts-ignore */}
              <FTextField
                // InputProps={{
                //   readOnly: edit,
                // }}
                label={t("phoneNumber")}
                name="phone"
                formik={formik}
                style={{ width: 300 }}
                // value={formik.name}
              />
              <Typography variant="h6" className="card-title">
                {t("mail")}
              </Typography>
              {/* @ts-ignore */}
              <FTextField
                // InputProps={{
                //   readOnly: edit,
                // }}
                label={t("mail")}
                name="email"
                formik={formik}
                style={{ width: 300 }}
              />
              <Typography variant="h6" className="card-title">
                {t("firstLastName")}
              </Typography>
              {/* @ts-ignore */}
              <FTextField
                label={t("firstLastName")}
                name="fullName"
                formik={formik}
                // InputProps={{
                //   readOnly: edit,
                // }}
                style={{ width: 300 }}
              />
            </div>
          </div>
        </div>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography
              style={{ marginLeft: 8, marginBottom: 15 }}
              variant="h6"
            >
              {t("editingProfilePhoto")}
            </Typography>
            {selectedImage && (
              <div>
                <img
                  alt="img"
                  style={{ width: 240, height: 240, marginLeft: 15 }}
                  // src={URL.createObjectURL(selectedImage)}
                  src={selectedImage}
                />
              </div>
            )}
            <label
              style={{
                padding: 12,
                marginTop: 12,
                marginBottom: 12,
                borderRadius: 10,
                textAlign: "center",
                cursor: "pointer",
                color: "black",
                display: "inline-block",
                backgroundColor: "lightblue",
              }}
            >
              <input
                type="file"
                accept="image/*"
                name="avatar"
                style={{ display: "none" }}
                onChange={(event) => {
                  const fileReader = new FileReader();
                  fileReader.onload = () => {
                    if (fileReader.readyState === 2) {
                      // @ts-ignore
                      formik.setValues("photo", event.target.files[0]);
                      // @ts-ignore
                      setSelectedImage(fileReader.result);
                    }
                  };
                  // @ts-ignore
                  fileReader.readAsDataURL(event.target.files[0]);
                }}
              />
              <i className="fa fa-cloud-upload" /> {t("chooseAnother")}
            </label>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                imageHandleSubmit();
                handleClose();
              }}
            >
              {t("save")}
            </Button>
          </Box>
        </Modal>
        <Modal open={openPassword} onClose={handleClosePassword}>
          <Box sx={style}>
            <Typography
              style={{ marginLeft: 8, marginBottom: 15 }}
              variant="h6"
            >
              {t("parol")}
            </Typography>
            {/* @ts-ignore */}
            <FTextField
              label={t("parol")}
              name="password"
              formik={formik}
              // InputProps={{
              //   readOnly: edit,
              // }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                handleSubmitPassword();
                handleClosePassword();
              }}
            >
              {t("seve")}
            </Button>
          </Box>
        </Modal>
      </StyledTableContainer>
    </div>
  );
};

export default EditProfile;
