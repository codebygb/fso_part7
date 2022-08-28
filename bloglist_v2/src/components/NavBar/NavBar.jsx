import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import React from "react";
import nav from "./nav";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav>
      <div className="navbar">
        <ul className="nav">
          {nav.map((el) => (
            <li
              className="nav-item"
              onClick={
                el.name === "Logout" ? () => localStorage.clear() : () => {}
              }
              key={el.name}
            >
              <Link to={el.to} className="nav-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  width="48"
                  fill="currentColor"
                >
                  <path d={el.iconPath} />
                </svg>
                <span className="nav-title">{el.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
