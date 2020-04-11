import { ratings } from '../reducers/ratings';


describe('Reducer: ratings', () => {
  it('should return the initial state', () => {
    const expected = [];

    const result = ratings(undefined, {});

    expect(result).toEqual(expected);
  });
});
