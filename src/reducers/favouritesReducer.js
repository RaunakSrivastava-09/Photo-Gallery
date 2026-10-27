
function favouritesReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVOURITE":
      return [...state, action.photo];

    case "REMOVE_FAVOURITE":
      return state.filter((photo) => photo.id !== action.id);

    default:
      return state;
  }
}

export default favouritesReducer;
