import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

function Newsletter() {
  return (
    <section className="bg-[#FFF8F1] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 shadow-2xl">
          {/* Background Blur */}
<div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

<div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-yellow-300/10 blur-3xl"></div>
          <div className="grid items-center gap-10 px-10 py-12 md:grid-cols-2 md:px-14">
            {/* Left */}
            <div className="text-white">
              <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
                🍰 Freshly Crafted Every Day
              </span>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">
                Ready to Treat Yourself?
              </h2>

              <p className="mt-5 max-w-lg text-lg leading-8 text-orange-100">
                From creamy cheesecakes to rich brownies and refreshing ice
                creams, explore our handcrafted desserts made with premium
                ingredients and delivered fresh to your doorstep.
              </p>

              <Link to="/menu">
                <button className="group mt-8 flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-orange-500 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl">
  Explore Menu
  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
</button>
              </Link>
            </div>

            {/* Right */}
            <div className="flex justify-center md:-translate-y-4">
              <div className="rounded-3xl border border-white/20 bg-white/15 p-8 shadow-2xl backdrop-blur-xl transition duration-500 hover:-translate-y-2">
                <div className="animate-bounce text-7xl">
  🍰
</div>

                <div className="text-center text-white">

  <h3 className="mt-6 text-2xl font-bold">
    Freshly Crafted
  </h3>

  <p className="mt-3 text-orange-100">
    Premium Ingredients
  </p>

  <div className="mt-6 flex justify-center gap-2 text-yellow-300">
    <Star fill="currentColor" />
    <Star fill="currentColor" />
    <Star fill="currentColor" />
    <Star fill="currentColor" />
    <Star fill="currentColor" />
  </div>

  <p className="mt-4 text-sm text-orange-100">
    Made Fresh Every Day
  </p>
</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;