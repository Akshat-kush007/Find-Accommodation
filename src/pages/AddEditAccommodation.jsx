import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/apiList";
import { Trash2, Pencil } from "lucide-react";

export default function AddEditAccommodation() {
  const { token } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    map: "",
    phone: "",
    city: "",
    location: "",
    address: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchAccommodations = async () => {
    try {
      const res = await apiConnector("GET", endpoints.GET_USER_ACCOMMODATION_API, null, {
        Authorization: `Bearer ${token}`,
      });
      setAccommodations(res?.data?.accommodations || []);
    } catch (err) {
      toast.error("Failed to fetch accommodations");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const endpoint = editingId ? endpoints.UPDATE_ACCOMMODATION_API : endpoints.ADD_ACCOMMODATION_API;
      const requestType = editingId ? "PUT" : "POST";
      const payload = editingId ? { ...form, accommodationId: editingId } : form;

      const res = await apiConnector(requestType, endpoint, payload, {
        Authorization: `Bearer ${token}`,
      });

      toast.success(editingId ? "Accommodation updated" : "Accommodation added");
      setForm({ name: "", map: "", phone: "", city: "", location: "", address: "" });
      setEditingId(null);

      fetchAccommodations();

    } catch (err) {
      toast.error("Operation failed");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await apiConnector("DELETE", endpoints.DELETE_ACCOMMODATION_API, { accommodationId: id }, {
        Authorization: `Bearer ${token}`,
      });
      toast.success("Accommodation deleted");
      fetchAccommodations();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      map: item.map || "",
      phone: item.phone,
      city: item.city,
      location: item.location,
      address: item.address,
    });
    setEditingId(item._id);
  };

  useEffect(() => {
    fetchAccommodations();
  }, []);

  return (
    <div className="min-h-screen w-full bg-darkslate-900 text-white font-inter px-4 flex justify-center">
      <div className="w-full max-w-[1260px] py-10">
        <h1 className="text-2xl font-semibold mb-6">Add / Edit Accommodation</h1>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Accommodation Name"
            className="p-2 rounded bg-darkslate-700"
          />

          <input
            name="map"
            value={form.map}
            onChange={handleChange}
            placeholder="Map (optional)"
            className="p-2 rounded bg-darkslate-700"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="p-2 rounded bg-darkslate-700"
          />

          {/* City Dropdown */}
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="p-2 rounded bg-darkslate-700"
          >
            <option value="">Select City</option>
            <option value="Delhi">Delhi</option>
          </select>

          {/* Location Dropdown */}
          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className="p-2 rounded bg-darkslate-700"
          >
            <option value="">Select Location</option>
            <option value="Vijay Nagar">Vijay Nagar</option>
            <option value="Roop Nagar">Roop Nagar</option>
            <option value="Hudson Lane">Hudson Lane</option>
            <option value="Shakti Nagar">Shakti Nagar</option>
            <option value="Patel Chest">Patel Chest</option>
            <option value="GTB Nagar">GTB Nagar</option>
            <option value="Kamala Nagar">Kamala Nagar</option>
            <option value="Mukherjee Nagar">Mukherjee Nagar</option>
          </select>

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="p-2 rounded bg-darkslate-700"
          />
        </div>


        <button onClick={handleSubmit} disabled={loading} className="btn btn-teal mb-10">
          {editingId ? "Update Accommodation" : "Add Accommodation"}
        </button>

        {/* Separator */}
        <div className="h-px bg-darkslate-600 mb-6" />

        {/* Accommodation List */}
        <div className="space-y-4">
          {accommodations.length === 0 ? (
            <p className="text-darkslate-300">No accommodations yet.</p>
          ) : (
            accommodations.map((item) => (
              <div key={item._id} className="bg-darkslate-800 p-4 rounded-2xl flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-darkslate-300 text-sm">{item.city} | {item.location}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="hover:text-yellow-400">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="hover:text-red-500">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
