import { ratings } from '../reducers/ratings';


describe('Reducer: ratings', () => {
  it('should return the initial state', () => {
    const expected = [];

    const result = ratings(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return updated state', () => {
    const expected = [
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
    ];
    const action = {
      type:'GET_USER_RATINGS',
      ratings: expected
    }

    const result = ratings([], action);

    expect(result).toEqual(expected);
  });
});
