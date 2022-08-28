import React, { useEffect, useState } from "react";
import { login } from "../../features/login/loginSlice";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification";

export default function Login({}) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const isLoggedIn = useSelector((state) => state.login.loggedIn);

  const handleLogin = () => {
    dispatch(login(name, pass));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/bloglist");
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className="login-container">
        <div className="login">
          <h1 className="title-header">Login</h1>
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              setName("");
              setPass("");
            }}
          >
            <div className="username form-group input-item">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="password form-group input-item">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                autoComplete="on"
              />
            </div>
            <button
              className="login-button"
              type="submit"
              onClick={() => handleLogin()}
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <Notification />
    </>
  );
}
