import { useState } from "react";
import { apiConnector } from "../../services/apiConnector";
import { endpoints } from "../../services/apiList";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendResetLink = async () => {
    if (!email) {
      return toast.error("Please enter your email");
    }

    setLoading(true);
    try {
      const res = await apiConnector("POST", endpoints.RESETPASSWORD_TOKEN_API, {
        email,
      });
      console.log("Reset Link Sent:", res);
      toast.success("Reset password link sent to your email");
    } catch (err) {
      if (err?.message) {
        toast.error(err?.message);
        console.log("Reset Link Error1:", err?.message);
      } else {
        console.error("Reset Link Error2:", err);
        toast.error("Failed to send reset link");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkslate-900 text-white font-inter px-4">
      <div className="w-full max-w-md bg-darkslate-800 p-6 rounded-2xl shadow-soft">
        <h2 className="text-2xl font-semibold mb-6 text-center">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-darkslate-700 text-white"
        />

        <button
          onClick={handleSendResetLink}
          disabled={loading}
          className="w-full btn btn-teal"
        >
          {loading ? "Sending Link..." : "Send Reset Link"}
        </button>
      </div>
    </div>
  );
}
