import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../services/apiConnector";
import { endpoints } from "../../services/apiList";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const res = await apiConnector("POST", endpoints.LOGIN_API, form);
      console.log("Login Response:", res);
      dispatch(setToken(res?.data?.token));
      dispatch(setUser(res?.data?.userType));
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      if (err?.message) {
        toast.error(err.message);
        console.log("Login Error1:", err.message);
      } else {
        console.error("Login Error2:", err);
        toast.error("Login failed");
      }
    }
    // console.log("Exit")
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkslate-900 text-white font-inter px-4">
      <div className="w-full max-w-md bg-darkslate-800 p-6 rounded-2xl shadow-soft">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-darkslate-700 text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-2 rounded bg-darkslate-700 text-white"
        />

        <div className="w-full mb-4 text-left text-sm">
          <button
            className="text-darkslate-200 underline hover:text-teal-400"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full btn btn-teal"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
