const cron = require("node-cron");
const express = require("express");
const app = express();
const https = require('https');
const fetch = require('node-fetch');
const bott = require('./bot')
const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

bott.hello();
bott.reset_cards();

const list = fetch('https://api.trello.com/1/lists/5efc2d3e55d5c23f6be66d4a/cards?key=9b00aa205340fe8d80aea074e99f164c&token=7528c72a0346775d21e4cec3491c0f900e738587e5e7bbc9e29b2baaa7b3c744', {
  method: 'GET'
})
  .then(response => {
    // console.log(
    //   `Response: ${response.status} ${response.statusText}`
    // );
    return response.json();
  })
  .then(text => {
      return text
  })
  .catch(err => console.error(err));

//   const move_cards = fetch('https://api.trello.com/1/lists/5f0fcd7ea8ece5653f61f51a/moveAllCards?key=9b00aa205340fe8d80aea074e99f164c&token=7528c72a0346775d21e4cec3491c0f900e738587e5e7bbc9e29b2baaa7b3c744&idBoard=5efc2d37b6e7642f6ba04eed&idList=5efc2d3e55d5c23f6be66d4a', {
//   method: 'POST'
// })
//   .then(response => {
//     return response;
//   })
//   .then(text => {
//       return text
//   })
//   .catch(err => console.error(err));

// function hello(){
//     list.then(
//         res =>{
//             console.log(res[0]);
//             for(let i=0; i<res.length; i++){
//                 console.log(res[i]);
//             }
//         }
//     )
// }
// function move(){
//     move_cards.then(res=>{
        
//     })
// }
// hello()
// move()








app.listen(3000);