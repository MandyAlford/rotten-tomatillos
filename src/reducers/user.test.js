import { user } from "../reducers/user";

describe("Reducer: showLoginModal", () => {
  it("should return the initial state", () => {
    // Setup
    const expected = {
      name: "",
      id: null,
      email: ""
    };

    // Execution
    const result = user(undefined, {});

    // Expectation
    expect(result).toEqual(expected);
  });

  it("should login user", () => {
    // Setup
    const expected = {
      name: "greg",
      id: 1,
      email: "greg@turing.io"
    };
    const mockUserData = {
      name: "greg",
      id: 1,
      email: "greg@turing.io"
    };
    const action = { type: "LOGIN_USER", user: mockUserData };

    // Execution
    const result = user(undefined, action);

    // Expectation
    expect(result).toEqual(expected);
  });
  it("should logout a user", () => {
    // Setup
    const expected = {
      name: "",
      id: null,
      email: ""
    };
    const mockUserData = {
      name: "greg",
      id: 1,
      email: "greg@turing.io"
    };

    // Execution
    const actionLogout = { type: "LOGOUT_USER" };
    const resultLogout = user(mockUserData, actionLogout);

    // Expectation
    expect(resultLogout).toEqual(expected);
  });
});
