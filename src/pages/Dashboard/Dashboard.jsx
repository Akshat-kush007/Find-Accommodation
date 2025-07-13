import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { apiConnector } from "../../services/apiConnector";
import { endpoints } from "../../services/apiList";
import Accommodation from "../../components/Accommodation";

export default function Dashboard() {
  const [accommodations, setAccommodations] = useState([]);
  const [likedAccommodations, setLikedAccommodations] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const fetchAccommodations = async () => {
    try {
      const res = await apiConnector("GET", endpoints.GET_ALL_ACCOMMODATION_API, null, {
        Authorization: `Bearer ${token}`,
      });
      setAccommodations(res?.data?.accommodations || []);
    } catch (err) {
      console.error("Failed to fetch accommodations", err);
      toast.error("Could not fetch accommodations");  
    }
  };

  const fetchLikedAccommodationIds = async () => {
    try {
      const res = await apiConnector("GET", endpoints.GET_LIKED_ACCOMMODATIONID_API, null, {
        Authorization: `Bearer ${token}`,
      });
      setLikedAccommodations(res?.data?.accommodations || []);
     
    } catch (err) {
      console.error("Failed to fetch liked accommodations", err);
      toast.error("Could not fetch liked accommodations");
    }
  };

  const handleLike = async (id) => {
    try {
      await apiConnector("POST", endpoints.LIKE_ACCOMMODATION_API, {
        accommodationId: id,
      }, {
        Authorization: `Bearer ${token}`,
      });
      fetchLikedAccommodationIds(); // update liked state only
    } catch (err) {
      toast.error("Failed to like accommodation");
    }
  };

  const handleUnlike = async (id) => {
    try {
      await apiConnector("POST", endpoints.UNLIKE_ACCOMMODATION_API, {
        accommodationId: id,
      }, {
        Authorization: `Bearer ${token}`,
      });
      fetchLikedAccommodationIds(); // update liked state only
    } catch (err) {
      toast.error("Failed to unlike accommodation");
    }
  };

  const [locationFilter, setLocationFilter] = useState("");


  useEffect(() => {
    fetchAccommodations();
    fetchLikedAccommodationIds();
  }, []);

  return (
    <div className="min-h-screen w-full bg-darkslate-900 text-white font-inter px-4 flex justify-center">
      <div className="w-full max-w-[1260px] py-10">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            className="btn btn-teal"
            onClick={() => navigate("/accommodation")}
          >
            Add/Edit Accommodation
          </button>
          <button
            className="btn btn-outline"
            onClick={() => navigate("/favorites")}
          >
            Liked Accommodations
          </button>
        </div>

        {/* Sepration */}
        <div className="h-px bg-darkslate-600 mb-6" />

        {/* Filter */}
        <div className="flex justify-end mb-4">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="p-2 bg-darkslate-700 text-white rounded"
          >
            <option value="">All Locations</option>
            <option value="Vijay Nagar">Vijay Nagar</option>
            <option value="Roop Nagar">Roop Nagar</option>
            <option value="Hudson Lane">Hudson Lane</option>
            <option value="Shakti Nagar">Shakti Nagar</option>
            <option value="Patel Chest">Patel Chest</option>
            <option value="GTB Nagar">GTB Nagar</option>
            <option value="Kamala Nagar">Kamala Nagar</option>
            <option value="Mukherjee Nagar">Mukherjee Nagar</option>
          </select>
        </div>



        {/* Accommodation List */}
        {accommodations.length === 0 ? (
          <p className="text-darkslate-300">No accommodations found.</p>
        ) : (
          <div className="space-y-6">
            {accommodations
            .filter((item) => !locationFilter || item.location === locationFilter)
            .map((item) => (
              <Accommodation
                key={item._id}
                data={item}
                isLiked={likedAccommodations.includes(item._id)}
                onLike={() => handleLike(item._id)}
                onUnlike={() => handleUnlike(item._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
