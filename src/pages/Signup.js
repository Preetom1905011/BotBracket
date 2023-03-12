import React, { useState } from "react";
import "../styles/login.css";
import { CSSTransition } from "react-transition-group";
import { Link} from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [inPass, setInPass] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div className="hide-OF">
      <div className="col-container">
        <CSSTransition appear in classNames="login-transition" timeout={350}>
          <div className="login pad-2">
            <h2>Welcome To BotBracket</h2>
            <form className="col-container pad-2">
              <label className="left-align">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className="left-align">Password</label>
              <input
                type="password"
                value={inPass}
                onChange={(e) => {
                  setInPass(e.target.value);
                }}
              />
              <label className="left-align">Confirm Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
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
