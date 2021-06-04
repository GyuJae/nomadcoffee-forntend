import React from "react";
import { darkModeVar, isLoggedInVar } from "../apollo";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => isLoggedInVar(true)}>Log In now!</button>
      <button onClick={() => darkModeVar(true)}>Dark Mode</button>
      <button onClick={() => darkModeVar(false)}>Light Mode</button>
    </div>
  );
};
export default Login;
