var fs = require("fs");

const filePath = "./data-store/";

module.exports.getDataById = id => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath + id + ".json", (err, data) => {
      if (err) {
        resolve({});
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

module.exports.updateDataById = (id, newData) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath + id + ".json", JSON.stringify(newData), err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
