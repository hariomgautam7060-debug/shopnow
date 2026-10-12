import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/api/products");

      console.log("Products response:", response.data);

      const data =
        response.data?.products ??
        response.data?.data ??
        response.data;

      setProducts(Array.isArray(data) ? data : []);
      setError("");

    } catch (error) {
      console.error("Products error:", error);

      setError(
        error.response?.data?.message ||
        "Products load nahi ho pa rahe. Backend check karo."
      );

    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const oldCart = JSON.parse(
      localStorage.getItem("shopnow_cart") || "[]"
    );

    const id = product._id || product.id;

    const existingIndex = oldCart.findIndex(
      (item) => (item._id || item.id) === id
    );

    if (existingIndex >= 0) {
      oldCart[existingIndex].quantity =
        (oldCart[existingIndex].quantity || 1) + 1;
    } else {
      oldCart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "shopnow_cart",
      JSON.stringify(oldCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    alert("Product added to cart");
  };

  const categories = useMemo(() => {
    return [
      "All Categories",
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {

      const text = `
        ${product.name || ""}
        ${product.description || ""}
      `.toLowerCase();

      const matchesSearch =
        text.includes(search.toLowerCase());

      const matchesCategory =
        category === "All Categories" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });

  }, [products, search, category]);

  return (
    <main className="min-h-screen bg-base-200 px-4 md:px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            All Products
          </h1>

          <p className="mt-2 opacity-60">
            Explore our latest products
          </p>

        </div>

        {/* Search & Category */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full md:flex-1 bg-base-100"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select select-bordered bg-base-100"
          >

            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>

        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-24">

            <span className="loading loading-spinner loading-lg text-primary"></span>

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="alert alert-error">

            <span>
              {error}
            </span>

          </div>
        )}

        {/* Products */}
        {!loading && !error && (
          <>

            <p className="mb-5 opacity-60">
              {filteredProducts.length} product(s) found
            </p>

            {filteredProducts.length === 0 ? (

              <div className="text-center py-24">

                <div className="text-7xl">
                  🛍️
                </div>

                <h2 className="text-2xl font-bold mt-4">
                  No Products Found
                </h2>

                <p className="opacity-60 mt-2">
                  Search ya category change karke try karo.
                </p>

              </div>

            ) : (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {filteredProducts.map((product) => (

                  <ProductCard
                    key={product._id || product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />

                ))}

              </div>

            )}

          </>
        )}

      </div>

    </main>
  );
}

export default Products;