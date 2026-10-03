import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import medicineBackground from "../../assets/medicine-background.png";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      login(
        response.data.user,
        response.data.token
      );

      if (response.data.user.role === "admin") {
      navigate("/admin-dashboard");
      } else if (
      response.data.user.role === "pharmacy"
      ) {
      navigate("/pharmacy-dashboard");
      } else {
      navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-100 flex items-center justify-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.58), rgba(248, 250, 252, 0.72)), url(${medicineBackground})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        <Link
          to="/"
          className="inline-block mb-4 text-green-600 hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-green-600 text-center">
          Welcome Back
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Sign in to CareBridge
        </p>

        {error && (
          <p className="text-red-500 text-center mt-4">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6"
        >
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
              />
              Remember Me
            </label>

            <Link
              to="/"
              className="text-green-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>
        </form>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-green-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;