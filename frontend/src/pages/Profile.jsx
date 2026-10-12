import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      // Pehle localStorage check
      const savedUser = localStorage.getItem("shopnow_user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      /*
        Agar tumhare backend me check-auth endpoint hai
        to yahan se user aa sakta hai.

        Endpoint available na hone par localStorage
        wala user use hoga.
      */
      try {
        const response = await api.get("/api/auth/check");

        const backendUser =
          response.data?.user ||
          response.data?.data;

        if (backendUser) {
          setUser(backendUser);

          localStorage.setItem(
            "shopnow_user",
            JSON.stringify(backendUser)
          );
        }
      } catch {
        // Backend check fail ho to localStorage user use hoga
      }

    } catch (error) {
      console.error("Profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Backend logout
      await api.post("/api/auth/logout");
    } catch (error) {
      console.log(
        "Backend logout endpoint unavailable:",
        error
      );
    }

    // Local data clear
    localStorage.removeItem("shopnow_user");

    // Login page
    navigate("/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-base-200 flex justify-center items-center">

        <span className="loading loading-spinner loading-lg text-primary"></span>

      </main>
    );
  }

  // User login nahi hai
  if (!user) {
    return (
      <main className="min-h-screen bg-base-200 flex items-center justify-center px-6">

        <div className="card bg-base-100 shadow-xl max-w-md w-full">

          <div className="card-body text-center">

            <div className="text-7xl">
              👤
            </div>

            <h1 className="text-3xl font-bold mt-4">
              Login Required
            </h1>

            <p className="opacity-60 mt-2">
              Profile dekhne ke liye pehle
              login karo.
            </p>

            <Link
              to="/login"
              className="btn btn-primary mt-6"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="btn btn-outline"
            >
              Create Account
            </Link>

          </div>

        </div>

      </main>
    );
  }

  const name =
    user.name ||
    user.username ||
    user.fullName ||
    "ShopNow User";

  const email =
    user.email ||
    "No email available";

  const initial =
    name.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-base-200 px-4 md:px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            My Profile
          </h1>

          <p className="opacity-60 mt-2">
            Manage your ShopNow account
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Profile Card */}

          <div className="card bg-base-100 shadow-xl">

            <div className="card-body items-center text-center">

              {/* Avatar */}

              <div className="avatar placeholder">

                <div className="bg-primary text-primary-content rounded-full w-28 h-28">

                  <span className="text-4xl">
                    {initial}
                  </span>

                </div>

              </div>

              <h2 className="text-2xl font-bold mt-4">
                {name}
              </h2>

              <p className="opacity-60">
                {email}
              </p>

              <div className="badge badge-primary mt-2">
                Customer
              </div>

              <button
                onClick={logout}
                className="btn btn-error btn-outline w-full mt-6"
              >
                🚪 Logout
              </button>

            </div>

          </div>

          {/* Account Section */}

          <div className="lg:col-span-2 space-y-6">

            {/* Personal Information */}

            <div className="card bg-base-100 shadow-md">

              <div className="card-body">

                <h2 className="card-title text-2xl">
                  Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-5 mt-5">

                  <div>

                    <p className="text-sm opacity-60">
                      Full Name
                    </p>

                    <p className="font-semibold mt-1">
                      {name}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm opacity-60">
                      Email
                    </p>

                    <p className="font-semibold mt-1 break-all">
                      {email}
                    </p>

                  </div>

                  {user.phone && (
                    <div>

                      <p className="text-sm opacity-60">
                        Phone
                      </p>

                      <p className="font-semibold mt-1">
                        {user.phone}
                      </p>

                    </div>
                  )}

                </div>

              </div>

            </div>

            {/* Quick Links */}

            <div className="card bg-base-100 shadow-md">

              <div className="card-body">

                <h2 className="card-title text-2xl">
                  Quick Links
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mt-5">

                  <Link
                    to="/orders"
                    className="btn btn-outline justify-start"
                  >
                    📦 My Orders
                  </Link>

                  <Link
                    to="/cart"
                    className="btn btn-outline justify-start"
                  >
                    🛒 My Cart
                  </Link>

                  <Link
                    to="/products"
                    className="btn btn-outline justify-start"
                  >
                    🛍️ Continue Shopping
                  </Link>

                  <Link
                    to="/"
                    className="btn btn-outline justify-start"
                  >
                    🏠 Home
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Profile;