import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // Password check
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Password length
    if (form.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/api/auth/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      );

      console.log(
        "Signup response:",
        response.data
      );

      setSuccess(
        "Account created successfully!"
      );

      // Login page par bhejo
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error(
        "Signup error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Signup failed. Please try again."
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
            Create Your Account
          </h1>

          <p className="opacity-60 mt-2">
            Join ShopNow and start shopping
          </p>

        </div>

        {/* Signup Card */}

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

            {/* Name */}

            <label className="fieldset">

              <span className="fieldset-legend">
                Full Name
              </span>

              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />

            </label>

            {/* Email */}

            <label className="fieldset mt-3">

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
                autoComplete="new-password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                className="input input-bordered w-full"
              />

            </label>

            {/* Confirm Password */}

            <label className="fieldset mt-3">

              <span className="fieldset-legend">
                Confirm Password
              </span>

              <input
                type="password"
                name="confirmPassword"
                required
                autoComplete="new-password"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="input input-bordered w-full"
              />

            </label>

            {/* Signup Button */}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full mt-5"
            >

              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}

            </button>

            <div className="divider">
              OR
            </div>

            {/* Login */}

            <p className="text-center text-sm">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
              >
                Login
              </Link>

            </p>

          </div>

        </form>

      </div>

    </main>
  );
}

export default Signup;