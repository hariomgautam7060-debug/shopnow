import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-1">

          <Routes>

            {/* Home */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* Products */}
            <Route
              path="/products"
              element={<Products />}
            />

            {/* Product Details */}
            <Route
              path="/product/:id"
              element={<ProductDetails />}
            />

            {/* Cart */}
            <Route
              path="/cart"
              element={<Cart />}
            />

            {/* Authentication */}
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />

            {/* User */}
            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />

            {/* Checkout */}
            <Route
              path="/checkout"
              element={<Checkout />}
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="min-h-[70vh] flex items-center justify-center bg-base-200 px-6">

                  <div className="text-center">

                    <div className="text-8xl">
                      404
                    </div>

                    <h1 className="text-4xl font-bold mt-4">
                      Page Not Found
                    </h1>

                    <p className="opacity-60 mt-3">
                      The page you are looking for
                      does not exist.
                    </p>

                    <a
                      href="/"
                      className="btn btn-primary mt-6"
                    >
                      Go to Home
                    </a>

                  </div>

                </div>
              }
            />

          </Routes>

        </div>

        {/* Footer */}
        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;