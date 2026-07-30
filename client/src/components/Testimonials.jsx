import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Neha Joshi",
    role: "Food Blogger",
    review:
      "Absolutely loved the desserts! Everything arrived fresh and tasted amazing.",
  },
  {
    name: "Aditya Mehta",
    role: "Regular Customer",
    review:
      "Fast delivery and fantastic quality. Munch has become my favorite dessert app.",
  },
  {
    name: "Vikram Nair",
    role: "Dessert Lover",
    review:
      "The cheesecake was incredible. Beautiful presentation and delicious flavors.",
  },
];

function Testimonials() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <p className="font-semibold text-orange-500">
            Testimonials
          </p>

          <h2 className="mt-2 text-4xl font-bold text-gray-900">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-gray-600">
            Thousands of happy customers enjoy Munch every day.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mb-6 text-gray-600">
                "{item.review}"
              </p>

              <h3 className="font-bold text-lg">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500">
                {item.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;