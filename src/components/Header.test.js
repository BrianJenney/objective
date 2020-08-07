import React from 'react';
import '../../test/setup';
import { cleanup } from '@testing-library/react';
import { renderWithRedux } from '../../test/testUtils';
import Header from './Header';
jest.mock('jsonwebtoken');
const jwt = require('jsonwebtoken');

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

// let's disable the many errors we have
// TODO: get rid of all those warnings
/* eslint-disable */
const originalError = console.error;

describe('Header', () => {
  beforeEach(() => {
    /* eslint-disable */
    console.error = jest.fn();

    // we must mock jwt methods because we don't want to test
    // the internals of this library so we just get around it
    // by mocking the function used in this component
    jwt.decode = () => ({
      account_id: '123'
    });

    // same idea of mocking here - we will hard code the analytics function
    // since we don't really care about it for testing this component
    window.analytics = {
      identify: () => ({
        account_id: () => null
      })
    };
  });

  // after each test runs let's clear our mocks and restore the original window
  // so we don't mess up other tests that may be using the window object
  afterEach(() => {
    /* eslint-disable */
    window = originalWindow;
    console.error = originalError;
    cleanup();
  });

  // some super basic tests to see if a user name will be displayed depending on what
  // is in our redux store

  it('renders with a user name present', () => {
    const store = createReduxStore();
    store.subscribe = () => {};
    store.dispatch = () => {};
    const { queryByText } = renderWithRedux(<Header />, { store });

    expect(queryByText('Cool Dude', { exact: false })).toBeTruthy();
  });

  it('renders with no name present', () => {
    const store = createReduxStore({
      account: {
        data: {
          firstName: undefined,
          awccount_jwt: undefined
        }
      }
    });
    store.subscribe = () => {};
    store.dispatch = () => {};
    const { queryByText } = renderWithRedux(<Header />, { store });

    // Without a user name present we should show the sign in
    expect(queryByText('Cool Dude', { exact: false })).toBeNull();
    expect(queryByText('Sign In', { exact: false })).toBeTruthy();
  });
});
