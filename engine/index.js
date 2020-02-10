class Engine {
  constructor(data, tfl, telegram, preferences) {
    this.data = data;
    this.tfl = tfl;
    this.telegram = telegram;
    this.preferences = preferences;
  }

  processStatuses(statuses, mostRecentComms, preferences) {
    Object.keys(statuses).forEach(async key => {
      let message = `${statuses[key].name}: ${statuses[key].status}`;
      if (
        preferences.TUBE.LINES.indexOf(key) != -1 &&
        mostRecentComms[key] != message
      ) {
        console.log(`${key} line has changed, sending message"${message}"`);
        await this.telegram.sendMessage(message);
        mostRecentComms[key] = message;
        this.data.updateDataById("line-comms", mostRecentComms);
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
