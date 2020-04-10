const BASE_URL = "https://rancid-tomatillos.herokuapp.com/api/v1/login";

export const fetchUserLogin = (userData) => {
  return fetch(BASE_URL, {
    method: "Post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(data => data);
};

export const getMovieDetails = () => {
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
    .then(response => response.json());
};
