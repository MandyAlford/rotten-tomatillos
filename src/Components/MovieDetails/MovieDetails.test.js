import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import MovieDetails from './MovieDetails';
import { getMovieDetails, fetchUserRatings } from '../../ApiCalls/ApiCalls';
import {  Provider }from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../../reducers/index'
jest.mock('../../ApiCalls/ApiCalls');

const match = {
  params: {
    movie_id: 1
  }
};


describe('MovieDetail', () => {
  it('renders correctly', async () => {
    const testStore = createStore(rootReducer);
    const testWrapper = 
    <Provider store={testStore}>
          <MemoryRouter
        initialEntries={[ "/movies/:movie_id" ]}
      >
        <MovieDetails match={match}/>
      </MemoryRouter>
  </Provider>

    getMovieDetails.mockResolvedValueOnce({
      movies: [
      {
        id: 1,
        title: "Bloodshot",
        poster_path: "https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original//ocUrMYbdjknu2TwzMHKT9PBBQRw.jpg",
        release_date: "2020-03-05",
        overview: "MockOverview",
        average_rating: 7.5
        }
      ]
    });
    const { getByText, getByAltText } = render(testWrapper);
    await waitFor(() => getByText('Bloodshot'))
    
    expect(getByText('Bloodshot')).toBeInTheDocument();
    expect(getByAltText('Bloodshot movie poster')).toBeInTheDocument();
    expect(getByText('Release Date: 2020-03-05')).toBeInTheDocument();
    expect(getByText('MockOverview')).toBeInTheDocument();expect(getByText('7.5')).toBeInTheDocument();
  });
});

