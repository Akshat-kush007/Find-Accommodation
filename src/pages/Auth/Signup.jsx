import { useState } from "react";
import { endpoints } from "../../services/apiList";
import { apiConnector } from "../../services/apiConnector";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSendOTP = async () => {
    if (!form.email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      const res = await apiConnector("POST", endpoints.SEND_OTP_API, {
        email: form.email,
      });
      console.log("OTP Sent:", res);
      toast.success("OTP sent to your email");
      setOtpSent(true);
    } catch (err) {
      if (err?.message) {
        toast.error(err?.message);
        console.log("Send OTP Error:", err?.message);
      } else {
        console.error("Send OTP Error:", err);
        toast.error("Failed to send OTP");
      }
    }
    setLoading(false);
  };

  const handleSignup = async () => {
    const { name, email, otp, password, confirmPassword } = form;

    if (!name || !email || !otp || !password || !confirmPassword)
      return toast.error("All fields are required");

    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    setLoading(true);
    try {
      const res = await apiConnector("POST", endpoints.SIGNUP_API, form);
      console.log("Signup Success:", res);
      toast.success("Signup successful! You can now login.");
      navigate("/login");
    } catch (err) {
      if (err?.message) {
        toast.error(err?.message);
        console.log("Signup Error:", err?.message);
      } else {
        console.error("Signup Error:", err);
        toast.error("Signup failed");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkslate-900 text-white font-inter px-4">
      <div className="w-full max-w-md bg-darkslate-800 p-6 rounded-2xl shadow-soft">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-darkslate-700 text-white"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-darkslate-700 text-white"
        />

        {!otpSent ? (
          <button
            onClick={handleSendOTP}
            disabled={loading}
            className="w-full btn btn-teal"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
              className="w-full p-2 mt-4 rounded bg-darkslate-700 text-white"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 mt-2 rounded bg-darkslate-700 text-white"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 mt-2 mb-4 rounded bg-darkslate-700 text-white"
            />

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full btn btn-teal"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
