import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/apiList";
import Accommodation from "../components/Accommodation";

// const AGENT_API = import.meta.env.AGENT_API;

export default function AiSearch() {
    const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("Delhi");
  const [location, setLocation] = useState("vijay Nagar");
  const [accommodations, setAccommodations] = useState([]);

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // === AI Handler ===
  const fetchAcc = async () => {
    try {
        setLoading(true);
        const query = `Give me list of Pg in Delhi city ${location} Location response should be in json format a list contain json object, each object contain name, city, location, address, phone. Use Tool SerpAPI for websearch`;
        
        const response = await apiConnector("POST", endpoints.AI_API, {
            query,
        });
        
        const rawOutput = response.data.output;
        console.log("Raw Output: ", rawOutput);
        const cleaned = rawOutput.replace(/```json|```/g, "").trim();
        
        try {
            const pgList = JSON.parse(cleaned);
            setAccommodations(pgList || []);
            console.log(pgList);
        } catch (error) {
            console.error("Failed to parse PG list:", error);
            toast.error("Error parsing AI response.");
        }
    } catch (err) {
        console.error("fetchAcc Error: ", err);
        toast.error("Failed to fetch accommodations.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAcc();
  }, []);

  return (
    <div className="min-h-screen w-full bg-darkslate-900 text-white font-inter px-4 flex justify-center">
      <div className="w-full max-w-[1260px] py-10">
        <h1 className="text-2xl font-semibold mb-6">AI Search Results</h1>

        {/* Dropdown + Button */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* City Dropdown */}
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-darkslate-800 text-white p-2 rounded"
          >
            <option value="Delhi">Delhi</option>
          </select>

          {/* Location Dropdown */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-darkslate-800 text-white p-2 rounded"
          >
            <option value="vijay Nagar">Vijay Nagar</option>
            <option value="GTB Nagar">GTB Nagar</option>
            <option value="Roop Nagar">Roop Nagar</option>
            <option value="Shakti Nagar">Shakti Nagar</option>
          </select>

          {/* Search Button */}
          <button
            disabled={loading}
            onClick={fetchAcc}
            className={`btn btn-teal px-4 py-2 rounded shadow-soft font-semibold ${loading? "opacity-60": "opacity-100"}`}
          >
            {loading? "Loading...": "Search"}
          </button>
        </div>

        {/* Sepration */}
        <div className="h-px bg-darkslate-600 mb-6" />

        {/* Accommodation List */}
        {accommodations.length === 0 ? (
          <p className="text-darkslate-300">No accommodations found.</p>
        ) : (
          <div className="space-y-6">
            {accommodations.map((item, index) => (
              <Accommodation key={index} data={item} disabled={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
