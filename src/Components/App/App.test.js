import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../reducers';
const store = createStore(rootReducer);

test('renders learn react link', () => {
      const store = createStore(rootReducer);
  const { getByText } = render(
<Provider store={store}>
  <BrowserRouter><App /></BrowserRouter>

</Provider>
  );
});
