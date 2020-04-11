import * as actions from "../actions";

describe("actions", () => {
  it("should have a type of LOGIN_USER and a correct payload", () => {
    const expectedAction = {
      type: "LOGIN_USER",
      user: {
        id: 4,
        name: "Greg",
        email: "greg@turing.io",
      },
    };

    const result = actions.login({
      user: {
        id: 4,
        name: "Greg",
        email: "greg@turing.io",
      },
    });

    expect(result).toEqual(expectedAction);
  });

  it("should have a type of LOGOUT_USER", () => {
    const expectedAction = {
      type: "LOGOUT_USER",
    };
    const result = actions.logout();

    expect(result).toEqual(expectedAction);
  });

  it("should have a type of SHOW_MODAL and  correct payload", () => {
    const expectedAction = {
      type: "SHOW_MODAL",
      isShowing: true,
    };

    const result = actions.showModal(true);

    expect(result).toEqual(expectedAction);
  });

  it("should have a type of GET_USER_RATINGS and correct payload", () => {
    const expectedAction = {
      type: "GET_USER_RATINGS",
      ratings: [
        {
          id: 63,
          user_id: 4,
          movie_id: 4,
          rating: 5,
        },
        {
          id: 66,
          user_id: 4,
          movie_id: 3,
          rating: 4,
        },
        {
          id: 65,
          user_id: 4,
          movie_id: 5,
          rating: 4,
        },
      ],
    };

    const result = actions.getUserRatings([
      {
        id: 63,
        user_id: 4,
        movie_id: 4,
        rating: 5,
      },
      {
        id: 66,
        user_id: 4,
        movie_id: 3,
        rating: 4,
      },
      {
        id: 65,
        user_id: 4,
        movie_id: 5,
        rating: 4,
      },
    ]);

    expect(result).toEqual(expectedAction);
  });

  it("should have a type of GET_MOVIES and correct payload", () => {
    const expectedAction = {
      type: "GET_MOVIES",
      movies: [{
        id: 1,
        title: "Bloodshot",
        poster_path: "https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original//ocUrMYbdjknu2TwzMHKT9PBBQRw.jpg",
        release_date: "2020-03-05",
        overview: "After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists.",
        average_rating: 6
      },
      {
        id: 2,
        title: "Sonic the Hedgehog",
        poster_path: "https://image.tmdb.org/t/p/original//aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original//stmYfCUGd8Iy6kAMBr6AmWqx8Bq.jpg",
        release_date: "2020-02-12",
        overview: "Based on the global blockbuster videogame franchise from Sega.",
        average_rating: 4.333333333333333
      }
      ]
    };

      const result = actions.getMovies([{
        id: 1,
        title: "Bloodshot",
        poster_path: "https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original//ocUrMYbdjknu2TwzMHKT9PBBQRw.jpg",
        release_date: "2020-03-05",
        overview: "After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists.",
        average_rating: 6
      },
      {
        id: 2,
        title: "Sonic the Hedgehog",
        poster_path: "https://image.tmdb.org/t/p/original//aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original//stmYfCUGd8Iy6kAMBr6AmWqx8Bq.jpg",
        release_date: "2020-02-12",
        overview: "Based on the global blockbuster videogame franchise from Sega.",
        average_rating: 4.333333333333333
      }
      ])
      expect(result).toEqual(expectedAction);
  });
});
