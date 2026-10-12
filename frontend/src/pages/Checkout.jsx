import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Cart load
  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("shopnow_cart") || "[]"
    );

    setCart(savedCart);

    // Logged-in user ki information
    const savedUser =
      localStorage.getItem("shopnow_user");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);

        setForm((old) => ({
          ...old,
          name:
            user.name ||
            user.username ||
            user.fullName ||
            "",
          phone:
            user.phone ||
            "",
        }));

      } catch (error) {
        console.log(
          "User data parse error:",
          error
        );
      }
    }
  }, []);

  // Subtotal
  const subtotal = useMemo(() => {

    return cart.reduce(
      (total, item) => {

        const price =
          Number(item.price || 0);

        const quantity =
          Number(item.quantity || 1);

        return total + price * quantity;

      },
      0
    );

  }, [cart]);

  // Delivery
  const deliveryCharge =
    subtotal === 0
      ? 0
      : subtotal >= 1000
      ? 0
      : 99;

  // Final total
  const total =
    subtotal + deliveryCharge;

  // Input change
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  // Place order
  const placeOrder = async (e) => {

    e.preventDefault();

    setError("");

    if (cart.length === 0) {
      setError(
        "Your cart is empty."
      );
      return;
    }

    try {

      setLoading(true);

      /*
        Backend order API ko request.
        Agar backend endpoint available hai
        to order backend me create hoga.
      */

      try {

        const response =
          await api.post(
            "/api/orders",
            {
              items: cart,

              shippingAddress: {
                name: form.name,
                phone: form.phone,
                address: form.address,
                city: form.city,
                state: form.state,
                pincode: form.pincode,
              },

              paymentMethod,

              subtotal,
              deliveryCharge,
              total,
            }
          );

        console.log(
          "Order created:",
          response.data
        );

      } catch (backendError) {

        /*
          Agar backend order API abhi available
          nahi hai, local order create karenge.
        */

        console.log(
          "Backend order API unavailable:",
          backendError
        );

      }

      // Local order save
      const oldOrders =
        JSON.parse(
          localStorage.getItem(
            "shopnow_orders"
          ) || "[]"
        );

      const newOrder = {

        id: `SN${Date.now()}`,

        date:
          new Date().toISOString(),

        status:
          "Processing",

        items: cart,

        subtotal,

        deliveryCharge,

        total,

        paymentMethod,

        shippingAddress: form,

      };

      localStorage.setItem(
        "shopnow_orders",
        JSON.stringify([
          newOrder,
          ...oldOrders,
        ])
      );

      // Cart clear
      localStorage.removeItem(
        "shopnow_cart"
      );

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      // Orders page
      navigate("/orders");

    } catch (error) {

      console.error(
        "Checkout error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Order place nahi ho pa raha."
      );

    } finally {

      setLoading(false);

    }

  };

  // Empty cart
  if (cart.length === 0) {

    return (
      <main className="min-h-screen bg-base-200 flex items-center justify-center px-6">

        <div className="text-center">

          <div className="text-7xl">
            🛒
          </div>

          <h1 className="text-3xl font-bold mt-5">
            Your Cart is Empty
          </h1>

          <p className="opacity-60 mt-2">
            Add products before checkout.
          </p>

          <Link
            to="/products"
            className="btn btn-primary mt-6"
          >
            Start Shopping
          </Link>

        </div>

      </main>
    );

  }

  return (
    <main className="min-h-screen bg-base-200 px-4 md:px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Checkout
          </h1>

          <p className="opacity-60 mt-2">
            Complete your order
          </p>

        </div>

        {/* Error */}

        {error && (
          <div className="alert alert-error mb-6">

            <span>
              {error}
            </span>

          </div>
        )}

        <form
          onSubmit={placeOrder}
          className="grid lg:grid-cols-3 gap-8"
        >

          {/* LEFT SIDE */}

          <div className="lg:col-span-2 space-y-6">

            {/* Shipping Address */}

            <div className="card bg-base-100 shadow-md">

              <div className="card-body">

                <h2 className="card-title text-2xl">
                  📍 Shipping Address
                </h2>

                <div className="grid md:grid-cols-2 gap-4 mt-5">

                  {/* Name */}

                  <label className="fieldset">

                    <span className="fieldset-legend">
                      Full Name
                    </span>

                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter full name"
                      value={form.name}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />

                  </label>

                  {/* Phone */}

                  <label className="fieldset">

                    <span className="fieldset-legend">
                      Phone Number
                    </span>

                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Enter phone number"
                      value={form.phone}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />

                  </label>

                  {/* City */}

                  <label className="fieldset">

                    <span className="fieldset-legend">
                      City
                    </span>

                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="Enter city"
                      value={form.city}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />

                  </label>

                  {/* State */}

                  <label className="fieldset">

                    <span className="fieldset-legend">
                      State
                    </span>

                    <input
                      type="text"
                      name="state"
                      required
                      placeholder="Enter state"
                      value={form.state}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />

                  </label>

                  {/* Pincode */}

                  <label className="fieldset">

                    <span className="fieldset-legend">
                      Pincode
                    </span>

                    <input
                      type="text"
                      name="pincode"
                      required
                      maxLength="6"
                      placeholder="Enter pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />

                  </label>

                  {/* Address */}

                  <label className="fieldset md:col-span-2">

                    <span className="fieldset-legend">
                      Complete Address
                    </span>

                    <textarea
                      name="address"
                      required
                      placeholder="House no., street, area..."
                      value={form.address}
                      onChange={handleChange}
                      className="textarea textarea-bordered w-full h-28"
                    />

                  </label>

                </div>

              </div>

            </div>

            {/* Payment */}

            <div className="card bg-base-100 shadow-md">

              <div className="card-body">

                <h2 className="card-title text-2xl">
                  💳 Payment Method
                </h2>

                <div className="space-y-3 mt-5">

                  {/* COD */}

                  <label className="border border-base-300 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-primary transition">

                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={
                        paymentMethod ===
                        "COD"
                      }
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                      className="radio radio-primary"
                    />

                    <div>

                      <p className="font-semibold">
                        Cash on Delivery
                      </p>

                      <p className="text-sm opacity-60">
                        Pay when your order arrives
                      </p>

                    </div>

                  </label>

                  {/* UPI */}

                  <label className="border border-base-300 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-primary transition">

                    <input
                      type="radio"
                      name="payment"
                      value="UPI"
                      checked={
                        paymentMethod ===
                        "UPI"
                      }
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                      className="radio radio-primary"
                    />

                    <div>

                      <p className="font-semibold">
                        UPI
                      </p>

                      <p className="text-sm opacity-60">
                        Pay using UPI
                      </p>

                    </div>

                  </label>

                  {/* Card */}

                  <label className="border border-base-300 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-primary transition">

                    <input
                      type="radio"
                      name="payment"
                      value="CARD"
                      checked={
                        paymentMethod ===
                        "CARD"
                      }
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                      className="radio radio-primary"
                    />

                    <div>

                      <p className="font-semibold">
                        Credit / Debit Card
                      </p>

                      <p className="text-sm opacity-60">
                        Pay securely using your card
                      </p>

                    </div>

                  </label>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div>

            <div className="card bg-base-100 shadow-xl lg:sticky lg:top-24">

              <div className="card-body">

                <h2 className="card-title text-2xl">
                  Order Summary
                </h2>

                {/* Products */}

                <div className="space-y-3 mt-5">

                  {cart.map((item) => {

                    const quantity =
                      Number(
                        item.quantity || 1
                      );

                    const price =
                      Number(
                        item.price || 0
                      );

                    return (

                      <div
                        key={
                          item._id ||
                          item.id
                        }
                        className="flex justify-between gap-3"
                      >

                        <span className="text-sm">

                          {item.name}

                          {" × "}

                          {quantity}

                        </span>

                        <span className="font-semibold">

                          ₹
                          {(
                            price *
                            quantity
                          ).toLocaleString(
                            "en-IN"
                          )}

                        </span>

                      </div>

                    );

                  })}

                </div>

                <div className="divider" />

                {/* Subtotal */}

                <div className="flex justify-between">

                  <span className="opacity-70">
                    Subtotal
                  </span>

                  <span>
                    ₹
                    {subtotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                {/* Delivery */}

                <div className="flex justify-between mt-3">

                  <span className="opacity-70">
                    Delivery
                  </span>

                  <span>

                    {deliveryCharge === 0
                      ? "FREE"
                      : `₹${deliveryCharge}`}

                  </span>

                </div>

                <div className="divider" />

                {/* Total */}

                <div className="flex justify-between text-xl">

                  <span className="font-bold">
                    Total
                  </span>

                  <span className="font-bold text-primary">

                    ₹
                    {total.toLocaleString(
                      "en-IN"
                    )}

                  </span>

                </div>

                {/* Place Order */}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full mt-5"
                >

                  {loading ? (

                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Placing Order...
                    </>

                  ) : (

                    "Place Order"

                  )}

                </button>

                <Link
                  to="/cart"
                  className="btn btn-ghost btn-sm mt-1"
                >
                  ← Back to Cart
                </Link>

                <p className="text-center text-xs opacity-60 mt-2">
                  🔒 Secure checkout
                </p>

              </div>

            </div>

          </div>

        </form>

      </div>

    </main>
  );
}

export default Checkout;