const https = require("https");

module.exports.sendMessage = (headline, text) => {
  return new Promise((resolve, reject) => {
    const message = `<b>${headline}</b>%0A%0A${text}`;
    const TELEGRAM_BOT_KEY = process.env.TELEGRAM_BOT_KEY,
      TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    https.get(
      `https://api.telegram.org/bot${TELEGRAM_BOT_KEY}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${message}&parse_mode=HTML`,
      resp => {
        let data = "";

        resp.on("data", chunk => {
          data += chunk;
        });

        resp.on("end", () => {
          resolve(data);
        });

        resp.on("error", reject);
      }
    );
  });
};
