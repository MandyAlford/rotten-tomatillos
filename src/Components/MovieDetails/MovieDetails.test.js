import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, waitFor, fireEvent } from "@testing-library/react";
import MovieDetails from "./MovieDetails";
import {
  getMovieDetails,
  submitRating,
  fetchUserRatings
} from "../../ApiCalls/ApiCalls";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "../../reducers/index";
jest.mock("../../ApiCalls/ApiCalls");

describe("MovieDetails Unit Tests", () => {
  let match, initialState, testStore, testWrapper;
  beforeEach(() => {
    match = {
      params: {
        movie_id: 1
      }
    };

    getMovieDetails.mockResolvedValue({
      movie: {
        id: 1,
        title: "Bloodshot",
        poster_path:
          "https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
        backdrop_path:
          "https://image.tmdb.org/t/p/original//ocUrMYbdjknu2TwzMHKT9PBBQRw.jpg",
        release_date: "2020-03-05",
        overview:
          "Science Movies with lab people and crazy tech.",
        average_rating: 7.5
      }
    });
    fetchUserRatings.mockResolvedValue({
      ratings: [{ id: 1, user_id: 1, movie_id: 1, rating: 7 }]
    });
  });

  describe("Logged in Tests", () => {
    beforeEach(() => {
      initialState = {
        user: { name: "Jeff", id: 1, email: "jeff@turing.io",ratings:[] }
      };
      testStore = createStore(rootReducer, initialState);

      testWrapper = (
        <Provider store={testStore}>
          <MemoryRouter initialEntries={["/movies/:movie_id"]}>
            <MovieDetails match={match} />
          </MemoryRouter>
        </Provider>
      );
    });
    it("renders correctly", async () => {
      const { getByText, getByAltText } = render(testWrapper);
      await waitFor(() => getByText("Bloodshot"));

      expect(getByText("Bloodshot")).toBeInTheDocument();
      expect(getByAltText("Bloodshot movie poster")).toBeInTheDocument();
      expect(getByText("Release Date: 2020-03-05")).toBeInTheDocument();
      expect(
        getByText(
          "Science Movies with lab people and crazy tech."
        )
      ).toBeInTheDocument();
      expect(getByText("7.5")).toBeInTheDocument();
    });

    it("user when logged in can modify rating", async () => {
      const { getByText, getByAltText, getByRole, debug } = render(testWrapper);
      await waitFor(() => getByText("Bloodshot"));

      let selectRating;
      await waitFor(() => {
        selectRating = getByRole("combobox", { name: "Select User Rating" });
      });
      expect(selectRating).toBeInTheDocument();
      fireEvent.change(selectRating, { target: { value: 4 } });
      expect(selectRating.value).toBe("4");
      fireEvent.change(selectRating, { target: { value: 6 } });
      expect(selectRating.value).toBe("6");
      let submitRatingDetails = getByText("Rate this movie");
      fireEvent.click(submitRatingDetails);
      await waitFor(() => expect(submitRating).toHaveBeenCalledWith(1, 1, 6));
    });
  });
  describe("Logged out Tests", () => {
    beforeEach(() => {
      initialState = {
        user: { name: "", id: null, email: "", ratings:[]}
      };
      testStore = createStore(rootReducer, initialState);

      testWrapper = (
        <Provider store={testStore}>
          <MemoryRouter initialEntries={["/movies/:movie_id"]}>
            <MovieDetails match={match} />
          </MemoryRouter>
        </Provider>
      );
    });

    it("should not render ability to change ratings", async () => {
      const {
        queryAllByText,
        getByText,
        getByAltText,
        getByRole,
        debug
      } = render(testWrapper);

      await waitFor(() => {
        expect(queryAllByText("Select User Rating")).toStrictEqual([]);
      });
    });
  });
});
