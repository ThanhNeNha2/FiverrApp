import React, { useState } from "react";
import "./Login.scss";

import newRequest from "../../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigator("/");
    } catch (err) {
      setError(err.response.data);
      console.log(err);
      toast.error(error);
    }
  };

  return (
    <div className="backgroundLogin">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h1>Sign in </h1>
          <label htmlFor="">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Please, User name "
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Please, Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p className="loginForgot">Forgot password !</p>
          <div className="loginRegister">
            <span> {"Don't have an account ? "} </span>
            <Link className="link" to={"/register"}>
              Sign up{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
