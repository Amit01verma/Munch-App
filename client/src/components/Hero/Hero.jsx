import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import Container from "../common/Container";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 pt-16 pb-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <HeroContent />
          <HeroImage />
        </div>
        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />

<div className="absolute right-[-120px] bottom-0 h-80 w-80 rounded-full bg-yellow-200/20 blur-3xl" />
      </Container>
    </section>
  );
}

export default Hero;