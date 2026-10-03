import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";
import api from "../../services/api";

function PharmacyRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pharmacyName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    licenseNumber: "",
    password: "",
    latitude: "",
    longitude: "",
    deliveryAvailable: true,
    deliveryRadius: 5,  
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert(
      "Geolocation is not supported by this browser."
    );
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setFormData((prev) => ({
        ...prev,
        latitude:
          position.coords.latitude,
        longitude:
          position.coords.longitude,
      }));
    },
    () => {
      alert(
        "Unable to fetch location."
      );
    }
  );
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/pharmacy-auth/register",
        formData
      );

      navigate("/application-submitted");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 shadow-xl rounded-3xl w-full max-w-4xl p-8">
        
        <Link
          to="/"
          className="text-green-600 hover:underline"
        >
          ← Back to Home
        </Link>

        <div className="text-center mt-4 mb-8">
          <Building2
            size={60}
            className="mx-auto text-green-600"
          />

          <h1 className="text-3xl font-bold text-green-600 mt-3">
            Pharmacy Registration
          </h1>

          <p className="text-slate-500 dark:text-slate-300 mt-2">
            Register your pharmacy for verification and approval.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >
          {/* Pharmacy Name */}
          <div>
            <label className="block mb-2 font-medium dark:text-white">
              Pharmacy Name
            </label>

            <input
              type="text"
              name="pharmacyName"
              value={formData.pharmacyName}
              onChange={handleChange}
              placeholder="Apollo Pharmacy Whitefield"
              className="w-full border rounded-lg px-4 py-3 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              required
            />
          </div>

          {/* Owner Name */}
          <div>
            <label className="block mb-2 font-medium dark:text-white">
              Owner Name
            </label>

            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Dr. Rajesh Kumar"
              className="w-full border rounded-lg px-4 py-3 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium dark:text-white">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="apollo.whitefield@carebridge.com"
              className="w-full border rounded-lg px-4 py-3 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-medium dark:text-white">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full border rounded-lg px-4 py-3 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block mb-2 font-medium dark:text-white">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Bengaluru"
              className="w-full border rounded-lg px-4 py-3 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              required
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block mb-2 font-medium dark:text-white">
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="560066"
              className="w-full border rounded-lg px-4 py-3 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              required
            />
          </div>

          {/* License Number */}
          <div>
            <label className="block mb-2 font-medium dark:text-white">
              Drug License Number
            </label>

            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="DL-KA-BLR-2026-00125"
              className="w-full border rounded-lg px-4 py-3 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium dark:text-white">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create Password"
              className="w-full border rounded-lg px-4 py-3 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              required
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium dark:text-white">
              Pharmacy Address
            </label>

            <textarea
              rows="4"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="No. 45, ITPL Main Road, Whitefield, Bengaluru, Karnataka"
              className="w-full border rounded-lg px-4 py-3 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              required
            />
          </div>
<div className="md:col-span-2">
  <label className="block mb-2 font-medium dark:text-white">
    Pharmacy Location
  </label>

  <button
    type="button"
    onClick={getCurrentLocation}
    className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-700"
  >
    Use Current Location
  </button>

  <div className="grid md:grid-cols-2 gap-4">
    <input
      type="text"
      name="latitude"
      value={formData.latitude}
      onChange={handleChange}
      placeholder="Latitude"
      className="w-full border rounded-lg px-4 py-3 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
    />

    <input
      type="text"
      name="longitude"
      value={formData.longitude}
      onChange={handleChange}
      placeholder="Longitude"
      className="w-full border rounded-lg px-4 py-3 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
    />
  </div>
</div>
<div>
  <label className="block mb-2 font-medium dark:text-white">
    Delivery Available
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={formData.deliveryAvailable}
      onChange={(e) =>
        setFormData({
          ...formData,
          deliveryAvailable:
            e.target.checked,
        })
      }
    />

    Enable Delivery
  </label>
</div>

<div>
  <label className="block mb-2 font-medium dark:text-white">
    Delivery Radius (KM)
  </label>

  <input
    type="number"
    value={formData.deliveryRadius}
    onChange={(e) =>
      setFormData({
        ...formData,
        deliveryRadius: Number(
          e.target.value
        ),
      })
    }
    className="w-full border rounded-lg px-4 py-3 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
  />
</div>
          {/* License Upload UI */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium dark:text-white">
              Upload License Certificate
            </label>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full border rounded-lg p-3 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            />
          </div>

          {/* Info */}
          <div className="md:col-span-2 bg-green-50 dark:bg-slate-700 rounded-xl p-4 border border-green-100 dark:border-slate-600">
            <p className="text-green-700 dark:text-green-300 text-sm">
              📌 After submitting your application,
              our administrator will verify your
              pharmacy details and license certificate
              before approving access to the CareBridge platform.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="md:col-span-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition duration-300"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default PharmacyRegister;