import computeActJSON from "../../utils/computeActJSON";
import reqGenerator from "../../utils/reqGenerator";
import { showAlert } from "./alert.thunk";
import history from "../../history";
import { loaderAction } from "../slices/loader.slice";
import computeEmpowermentJSON from "../../utils/computeEmpowermentJSON";
import computeFacturaJSON from "../../utils/computeFacturaJSON";
import putSignature from "../../utils/putSignature";
import putAttachedSignature from "../../utils/putAttachedSignature";
import draftService from "../../services/draftService";
import moment from "moment";
import computeContractJSON from "../../utils/computeContractJSON";
import computeWaybill from "../../utils/computeWaybill";
import computeVerificationActJSON from "../../utils/computeVerificationAct";
import computePlaneDocJson from "../../utils/computePlaneDocJson";

const { loaderOFF, loaderON } = loaderAction;

export const createWaybillDoc =
  //@ts-ignore
  (values, productList, tin) => async (dispatch, getState) => {
    const guid = await reqGenerator.get("/utils/guid");
    const catalogList = getState().measures.catalogList;
    const key = getState().auth.key;

    let data = null;

    try {
      data = JSON.stringify(
        computeWaybill(values, productList, guid, tin, catalogList)
      );
    } catch (error) {
      console.log({ error });
      return dispatch(showAlert("Malumotlar noto'g'ri kiritilgan"));
    }
    //@ts-ignore
    putSignature(data).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/waybill/send/${key.TIN}`, {
          sign: pkcs7,
        })
        .then((res) => {
          history.push("/main/docs/sender");
          dispatch(showAlert("Hujjat muvoffaqiyatli yaratildi", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")))
        .catch((error) => {
          console.log({ error });
        });
    });
  };

export const createActDoc =
  //@ts-ignore
  (values, productList) => async (dispatch, getState) => {
    const catalogList = getState().measures.catalogList;

    const guid = await reqGenerator.get("/utils/guid");
    const key = getState().auth.key;

    let data = null;

    try {
      data = JSON.stringify(
        computeActJSON(values, productList, guid, catalogList)
      );
    } catch (error) {
      console.log({ error });
      return dispatch(showAlert("Malumotlar noto'g'ri kiritilgan"));
    }
    //@ts-ignore
    putSignature(data).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/act/send/${key.TIN}`, {
          sign: pkcs7,
        })
        .then((res) => {
          history.push("/main/docs/sender");
          dispatch(showAlert("Hujjat muvoffaqiyatli yaratildi", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")))
        .catch((error) => {
          dispatch(showAlert(error.data.error.message, "error"));
        });
    });
  };
export const createPlaneDoc =
  //@ts-ignore
  (values) => async (dispatch, getState) => {
    const guid = await reqGenerator.get("/utils/guid");
    const key = getState().auth.key;
    // @ts-ignore
    let data = null;

    try {
      data = JSON.stringify(computePlaneDocJson(values, guid));
    } catch (error) {
      console.log({ error });
      return dispatch(showAlert("Malumotlar noto'g'ri kiritilgan"));
    }
    //@ts-ignore
    putSignature(data).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        // @ts-ignore
        .post(`/document/send/${key.TIN}`, data)
        .then((res) => {
          history.push("/main/docs/sender");
          dispatch(showAlert("Hujjat muvoffaqiyatli yaratildi", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")))
        .catch((error) => {
          dispatch(showAlert(error.data.error.message, "error"));
        });
    });
  };
export const saveActDoc =
  //@ts-ignore
  (values, productList, isEdit) => async (dispatch, getState) => {
    const catalogList = getState().measures.catalogList;

    const guid = await reqGenerator.get("/utils/guid");

    let data = null;

    try {
      data = computeActJSON(values, productList, guid, catalogList);
    } catch (error) {
      console.log({ error });
      return dispatch(showAlert("Malumotlar noto'g'ri kiritilgan"));
    }
    if (isEdit) {
      draftService.updateDraftData(data, "act");
    } else {
      //@ts-ignore
      draftService.createDocDraft(data, "act");
    }
    dispatch(showAlert("Вы сохранили этот документ", "success"));
  };

export const createVerificationActDoc =
  //@ts-ignore
  (values, productList) => async (dispatch, getState) => {
    const guid = await reqGenerator.get("/utils/guid");
    const key = getState().auth.key;

    let data = null;

    try {
      data = JSON.stringify(
        computeVerificationActJSON(values, productList, guid)
      );
    } catch (error) {
      return dispatch(showAlert("Malumotlar noto'g'ri kiritilgan"));
    }
    //@ts-ignore
    putSignature(data).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/verification-act/send/${key.TIN}`, {
          sign: pkcs7,
        })
        .then((res) => {
          history.push("/main/docs/sender");
          dispatch(showAlert("Hujjat muvoffaqiyatli yaratildi", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")))
        .catch((error) => {
          dispatch(showAlert(error.data.error.message, "error"));
        });
    });
  };
export const saveVerificationActDoc =
  //@ts-ignore
  (values, productList) => async (dispatch, getState) => {
    const guid = await reqGenerator.get("/utils/guid");

    let data = null;

    try {
      data = JSON.stringify(
        computeVerificationActJSON(values, productList, guid)
      );
    } catch (error) {
      return dispatch(showAlert("Malumotlar noto'g'ri kiritilgan"));
    }
    //@ts-ignore
    draftService
      .createDocDraft(data, "verification-act")
      .then((res) =>
        dispatch(showAlert("Вы сохранили этот документ", "success"))
      );
  };

export const createEmpowermentDoc =
  //@ts-ignore
  (values, productList) => async (dispatch, getState) => {
    const guid = await reqGenerator.get("/utils/guid");
    const key = getState().auth.key;
    const catalogList = getState().measures.catalogList;

    let data = null;

    try {
      data = JSON.stringify(
        computeEmpowermentJSON(values, productList, guid, catalogList)
      );
      console.log(JSON.parse(data));
    } catch (error) {
      return dispatch(showAlert("Malumotlar noto'g'ri kiritilgan"));
    }

    //@ts-ignore
    putSignature(data).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/empowerment/send/${key.TIN}`, {
          sign: pkcs7,
        })
        .then((res) => {
          history.push("/main/docs/sender");
          dispatch(showAlert("Hujjat muvoffaqiyatli yaratildi", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")))
        .catch((error) => {
          // handle error
          dispatch(showAlert(error.data.error.message, "error"));
        });
    });
  };

export const createFacturaDoc =
  //@ts-ignore
  (values, productList) => async (dispatch, getState) => {
    const guid = await reqGenerator.get("/utils/guid");
    const key = getState().auth.key;
    const userTin = getState().auth.userTin;
    const catalogList = getState().measures.catalogList;

    let data = null;

    try {
      data = JSON.stringify(
        computeFacturaJSON(values, productList, guid, catalogList)
      );
    } catch (error) {
      console.log({ error });
      return dispatch(showAlert("Malumotlar noto'g'ri kiritilgan"));
    }
    //@ts-ignore
    putSignature(data).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/factura/send/${userTin ? userTin : key.TIN}`, {
          sign: pkcs7,
        })
        .then((res) => {
          history.push("/main/docs/sender");
          dispatch(showAlert("Hujjat muvoffaqiyatli yaratildi", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")))
        .catch((error) => {
          // handle error
          dispatch(showAlert(error.data.error.message, "error"));
          console.log({ error });
        });
    });
  };
export const saveFacturaDoc =
  //@ts-ignore
  (values, productList) => async (dispatch, getState) => {
    const guid = await reqGenerator.get("/utils/guid");
    const catalogList = getState().measures.catalogList;

    let data = null;
    try {
      data = computeFacturaJSON(values, productList, guid, catalogList);
    } catch (error) {
      console.log({ error });
      return dispatch(showAlert("Malumotlar noto'g'ri kiritilgan"));
    }
    //@ts-ignore
    draftService.createDocDraft(data, "factura");
    dispatch(showAlert("Вы сохранили этот документ", "success"));
  };
export const saveWaybillDoc =
  //@ts-ignore
  (values, productList, tin) => async (dispatch, getState) => {
    const guid = await reqGenerator.get("/utils/guid");
    const catalogList = getState().measures.catalogList;
    const key = getState().auth.key;

    let data = null;

    try {
      data = computeWaybill(values, productList, guid, tin, catalogList);
    } catch (error) {
      console.log({ error });
      return dispatch(showAlert("Malumotlar noto'g'ri kiritilgan"));
    }
    //@ts-ignore
    draftService.createDocDraft(data, "waybill");
    dispatch(showAlert("Вы сохранили этот документ", "success"));
  };
export const saveEmpowermentDoc =
  //@ts-ignore
  (values, productList) => async (dispatch, getState) => {
    const guid = await reqGenerator.get("/utils/guid");
    const catalogList = getState().measures.catalogList;
    let data = null;

    try {
      data = computeEmpowermentJSON(values, productList, guid, catalogList);
    } catch (error) {
      console.log({ error });
      return dispatch(showAlert("Malumotlar noto'g'ri kiritilgan"));
    }
    //@ts-ignore
    draftService.createDocDraft(data, "empowerment");
    dispatch(showAlert("Вы сохранили этот документ", "success"));
  };

export const createContractDoc =
  //@ts-ignore
  (values, productList) => async (dispatch, getState) => {
    const guid = await reqGenerator.get("/utils/guid");
    const key = getState().auth.key;
    const catalogList = getState().measures.catalogList;

    let data = null;

    try {
      data = JSON.stringify(
        computeContractJSON(values, productList, guid, catalogList)
      );
    } catch (error) {
      console.log({ error });
      return dispatch(showAlert("Malumotlar noto'g'ri kiritilgan"));
    }
    //@ts-ignore
    putSignature(data).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/contract/send/${key.TIN}`, {
          sign: pkcs7,
        })
        .then((res) => {
          history.push("/main/docs/sender");
          dispatch(showAlert("Hujjat muvoffaqiyatli yaratildi", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")))
        .catch((error) => {
          // handle error
          dispatch(showAlert(error.data.error.message, "error"));
        });
    });
  };

export const actRemoveDoc =
  //@ts-ignore
  (docData, docType, docId) => async (dispatch, getState) => {
    const key = getState().auth.key;

    const computedData = JSON.stringify(docData);
    //@ts-ignore
    putSignature(computedData).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/act/cancel/${key.TIN}`, {
          sign: pkcs7,
          actId: docId,
        })
        .then((res) => {
          history.push("/main/docs/sender");
          dispatch(showAlert("Вы отменили этот документ", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    });
  };
export const planeDocRemoveDoc =
  //@ts-ignore


    (docData = {}, docId) =>
    //@ts-ignore
    async (dispatch, getState) => {
      const key = getState().auth.key;

      const computedData = JSON.stringify(docData);
      //@ts-ignore
      putSignature(computedData).then((pkcs7) => {
        dispatch(loaderON("fullPageLoader"));
        reqGenerator
          .post(`/document/cancel/${key.TIN}`, {
            actId: docId,
          })
          .then((res) => {
            history.push("/main/docs/sender");
            dispatch(showAlert("Вы отменили этот документ", "success"));
          })
          .finally(() => dispatch(loaderOFF("fullPageLoader")));
      });
    };

export const verificationActRemoveDoc =
  //@ts-ignore
  (docData, docId) => async (dispatch, getState) => {
    const key = getState().auth.key;

    const computedData = JSON.stringify(docData);
    //@ts-ignore
    putSignature(computedData).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/verification-act/cancel/${key.TIN}`, {
          sign: pkcs7,
          verificationActId: docId,
        })
        .then((res) => {
          history.push("/main/docs/sender");
          dispatch(showAlert("Вы отменили этот документ", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    });
  };
export const waybillRemoveDoc =
  //@ts-ignore
  (docData, docType, docId) => async (dispatch, getState) => {
    const key = getState().auth.key;

    const computedData = JSON.stringify(docData);
    //@ts-ignore
    putSignature(computedData).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/waybill/cancel/${key.TIN}`, {
          sign: pkcs7,
          waybillId: docId,
        })
        .then((res) => {
          history.push("/main/docs/sender");
          dispatch(showAlert("Вы отменили этот документ", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    });
  };
//@ts-ignore
export const actAcceptDoc = (signHash, docId) => async (dispatch, getState) => {
  const key = getState().auth.key;

  putAttachedSignature(signHash).then((pkcs7) => {
    dispatch(loaderON("fullPageLoader"));
    reqGenerator
      .post(`/act/accept-reject/${key.TIN}`, {
        sign: pkcs7,
        action: "accept",
        actId: docId,
        notes: "",
      })
      .then((res) => {
        history.push("/main/docs/receiver");
        dispatch(showAlert("Вы приняли этот документ", "success"));
      })
      .finally(() => dispatch(loaderOFF("fullPageLoader")));
  });
};
export const planeDocAcceptDoc =
  //@ts-ignore


    (signHash = "", docId) =>
    //@ts-ignore
    async (dispatch, getState) => {
      const key = getState().auth.key;
      //@ts-ignore
      putSignature(signHash).then((pkcs7) => {
        dispatch(loaderON("fullPageLoader"));
        reqGenerator
          .post(`/document/accept-reject/${key.TIN}`, {
            action: "accept",
            documentId: docId,
            notes: "",
          })
          .then((res) => {
            history.push("/main/docs/receiver");
            dispatch(showAlert("Вы приняли этот документ", "success"));
          })
          .finally(() => dispatch(loaderOFF("fullPageLoader")));
      });
    };
export const planeDocRejectDoc =
  //@ts-ignore
  (signHash, docId, notes) => async (dispatch, getState) => {
    const key = getState().auth.key;
    //@ts-ignore
    putSignature(signHash).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/document/accept-reject/${key.TIN}`, {
          action: "reject",
          documentId: docId,
          notes,
        })
        .then((res) => {
          history.push("/main/docs/receiver");
          dispatch(showAlert("Вы отклонили этот документ", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    });
  };
export const verificationActAcceptDoc =
  // @ts-ignore
  (signHash, docId) => async (dispatch, getState) => {
    const key = getState().auth.key;
    //@ts-ignore
    putAttachedSignature(signHash).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/verification-act/accept-reject/${key.TIN}`, {
          sign: pkcs7,
          action: "accept",
          verificationActId: docId,
          notes: "",
        })
        .then((res) => {
          history.push("/main/docs/receiver");
          dispatch(showAlert("Вы приняли этот документ", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    });
  };
export const waybillAcceptDoc =
  // @ts-ignore
  (signHash, docId) => async (dispatch, getState) => {
    const key = getState().auth.key;
    //@ts-ignore
    putAttachedSignature(signHash).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/waybill/accept-reject/${key.TIN}`, {
          sign: pkcs7,
          action: "accept",
          waybillId: docId,
          notes: "",
        })
        .then((res) => {
          history.push("/main/docs/receiver");
          dispatch(showAlert("Вы приняли этот документ", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    });
  };

export const actRejectDoc =
  //@ts-ignore
  (docData, docID, notes) => async (dispatch, getState) => {
    const key = getState().auth.key;

    const rejectFormatData = {
      act: docData,
      notes,
    };
    //@ts-ignore
    putSignature(JSON.stringify(rejectFormatData)).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/act/accept-reject/${key.TIN}`, {
          sign: pkcs7,
          action: "reject",
          actId: docID,
          notes,
        })
        .then((res) => {
          history.push("/main/docs/receiver");
          dispatch(showAlert("Вы отклонили этот документ", "success"));
        })
        .catch((error) => {
          dispatch(showAlert(error.data.error.message));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    });
  };

export const verificationActRejectDoc =
  //@ts-ignore
  (docData, docID, notes) => async (dispatch, getState) => {
    const key = getState().auth.key;

    const rejectFormatData = {
      verificationAct: docData,
      notes,
    };
    //@ts-ignore
    putSignature(JSON.stringify(rejectFormatData)).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/verification-act/accept-reject/${key.TIN}`, {
          sign: pkcs7,
          action: "reject",
          verificationActId: docID,
          notes,
        })
        .then((res) => {
          history.push("/main/docs/receiver");
          dispatch(showAlert("Вы отклонили этот документ", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    });
  };
export const waybillRejectDoc =
  //@ts-ignore
  (docData, docID, notes) => async (dispatch, getState) => {
    const key = getState().auth.key;

    const rejectFormatData = {
      waybill: docData,
      notes,
    };
    //@ts-ignore
    putSignature(JSON.stringify(rejectFormatData)).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/waybill/accept-reject/${key.TIN}`, {
          sign: pkcs7,
          action: "reject",
          waybillId: docID,
          notes,
        })
        .then((res) => {
          history.push("/main/docs/receiver");
          dispatch(showAlert("Вы отклонили этот документ", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    });
  };

export const invoiceAcceptDoc =
  //@ts-ignore
  (signHash, docId) => async (dispatch, getState) => {
    const key = getState().auth.key;

    //@ts-ignore
    putAttachedSignature(signHash).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/factura/accept-reject/${key.TIN}`, {
          sign: pkcs7,
          action: "accept",
          facturaId: docId,
          notes: "",
        })
        .then((res) => {
          history.push("/main/docs/receiver");
          dispatch(showAlert("Вы приняли этот документ", "success"));
        })
        .catch((error) => dispatch(showAlert(error.data.error.message)))
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    });
  };

export const invoiceRejectDoc =
  //@ts-ignore
  (docData, docID, notes) => async (dispatch, getState) => {
    const key = getState().auth.key;

    const rejectFormatData = {
      factura: docData,
      notes,
    };
    //@ts-ignore
    putSignature(JSON.stringify(rejectFormatData)).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/factura/accept-reject/${key.TIN}`, {
          sign: pkcs7,
          action: "reject",
          facturaId: docID,
          notes,
        })
        .then((res) => {
          history.push("/main/docs/receiver");
          dispatch(showAlert("Вы отклонили этот документ", "success"));
        })
        .catch((error) => dispatch(showAlert(error.data.error.message)))
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    });
  };

export const invoiceRemoveDoc =
  //@ts-ignore
  (docData, docType, docId) => async (dispatch, getState) => {
    const key = getState().auth.key;

    const computedData = JSON.stringify(docData);
    //@ts-ignore
    putSignature(computedData).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/factura/cancel/${key.TIN}`, {
          sign: pkcs7,
          facturaId: docId,
        })
        .then((res) => {
          history.push("/main/docs/sender");
          dispatch(showAlert("Вы отменили этот документ", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    });
  };

export const empowermentRemoveDoc =
  //@ts-ignore
  (docData, docType, docId) => async (dispatch, getState) => {
    const key = getState().auth.key;

    const computedData = JSON.stringify(docData);
    //@ts-ignore
    putSignature(computedData).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/empowerment/cancel/${key.TIN}`, {
          sign: pkcs7,
          empowermentId: docId,
        })
        .then((res) => {
          history.push("/main/docs/sender");
          dispatch(showAlert("Вы отменили этот документ", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    });
  };

export const empowermentAcceptDoc =
  //@ts-ignore
  (signHash, docId, who, agentEmpowermentId) => async (dispatch, getState) => {
    const key = getState().auth.key;
    //@ts-ignore
    putAttachedSignature(signHash).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));

      reqGenerator
        .post(
          `/empowerment${who === "agent" ? "/agent" : ""}/accept-reject/${
            key.TIN
          }`,
          {
            sign: pkcs7,
            action: "accept",
            empowermentId: docId,
            agentEmpowermentId,
            notes: "",
          }
        )
        .then((res) => {
          history.push("/main/docs/receiver");
          dispatch(showAlert("Вы приняли этот документ", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    });
  };

export const empowermentRejectDoc =
  //@ts-ignore


    (docData, docId, notes, who, agentEmpowermentId) =>
    //@ts-ignore
    async (dispatch, getState) => {
      const key = getState().auth.key;
      const rejectFormatData = {
        empowerment: docData,
        notes,
      };
      //@ts-ignore
      putSignature(JSON.stringify(rejectFormatData)).then((pkcs7) => {
        dispatch(loaderON("fullPageLoader"));
        reqGenerator
          .post(
            `/empowerment${who === "agent" ? "/agent" : ""}/accept-reject/${
              key.TIN
            }`,
            {
              sign: pkcs7,
              action: "reject",
              empowermentId: docId,
              agentEmpowermentId,
              notes,
            }
          )
          .then((res) => {
            history.push("/main/docs/receiver");
            dispatch(showAlert("Вы отклонили этот документ", "success"));
          })
          .finally(() => dispatch(loaderOFF("fullPageLoader")));
      });
    };

export const contractRemoveDoc =
  //@ts-ignore
  (docData, docType, docId) => async (dispatch, getState) => {
    const key = getState().auth.key;

    const computedData = JSON.stringify(docData);
    //@ts-ignore
    putSignature(computedData).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/contract/cancel/${key.TIN}`, {
          sign: pkcs7,
          contractId: docId,
        })
        .then((res) => {
          history.push("/main/docs/sender");
          dispatch(showAlert("Вы отменили этот документ", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    });
  };

export const contractRejectDoc =
  //@ts-ignore
  (docData, docId, notes) => async (dispatch, getState) => {
    const key = getState().auth.key;

    const rejectFormatData = {
      contract: docData,
      notes,
    };
    //@ts-ignore
    putSignature(JSON.stringify(rejectFormatData)).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/contract/accept-reject/${key.TIN}`, {
          sign: pkcs7,
          action: "reject",
          contractId: docId,
          notes,
        })
        .then((res) => {
          history.push("/main/docs/receiver");
          dispatch(showAlert("Вы отклонили этот документ", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    });
  };

export const contractAcceptDoc =
  //@ts-ignore
  (signHash, docId) => async (dispatch, getState) => {
    const key = getState().auth.key;
    //@ts-ignore
    putAttachedSignature(signHash).then((pkcs7) => {
      dispatch(loaderON("fullPageLoader"));
      reqGenerator
        .post(`/contract/accept-reject/${key.TIN}`, {
          sign: pkcs7,
          action: "accept",
          contractId: docId,
          notes: "",
        })
        .then((res) => {
          history.push("/main/docs/receiver");
          dispatch(showAlert("Вы приняли этот документ", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    });
  };

export const saveContractDoc =
  //@ts-ignore
  (values, productList) => async (dispatch, getState) => {
    const guid = await reqGenerator.get("/utils/guid");
    const catalogList = getState().measures.catalogList;

    let data = null;

    try {
      data = computeContractJSON(values, productList, guid, catalogList);
    } catch (error) {
      return dispatch(showAlert("Malumotlar noto'g'ri kiritilgan"));
    }

    draftService.createDocDraft(data, "contract");
    dispatch(showAlert("Вы сохранили этот документ", "success"));
  };

export const saveDocToDraft =
  //@ts-ignore
  (docData, productList, docType, isEdit, id) => async (dispatch, getState) => {
    if (isEdit) {
      const computedData = {
        Id: id,
        ...docData,
        products: {productList: productList},
      };

      dispatch(loaderON("fullPageLoader"));
      draftService
        .updateDraftData(computedData, docType)
        .then((res) => {
          history.push("/main/drafts");
          dispatch(showAlert("Вы сохранили этот документ", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    } else {
      const computedData = {
        ...docData,
        products: {productList: productList},
      };

      dispatch(loaderON("fullPageLoader"));
      draftService
        .createDraft(computedData, docType)
        .then((res) => {
          history.push("/main/drafts");
          dispatch(showAlert("Вы сохранили этот документ", "success"));
        })
        .finally(() => dispatch(loaderOFF("fullPageLoader")));
    }
  };
