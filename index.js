'use strict';

import { Client, middleware } from '@line/bot-sdk';
import express from 'express';
import SearchAvgle from './avgle-db.js';
import GetInvoice from './invoice.js';
import Weather from './weather.js';
 
// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
}); 
 
const data = await rp({ url: 'https://api.avgle.com/v1/collections/[1, 250]', json: true });

// console.log(SearchAvgle());
// console.log(Weather());

// event handler
async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  let echo = { type: 'text', text: event.message.text};

  
  if (event.message.text != undefined){
    // echo = SearchAvgle(event);
    // let textArr = event.message.text.split(".");
    // if (textArr[0] == "avgle"){
      // echo = SearchAvgle(event);
    //   console.log(echo);
    // } else {
    //   echo = { type: 'text', text: event.message.text };
    // }

  }

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});