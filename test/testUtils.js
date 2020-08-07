import React from 'react';
import './setup';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

export function renderWithRedux(ui, { store } = {}) {
  const rendered = render(<Provider store={store}>{ui}</Provider>);
  return {
    ...rendered,
    rerender: el => renderWithRedux(el, { store }),
    store
  };
}
