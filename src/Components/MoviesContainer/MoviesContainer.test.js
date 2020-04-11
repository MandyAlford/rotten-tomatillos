import React from "react";
import { MoviesContainer } from "./MoviesContainer";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Movies Container", () => {
  it("should render the text we expect", () => {
    const { getByText } = render(
      <BrowserRouter>
        <MoviesContainer
          movies={[
            {
              id: 15,
              title: "Just Mercy",
              poster_path:
                "https://image.tmdb.org/t/p/original//4YJNp1cquIkX8JxFwkKNEFQ9tgr.jpg",
              backdrop_path:
                "https://image.tmdb.org/t/p/original//zNqsGEWHlXwFw8wod0HDkgrvsl8.jpg",
              release_date: "2019-12-25",
              overview:
                "The powerful true story of Harvard-educated lawyer Bryan Stevenson, who goes to Alabama to defend the disenfranchised and wrongly condemned — including Walter McMillian, a man sentenced to death despite evidence proving his innocence. Bryan fights tirelessly for Walter with the system stacked against them.",
              average_rating: 7.5,
            },
          ]}
        />
      </BrowserRouter>
    );
    const title = getByText("Just Mercy");
    const rating = getByText("7.5");
    const rating2 = getByText("out of 10");
    expect(title).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(rating2).toBeInTheDocument();
  });
});
