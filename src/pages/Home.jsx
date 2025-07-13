import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkslate-900 text-white font-inter px-4">
      <div className="w-full max-w-[600px] text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-6">
          Welcome to <span className="text-teal-400">Find Accommodation</span>
        </h1>

        <p className="text-darkslate-300 mb-8">
          Discover accommodations shared by others or contribute your own to help people find a place to stay.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="btn btn-teal w-full sm:w-auto"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-outline w-full sm:w-auto"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
