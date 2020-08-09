import * as actions from './actions';
jest.mock('jsonwebtoken');
jest.mock('store');
jest.mock('msgpack-lite');
jest.mock('bson-objectid');
const jwt = require('jsonwebtoken');
const localStorageClient = require('store');
const msgpack = require('msgpack-lite');

describe('cart actions', () => {
  let getState;
  let fakeDispatch;

  // we will stub this to make sure it receives the correct args

  const clientSendStub = jest.fn();
  beforeEach(() => {
    getState = () => ({
      storefront: {
        code: 'storeCode',
        catalogId: 'catalogId'
      },
      stomp: {
        client: {
          send: clientSendStub
        },
        replyTo: 'replier'
      }
    });

    fakeDispatch = jest.fn();
    // we must mock jwt methods because we don't want to test
    // the internals of this library so we just get around it
    // by mocking the function used in this component
    jwt.decode = () => ({
      account_id: '123'
    });

    msgpack.encode = obj => obj;

    localStorageClient.get = () => 'secretId';

    // same idea of mocking here - we will hard code the analytics function
    // since we don't really care about it for testing this component
    window.analytics = {
      identify: () => ({
        account_id: () => null
      })
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('requestAddToCart', () => {
    it('sends the correct params to the stomp client', () => {
      actions.requestAddToCart({}, {}, 5)(fakeDispatch, getState);

      // make sure it sends the correct action
      expect(fakeDispatch).toHaveBeenCalledWith({ payload: {}, type: 'REQUEST_ADD_TO_CART' });

      const expectedStringifiedCode = JSON.stringify({
        product: {},
        quantity: 5,
        segmentAnonymousId: 'secretId',
        newCartParams: {
          storeCode: 'storeCode',
          catalogId: 'catalogId'
        }
      });

      // this is probably the most useful test - that it actually sends the correct args
      expect(clientSendStub).toHaveBeenCalledWith(
        expect.anything(), // this arg is hardcoded so who cares
        expect.anything(),
        expectedStringifiedCode // this is what we care about!
      );
    });

    it('sends the correct params to the stomp client depending on the cart id', () => {
      const objWithCartId = {
        product: {},
        quantity: 5,
        segmentAnonymousId: 'secretId',
        cartId: 'cartId'
      };

      const objNoCartId = {
        product: {},
        quantity: 5,
        segmentAnonymousId: 'secretId',
        newCartParams: {
          storeCode: 'storeCode',
          catalogId: 'catalogId'
        }
      };

      const tests = [
        // cart                 expected
        [{ _id: 'cartId' }, objWithCartId],
        [{ foo: 'bar' }, objNoCartId]
      ];

      tests.forEach(test => {
        const [cart, expected] = test;

        actions.requestAddToCart(cart, {}, 5)(fakeDispatch, getState);

        const expectedStringifiedCode = JSON.stringify(expected);

        // this is probably the most useful test - that it actually sends the correct args
        expect(clientSendStub).toHaveBeenCalledWith(
          expect.anything(), // this arg is hardcoded so who cares
          expect.anything(),
          expectedStringifiedCode // this is what we care about!
        );
      });
    });
  });
});
