import { createSlice } from "@reduxjs/toolkit";
import userService from "../../services/user";
import { sendNotification } from "../notifications/notificationSlice";

export const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (state, action) => action.payload,
  },
});

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const userStats = await userService.getAllUsers();
      dispatch(setUsers(userStats));
    } catch (error) {
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

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
