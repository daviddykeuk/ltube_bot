class Engine {
  constructor(data, tfl, telegram, preferences) {
    this.data = data;
    this.tfl = tfl;
    this.telegram = telegram;
    this.preferences = preferences;
  }

  processStatuses(statuses, mostRecentComms, preferences) {
    Object.keys(statuses).forEach(async key => {
      let message = `${getEmojiCode(statuses[key].severity)} ${
        statuses[key].message
      }`;
      if (
        preferences.TUBE.LINES.indexOf(key) != -1 &&
        mostRecentComms[key] != message &&
        statuses[key].severity != "INFO"
      ) {
        console.log(`${key} line has changed, sending message: "${message}"`);
        try {
          await this.telegram.sendMessage(message, statuses[key].detail);
          mostRecentComms[key] = message;
          await this.data.updateDataById("line-comms", mostRecentComms);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  run(sleepTime) {
    this.tick(sleepTime);
  }

  async tick(sleepTime) {
    console.log("Getting line statuses...");
    const lineStatuses = await this.tfl.getLineStatuses();
    const currentComms = await this.data.getDataById("line-comms");
    console.log("Processing statuses");
    this.processStatuses(lineStatuses, currentComms, this.preferences);

    setTimeout(() => this.tick(sleepTime), sleepTime);
  }
}

module.exports = Engine;

function getEmojiCode(severity) {
  switch (severity) {
    case "INFO":
      return "🔵";
    case "NONE":
      return "🟢";
    case "MINOR":
      return "🟠";
    case "SEVERE":
      return "🛑";
    default:
      return "🟡";
  }
}
