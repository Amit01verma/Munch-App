import {
  Clock3,
  ShieldCheck,
  Truck,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Fresh desserts delivered to your doorstep in minutes.",
  },
  {
    icon: Star,
    title: "Top Rated",
    description: "Thousands of happy customers trust Munch every day.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Ingredients",
    description: "Only premium ingredients are used in every order.",
  },
  {
    icon: Clock3,
    title: "Always Fresh",
    description: "Prepared fresh after you place your order.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-orange-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <p className="font-semibold text-orange-500">
            Why Choose Us
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            More Than Just Desserts
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            We combine delicious flavors, fast delivery, and premium quality
            to give you the best dessert experience.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  <Icon className="h-8 w-8 text-orange-500" />
                </div>

                <h3 className="mb-3 text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;