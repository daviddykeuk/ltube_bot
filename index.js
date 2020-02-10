const engine = require("./engine");
const tfl = require("./tfl");
const telegram = require("./telegram");
const data = require("./data");
const preferences = require("./preferences").getPreferences();

const Engine = new engine(data, tfl, telegram, preferences);

Engine.run(1000 * 60); // run the engine with a 60 second interval
