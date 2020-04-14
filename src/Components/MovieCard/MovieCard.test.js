import React from "react";
import { MovieCard } from "./MovieCard";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "../../reducers";

describe("Movie Card", () => {
  const store = createStore(rootReducer);

  let mockMovie, mockUser, mockRatings, mockUser2, mockRatings2;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRatings = [
      {
        id: 63,
        user_id: 4,
        movie_id: 4,
        rating: 5,
        created_at: "2020-04-11T02:21:06.101Z",
        updated_at: "2020-04-11T02:21:06.101Z",
      },
    ];
    mockRatings2 = [
      {
        id: 63,
        user_id: 4,
        movie_id: 36,
        rating: 5,
        created_at: "2020-04-11T02:21:06.101Z",
        updated_at: "2020-04-11T02:21:06.101Z",
      },
    ];
    mockUser = {
      name: "ed",
      email: "ed@ed.com",
      id: 2,
      ratings: mockRatings,
    };
    mockUser2 = {
      name: "ed",
      email: "ed@ed.com",
      id: 2,
      ratings: mockRatings2,
    };
    mockMovie = {
      id: 36,
      title: "The Coma",
      poster_path:
        "https://image.tmdb.org/t/p/original//7bjTzPQUV2KVI0HdUjf1l8lUoLF.jpg",
      backdrop_path:
        "https://image.tmdb.org/t/p/original//j4B8G5yKRnTO655uvpQBXt4Ok08.jpg",
      release_date: "2020-02-28",
      overview:
        "Geiz, Majesty is the first installment of the Kamen Rider Zi-O NEXT TIME series of V-Cinema films for Kamen Rider Zi-O. It focuses on the character Geiz Myokoin.",
      average_rating: 4,
    };
  });

  it("should render the text we expect", () => {
    const store = createStore(rootReducer);

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MovieCard user={mockUser} movie={mockMovie} />
        </BrowserRouter>
      </Provider>
    );
    const title = getByText("The Coma");
    const rating = getByText("4.0");
    expect(title).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
  });

  it("should not render user rating if one does not exist", () => {
    const store = createStore(rootReducer);

    const { queryByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MovieCard user={mockUser} movie={mockMovie} />
        </BrowserRouter>
      </Provider>
    );
    expect(queryByText("your-rating")).toBeNull();
  });

  it("should render the user score if a rating exists", () => {
    const store = createStore(rootReducer);

    const { queryByText, getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MovieCard user={mockUser2} movie={mockMovie} />
        </BrowserRouter>
      </Provider>
    );
    expect(queryByText("Your rating")).toBeInTheDocument();
    expect(getByText("5.0")).toBeInTheDocument();
  });
});
