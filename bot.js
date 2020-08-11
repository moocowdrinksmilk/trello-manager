require('dotenv').config()
const Telegraf = require('telegraf')
const bot = new Telegraf('1330632909:AAGnCneKta3V2c3MLGzGHLyOx1J7MZxmm5g')
const cron = require("node-cron");
const fetch = require('node-fetch');


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

// list.then(res=>{
//     console.log(res[0]);
//     for(i=0; i<res.length; i++){
//         console.log(res[i].name);
//     }
// })


module.exports = {
    hello(){
        bot.use(async (ctx, next) => {
            const start = new Date()
            await next()
            const response_time = new Date() - start
            const chat_from = `${ctx.message.chat.first_name} (id: ${ctx.message.chat.id})`
            console.log(`Chat from ${chat_from} (Response Time: ${response_time})`)
          })
          bot.hears('Hello', (ctx) => ctx.reply('Wassup'))
          bot.launch()
    },

    reset_cards(){
        bot.on('text', (ctx)=>{
            ctx.reply('Hello')
        })
        cron.schedule("12 00 * * *", ()=>{
            list.then(res=>{
                arr = [];
                str = ''
                for(let i=0; i<res.length; i++){
                    str = str + '-' +  res[i].name + '\n\n'
                }
                bot.telegram.sendMessage(196032343, `It is 12pm, and you have not completed these tasks that you are supposed to do. How do you feel about yourself? You better be doing them now or you are not going to get shit: \n\n ${str}`)
            })
            list.then(res=>{
            })
        });

        cron.schedule("0 20 * * *", ()=>{
            list.then(res=>{
                arr = [];
                str = ''
                for(let i=0; i<res.length; i++){
                    str = str + '-' +  res[i].name + '\n\n'
                }
                console.log(res[0]);
                if(!res[0]){
                    bot.telegram.sendMessage(196032343, 'Good Job, you have nothing left on your agenda. Do as you please.')
                }else{
                    bot.telegram.sendMessage(196032343, `Wow are you serious? You still have shit left? You better finish it up or else you gon get ur ass whooped you piece of shit \n\n ${str}`)
                } 
            })
            list.then(res=>{
                console.log('hello');
            })
        });

        cron.schedule("0 0 * * *", ()=>{
            fetch('https://api.trello.com/1/lists/5f0fcd7ea8ece5653f61f51a/moveAllCards?key=9b00aa205340fe8d80aea074e99f164c&token=7528c72a0346775d21e4cec3491c0f900e738587e5e7bbc9e29b2baaa7b3c744&idBoard=5efc2d37b6e7642f6ba04eed&idList=5efc2d3e55d5c23f6be66d4a', {
                method: 'POST'
              })
                .then(response => {
                  return response;
                })
                .then(text => {
                    return text
                })
                .catch(err => console.error(err));
        })
        
    }
}