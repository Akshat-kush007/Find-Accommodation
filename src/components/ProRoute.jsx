

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
    console.log("User : ",user)
  if (user === "pro") {
    return children;
}

    return <Navigate to="/dashboard" />;
}

