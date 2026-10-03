import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import TopHeader from "../../components/TopHeader";
import api from "../../services/api";

import {
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");

      setProfile(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setProfile({
    ...profile,
    [e.target.name]: e.target.value,
    });
    };

  const handleSave = async () => {
    try {
      setLoading(true);

      await api.put("/profile", {
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        pincode: profile.pincode,
      });
      setProfile(response.data.user);

      alert("✅ Profile Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("❌ Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 md:p-6">

        <TopHeader />

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 max-w-3xl mx-auto">

          <div className="flex flex-col items-center">

            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
              {profile.name?.charAt(0)}
            </div>

            <h1 className="text-2xl font-bold text-blue-600 mt-4">
              {profile.name}
            </h1>

            <p className="text-slate-500">
              {profile.role}
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div>
              <label className="flex items-center gap-2 mb-2">
                <User size={16} />
                Full Name
              </label>

              <input
                type="text"
                value={profile.name}
                readOnly
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2">
                <Mail size={16} />
                Email
              </label>

              <input
                type="email"
                value={profile.email}
                readOnly
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2">
                <Phone size={16} />
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2">
                <MapPin size={16} />
                City
              </label>

              <input
                type="text"
                name="city"
                value={profile.city}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block">
                Address
              </label>

              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block">
                State
              </label>

              <input
                type="text"
                name="state"
                value={profile.state}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block">
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={profile.pincode}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

          </div>

          <div className="mt-8">

            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              {loading
                ? "Saving..."
                : "Save Profile"}
            </button>

          </div>

        </div>
      </div>
    </AppLayout>
  );
}

export default Profile;
