import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-neutral-content">

      {/* Main Footer */}

      <div className="footer p-10 max-w-7xl mx-auto">

        {/* ShopNow */}

        <aside>

          <div className="text-3xl font-bold text-primary">
            ShopNow
          </div>

          <p className="max-w-xs opacity-80 mt-2">
            Your simple and trusted online shopping
            platform for quality products at great prices.
          </p>

          <p className="opacity-60 mt-2">
            © {year} ShopNow
          </p>

        </aside>


        {/* Quick Links */}

        <nav>

          <h6 className="footer-title">
            Quick Links
          </h6>

          <Link
            to="/"
            className="link link-hover"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="link link-hover"
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="link link-hover"
          >
            Cart
          </Link>

          <Link
            to="/orders"
            className="link link-hover"
          >
            Orders
          </Link>

        </nav>


        {/* Account */}

        <nav>

          <h6 className="footer-title">
            Account
          </h6>

          <Link
            to="/login"
            className="link link-hover"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="link link-hover"
          >
            Create Account
          </Link>

          <Link
            to="/profile"
            className="link link-hover"
          >
            My Profile
          </Link>

        </nav>


        {/* Support */}

        <nav>

          <h6 className="footer-title">
            Support
          </h6>

          <span className="opacity-70">
            🚚 Fast Delivery
          </span>

          <span className="opacity-70">
            🔒 Secure Shopping
          </span>

          <span className="opacity-70">
            💳 Secure Payment
          </span>

        </nav>

      </div>


      {/* Bottom */}

      <div className="border-t border-neutral-content/10">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-sm opacity-60">
            Built with React, Tailwind CSS & DaisyUI
          </p>

          <div className="flex gap-5 text-sm">

            <Link
              to="/products"
              className="hover:text-primary transition"
            >
              Shop Now
            </Link>

            <Link
              to="/cart"
              className="hover:text-primary transition"
            >
              View Cart
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;