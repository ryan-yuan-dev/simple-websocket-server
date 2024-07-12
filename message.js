const { TextEncoder } = require("util");
const encoder = new TextEncoder();

var msgCount = 1;
const genMsg = (status) => {
  msgCount++;
  return encoder.encode(
    `{"project":"sitUp","status":"${status}","serialNum":${msgCount}}`
  );
};

module.exports = genMsg;
