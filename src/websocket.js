import Stomp from 'stompjs';
const ObjectId = require('bson-objectid');

const wss = new WebSocket(process.env.REACT_APP_CLOUDAMQP_HOSTNAME);
const stompClient = Stomp.over(wss);
const replyTo = ObjectId();

stompClient.connect(process.env.REACT_APP_CLOUDAMQP_USERNAME, process.env.REACT_APP_CLOUDAMQP_PASSWORD, () => {
  console.log('Successfully Connected');
  stompClient.subscribe('/queue/' + replyTo, msg => {
    console.log(msg);
  }, {
    'auto-delete': true
  });
}, e => {
  console.log('******************** Error: ' + e);
}, process.env.REACT_APP_CLOUDAMQP_USERNAME);

export {
  stompClient,
  replyTo
}