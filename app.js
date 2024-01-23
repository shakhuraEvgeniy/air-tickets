const express = require("express");
const app = express();
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const request = require("request");

const { COMMANDS } = require("./utils/constants");
const { getData } = require("./modules/getData");

const host = "127.0.0.1";
const port = 7000;

const { TOKEN_TELEGRAM } = process.env;

const bot = new TelegramBot(TOKEN_TELEGRAM, {
  polling: true,
});

bot.on("polling_error", (err) => console.log(err.data.error.message));
bot.setMyCommands(COMMANDS);
bot.on("text", async (msg) => {
  try {
    switch (msg.text) {
      case "/start": {
        await bot.sendMessage(
          msg.chat.id,
          `Вы запустили бота поиска авиабилетов!`
        );
        break;
      }
      case "/search": {
        //const body1 = getData();
        //console.log(body1);
        //await bot.sendMessage(msg.chat.id, body1);
        //   msg.chat.id,
        // await bot.sendMessage(
        //   msg.chat.id,
        //   "``` | Дата | Стоимость |\n |---|---|\n| 2024-01-26 | 5000 |```",
        //   {
        //     parse_mode: "MarkdownV2",
        //   }
        // );
        request(
          "https://lyssa.aviasales.ru/date_picker_prices?currency=rub&depart_months[]=2024-01-01&depart_months[]=2024-02-01&destination_iata=MOW&market=ru&one_way=true&origin_iata=KJA",
          (err, response, body) => {
            if (err)
              bot.sendMessage(msg.chat.id, "Произошла непредвиденная ошибка");
            const bodyJson = JSON.parse(body);
            const arr = bodyJson.prices.map((index) => {
              return `${index.depart_date} - ${index.price}`;
            });
            console.log(arr);
            const otvet = arr.join("\n");
            bot.sendMessage(msg.chat.id, otvet);
          }
        );

        break;
      }
      default:
        await bot.sendMessage(msg.chat.id, msg.text);
        break;
    }

    if (msg.text == "/start") {
    } else {
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {});

app.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
);
