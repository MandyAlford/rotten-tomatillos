import React from "react";
import MovieCard from "./MovieCard";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

describe("Movie Card", () => {
  it("should render the text we expect", () => {
    const { getByText } = render(
      <BrowserRouter>
        <MovieCard
          movie={{
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
          }}
        />
      </BrowserRouter>
    );
    const title = getByText("The Coma");
    const rating = getByText("4.0");
    const rating2 = getByText("out of 10");
    expect(title).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(rating2).toBeInTheDocument();
  });
});
