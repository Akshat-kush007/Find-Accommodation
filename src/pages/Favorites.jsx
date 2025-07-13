import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/apiList";
import { toast } from "react-toastify";
import Accommodation from "../components/Accommodation";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const fetchFavorites = async () => {
    try {
      const res = await apiConnector(
        "GET",
        endpoints.GET_LIKED_ACCOMMODATION_API,
        null,
        { Authorization: `Bearer ${token}` }
      );
      setFavorites(res?.data?.accommodations || []);
    } catch (err) {
      console.error("Failed to fetch favorites", err);
      toast.error("Could not fetch favorite accommodations");
    }
  };

  const handleUnlike = async (id) => {
    try {
      await apiConnector(
        "POST",
        endpoints.UNLIKE_ACCOMMODATION_API,
        { accommodationId: id },
        { Authorization: `Bearer ${token}` }
      );
      fetchFavorites(); // Refresh list
    } catch (err) {
      toast.error("Failed to unlike accommodation");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="min-h-screen w-full bg-darkslate-900 text-white font-inter px-4 flex justify-center">
      <div className="w-full max-w-[1260px] py-10">
        <h1 className="text-2xl font-semibold mb-6">Liked Accommodations</h1>

        {favorites.length === 0 ? (
          <p className="text-darkslate-300">You haven’t liked any accommodations yet.</p>
        ) : (
          <div className="space-y-6">
            {favorites.map((item) => (
              <Accommodation
                key={item._id}
                data={item}
                isLiked={true}
                onLike={() => {}}
                onUnlike={() => handleUnlike(item._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
