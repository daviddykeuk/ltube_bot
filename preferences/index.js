module.exports.getPreferences = () => {
  return {
    TELEGRAM: {
      BOT_KEY: process.env.TELEGRAM_BOT_KEY,
      CHAT_ID: process.env.TELEGRAM_CHAT_ID
    },
    TUBE: {
      LINES: process.env.TUBE_LINES.split(",")
    }
  };
};
