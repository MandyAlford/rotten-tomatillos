import * as actions from '../actions';

describe('actions', () => {
  it('should have a type of LOGIN_USER and a correct payload', () => {
    const expectedAction = {
      type: 'LOGIN_USER',

        user: {
          id: 4,
          name: "Greg",
          email: "greg@turing.io"
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

  it('should have a type of SHOW_MODAL and  correct payload', () => {
    const expectedAction = {
      type: "SHOW_MODAL",
      isShowing: true
    }

    const result = actions.showModal(true);

    expect(result).toEqual(expectedAction)
  });

  it('should have a type of GET_USER_RATINGS and correct payload', () => {
    const expectedAction = {
      type: "GET_USER_RATINGS",
      ratings: [
        {
        id: 63,
        user_id: 4,
        movie_id: 4,
        rating: 5
        },
        {
        id: 66,
        user_id: 4,
        movie_id: 3,
        rating: 4,
        },
        {
        id: 65,
        user_id: 4,
        movie_id: 5,
        rating: 4
        },
      ]
    }

    const result = actions.getUserRatings([
      {
      id: 63,
      user_id: 4,
      movie_id: 4,
      rating: 5,
      },
      {
      id: 66,
      user_id: 4,
      movie_id: 3,
      rating: 4
      },
      {
      id: 65,
      user_id: 4,
      movie_id: 5,
      rating: 4
      },
    ])

    expect(result).toEqual(expectedAction)
  });
});
