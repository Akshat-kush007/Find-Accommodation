import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  // console.log("OpenRoute - Token:", token);

  // If not logged in, allow access to the route (e.g., login/signup)
  if (token=== null) {
    // console.log("In")
    return children;
  }
  // console.log("Out")

  // If logged in, redirect to dashboard
  return <Navigate to="/dashboard" replace />;
}

