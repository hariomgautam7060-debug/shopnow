import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      /*
        Backend se orders lene ki koshish.
        Agar backend endpoint available nahi hai,
        to localStorage ke orders use honge.
      */

      try {
        const response = await api.get("/api/orders");

        const data =
          response.data?.orders ??
          response.data?.data ??
          response.data;

        if (Array.isArray(data)) {
          setOrders(data);
          return;
        }
      } catch (backendError) {
        console.log(
          "Backend orders endpoint unavailable:",
          backendError
        );
      }

      // Local orders
      const localOrders = JSON.parse(
        localStorage.getItem("shopnow_orders") || "[]"
      );

      setOrders(localOrders);

    } catch (error) {
      console.error("Orders error:", error);

      setError(
        "Orders load nahi ho pa rahe."
      );

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-base-200 flex justify-center items-center">

        <span className="loading loading-spinner loading-lg text-primary"></span>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-200 px-4 md:px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            My Orders
          </h1>

          <p className="opacity-60 mt-2">
            View your order history
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

        {/* Empty Orders */}

        {!error && orders.length === 0 && (

          <div className="card bg-base-100 shadow-md">

            <div className="card-body text-center py-20">

              <div className="text-7xl">
                📦
              </div>

              <h2 className="text-3xl font-bold mt-5">
                No Orders Yet
              </h2>

              <p className="opacity-60 mt-2">
                You haven't placed any orders yet.
              </p>

              <Link
                to="/products"
                className="btn btn-primary mt-6"
              >
                Start Shopping
              </Link>

            </div>

          </div>

        )}

        {/* Orders */}

        {orders.length > 0 && (

          <div className="space-y-6">

            {orders.map((order, index) => {

              const orderId =
                order._id ||
                order.id ||
                `ORDER-${index + 1}`;

              const items =
                order.items ||
                order.products ||
                [];

              const total =
                Number(
                  order.total ||
                  order.amount ||
                  order.totalAmount ||
                  0
                );

              const status =
                order.status ||
                "Processing";

              const date =
                order.createdAt ||
                order.date ||
                order.created_at;

              return (

                <div
                  key={orderId}
                  className="card bg-base-100 shadow-md"
                >

                  <div className="card-body">

                    {/* Order Header */}

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                      <div>

                        <p className="text-sm opacity-60">
                          Order ID
                        </p>

                        <h2 className="text-xl font-bold">
                          #{orderId}
                        </h2>

                        {date && (
                          <p className="text-sm opacity-60 mt-1">
                            {new Date(date).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        )}

                      </div>

                      <div>

                        <span
                          className={`badge badge-lg ${
                            status.toLowerCase() ===
                            "delivered"
                              ? "badge-success"
                              : status.toLowerCase() ===
                                "cancelled"
                              ? "badge-error"
                              : "badge-warning"
                          }`}
                        >
                          {status}
                        </span>

                      </div>

                    </div>

                    <div className="divider" />

                    {/* Items */}

                    <div className="space-y-3">

                      {items.length === 0 ? (

                        <p className="opacity-60">
                          No item details available.
                        </p>

                      ) : (

                        items.map((item, itemIndex) => {

                          const itemId =
                            item._id ||
                            item.id ||
                            itemIndex;

                          const quantity =
                            Number(
                              item.quantity ||
                              item.qty ||
                              1
                            );

                          const price =
                            Number(
                              item.price ||
                              0
                            );

                          const itemTotal =
                            price * quantity;

                          return (

                            <div
                              key={itemId}
                              className="flex items-center justify-between gap-4 p-3 bg-base-200 rounded-xl"
                            >

                              <div>

                                <h3 className="font-semibold">
                                  {item.name ||
                                    item.productName ||
                                    "Product"}
                                </h3>

                                <p className="text-sm opacity-60">
                                  Quantity:{" "}
                                  {quantity}
                                </p>

                              </div>

                              <div className="font-semibold">

                                ₹
                                {itemTotal.toLocaleString(
                                  "en-IN"
                                )}

                              </div>

                            </div>

                          );

                        })

                      )}

                    </div>

                    <div className="divider" />

                    {/* Total */}

                    <div className="flex justify-between items-center">

                      <span className="text-lg font-semibold">
                        Total Amount
                      </span>

                      <span className="text-xl font-bold text-primary">
                        ₹
                        {total.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </main>
  );
}

export default Orders;