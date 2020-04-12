import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "../../reducers";
import App from "./App";
import { getMovies } from "../../actions";
import { fetchMovies } from "../../ApiCalls/ApiCalls"

jest.mock('../../ApiCalls/ApiCalls');

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
      fetchMovies.mockResolvedValueOnce({
        movies: [{
          id: 1,
          title: 'mock-title',
          poster_path:'mock-poster-path',
          backdrop_path: 'mock-backdrop-path',
          release_date: '2020-04-05',
          overview: 'mock-overview',
          average_rating: 5
        },
        {
          id: 2,
          title: 'mock-title-2',
          poster_path:'mock-poster-path-2',
          backdrop_path: 'mock-backdrop-path-2',
          release_date: '2020-04-05',
          overview: 'mock-overview-2',
          average_rating: 5
        }]
      })
      const {  debug, getByText } = render(testWrapper);

      let title = await waitFor(() => getByText('mock-title'))

      expect(title).toBeInTheDocument()
    })

    it('should display an error messsage if movies arent fetched', async () => {
      // fetchMovies.mockRejectedValue(new Error('This is my error'))

      const { debug, getByText } = render(testWrapper);
      debug();
    })
  })
});
