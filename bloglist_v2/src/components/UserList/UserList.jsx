import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../features/user/userSlice";

import "./UserList.css";
const UserList = () => {
  const userStats = useSelector((state) => (state.users ? state.users : []));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const onUserClick = (user) => {
    navigate("/bloglist", { replace: true, state: user });
  };

  return (
    <div className="user-list">
      {userStats.map((u) => (
        <div className="user" key={u.userId}>
          <a
            href=""
            className="user-name"
            onClick={() => onUserClick(u.userId)}
          >
            {u.name}
          </a>
          <div className="user-blogs">{u.blogs}</div>
        </div>
      ))}
    </div>
  );
};
export default UserList;
