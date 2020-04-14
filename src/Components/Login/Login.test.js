import React from "react";
import { Login } from "./Login";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { fetchUserRatings,fetchUserLogin } from "../../ApiCalls/ApiCalls";
jest.mock("../../ApiCalls/ApiCalls.js");

// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import { rootReducer } from "../../reducers";

describe("Login", () => {
  let mockRatings, mockLogin, mockShowModal, setup, mockGetUserRatings,mockUser;

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
    mockLogin = jest.fn();
    mockShowModal = jest.fn();
    mockGetUserRatings = jest.fn();
    fetchUserLogin.mockResolvedValue({
      user: { email: "greg@turing.io", id: 1, name: "Greg" },
    });
    fetchUserRatings.mockResolvedValue({
      ratings: [{ id: 1, user_id: 1, movie_id: 1, rating: 7 }]
    });
    mockUser={name:'',id:null,email:'',ratings:[]}
    setup = (
      <BrowserRouter>
        <Login
          login={mockLogin}
          getUserRatings={mockGetUserRatings}
          showLoginModal={true}
          showModal={mockShowModal}
          user={mockUser}
        />
      </BrowserRouter>
    );
  });
  describe("Login Happy ", () => {
    it("sends the correct data up to app via Login", async () => {
      const { getByPlaceholderText, getByText, getByLabelText } = render(setup);

      fireEvent.change(getByPlaceholderText("email@provider.com"), {
        target: { value: "greg@turing.io" },
      });
      fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "abc123" },
      });
      fireEvent.click(getByText("Log in"));
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          user: {
            email: "greg@turing.io",
            id: 1,
            name: "Greg",
          },
        });
        // ID is also 1
      });
    });
  });
  describe("Login Sad ", () => {
    it("will do nothing given incorrect data format", async () => {
      const { getByPlaceholderText, getByText, getByLabelText } = render(setup);

      fireEvent.change(getByPlaceholderText("email@provider.com"), {
        target: { value: "greguring.io" },
      });
      fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "abc123" },
      });
      fireEvent.click(getByText("Log in"));
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledTimes(0);
      });
    });
  });
});
