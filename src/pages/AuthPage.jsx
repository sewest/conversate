import { handleLogin, handleRecover, handleRegister } from "../firebase/firebaseAuth";
import AuthFormMain from "../components/auth/AuthFormMain";

export default function AuthPage() {
  return <AuthFormMain handleLogin={handleLogin} handleRecover={handleRecover} handleRegister={handleRegister} />;
}
