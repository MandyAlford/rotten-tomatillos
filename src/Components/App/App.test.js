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
    let signInBtn,loginForm,emailInput,passwordInput,loginVariables,logInButton
    beforeEach(()=>{
      loginVariables = (getByPlaceholderText, getByRole, getByText) =>{
        signInBtn = getByRole("button", { label: "Sign In" });
        fireEvent.click(signInBtn);
        loginForm = getByRole("form", { label: "Login Form" });
        emailInput = getByPlaceholderText("email@provider.com");
        passwordInput = getByPlaceholderText("Password");
        logInButton = getByText("Log in");
      }
    })
    it("Can Show Login Modal", () => {
      //setup
      const { getByPlaceholderText, getByRole, getByText } = render(testWrapper);

      //Executions
      loginVariables(getByPlaceholderText,getByRole,getByText);
      //assertions
      expect(loginForm).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    it("Can Login, Modal Closes, Displays userName in Header", async () => {
      //setup
      const { getByPlaceholderText, getByRole, getByText } = render(testWrapper);
      //Executions
      loginVariables(getByPlaceholderText,getByRole,getByText);

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
      loginVariables(getByPlaceholderText, getByRole, getByText)
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

  describe("Movie User Story", () => {
    it("Displays Movies to the Page", async () => {
      //You guys will do great!
    })
  })
});
