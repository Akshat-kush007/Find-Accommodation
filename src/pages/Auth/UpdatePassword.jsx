import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiConnector } from "../../services/apiConnector";
import { endpoints } from "../../services/apiList";
import { toast } from "react-toastify";

export default function UpdatePassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdatePassword = async () => {
    if (!form.password || !form.confirmPassword) {
      return toast.error("Both fields are required");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const res = await apiConnector("POST", endpoints.RESETPASSWORD_API, {
        token,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      console.log("Password Reset Success:", res);
      toast.success("Password updated successfully!");
      navigate("/login");
    } catch (err) {
      
      if (err?.message) {
        toast.error(err?.message);
        console.log("Reset Password Error:", err?.message);
      } else {
        console.error("Reset Password Error:", err);
        toast.error("Failed to reset password");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkslate-900 text-white font-inter px-4">
      <div className="w-full max-w-md bg-darkslate-800 p-6 rounded-2xl shadow-soft">
        <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>

        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-darkslate-700 text-white"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-darkslate-700 text-white"
        />

        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          className="w-full btn btn-teal"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}
