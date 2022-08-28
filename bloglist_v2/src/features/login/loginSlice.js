import { createSlice } from "@reduxjs/toolkit";
import loginService from "../../services/login";
import { setLoginState } from "../global/globalSlice";
import { sendNotification } from "../notifications/notificationSlice";

const initialState = {
  userId: "",
  loggedIn: false,
  name: "",
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin(state, action) {
      return action.payload;
    },
  },
});

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      const loginData = await loginService.login(username, password);
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("user", loginData.userId);
      dispatch(
        setLogin({
          userId: loginData.userId,
          loggedIn: true,
          username: loginData.username,
        })
      );
    } catch (error) {
      dispatch(setLogin(initialState));
      console.error("Unable to Login", error);
      dispatch(
        sendNotification(
          error?.response?.data?.error || error.message,
          "error",
          5000,
          false
        )
      );
    }
  };
};

export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;
