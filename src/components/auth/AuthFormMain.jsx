import { useParams } from "react-router-dom";
import Register from "./register/Register";
import Login from "./login/Login";
import Recover from "./recover/Recover";

export default function AuthForm({ handleLogin, handleRecover, handleRegister }) {
  const { authType } = useParams();

  switch (authType) {
    case "register":
      return <Register handleRegister={handleRegister} />;
    case "login":
      return <Login handleLogin={handleLogin} />;
    case "recover":
      return <Recover handleRecover={handleRecover} />;
    default:
      throw new Error("404 Page not found");
  }
}
