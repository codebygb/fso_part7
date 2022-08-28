import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setLogin } from "../../features/login/loginSlice";
import useAsync from "../../hooks/useAsync";
import loginService from "../../services/login";

export default function RequireAuth({ children }) {
  let location = useLocation();
  const dispatch = useDispatch();
  const [auth, setAuth] = useState();
  const { execute, status, value, error } = useAsync(
    loginService.checkAuth,
    false
  );

  useEffect(() => {
    execute();
  }, [location]);

  useEffect(() => {
    if (status === "success") {
      setAuth(value.status);
      value.status === 200
        ? dispatch(setLogin({ ...value.data, loggedIn: true })) && setAuth(200)
        : dispatch(setLogin({ userId: "", loggedIn: false })) && setAuth(401);
    }
    if (status === "error" || error) {
      dispatch(setLogin({ userId: "", loggedIn: false }));
      setAuth(401);
    }
  }, [status]);

  if (auth === undefined) {
    return <div>Loading</div>;
  }
  if (auth === 401) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
