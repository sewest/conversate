import { handleLogin, handleRecover, handleRegister } from "../firebase/firebaseAuth";
import AuthForm from "../components/auth/AuthForm";

export default function AuthPage() {
  return <AuthForm handleLogin={handleLogin} handleRecover={handleRecover} handleRegister={handleRegister} />;
}
