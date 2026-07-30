import hero from "../../assets/hero-dessert.png";
import { Star, Truck } from "lucide-react";
import FloatingCard from "./FloatingCard";

function HeroImage() {
  return (
    <div className="relative flex h-[600px] items-center justify-center lg:h-[680px]">
      {/* Background Glow */}
      <div className="absolute h-[650px] w-[650px] rounded-full bg-orange-300/20 blur-[280px]" />

      {/* Dessert */}
      <img
        src={hero}
        alt="Premium Dessert"
        className="
relative
z-10
pointer-events-none
w-[340px]
sm:w-[420px]
md:w-[550px]
lg:w-[760px]
xl:w-[900px]
2xl:w-[1000px]
-translate-y-10
lg:-translate-y-16
object-contain
drop-shadow-[0_40px_50px_rgba(0,0,0,0.22)]
transition
duration-500
hover:scale-105
"
      />

      {/* Rating */}
      <FloatingCard
        className="left-0 top-20"
        icon={<Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />}
        title="4.9 Rating"
        subtitle="2,000+ Reviews"
      />

      {/* Delivery */}
      <FloatingCard
        className="right-0 bottom-48"
        icon={<Truck className="h-6 w-6 text-orange-500" />}
        title="20 Min Delivery"
        subtitle="Fresh Everyday"
      />
    </div>
  );
}

export default HeroImage;
