import React from "react";
import {Login} from "./Login";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { fetchUserLogin } from "../../ApiCalls/ApiCalls";
jest.mock("../../ApiCalls/ApiCalls.js");

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../reducers';

describe("Login", () => {
  it("sends the correct data up to app via Login", async () => {
    const store = createStore(rootReducer);

    const mockLogin = jest.fn();
    const mockShowModal = jest.fn();
    fetchUserLogin.mockResolvedValue({
      user: { email: "greg@turing.io", id: 1, name: "Greg" }
    });
    const { getByPlaceholderText, getByText, getByLabelText } = render(
        <BrowserRouter>
          <Login login={mockLogin} show={true} showModal = {mockShowModal}/>
        </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText("email@provider.com"), {
      target: { value: "greg@turing.io" }
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "abc123" }
    });
    fireEvent.click(getByText("Log in"));
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        user: {
          email: "greg@turing.io",
          id: 1,
          name: "Greg"
        }
      });
    });
  });
  it("will do nothing given incorrect data format", async () => {
    const mockLogin = jest.fn();
    const store = createStore(rootReducer);
    const mockShowModal = jest.fn();
    fetchUserLogin.mockResolvedValue({
      user: { email: "greg@turing.io", id: 1, name: "Greg" }
    });
    const { getByPlaceholderText, getByText, getByLabelText } = render(
        <BrowserRouter>
          <Login login={mockLogin} show={true} showModal = {mockShowModal}/>
        </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText("email@provider.com"), {
      target: { value: "greguring.io" }
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "abc123" }
    });
    fireEvent.click(getByText("Log in"));
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(0)
    });
  });
});
