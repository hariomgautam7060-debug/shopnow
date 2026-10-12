import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      console.log("Login response:", response.data);

      const user =
        response.data?.user ||
        response.data?.data ||
        response.data;

      // User information locally save
      localStorage.setItem(
        "shopnow_user",
        JSON.stringify(user)
      );

      setSuccess("Login successful!");

      // Home page par bhejo
      setTimeout(() => {
        navigate("/");
      }, 700);

    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
        "Login failed. Please check your email and password."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* Header */}

        <div className="text-center mb-7">

          <Link
            to="/"
            className="text-3xl font-bold text-primary"
          >
            ShopNow
          </Link>

          <h1 className="text-3xl font-bold mt-5">
            Welcome Back
          </h1>

          <p className="opacity-60 mt-2">
            Login to continue shopping
          </p>

        </div>

        {/* Login Card */}

        <form
          onSubmit={handleSubmit}
          className="card bg-base-100 shadow-xl"
        >

          <div className="card-body">

            {/* Error */}

            {error && (
              <div className="alert alert-error">

                <span>
                  {error}
                </span>

              </div>
            )}

            {/* Success */}

            {success && (
              <div className="alert alert-success">

                <span>
                  {success}
                </span>

              </div>
            )}

            {/* Email */}

            <label className="fieldset">

              <span className="fieldset-legend">
                Email Address
              </span>

              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="input input-bordered w-full"
              />

            </label>

            {/* Password */}

            <label className="fieldset mt-3">

              <span className="fieldset-legend">
                Password
              </span>

              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="input input-bordered w-full"
              />

            </label>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full mt-5"
            >

              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}

            </button>

            <div className="divider">
              OR
            </div>

            {/* Signup */}

            <p className="text-center text-sm">

              Don't have an account?{" "}

              <Link
                to="/signup"
                className="text-primary font-semibold hover:underline"
              >
                Create Account
              </Link>

            </p>

          </div>

        </form>

      </div>

    </main>
  );
}

export default Login;