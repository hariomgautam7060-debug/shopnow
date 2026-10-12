import { Link } from "react-router-dom";

function getImageUrl(image) {
  if (!image) return null;

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  const cleanPath = image
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");

  return `http://localhost:3000/${cleanPath}`;
}

function ProductCard({ product, onAddToCart }) {
  const id = product._id || product.id;

  const image =
    product.image ||
    product.imageurl ||
    product.imageUrl;

  const imageUrl = getImageUrl(image);

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-base-200">

      {/* Image */}
      <figure className="h-56 bg-base-200 flex items-center justify-center overflow-hidden">

        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name || "Product"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <span className="text-6xl">
            🛍️
          </span>
        )}

      </figure>

      {/* Details */}
      <div className="card-body">

        {product.category && (
          <div className="badge badge-outline w-fit">
            {product.category}
          </div>
        )}

        <h2 className="card-title line-clamp-1">
          {product.name || "Unnamed Product"}
        </h2>

        {product.description && (
          <p className="text-sm opacity-60 line-clamp-2">
            {product.description}
          </p>
        )}

        <p className="text-xl font-bold text-primary">
          ₹{Number(product.price || 0).toLocaleString("en-IN")}
        </p>

        <div className="card-actions mt-2">

          <Link
            to={`/product/${id}`}
            className="btn btn-outline btn-sm"
          >
            View Details
          </Link>

          <button
            className="btn btn-primary btn-sm flex-1"
            onClick={() => onAddToCart?.(product)}
          >
            🛒 Add to Cart
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;