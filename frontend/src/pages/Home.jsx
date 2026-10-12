import { Link } from "react-router-dom";

function Home() {
  return (
    <main>

      {/* ================= HERO SECTION ================= */}

      <section className="min-h-[75vh] bg-base-200 flex items-center">

        <div className="max-w-7xl mx-auto w-full px-6 py-16">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}

            <div>

              <div className="badge badge-primary badge-lg mb-5">
                🛍️ Welcome to ShopNow
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">

                Everything You Need

                <span className="text-primary block">
                  In One Place.
                </span>

              </h1>

              <p className="text-lg opacity-70 mt-6 max-w-xl leading-relaxed">

                Discover quality products at great prices.
                Shop easily, securely and comfortably with
                ShopNow.

              </p>

              {/* Buttons */}

              <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <Link
                  to="/products"
                  className="btn btn-primary btn-lg"
                >
                  Shop Now →
                </Link>

                <Link
                  to="/signup"
                  className="btn btn-outline btn-lg"
                >
                  Create Account
                </Link>

              </div>

              {/* Small Features */}

              <div className="flex flex-wrap gap-6 mt-8 text-sm">

                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    🚚
                  </span>
                  <span>
                    Fast Delivery
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    🔒
                  </span>
                  <span>
                    Secure Shopping
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    💰
                  </span>
                  <span>
                    Best Prices
                  </span>
                </div>

              </div>

            </div>

            {/* Right Visual */}

            <div className="flex justify-center">

              <div className="relative">

                {/* Main Box */}

                <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/10 flex items-center justify-center">

                  <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-primary/20 flex items-center justify-center">

                    <span className="text-[100px] md:text-[140px]">
                      🛍️
                    </span>

                  </div>

                </div>

                {/* Floating Cards */}

                <div className="absolute -top-3 -right-2 md:right-0 card bg-base-100 shadow-xl">

                  <div className="card-body p-4">

                    <span className="text-2xl">
                      ⭐
                    </span>

                    <p className="font-bold">
                      Quality Products
                    </p>

                  </div>

                </div>

                <div className="absolute -bottom-4 -left-2 md:left-0 card bg-base-100 shadow-xl">

                  <div className="card-body p-4">

                    <span className="text-2xl">
                      🔥
                    </span>

                    <p className="font-bold">
                      Great Deals
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="bg-base-100 px-6 py-16">

        <div className="max-w-7xl mx-auto">

          <div className="text-center">

            <h2 className="text-4xl font-bold">
              Why Choose ShopNow?
            </h2>

            <p className="opacity-60 mt-3 max-w-xl mx-auto">
              We make online shopping simple,
              convenient and reliable.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-6 mt-10">

            {/* Feature 1 */}

            <div className="card bg-base-200 shadow-md hover:shadow-xl transition">

              <div className="card-body text-center">

                <div className="text-5xl">
                  🚚
                </div>

                <h3 className="text-xl font-bold mt-3">
                  Fast Delivery
                </h3>

                <p className="opacity-60 mt-2">
                  Get your products delivered
                  quickly and safely.
                </p>

              </div>

            </div>


            {/* Feature 2 */}

            <div className="card bg-base-200 shadow-md hover:shadow-xl transition">

              <div className="card-body text-center">

                <div className="text-5xl">
                  🔒
                </div>

                <h3 className="text-xl font-bold mt-3">
                  Secure Shopping
                </h3>

                <p className="opacity-60 mt-2">
                  Your account and shopping
                  experience are kept secure.
                </p>

              </div>

            </div>


            {/* Feature 3 */}

            <div className="card bg-base-200 shadow-md hover:shadow-xl transition">

              <div className="card-body text-center">

                <div className="text-5xl">
                  💰
                </div>

                <h3 className="text-xl font-bold mt-3">
                  Great Prices
                </h3>

                <p className="opacity-60 mt-2">
                  Discover products at prices
                  that fit your budget.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SHOPPING CATEGORIES ================= */}

      <section className="bg-base-200 px-6 py-16">

        <div className="max-w-7xl mx-auto">

          <div className="text-center">

            <h2 className="text-4xl font-bold">
              Start Shopping
            </h2>

            <p className="opacity-60 mt-3">
              Explore our products and find
              something you love.
            </p>

          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

            {/* Card 1 */}

            <Link
              to="/products"
              className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
            >

              <div className="card-body items-center text-center">

                <div className="text-6xl">
                  👕
                </div>

                <h3 className="text-xl font-bold">
                  Fashion
                </h3>

                <p className="text-sm opacity-60">
                  Explore fashion products
                </p>

              </div>

            </Link>


            {/* Card 2 */}

            <Link
              to="/products"
              className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
            >

              <div className="card-body items-center text-center">

                <div className="text-6xl">
                  📱
                </div>

                <h3 className="text-xl font-bold">
                  Electronics
                </h3>

                <p className="text-sm opacity-60">
                  Discover latest gadgets
                </p>

              </div>

            </Link>


            {/* Card 3 */}

            <Link
              to="/products"
              className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
            >

              <div className="card-body items-center text-center">

                <div className="text-6xl">
                  🏠
                </div>

                <h3 className="text-xl font-bold">
                  Home
                </h3>

                <p className="text-sm opacity-60">
                  Make your home better
                </p>

              </div>

            </Link>


            {/* Card 4 */}

            <Link
              to="/products"
              className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
            >

              <div className="card-body items-center text-center">

                <div className="text-6xl">
                  🎁
                </div>

                <h3 className="text-xl font-bold">
                  More
                </h3>

                <p className="text-sm opacity-60">
                  Explore all products
                </p>

              </div>

            </Link>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="bg-primary text-primary-content px-6 py-20">

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Start Shopping?
          </h2>

          <p className="mt-4 opacity-90 text-lg">
            Explore our products and find
            exactly what you need.
          </p>

          <Link
            to="/products"
            className="btn btn-neutral btn-lg mt-8"
          >
            Browse Products →
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Home;