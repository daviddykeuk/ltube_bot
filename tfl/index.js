const https = require("https");

module.exports.getLineStatuses = () => {
  return new Promise((resolve, reject) => {
    https.get("https://api.tfl.gov.uk/line/mode/tube/status", resp => {
      let data = "";

      resp.on("data", chunk => {
        data += chunk;
      });

      resp.on("end", () => {
        var lines = {};
        JSON.parse(data).forEach(l => {
          lines[l.id] = {
            name: l.name,
            status: l.lineStatuses[0].statusSeverityDescription,
            message: calculateMessage(l)
          };
        });
        resolve(lines);
      });

      resp.on("error", err => {
        reject(err);
      });
    });
  });
};

function calculateMessage(line) {
  switch (line.lineStatuses[0].statusSeverity) {
    case 10:
      return `There is a good service on the ${line.name} line`;
    case 1:
      return `The ${line.name} line is closed`;
    case 2:
      return `The ${line.name} line is suspended`;
    case 3:
      return `The ${line.name} line is part suspended`;
    case 4:
      return `The ${line.name} line has a planned closure`;
    case 5:
      return `The ${line.name} line has a partial closure`;
    case 6:
      return `The ${line.name} line has severe delays`;
    case 7:
      return `The ${line.name} line has a reduced service`;
    case 8:
      return `The ${line.name} line has a bus replacement service`;
    case 9:
      return `The ${line.name} line has minor delays`;
    default:
      return `The ${line.name} has a status of ${line.lineStatuses[0].statusSeverityDescription}}`;
  }
}
