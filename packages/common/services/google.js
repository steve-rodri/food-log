import axios from "axios";
import humps from "humps";
import redux from "../redux";
import { AsyncStorage } from "react-native";

const {
  store: { dispatch, getState },
  actions: { fetchUserPending, fetchUserRejected, fetchUserSuccess, setView }
} = redux;

export const fetchUser = async (options = {}) => {
  const { native } = options;
  let accessToken;
  if (native) accessToken = await AsyncStorage.getItem("google_access_token");
  else accessToken = localStorage.getItem("google_access_token");
  const { view } = getState();

  dispatch(fetchUserPending());
  try {
    const resp = await axios({
      method: "get",
      url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      transformResponse: [
        ...axios.defaults.transformResponse,
        data => humps.camelizeKeys(data)
      ]
    });
    dispatch(fetchUserSuccess(resp.data));

    if (view.previous) dispatch(setView(view.previous));
    else dispatch(setView("NatLang"));
  } catch (e) {
    if (e.response && e.response.status === 401) {
      if (native) await AsyncStorage.removeItem("google_access_token");
      else localStorage.removeItem("google_access_token");
      dispatch(fetchUserRejected(e));
      dispatch(setView("Login"));
    }
    return null;
  }
};
