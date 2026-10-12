import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function getImageUrl(image) {
  if (!image) return null;

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  const cleanPath = image
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");

  return `http://localhost:3000/${cleanPath}`;
}

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const response = await api.get(
          `/api/products/${id}`
        );

        console.log(
          "Product details:",
          response.data
        );

        const data =
          response.data?.product ??
          response.data?.data ??
          response.data;

        setProduct(data);

      } catch (error) {

        console.error(error);

        setError(
          error.response?.data?.message ||
          "Product details load nahi ho pa rahe."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchProduct();

  }, [id]);

  const addToCart = () => {

    const cart = JSON.parse(
      localStorage.getItem("shopnow_cart") || "[]"
    );

    const productId =
      product._id || product.id;

    const index = cart.findIndex(
      (item) =>
        (item._id || item.id) === productId
    );

    if (index >= 0) {

      cart[index].quantity =
        (cart[index].quantity || 1) + quantity;

    } else {

      cart.push({
        ...product,
        quantity,
      });

    }

    localStorage.setItem(
      "shopnow_cart",
      JSON.stringify(cart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    alert("Product added to cart");
  };

  if (loading) {

    return (
      <div className="min-h-screen flex justify-center items-center bg-base-200">

        <span className="loading loading-spinner loading-lg text-primary"></span>

      </div>
    );

  }

  if (error || !product) {

    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 px-6">

        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>

        <p className="opacity-60 mt-2">
          {error}
        </p>

        <Link
          to="/products"
          className="btn btn-primary mt-6"
        >
          Back to Products
        </Link>

      </div>
    );

  }

  const image =
    product.image ||
    product.imageurl ||
    product.imageUrl;

  const imageUrl =
    getImageUrl(image);

  const stock =
    Number(
      product.stock ??
      product.quantity ??
      0
    );

  return (
    <main className="min-h-screen bg-base-200 px-4 md:px-6 py-10">

      <div className="max-w-6xl mx-auto">

        <Link
          to="/products"
          className="btn btn-ghost mb-6"
        >
          ← Back to Products
        </Link>

        <div className="card lg:card-side bg-base-100 shadow-xl overflow-hidden">

          {/* Image */}

          <figure className="lg:w-1/2 min-h-[420px] bg-base-200 flex items-center justify-center">

            {imageUrl ? (

              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full max-h-[550px] object-cover"
              />

            ) : (

              <span className="text-[140px]">
                🛍️
              </span>

            )}

          </figure>

          {/* Details */}

          <div className="card-body lg:w-1/2 justify-center">

            {product.category && (

              <div className="badge badge-primary w-fit">
                {product.category}
              </div>

            )}

            <h1 className="text-4xl font-bold mt-3">
              {product.name}
            </h1>

            <div className="text-3xl font-bold text-primary mt-4">
              ₹
              {Number(
                product.price || 0
              ).toLocaleString("en-IN")}
            </div>

            <p className="opacity-70 leading-relaxed mt-5">
              {product.description ||
                "No description available."}
            </p>

            <div className="mt-5">

              <span className="font-semibold">
                Availability:{" "}
              </span>

              {stock > 0 ? (

                <span className="text-success">
                  In Stock ({stock})
                </span>

              ) : (

                <span className="text-error">
                  Out of Stock
                </span>

              )}

            </div>

            {/* Quantity */}

            <div className="flex items-center gap-3 mt-5">

              <span className="font-semibold">
                Quantity:
              </span>

              <div className="join">

                <button
                  className="btn join-item"
                  disabled={quantity <= 1}
                  onClick={() =>
                    setQuantity(
                      (q) => q - 1
                    )
                  }
                >
                  −
                </button>

                <span className="btn join-item pointer-events-none">
                  {quantity}
                </span>

                <button
                  className="btn join-item"
                  disabled={
                    stock > 0 &&
                    quantity >= stock
                  }
                  onClick={() =>
                    setQuantity(
                      (q) => q + 1
                    )
                  }
                >
                  +
                </button>

              </div>

            </div>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-3 mt-6">

              <button
                className="btn btn-primary flex-1"
                disabled={stock === 0}
                onClick={addToCart}
              >
                🛒 Add to Cart
              </button>

              <Link
                to="/cart"
                className="btn btn-outline flex-1"
              >
                View Cart
              </Link>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default ProductDetails;