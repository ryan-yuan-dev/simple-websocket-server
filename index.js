const { WebSocketServer } = require("ws");
const genMsg = require("./message");

const server = new WebSocketServer({
  host: "127.0.0.1",
  port: 8080,
  perMessageDeflate: true,
});

server.on("listening", () => {
  console.log("WebSocket server is listening on port 8080");
});

server.on("connection", (ws, incomingMessage, request) => {
  console.log("Client connected");

  ws.on("message", (message, isBinary) => {
    console.log(`Received message: , ${message} ${isBinary}`);
    const cmd = String(message);
    if (cmd == "DETETC_HANDS_UP") {
      sendStatus("readyStart");
      return;
    }
    if (cmd == "RECOGNIZE_FACE_TIMEOUT") {
      sendStatus("faceTimeout");
      return;
    }
    if (cmd == "WRONG_PREPARATION_ACTION") {
      sendStatus("ready");
      return;
    }
    if (cmd == "PREPARATION_FAILED") {
      sendStatus("readyFailed");
      return;
    }
    if (cmd == "PREPARATION_SUCCEED") {
      sendStatus("readyDone");
      return;
    }
    if (cmd == "TEST_ANALYTICS") {
      sendStatus("running");
      return;
    }
    if (cmd == "FINISHED") {
      sendStatus("end");
      return;
    }
    if (Buffer.isBuffer(message)) {
      ws.send(message);
      return;
    }
    if (isBinary) {
      ws.send(message);
      return;
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

/**
 * 将字符串转换成字节数据，并发送到客户端
 */
const sendStatus = (status) => {
  send(genMsg(status));
};


/// 向所有的客户端发送消息
const send = (message) => {
  server.clients.forEach((client) => client.send(message));
};
