import React from "react";
import Header from "./Header";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("header", () => {
  it("should render the text we expect", () => {
    const { getByText } = render(
      <Header
        user={{
          name: "Ed",
          id: 2,
          email: "ed@ed.com",
        }}
      />
    );
    const title = getByText("Rancid Tomatillos");
    const signOut = getByText("Sign Out");
    const greeting = getByText("Hello, Ed");
    expect(title).toBeInTheDocument();
    expect(signOut).toBeInTheDocument();
    expect(greeting).toBeInTheDocument();
  });

  it("should fire correct function when log out button clicked", () => {
    const mockLogOut = jest.fn();
    const { getByText } = render(
      <Header
        user={{
          name: "Ed",
          id: 2,
          email: "ed@ed.com",
        }}
        logout={mockLogOut}
      />
    );
    const signOut = getByText("Sign Out");
    fireEvent.click(signOut);
    expect(mockLogOut).toBeCalledTimes(1);
  });

  it("should fire correct function when log in button clicked", () => {
    const mockShowModal = jest.fn();
    const { getByText } = render(
      <Header
        user={{
          name: "",
          id: null,
          email: "",
        }}
        showModal={mockShowModal}
      />
    );
    const signIn = getByText("Sign In");
    fireEvent.click(signIn);
    expect(mockShowModal).toBeCalledTimes(1);
  });
});
