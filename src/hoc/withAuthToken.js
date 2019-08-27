import React from 'react';
import localStorageClient from 'store';

const token = localStorageClient.get('token');

export default function withAuthToken(ComposedComponent) {
  return function ComponentWithAuthToken(props) {
    return <ComposedComponent {...props} authToken={token} />;
  };
}
