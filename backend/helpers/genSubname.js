const path = require("path");

const genSubname = (sub, title, year) => {
  let subName;
  if (!year) {
    subName =
      title
        .toLowerCase()
        .split(/[ .:;?!~,_`"&|()<>{}\[\]\r\n/\\]+/)
        .join("-") +
      "-bengali" +
      "-" +
      Date.now() +
      path.extname(sub.name);
  }
  if (year) {
    subName =
      title
        .toLowerCase()
        .split(/[ .:;?!~,_`"&|()<>{}\[\]\r\n/\\]+/)
        .join("-") +
      "-" +
      year +
      "-bengali" +
      "-" +
      Date.now() +
      path.extname(sub.name);
  }
  return subName;
};

module.exports = genSubname;
