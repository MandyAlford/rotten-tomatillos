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
          key={3}
          id={3}
          title={"The Coma"}
          poster_path={
            "https://image.tmdb.org/t/p/original//7bjTzPQUV2KVI0HdUjf1l8lUoLF.jpg"
          }
          average_rating={4}
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
