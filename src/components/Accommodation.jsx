import { Heart, MapPin, Phone } from "lucide-react";


export default function Accommodation({
   data,
   disabled=false,
   isLiked=null,
    onLike=null,
    onUnlike=null,
}) {
  return (
    <div className="bg-darkslate-800 rounded-2xl p-4 shadow-soft text-white flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">{data.name}</h3>
        {
        !disabled &&
        <button
          onClick={() =>
            isLiked ? onUnlike(data._id) : onLike(data._id)
          }
          className="text-teal-400 hover:text-teal-300 transition-all"
          title={isLiked ? "Unlike" : "Like"}
        >
          <Heart
            className={`w-6 h-6 ${
              isLiked ? "fill-teal-400" : "fill-transparent"
            }`}
          />
        </button>
        }
      </div>

      <div className="text-sm text-darkslate-200">{data.city}</div>
      <div className="text-sm text-darkslate-200">{data.location}</div>

      <div className="text-darkslate-100">{data.address}</div>

      <div className="flex items-center gap-2 text-darkslate-200 text-sm">
        <Phone className="w-4 h-4" />
        <span>{data.phone}</span>
      </div>

      {data.map && (
        <div className="mt-2">
          <a
            href={data.map}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-teal-300 hover:underline flex items-center gap-1"
          >
            <MapPin className="w-4 h-4" />
            View on Map
          </a>
        </div>
      )}
    </div>
  );
}

// Accommodation.propTypes = {
//   data: PropTypes.object.isRequired,
//   isLiked: PropTypes.bool.isRequired,
//   handleLike: PropTypes.func.isRequired,
//   handleUnlike: PropTypes.func.isRequired,
// };
