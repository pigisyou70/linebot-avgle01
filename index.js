'use strict';

import { Client, middleware } from '@line/bot-sdk';
import express from 'express';
import SearchAvgle from './avgle-db.js';
import GetInvoice from './invoice.js';
import Weather from './weather.js';
import rp from 'request-promise';


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
 

// getCollections();
// console.log("\n");
// getCategories();
// console.log(getCategories());
// console.log("\n");
// getRecommend();
// Test();

async function Test(){
  let t = "avgle.分類";
  var strArray = [];
  strArray = t.split(".");
  console.log(strArray);
console.log("\n");

  let replyText = "";
  if (strArray[1] === "分類"){
    replyText = getCategories();
  }
  console.log(replyText);
}

async function getCollections(){
  let collect = "";
  const data = await rp({ url: 'https://api.avgle.com/v1/collections/[1, 250]', json: true });
  for (let i = 0; i < data.response.collections.length; i++) {
    collect += data.response.collections[i].title + '\n'
  }
  return collect;

}

 
async function getCategories(){
  let categories = "";
  const sort = await rp({ url: 'https://api.avgle.com/v1/categories', json: true });
  for (let i = 0; i < sort.response.categories.length; i++) {
    categories += sort.response.categories[i].shortname + '\n'
  }
  // console.log(categories);
  return categories;

}

async function getRecommend(){
  let msg = "";
  const recommend = await rp({ url: 'https://api.avgle.com/v1/videos/[1, 100]', json: true });
  const rand = Math.floor((Math.random() * recommend.response.videos.length));
  for (let i = 0; i < recommend.response.videos.length; i++) {
    msg = [{
      type: 'text',
      text: recommend.response.videos[rand].title + '\n'
    }, {
      type: 'text',
      text: recommend.response.videos[rand].video_url + '\n'
    }]
  }
  return msg;
  // console.log(msg);
}

// console.log(SearchAvgle());
// console.log(Weather());
 
// event handler
async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  let replyText = event.message.text;
  let echo = { type: 'text', text: replyText};
  
  if (event.message.text != undefined){
    var strArray = [];
    strArray = event.message.text.split(".");
    if (strArray[0] === "avgle"){
      if (strArray[1] === "推薦"){
        const recommend = await rp({ url: 'https://api.avgle.com/v1/videos/[1, 100]', json: true });
        const rand = Math.floor((Math.random() * recommend.response.videos.length));
        for (let i = 0; i < recommend.response.videos.length; i++) {
          msg = [{
            type: 'text',
            text: recommend.response.videos[rand].title + '\n'
          }, {
            type: 'text',
            text: recommend.response.videos[rand].video_url + '\n'
          }]
        }
        echo = msg;

      } else if (strArray[1] === "分類"){
        replyText = "";
        const sort = await rp({ url: 'https://api.avgle.com/v1/categories', json: true });
        for (let i = 0; i < sort.response.categories.length; i++) {
          replyText += sort.response.categories[i].shortname + '\n'

        }
        echo = { type: 'text', text: replyText};

      } else if (strArray[1] === "名單"){
        replyText = "";
        const data = await rp({ url: 'https://api.avgle.com/v1/collections/[1, 250]', json: true });
        for (let i = 0; i < data.response.collections.length; i++) {
          replyText += data.response.collections[i].title + '\n'
        }
        echo = { type: 'text', text: replyText};
      }
    } else {
      echo = { type: 'text', text: replyText};
    }
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