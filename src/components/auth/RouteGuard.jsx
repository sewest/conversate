import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import Spinner from "../spinner/Spinner";

export default function RouteGuard({ children, onAuthStateChanged }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && location.pathname.startsWith("/auth")) {
        navigate("/");
        console.log(user);
      } else if (!user && !location.pathname.startsWith("/auth")) {
        navigate("/auth/login");
      }
      setIsLoading(false);
    });

    return unsubscribe; // Just return the unsubscribe function directly
  }, [navigate, location.pathname]);

  if (isLoading) {
    return <Spinner />;
  }

  return children;
}
