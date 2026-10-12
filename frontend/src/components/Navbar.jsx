import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  const loadCartCount = () => {
    const cart = JSON.parse(
      localStorage.getItem("shopnow_cart") || "[]"
    );

    const count = cart.reduce(
      (total, item) =>
        total + Number(item.quantity || 1),
      0
    );

    setCartCount(count);
  };

  const loadUser = () => {
    const savedUser =
      localStorage.getItem("shopnow_user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadCartCount();
    loadUser();

    window.addEventListener(
      "cartUpdated",
      loadCartCount
    );

    window.addEventListener(
      "storage",
      loadUser
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        loadCartCount
      );

      window.removeEventListener(
        "storage",
        loadUser
      );
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("shopnow_user");

    setUser(null);

    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-primary"
        : "hover:text-primary"
    }`;

  const userName =
    user?.name ||
    user?.username ||
    user?.fullName ||
    "Account";

  const userInitial =
    userName.charAt(0).toUpperCase();

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4 md:px-6">

      <div className="max-w-7xl w-full mx-auto flex items-center">

        {/* ================= MOBILE MENU ================= */}

        <div className="dropdown lg:hidden">

          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow-xl"
          >

            <li>
              <NavLink to="/">
                🏠 Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/products">
                🛍️ Products
              </NavLink>
            </li>

            <li>
              <NavLink to="/cart">
                🛒 Cart
              </NavLink>
            </li>

            {user && (
              <>
                <li>
                  <NavLink to="/orders">
                    📦 Orders
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/profile">
                    👤 Profile
                  </NavLink>
                </li>
              </>
            )}

          </ul>

        </div>


        {/* ================= LOGO ================= */}

        <div className="flex-1 lg:flex-none">

          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold text-primary"
          >
            ShopNow
          </Link>

        </div>


        {/* ================= DESKTOP LINKS ================= */}

        <div className="hidden lg:flex flex-1 justify-center">

          <div className="flex items-center gap-8">

            <NavLink
              to="/"
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={navLinkClass}
            >
              Products
            </NavLink>

            <NavLink
              to="/orders"
              className={navLinkClass}
            >
              Orders
            </NavLink>

          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}

        <div className="flex items-center gap-1 md:gap-2">

          {/* Cart */}

          <Link
            to="/cart"
            className="btn btn-ghost btn-circle"
            title="Shopping Cart"
          >

            <div className="indicator">

              <span className="text-xl">
                🛒
              </span>

              {cartCount > 0 && (
                <span className="badge badge-primary badge-xs indicator-item">
                  {cartCount > 99
                    ? "99+"
                    : cartCount}
                </span>
              )}

            </div>

          </Link>


          {/* ================= USER ================= */}

          {user ? (

            <div className="dropdown dropdown-end">

              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost gap-2"
              >

                <div className="avatar placeholder">

                  <div className="bg-primary text-primary-content rounded-full w-9">
                    <span>
                      {userInitial}
                    </span>
                  </div>

                </div>

                <span className="hidden md:inline max-w-24 truncate">
                  {userName}
                </span>

                <span className="text-xs">
                  ▼
                </span>

              </div>


              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow-xl"
              >

                <li className="menu-title">
                  <span>
                    My Account
                  </span>
                </li>

                <li>
                  <Link to="/profile">
                    👤 Profile
                  </Link>
                </li>

                <li>
                  <Link to="/orders">
                    📦 My Orders
                  </Link>
                </li>

                <li>
                  <Link to="/cart">
                    🛒 My Cart
                  </Link>
                </li>

                <div className="divider my-1"></div>

                <li>
                  <button
                    onClick={logout}
                    className="text-error"
                  >
                    🚪 Logout
                  </button>
                </li>

              </ul>

            </div>

          ) : (

            <div className="hidden sm:flex items-center gap-2">

              <Link
                to="/login"
                className="btn btn-ghost"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="btn btn-primary"
              >
                Sign Up
              </Link>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Navbar;