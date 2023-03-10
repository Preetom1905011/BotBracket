import React, { useEffect, useState } from "react";
import "../styles/login.css";
import { CSSTransition } from "react-transition-group";
import { Link, useLocation } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="hide-OF background-style-all">
      <div className="col-container">
        <CSSTransition appear in classNames="login-transition" timeout={350}>
          <div className="login pad-2">
            <h2>Welcome To BotBracket</h2>
            <form className="col-container pad-2">
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
                  setPassword(e.target.value);
                }}
              />
              <button className="login-bt" type="submit" value="Login">
                Log In
              </button>
              <a className="right-align">Forgot Password?</a>
              <div className="col-container side-container pad-2">
                New to BotBracket?
                <Link to="/signup">Sign up</Link>
              </div>
            </form>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
