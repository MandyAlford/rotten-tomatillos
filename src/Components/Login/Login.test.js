import React from "react";
import { Login } from "./Login";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { fetchUserRatings,fetchUserLogin } from "../../ApiCalls/ApiCalls";
jest.mock("../../ApiCalls/ApiCalls.js");


describe("Login", () => {
  let  mockLogin, mockShowModal, setup, mockGetUserRatings,mockUser;

  beforeEach(() => {
    jest.clearAllMocks();
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
      const { getByPlaceholderText, getByText } = render(setup);

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
      });
    });
  });
  describe("Login Sad ", () => {
    it("will do nothing given incorrect data format", async () => {
      const { getByPlaceholderText, getByText } = render(setup);

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
