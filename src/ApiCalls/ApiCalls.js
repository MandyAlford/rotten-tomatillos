const BASE_URL = "https://rancid-tomatillos.herokuapp.com/api/v1/login";

export const fetchUserLogin = (userData) => {
  return fetch(BASE_URL, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => data);
};

export const getMovieDetails = () => {
  return fetch(
    "https://rancid-tomatillos.herokuapp.com/api/v1/movies"
  ).then((response) => response.json());
};

export const fetchUserRatings = (userId) => {
  return fetch(
    `https://rancid-tomatillos.herokuapp.com/api/v1/users/${userId}/ratings`
  ).then((response) => response.json());
};

export const submitRating = (userId, movieId, rating) => {
  return fetch(
    `https://rancid-tomatillos.herokuapp.com/api/v1/users/${userId}/ratings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie_id: movieId, rating: rating }),
    }
  ).then((response) => response.json());
};
