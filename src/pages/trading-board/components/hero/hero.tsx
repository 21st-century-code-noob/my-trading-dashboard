import cryptoBg from "@/assets/crypto-bg.jpg";

function Hero() {
  return (
    <section
      className="relative w-full rounded-2xl overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${cryptoBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center min-h-60 px-6 py-10 sm:min-h-75 sm:px-10 sm:py-14">
        <h1 className="text-2xl leading-tight sm:text-5xl font-bold text-white max-w-lg">
          Trade cryptocurrency with confidence
        </h1>
        <p className="mt-3 text-sm sm:text-xl text-white/80 max-w-md">
          Real-time market data, powerful charts, and advanced tools — all in one
          dashboard.
        </p>
      </div>
    </section>
  );
}

export default Hero;