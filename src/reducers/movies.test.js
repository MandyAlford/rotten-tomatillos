import { movies } from '../reducers/movies';

describe('Reducer: movies', () => {
  it('should return the initial state', () => {
    const result = movies(undefined, {});

    expect(result).toEqual([]);
  });

  it('should return updated state', () => {
    const action = {
      type:'GET_MOVIES',
      movies: [
        {id: 1, title: 'a'},
        {id: 2, title: 'b'}
      ]
    }
    const result = movies([], action);

    expect(result).toEqual([
      {id: 1, title: 'a'},
      {id: 2, title: 'b'}
    ]);
  });
});
