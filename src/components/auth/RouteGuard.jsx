import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Spinner from "../spinner/Spinner";

export default function RouteGuard({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (location.pathname.startsWith("/auth")) {
          navigate("/");
        }
      } else {
        if (!location.pathname.startsWith("/auth")) {
          navigate("/auth/login");
        }
      }
      setIsLoading(false); // Set loading state to false after authentication check
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <Spinner />;
  }

  return children;
}
