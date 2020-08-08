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

  describe('requestAddToCart', () => {
    it('sends the correct params to the stomp client', () => {
      actions.requestAddToCart({}, {}, 5)(fakeDispatch, getState);
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

      expect(clientSendStub).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expectedStringifiedCode
      );
    });
  });
});
