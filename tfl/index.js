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
            ...calculateMessage(l),
            detail: l.lineStatuses[0].reason || ""
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
      return {
        message: `There is a good service on the ${line.name} line`,
        severity: "NONE"
      };
    case 1:
      return {
        message: `The ${line.name} line is closed`,
        severity: "SEVERE"
      };
    case 2:
      return {
        message: `The ${line.name} line is suspended`,
        severity: "SEVERE"
      };
    case 3:
      return {
        message: `The ${line.name} line is part suspended`,
        severity: "SEVERE"
      };
    case 4:
      return {
        message: `The ${line.name} line has a planned closure`,
        severity: "SEVERE"
      };
    case 5:
      return {
        message: `The ${line.name} line has a partial closure`,
        severity: "SEVERE"
      };
    case 6:
      return {
        message: `The ${line.name} line has severe delays`,
        severity: "SEVERE"
      };
    case 7:
      return {
        message: `The ${line.name} line has a reduced service`,
        severity: "SEVERE"
      };
    case 8:
      return {
        message: `The ${line.name} line has a bus replacement service`,
        severity: "SEVERE"
      };
    case 9:
      return {
        message: `The ${line.name} line has minor delays`,
        severity: "MINOR"
      };
    case 20:
      return { message: `The ${line.name} line is closed`, severity: "INFO" };
    default:
      return {
        message: `The ${line.name} has a status of ${line.lineStatuses[0].statusSeverityDescription}`,
        severity: "UNKNOWN"
      };
  }
}
