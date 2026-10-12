import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  // Cart localStorage se load
  const loadCart = () => {
    const savedCart = JSON.parse(
      localStorage.getItem("shopnow_cart") || "[]"
    );

    setCart(savedCart);
  };

  useEffect(() => {
    loadCart();

    window.addEventListener(
      "cartUpdated",
      loadCart
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        loadCart
      );
    };
  }, []);

  // Cart save karna
  const saveCart = (newCart) => {
    setCart(newCart);

    localStorage.setItem(
      "shopnow_cart",
      JSON.stringify(newCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // Quantity change
  const changeQuantity = (id, change) => {
    const updatedCart = cart.map((item) => {

      const itemId =
        item._id || item.id;

      if (itemId !== id) {
        return item;
      }

      const currentQuantity =
        Number(item.quantity || 1);

      return {
        ...item,
        quantity: Math.max(
          1,
          currentQuantity + change
        ),
      };
    });

    saveCart(updatedCart);
  };

  // Remove product
  const removeItem = (id) => {

    const updatedCart =
      cart.filter((item) => {

        const itemId =
          item._id || item.id;

        return itemId !== id;
      });

    saveCart(updatedCart);
  };

  // Clear complete cart
  const clearCart = () => {

    saveCart([]);

  };

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

  // Delivery charges
  const deliveryCharge =
    subtotal === 0
      ? 0
      : subtotal >= 1000
      ? 0
      : 99;

  // Final total
  const total =
    subtotal + deliveryCharge;

  // Empty cart
  if (cart.length === 0) {

    return (
      <main className="min-h-screen bg-base-200 px-6 py-20">

        <div className="max-w-xl mx-auto text-center">

          <div className="text-8xl">
            🛒
          </div>

          <h1 className="text-4xl font-bold mt-5">
            Your Cart is Empty
          </h1>

          <p className="opacity-60 mt-3">
            Add some products to your cart
            and come back here.
          </p>

          <Link
            to="/products"
            className="btn btn-primary mt-7"
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

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              Shopping Cart
            </h1>

            <p className="opacity-60 mt-2">
              {cart.length} product(s)
              in your cart
            </p>

          </div>

          <button
            onClick={clearCart}
            className="btn btn-error btn-outline"
          >
            Clear Cart
          </button>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart Products */}

          <div className="lg:col-span-2 space-y-4">

            {cart.map((item) => {

              const id =
                item._id || item.id;

              const image =
                item.image ||
                item.imageurl ||
                item.imageUrl;

              const imageUrl = image
                ? image.startsWith("http")
                  ? image
                  : `http://localhost:3000/${String(
                      image
                    )
                      .replace(/\\/g, "/")
                      .replace(/^\/+/, "")}`
                : null;

              const quantity =
                Number(
                  item.quantity || 1
                );

              const price =
                Number(
                  item.price || 0
                );

              const itemTotal =
                price * quantity;

              return (
                <div
                  key={id}
                  className="card bg-base-100 shadow-md"
                >

                  <div className="card-body">

                    <div className="flex flex-col sm:flex-row gap-5">

                      {/* Product Image */}

                      <div className="w-full sm:w-32 h-32 bg-base-200 rounded-xl flex items-center justify-center overflow-hidden">

                        {imageUrl ? (

                          <img
                            src={imageUrl}
                            alt={
                              item.name ||
                              "Product"
                            }
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />

                        ) : (

                          <span className="text-5xl">
                            🛍️
                          </span>

                        )}

                      </div>

                      {/* Product Information */}

                      <div className="flex-1">

                        <Link
                          to={`/product/${id}`}
                          className="text-xl font-bold hover:text-primary"
                        >
                          {item.name ||
                            "Unnamed Product"}
                        </Link>

                        {item.category && (
                          <div className="badge badge-outline mt-2">
                            {item.category}
                          </div>
                        )}

                        <p className="text-lg font-bold text-primary mt-2">
                          ₹
                          {price.toLocaleString(
                            "en-IN"
                          )}
                        </p>

                        {/* Quantity */}

                        <div className="flex flex-wrap items-center gap-3 mt-5">

                          <div className="join">

                            <button
                              className="btn btn-sm join-item"
                              disabled={
                                quantity <= 1
                              }
                              onClick={() =>
                                changeQuantity(
                                  id,
                                  -1
                                )
                              }
                            >
                              −
                            </button>

                            <span className="btn btn-sm join-item pointer-events-none">
                              {quantity}
                            </span>

                            <button
                              className="btn btn-sm join-item"
                              onClick={() =>
                                changeQuantity(
                                  id,
                                  1
                                )
                              }
                            >
                              +
                            </button>

                          </div>

                          <button
                            className="btn btn-ghost btn-sm text-error"
                            onClick={() =>
                              removeItem(id)
                            }
                          >
                            🗑️ Remove
                          </button>

                        </div>

                      </div>

                      {/* Item Total */}

                      <div className="sm:text-right">

                        <p className="text-sm opacity-60">
                          Item Total
                        </p>

                        <p className="font-bold text-lg">
                          ₹
                          {itemTotal.toLocaleString(
                            "en-IN"
                          )}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

            {/* Continue Shopping */}

            <Link
              to="/products"
              className="btn btn-outline mt-3"
            >
              ← Continue Shopping
            </Link>

          </div>

          {/* Order Summary */}

          <div>

            <div className="card bg-base-100 shadow-xl lg:sticky lg:top-24">

              <div className="card-body">

                <h2 className="card-title text-2xl">
                  Order Summary
                </h2>

                {/* Subtotal */}

                <div className="flex justify-between mt-5">

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

                {/* Free delivery message */}

                {subtotal > 0 &&
                  subtotal < 1000 && (

                    <div className="alert alert-info mt-4 text-sm">

                      <span>
                        ₹
                        {(
                          1000 - subtotal
                        ).toLocaleString(
                          "en-IN"
                        )}{" "}
                        more shopping
                        for FREE delivery!
                      </span>

                    </div>

                  )}

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

                {/* Checkout */}

                <Link
                  to="/checkout"
                  className="btn btn-primary w-full mt-5"
                >
                  Proceed to Checkout
                </Link>

                <div className="text-center text-xs opacity-60 mt-3">
                  🔒 Secure checkout
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Cart;