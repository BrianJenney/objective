import React from 'react';
import './setup';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export function renderWithRedux(ui, { store } = {}) {
  const rendered = render(
    <BrowserRouter>
      <Provider store={store}>{ui}</Provider>
    </BrowserRouter>
  );
  return {
    ...rendered,
    rerender: el => renderWithRedux(el, { store }),
    store
  };
}
