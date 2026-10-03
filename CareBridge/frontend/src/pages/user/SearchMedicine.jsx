import { useState } from "react";
import api from "../../services/api";

function SearchMedicine() {
  const [medicine, setMedicine] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        alert("Location captured successfully ✅");
      },
      (error) => {
        console.log(error);
        alert("Unable to get location");
      }
    );
  };

  const searchMedicine = async () => {
    if (!medicine.trim()) {
      alert("Please enter medicine name");
      return;
    }

    try {
      setLoading(true);

      const response = await api.get("/search", {
        params: {
          medicine,
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });

      setResults(response.data.results || []);
    } catch (error) {
      console.error(error);
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Search Medicine
      </h1>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={medicine}
          onChange={(e) =>
            setMedicine(e.target.value)
          }
          placeholder="Enter medicine name..."
          className="border p-3 rounded w-full"
        />

        <button
          onClick={searchMedicine}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded"
        >
          Search
        </button>
      </div>

      <button
        onClick={getLocation}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-6"
      >
        📍 Use Current Location
      </button>

      {loading && (
        <div className="text-center text-blue-600">
          Searching medicines...
        </div>
      )}

      {!loading && results.length === 0 && (
        <div className="bg-white shadow rounded p-4 text-gray-500">
          No medicines found
        </div>
      )}

      {results.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-5 mb-4 border"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-blue-700">
              {item.pharmacyName}
            </h2>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
              Stock: {item.stock}
            </span>
          </div>

          <p className="mt-2">
            <strong>Medicine:</strong>{" "}
            {item.medicine}
          </p>

          <p>
            <strong>Price:</strong> ₹
            {item.price}
          </p>

          <p>
            <strong>City:</strong>{" "}
            {item.city}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {item.pharmacyAddress}
          </p>

          <p>
            <strong>Distance:</strong>{" "}
            {item.distance
              ? `${item.distance} km`
              : "Not Available"}
          </p>

          <p>
            <strong>Expiry:</strong>{" "}
            {new Date(
              item.expiryDate
            ).toLocaleDateString()}
          </p>

          <div className="mt-4 flex gap-3">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded">
              Buy Now
            </button>

            <button className="bg-orange-500 text-white px-4 py-2 rounded">
              Upload Prescription
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchMedicine;