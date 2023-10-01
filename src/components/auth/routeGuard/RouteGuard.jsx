import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import Spinner from "../../spinner/Spinner";

export default function RouteGuard({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && location.pathname.startsWith("/auth")) {
        navigate("/");
      } else if (!user && !location.pathname.startsWith("/auth")) {
        navigate("/auth/login");
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, [navigate, location.pathname]);

  if (isLoading) {
    return <Spinner />;
  }

  return children;
}
