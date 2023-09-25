import reqGenerator from "../../utils/reqGenerator";
import { measuresActions } from "../slices/measures.slice";

//@ts-ignore
export const fetchMeasureList = () => (dispatch) => {
  reqGenerator.get("/catalog/measure/list").then((res) => {
    if (!res) return null;
    dispatch(
      measuresActions.setMeasureList(
        //@ts-ignore
        res.map((el) => ({ value: el.id, label: el.name }))
      )
    );
  });
};
//@ts-ignore
export const fetchCatalogList = () => (dispatch, getState) => {
  const key = getState().auth.userTin;
  const key1 = getState().auth.key;

  reqGenerator
    .get("/product/list", { params: { tin: key ? key : key1.TIN } })
    .then((res) => {
      if (!res) return null;
      dispatch(measuresActions.setCatalogList(res));
    });
};
