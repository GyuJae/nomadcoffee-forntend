import React from "react";
import { darkModeVar, isLoggedInVar } from "../apollo";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => isLoggedInVar(false)}>Log out now!</button>
      <button onClick={() => darkModeVar(true)}>Dark Mode</button>
      <button onClick={() => darkModeVar(false)}>Light Mode</button>
    </div>
  );
};
export default Home;
