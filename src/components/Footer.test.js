import React from 'react';
import '../../test/setup';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { renderWithRedux } from '../../test/testUtils';
import Footer from './Footer';

const originalWindow = { ...window };

// create a fake redux store with the option to add
// properties for scenarios we might want to test
const createReduxStore = (options = {}) => {
  const defaultOpts = {
    cart: {
      _id: 'cart_id',
      items: []
    },
    currentUser: {
      data: {
        firstName: 'Cool Dude',
        account_jwt: '1234'
      }
    },
    account: {
      data: {
        firstName: 'Cool Dude',
        account_jwt: '1234'
      }
    },
    utils: {
      cartNotification: () => 'Cart'
    }
  };

  return {
    getState: () => ({
      ...defaultOpts,
      ...options
    }),
    createStore: () => ({})
  };
};

/* eslint-disable */
const originalError = console.error;
const trackStub = jest.fn();

describe('Footer', () => {
  beforeEach(() => {
    /* eslint-disable */
    console.error = jest.fn();

    window.analytics = {
      identify: () => ({
        account_id: () => null
      }),
      track: trackStub // we use a stub here because we care what args are passed here
    };
  });

  afterEach(() => {
    /* eslint-disable */
    window = originalWindow;
    console.error = originalError;
    cleanup();
  });

  it('shows a success the correct text when a user enters an email', async () => {
    const store = createReduxStore();
    store.subscribe = () => {};
    store.dispatch = () => {};
    const { queryByText, getByRole, getByPlaceholderText } = renderWithRedux(<Footer />, { store });

    const submitButton = getByRole('button', { name: /arrow.svg/i });

    const emailField = getByPlaceholderText('Your Email');
    fireEvent.change(emailField, { target: { value: 'not_an_email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(queryByText('Please enter a valid email address', { exact: false })).toBeTruthy();
    });

    fireEvent.change(emailField, { target: { value: 'realemail@hotmail.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(queryByText(`Awesome! You're on the list`, { exact: false })).toBeTruthy();
    });
  });
});
