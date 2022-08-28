import { createSlice } from "@reduxjs/toolkit";

const loggedInSlice = createSlice({
  name: "loggedIn",
  initialState: false,
  reducers: {
    setLoggedIn(state, action) {
      return action.payload;
    },
  },
});

export const setLoginState = (loggedIn) => {
  return async (dispatch) => {
    try {
      dispatch(setLoggedIn(loggedIn));
    } catch (error) {
      dispatch(setLoggedIn(false));
    }
  };
};

export const { setLoggedIn } = loggedInSlice.actions;
export default loggedInSlice.reducer;
