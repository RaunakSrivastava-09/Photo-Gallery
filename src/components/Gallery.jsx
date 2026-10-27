
import { useState, useReducer, useCallback, useMemo, useEffect } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import favouritesReducer from "../reducers/favouritesReducer";
import PhotoCard from "./PhotoCard";
import SearchBar from "./SearchBar";

function Gallery() {
  const { photos, loading, error } = useFetchPhotos();

  const [searchTerm, setSearchTerm] = useState("");

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    () => {
      try {
        return JSON.parse(localStorage.getItem("favourites")) || [];
      } catch {
        return [];
      }
    }
  );

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [photos, searchTerm]);

  const handleToggleFavourite = useCallback(
    (photo) => {
      const isFavourite = favourites.some(
        (item) => item.id === photo.id
      );

      if (isFavourite) {
        dispatch({
          type: "REMOVE_FAVOURITE",
          id: photo.id,
        });
      } else {
        dispatch({
          type: "ADD_FAVOURITE",
          photo,
        });
      }
    },
    [favourites]
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
          role="status"
          aria-label="Loading photos"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
        <p className="text-center text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Photo Gallery
        </h1>
        <p className="mt-2 text-gray-500">
          Discover beautiful photos and save your favourites.
        </p>
      </header>

      <div className="mx-auto mb-8 max-w-xl">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </div>

      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {filteredPhotos.length}{" "}
          {filteredPhotos.length === 1 ? "photo" : "photos"}
        </p>

        <p className="text-sm text-gray-600">
          ♥ {favourites.length} favourites
        </p>
      </div>

      {filteredPhotos.length === 0 ? (
        <p className="py-12 text-center text-gray-500">
          No photos found. Try another author name.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.some(
                (item) => item.id === photo.id
              )}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Gallery;
