import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import api from "../../services/api";

function Inventory() {
  const [inventory, setInventory] = useState([]);


  const [showModal, setShowModal] =
    useState(false);
    const [selectedMedicine, setSelectedMedicine] =
  useState(null);

const [editItem, setEditItem] =
  useState(null);

const [editForm, setEditForm] =
  useState({
    stock: "",
    price: "",
    expiryDate: "",
    storageInstruction: "",
  });

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      manufacturer: "",
      prescriptionRequired: false,
      dosageInfo: "",
      stock: "",
      price: "",
      expiryDate: "",
      storageInstruction: "",
    });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await api.get(
        "/pharmacy-inventory"
      );

      setInventory(
        response.data.inventory
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMedicine = async (id) => {
    try {
      await api.delete(
        `/pharmacy-inventory/${id}`
      );

      fetchInventory();
    } catch (error) {
      console.error(error);
    }
  };
const saveMedicine = async () => {
  try {
    await api.post(
      "/pharmacy-inventory",
      {
        medicineName: formData.name,
        manufacturer:
          formData.manufacturer,
        description:
          formData.description,
        dosageInformation:
          formData.dosageInfo,
        prescriptionRequired:
          formData.prescriptionRequired,
        stock: Number(formData.stock),
        price: Number(formData.price),
        expiryDate:
          formData.expiryDate,
        storageInstruction:
          formData.storageInstruction,
      }
    );

    alert(
      "Medicine added successfully ✅"
    );

    fetchInventory();

    setShowModal(false);

    setFormData({
      name: "",
      description: "",
      manufacturer: "",
      prescriptionRequired: false,
      dosageInfo: "",
      stock: "",
      price: "",
      expiryDate: "",
      storageInstruction: "",
    });

  } catch (error) {
    console.error(error);

    alert(
      error?.response?.data?.message ||
      "Failed to save medicine"
    );
  }
};

  const updateInventory = async () => {
  try {
    await api.put(
      `/pharmacy-inventory/${editItem._id}`,
      {
        stock: Number(editForm.stock),
        price: Number(editForm.price),
        expiryDate:
          editForm.expiryDate,
        storageInstruction:
          editForm.storageInstruction,
      }
    );

    fetchInventory();

    setEditItem(null);
    setSelectedMedicine(null);
    setEditForm({
      stock: "",
      price: "",
      expiryDate: "",
      storageInstruction: "",
      });
  } catch (error) {
    console.error(error);
    alert("Failed to update inventory");
  }
};

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6 transition-all duration-300">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-green-600">
            Inventory Management
          </h1>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition-all"
          >
            + Add Medicine
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden">

          <table className="w-full text-slate-900 dark:text-white">

            <thead className="bg-slate-200 dark:bg-slate-700">
              <tr>
                <th className="p-4 text-left">
                  Medicine
                </th>
                 <th className="p-4 text-left">
                  Manufacturer
                  </th>
                <th className="p-4 text-left">
                  Pharmacy
                </th>

                <th className="p-4 text-left">
                  Stock
                </th>

                <th className="p-4 text-left">
                  Price
                </th>

                <th className="p-4 text-left">
                  Prescription
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {inventory.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                  <td className="p-4">
                    {item.medicineName}
                  </td>
                   <td className="p-4">
                    {item.manufacturer}
                  </td>

                  <td className="p-4">
                    {item.pharmacy?.pharmacyName}
                  </td>

                  <td className="p-4">
                    {item.stock}
                  </td>

                  <td className="p-4">
                    ₹{item.price}
                  </td>

                  <td className="p-4">
                    {item.prescriptionRequired ? (
                      <span className="text-red-600 font-medium">
                        Required
                      </span>
                    ) : (
                      <span className="text-green-600 font-medium">
                        Not Required
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    {item.stock > 0 ? (
                      <span className="text-green-600 font-medium">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        Out Of Stock
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          setSelectedMedicine(item)
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>

                      <button
                        onClick={() => {
                          setEditItem(item);

                          setEditForm({
                            stock: item.stock,
                            price: item.price,
                            expiryDate:
                              item.expiryDate?.split("T")[0],
                            storageInstruction:
                              item.storageInstruction,
                          });
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteMedicine(item._id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

              {inventory.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-6 text-slate-500"
                  >
                    No Medicines Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-2xl">

              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                Add Medicine
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  type="text"
                  placeholder="Medicine Name"
                  className="border p-3 rounded-lg"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Manufacturer"
                  className="border p-3 rounded-lg"
                  value={formData.manufacturer}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      manufacturer:
                        e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="Stock"
                  className="border p-3 rounded-lg"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stock: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="Price"
                  className="border p-3 rounded-lg"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                />

                <input
                  type="date"
                  className="border p-3 rounded-lg"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expiryDate:
                        e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Storage Instruction"
                  className="border p-3 rounded-lg"
                  value={
                    formData.storageInstruction
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      storageInstruction:
                        e.target.value,
                    })
                  }
                />

              </div>

              <textarea
                placeholder="Description"
                rows="3"
                className="border p-3 rounded-lg w-full mt-4"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description:
                      e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Dosage Information"
                rows="2"
                className="border p-3 rounded-lg w-full mt-4"
                value={formData.dosageInfo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dosageInfo:
                      e.target.value,
                  })
                }
              />

              <label className="flex gap-2 items-center mt-4 text-slate-900 dark:text-white">

                <input
                  type="checkbox"
                  checked={
                    formData.prescriptionRequired
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      prescriptionRequired:
                        e.target.checked,
                    })
                  }
                />

                Prescription Required

              </label>

              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={
                    saveMedicine
                  }
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>

              </div>

            </div>

          </div>
        )}

        </div>
      {selectedMedicine && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-xl">

            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Medicine Details
            </h2>

            <div className="space-y-3 text-slate-900 dark:text-white">

              <p>
                <strong>Name:</strong>{" "}
                {selectedMedicine.medicineName}
              </p>

              <p>
                <strong>Manufacturer:</strong>{" "}
                {selectedMedicine.manufacturer}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {selectedMedicine.description}
              </p>

              <p>
                <strong>Dosage Info:</strong>{" "}
                {selectedMedicine.dosageInformation}
              </p>

              <p>
                <strong>Stock:</strong>{" "}
                {selectedMedicine.stock}
              </p>

              <p>
                <strong>Price:</strong> ₹
                {selectedMedicine.price}
              </p>

              <p>
                <strong>Expiry Date:</strong>{" "}
                {selectedMedicine.expiryDate
                ? new Date(
                selectedMedicine.expiryDate
                ).toLocaleDateString()
                : "N/A"}
              </p>

              <p>
                <strong>Storage:</strong>{" "}
                {
                  selectedMedicine.storageInstruction
                }
              </p>

              <p>
                <strong>Prescription:</strong>{" "}
                {selectedMedicine.prescriptionRequired
                  ? "Required"
                  : "Not Required"}
              </p>

              <p>
                <strong>Pharmacy:</strong>{" "}
                {selectedMedicine.pharmacy?.pharmacyName}
              </p>

            </div>

            <div className="flex justify-end mt-6">

              <button
                onClick={() =>
                  setSelectedMedicine(null)
                }
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}
      {editItem && (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-lg">

          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
            Edit Inventory
          </h2>

          <div className="space-y-4">

            <input
              type="number"
              placeholder="Stock"
              value={editForm.stock}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  stock: e.target.value,
                })
              }
              className="border rounded-lg p-3 w-full"
            />

            <input
              type="number"
              placeholder="Price"
              value={editForm.price}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  price: e.target.value,
                })
              }
              className="border rounded-lg p-3 w-full"
            />

            <input
              type="date"
              value={editForm.expiryDate}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  expiryDate:
                    e.target.value,
                })
              }
              className="border rounded-lg p-3 w-full"
            />

            <input
              type="text"
              placeholder="Storage Instruction"
              value={
                editForm.storageInstruction
              }
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  storageInstruction:
                    e.target.value,
                })
              }
              className="border rounded-lg p-3 w-full"
            />

          </div>

          <div className="flex justify-end gap-3 mt-6">

            <button
              onClick={() =>
                setEditItem(null)
              }
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              onClick={
                updateInventory
              }
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>

          </div>

        </div>

      </div>
    )}
    </AppLayout>
  );
}

export default Inventory;