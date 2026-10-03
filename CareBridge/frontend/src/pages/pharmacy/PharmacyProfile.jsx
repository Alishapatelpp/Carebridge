import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import api from "../../services/api";

function PharmacyProfile() {
  const [profile, setProfile] = useState(null);

  const [editMode, setEditMode] =
    useState(false);

  const [formData, setFormData] =
    useState({
      phone: "",
      address: "",
      city: "",
      pincode: "",
      latitude: "",
      longitude: "",
      deliveryAvailable: true,
    deliveryRadius: 5,
    });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get(
        "/pharmacy-profile"
      );

      const pharmacy =
        response.data.pharmacy;

      setProfile(pharmacy);

      setFormData({
        phone: pharmacy.phone ?? "",
        address:
          pharmacy.address ?? "",
        city: pharmacy.city ?? "",
        pincode:
          pharmacy.pincode ?? "",
        latitude:
          pharmacy.location
            ?.latitude ?? "",
        longitude:
          pharmacy.location
            ?.longitude ?? "",
            deliveryAvailable:
            pharmacy.deliveryAvailable ?? true,
             
            deliveryRadius:
            pharmacy.deliveryRadius ?? 5,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
  const { name, value, type, checked } =
    e.target;

  setFormData({
    ...formData,
    [name]:
      type === "checkbox"
        ? checked
        : value,
  });
};
  const saveProfile = async () => {
    try {
      await api.put(
        "/pharmacy-profile",
        formData
      );

      alert(
        "Profile updated successfully ✅"
      );

      setEditMode(false);

      fetchProfile();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data
          ?.message ||
          "Update Failed"
      );
    }
  };

  if (!profile) {
    return (
      <AppLayout>
        <div className="p-6">
          Loading...
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6">
        <h1 className="text-4xl font-bold text-green-600 mb-6">
          Pharmacy Profile
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="font-semibold block mb-1">
                Pharmacy Name
              </label>

              <p>
                {profile.pharmacyName}
              </p>
            </div>

            <div>
              <label className="font-semibold block mb-1">
                Owner Name
              </label>

              <p>
                {profile.ownerName}
              </p>
            </div>

            <div>
              <label className="font-semibold block mb-1">
                Email
              </label>

              <p>
                {profile.email}
              </p>
            </div>

            <div>
              <label className="font-semibold block mb-1">
                License Number
              </label>

              <p>
                {profile.licenseNumber}
              </p>
            </div>

            <div>
              <label className="font-semibold block mb-1">
                Status
              </label>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  profile.status ===
                  "Approved"
                    ? "bg-green-100 text-green-700"
                    : profile.status ===
                      "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {profile.status}
              </span>
            </div>

            <div>
              <label className="font-semibold block mb-1">
                Registered On
              </label>

              <p>
                {new Date(
                  profile.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <label className="font-semibold block mb-1">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border rounded-lg p-3 ${
                  editMode
                    ? "bg-white"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border rounded-lg p-3 ${
                  editMode
                    ? "bg-white"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border rounded-lg p-3 ${
                  editMode
                    ? "bg-white"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">
                Latitude
              </label>

              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border rounded-lg p-3 ${
                  editMode
                    ? "bg-white"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">
                Longitude
              </label>

              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border rounded-lg p-3 ${
                  editMode
                    ? "bg-white"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold block mb-1">
                Address
              </label>

              <textarea
                rows="4"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border rounded-lg p-3 ${
                  editMode
                    ? "bg-white"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
<div>
  <label className="font-semibold block mb-2">
    Delivery Available
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      name="deliveryAvailable"
      checked={formData.deliveryAvailable}
      disabled={!editMode}
      onChange={(e) =>
        setFormData({
          ...formData,
          deliveryAvailable: e.target.checked,
        })
      }
    />

    Enable Delivery
  </label>
</div>

<div>
  <label className="font-semibold block mb-2">
    Delivery Radius (KM)
  </label>

  <input
    type="number"
    name="deliveryRadius"
    value={formData.deliveryRadius}
    disabled={
      !editMode ||
      !formData.deliveryAvailable
    }
    onChange={(e) =>
      setFormData({
        ...formData,
        deliveryRadius: Number(
          e.target.value
        ),
      })
    }
    className={`w-full border rounded-lg p-3 ${
      editMode
        ? "bg-white"
        : "bg-gray-100 cursor-not-allowed"
    }`}
  />
</div>
            
<div className="md:col-span-2 bg-green-50 p-4 rounded-lg">
  <h3 className="font-semibold text-green-700">
    Delivery Information
  </h3>

  <p className="text-sm mt-2">
    Status:
    {formData.deliveryAvailable
      ? " ✅ Enabled"
      : " ❌ Disabled"}
  </p>

  <p className="text-sm">
    Radius:
    {formData.deliveryRadius} KM
  </p>
</div>
          </div>

          <div className="mt-6 flex gap-3">

            {!editMode ? (
              <button
                onClick={() =>
                  setEditMode(true)
                }
                className="bg-green-600 text-white px-5 py-3 rounded-lg"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={saveProfile}
                  className="bg-green-600 text-white px-5 py-3 rounded-lg"
                >
                  Save Changes
                </button>

                <button
                  onClick={() =>
                    setEditMode(false)
                  }
                  className="bg-gray-600 text-white px-5 py-3 rounded-lg"
                >
                  Cancel
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default PharmacyProfile;