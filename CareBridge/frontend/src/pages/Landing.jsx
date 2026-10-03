import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import medicineBackground from "../assets/medicine-background.png";

import {
  Search,
  MapPin,
  FileText,
  Building2,
} from "lucide-react";

function Landing() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-black"
      }`}
      style={{
        backgroundImage: `linear-gradient(${
          darkMode
            ? "rgba(2, 6, 23, 0.68), rgba(2, 6, 23, 0.78)"
            : "rgba(248, 250, 252, 0.6), rgba(248, 250, 252, 0.78)"
        }), url(${medicineBackground})`,
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Hero />

      {/* Features */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-6 py-16"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">
            Our Features
          </h2>

          <p className="mt-3 text-slate-500">
            Everything you need to connect patients
            and pharmacies.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={
              <Search
                size={40}
                className="text-blue-500"
              />
            }
            title="Search Medicines"
            description="Find medicines instantly across nearby pharmacies."
            darkMode={darkMode}
          />

          <FeatureCard
            icon={
              <MapPin
                size={40}
                className="text-red-500"
              />
            }
            title="Nearby Pharmacies"
            description="Locate pharmacies near your current location."
            darkMode={darkMode}
          />

          <FeatureCard
            icon={
              <FileText
                size={40}
                className="text-green-500"
              />
            }
            title="Prescription Upload"
            description="Upload and track prescription verification status."
            darkMode={darkMode}
          />
        </div>
      </section>

      {/* Pharmacy Partner Section */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div
          className={`rounded-3xl p-10 text-center shadow-lg ${
            darkMode
              ? "bg-slate-900 border border-slate-700"
              : "bg-white border border-slate-200"
          }`}
        >
          <div className="flex justify-center mb-4">
            <Building2
              size={50}
              className="text-blue-600"
            />
          </div>

          <h2 className="text-3xl font-bold mb-4">
            Own a Pharmacy?
          </h2>

          <p className="text-slate-500 mb-6 max-w-2xl mx-auto">
            Join CareBridge and start receiving
            medicine orders from nearby patients.
            Manage inventory, verify prescriptions,
            and grow your business through our
            healthcare platform.
          </p>

          <Link
            to="/pharmacy-register"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300"
          >
            Register Pharmacy
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Landing;