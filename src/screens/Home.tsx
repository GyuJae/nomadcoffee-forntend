import { useHistory } from "react-router";
import { darkModeVar, logUserOut } from "../apollo";

const Home = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logUserOut(history)}>Log out now!</button>
      <button onClick={() => darkModeVar(true)}>Dark Mode</button>
      <button onClick={() => darkModeVar(false)}>Light Mode</button>
    </div>
  );
};
export default Home;
