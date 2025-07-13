import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";


export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const routeNameMap = {
    "/": "Home",
    "/login": "Login",
    "/signup": "Signup",
    "/forgot-password": "Forgot Password",
    "/dashboard": "Dashboard",
    "/favorites": "Favorites",
    "/accommodation": "Accommodation",
    "/aisearch": "AI Search",
  };

  // extract readable title from current pathname
  const pageTitle = routeNameMap[location.pathname] ||
    (location.pathname.startsWith("/update-password") && "Reset Password") ||
    (location.pathname.startsWith("/accommodation") && "Accommodation") ||
    "";

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-darkslate-800 text-white px-4 py-3 shadow-md">
      <div className="max-w-[1260px] mx-auto flex items-center justify-between">
        
        {/* Left Section: Back Button + Logo */}
        <div className="flex items-center gap-4">
          {/* Back Button */}
          {
            (location.pathname=="/forgot-password" 
            || location.pathname=="/favorites"
            || location.pathname=="/aisearch"
            || location.pathname=="/accommodation")  
            && 
            <button
              onClick={() => navigate(-1)}
              className="text-darkslate-100 hover:text-white text-lg"
              title="Go Back"
            >
               <ArrowLeft className="w-5 h-5 font-bold text-teal-400"  />
            </button>
          }

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-teal-400">
            <span>🏠</span>
            <span className="hidden sm:inline">Find Accommodation</span>
          </Link>
        </div>

        {/* Center: Page Title */}
        <h2 className="text-lg font-medium text-darkslate-100">{pageTitle}</h2>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-3">
          {token ? (
            <div>
                {
                  user == "pro"
                  &&
                  <Link to="/aisearch" className="btn btn-teal text-sm">
                  AI Search
                </Link>
                }
                <button onClick={handleLogout} className="ml-2 btn btn-outline text-sm">
                  Logout
                </button>
            </div>
          ) : (
            <>
              <Link to="/signup" className="btn btn-outline text-sm">
                Signup
              </Link>
              <Link to="/login" className="btn btn-teal text-sm">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>

  );
}
