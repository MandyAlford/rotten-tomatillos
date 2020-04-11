import * as actions from '../actions';
console.log(actions);

describe('actions', () => {
  it('should have a type of LOGIN_USER and a correct payload', () => {
    const expectedAction = {
      type: 'LOGIN_USER',
      userData: {
        user: {
          id: 4,
          name: "Greg",
          email: "greg@turing.io"
        }
      }
    };

    const result = actions.login(
      {
        user: {
          id: 4,
          name: "Greg",
          email: "greg@turing.io"
        }
      }
    );

    expect(result).toEqual(expectedAction)
  });

  it('should have a type of LOGOUT_USER', () => {
    const expectedAction = {
      type: "LOGOUT_USER"
    }
    const result = actions.logout();

    expect(result).toEqual(expectedAction)
  });
});
