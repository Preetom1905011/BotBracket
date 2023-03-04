import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/login.css";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
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
                  setPassword(e.target.value);
                }}
              />
              <button className="login-bt" type="submit">
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
