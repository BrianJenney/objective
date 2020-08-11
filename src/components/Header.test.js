import React from 'react';
import '../../test/setup';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { renderWithRedux } from '../../test/testUtils';
import Header from './Header';
import * as contentfulLib from '../utils/contentful';
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
const trackStub = jest.fn();

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
      }),
      track: trackStub // we use a stub here because we care what args are passed here
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
    expect(queryByText('Sign Up', { exact: false })).toBeTruthy();
  });

  // this kind of test is probably useful as it tests what arguments are sent
  // to analytics and we can test all sorts of weird scenarios here
  // which will also test `segmentSiteLocation` and any other dependednt functions that are called here
  it('triggers segmentTrackNavigation on click', async () => {
    // we can add anything in here to really test how our component
    // will render the data it gets or what happens if this response is
    // unsuccessful...(?)
    contentfulLib.contentfulClient.getEntry = () =>
      new Promise((resolve, reject) => {
        resolve({
          fields: {
            text: 'Some Cool Product',
            href: '/link/to/site'
          }
        });
      });

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
    const { queryAllByText } = renderWithRedux(<Header />, { store });

    await waitFor(() => {
      //we will wait for the element to appear before clicking since on first render it may not be available
      const navLink = queryAllByText('Some Cool Product')[0]; // let's find an element with this name and click on it
      fireEvent.click(navLink);
    });

    expect(trackStub).toHaveBeenCalledWith('Navigation Clicked', {
      label: '',
      site_location: 'home'
    });
  });

  it('gracefully handles a failure from contentful', async () => {
    // we can add anything in here to really test how our component
    // will render the data it gets or what happens if this response is
    // unsuccessful...(?)
    contentfulLib.contentfulClient.getEntry = () =>
      new Promise((resolve, reject) => {
        reject('Ruh roh, contentful is down');
      });

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
    expect(queryByText('Sign Up', { exact: false })).toBeTruthy();
  });
});
