import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/login.css";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [inPass, setInPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="hide-OF">
      <div className="col-container">
        <Navbar></Navbar>
        <CSSTransition appear in classNames="login-transition" timeout={350}>
          <div className="login pad-2">
            <h2>Welcome To BotBracket</h2>
            <form action="POST" className="col-container pad-2">
              <label className="left-align">Email Address</label>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className="left-align">Password</label>
              <input
                type="password"
                onChange={(e) => {
                  setInPass(e.target.value);
                }}
              />
              <label className="left-align">Confirm Password</label>
              <input
                type="password"
                onChange={(e) => {
                  setConfirmPass(e.target.value);
                }}
              />
              <button className="login-bt" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
