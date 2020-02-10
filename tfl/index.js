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
            status: l.lineStatuses[0].statusSeverityDescription
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
