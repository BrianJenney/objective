import React, { useState, useEffect } from 'react';

import { useSelector} from 'react-redux';
import emitter from '../events';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const useStompRequest = (params, path, request) => {
  const { client, replyTo } = useSelector(state => state.stomp);
  const [ data, setData ] = useState(null);
console.log('useStompRequest', client, replyTo)
  useEffect(() => {
    const sendStompRequest = (params, path, request) => {
      const subscription = emitter.addListener(request, data => {
        console.log(' ********data**********', data);
        setData(data);
      });
      const obj = JSON.stringify(msgpack.encode(params));
      client.send(
        `${path}/${request}`, {
          'reply-to': replyTo,
          'correlation-id': ObjectId(),
        },
        obj);
      /*
      const subscription = client.subscribe(request, (message) => {
        console.log('useStompRequest 1', message)
        if (message.body) {
          setData(message.body.data);
        }
      });
       */
      return () => subscription.remove();
    };

    sendStompRequest(params, path, request);
  },[]);

  console.log('useStompRequest 2', data);
  return data;
};
