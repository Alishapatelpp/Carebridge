function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-20">
      <h1 className="text-5xl md:text-7xl font-bold text-green-600">
        Find Medicines Faster
      </h1>

      <p className="mt-6 text-xl text-slate-500 max-w-3xl">
        Connect patients, pharmacies and healthcare services through
        one modern platform.
      </p>

      <div className="flex gap-4 mt-8">
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition">
          Get Started
        </button>

        <button className="border px-6 py-3 rounded-xl hover:bg-slate-100 transition">
          Learn More
        </button>
      </div>
    </section>
  );
}

export default Hero;