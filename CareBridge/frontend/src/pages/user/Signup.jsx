import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import medicineBackground from "../../assets/medicine-background.png";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Passwords do not match"
      );
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "patient",
      });

      setSuccess(
        "✅ Account created successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setError(
        error.response?.data
          ?.message ||
          "Signup failed"
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
          Create Account
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Join CareBridge today
        </p>

        {success && (
          <p className="text-green-600 text-center mt-4">
            {success}
          </p>
        )}

        {error && (
          <p className="text-red-600 text-center mt-4">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6"
        >
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
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
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password:
                    e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={
                formData.confirmPassword
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword:
                    e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;