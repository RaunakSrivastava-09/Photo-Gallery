
function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="relative">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          className="h-56 w-full object-cover"
          loading="lazy"
        />

        <button
          type="button"
          onClick={() => onToggleFavourite(photo)}
          aria-label={
            isFavourite ? "Remove from favourites" : "Add to favourites"
          }
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl shadow transition-colors ${
            isFavourite
              ? "text-red-500"
              : "text-gray-400 hover:text-red-500"
          }`}
        >
          {isFavourite ? "♥" : "♡"}
        </button>
      </div>

      <div className="p-4">
        <p className="font-medium text-gray-800">{photo.author}</p>
      </div>
    </div>
  );
}

export default PhotoCard;
