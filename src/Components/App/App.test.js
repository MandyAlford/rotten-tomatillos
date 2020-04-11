import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "../../reducers";
import App from "./App";

describe("APP Integration Tests", () => {
  let store, testWrapper;

  beforeEach(() => {
    store = createStore(rootReducer);
    testWrapper = (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  });

  it("Can render The App", () => {
    const { getByPlaceholderText, getByRole, getByText } = render(testWrapper);
    let navTitle = getByText("Rancid Tomatillos");
    expect(navTitle).toBeInTheDocument();
  });
  describe("Login User Flow",()=>{
    it("Can Show Modal", () => {
      //setup
      const { getByPlaceholderText, getByRole, getByText } = render(testWrapper);

      //Executions
      let signInBtn = getByRole("button", { label: "Sign In" });
      fireEvent.click(signInBtn);
      let loginForm = getByRole("form", { label: "Login Form" });
      let emailInput = getByPlaceholderText("email@provider.com");
      let passwordInput = getByPlaceholderText("Password");

      //assertions
      expect(loginForm).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    it("Can Login, Modal Closes, Displays userName in Header", async () => {
      //setup
      const { getByPlaceholderText, getByRole, getByText } = render(testWrapper);

      //Executions
      let signInBtn = getByRole("button", { label: "Sign In" });
      fireEvent.click(signInBtn);
      //Once Modal is rendered...grab find all the elements
      let emailInput = getByPlaceholderText("email@provider.com");
      let passwordInput = getByPlaceholderText("Password");
      let logInButton = getByText("Log in");
      let loginForm = getByRole("form", { label: "Login Form" });

      //Login
      fireEvent.change(getByPlaceholderText("email@provider.com"), {
        target: { value: "greg@turing.io" }
      });
      fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "abc123" }
      });

      fireEvent.click(logInButton);

      //assertions
      await waitFor(() => expect(loginForm).not.toBeInTheDocument());
      let userGreeting = getByText("Hello, Greg");
      expect(userGreeting).toBeInTheDocument();
    });
    it("Can reject Login, Doesnt close Modal", async () => {
      //setup
      const { getByPlaceholderText, getByRole, getByText } = render(
        testWrapper
      );

      //Executions
      let signInBtn = getByRole("button", { label: "Sign In" });
      fireEvent.click(signInBtn);
      //Once Modal is rendered...grab find all the elements
      let emailInput = getByPlaceholderText("email@provider.com");
      let passwordInput = getByPlaceholderText("Password");
      let logInButton = getByText("Log in");
      let loginForm = getByRole("form", { label: "Login Form" });

      //Login
      fireEvent.change(getByPlaceholderText("email@provider.com"), {
        target: { value: "gregturing.io" }
      });
      fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "abc123" }
      });
      fireEvent.click(logInButton);

      //assertion
      expect(loginForm).toBeInTheDocument();
      let userLoginErrorMsg = getByText("Email is not valid");
      expect(loginForm).toBeInTheDocument();
      expect(userLoginErrorMsg).toBeInTheDocument();
    });

  })
});
