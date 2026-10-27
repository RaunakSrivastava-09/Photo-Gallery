# Celebrare Photo Gallery

A responsive photo gallery application built using React, Vite, and Tailwind CSS. Users can browse photos, search by author name, and save their favourite photos.

## Features

- Fetches 30 photos from the Picsum Photos API.
- Responsive gallery with 4 columns on desktop, 2 on tablets, and 1 on mobile.
- Live search by author name without additional API requests.
- Add and remove favourite photos using a heart icon.
- Persist favourites using browser localStorage.
- Loading spinner while fetching photos.
- Error handling with a retry option.
- Displays a message when no photos match the search.
- Uses React Hooks for state management and performance optimization.

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript (ES6+)
- Picsum Photos API
- Browser localStorage

## Project Structure

```text
celebrare-photo-gallery/
├── src/
│   ├── components/
│   │   ├── Gallery.jsx
│   │   ├── PhotoCard.jsx
│   │   └── SearchBar.jsx
│   ├── hooks/
│   │   └── useFetchPhotos.js
│   ├── reducers/
│   │   └── favouritesReducer.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md