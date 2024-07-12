# Websocket Server

使用 nodejs 开发的，简易的 websocket 服务端. 可以模拟数据，方便客户端调试。

 ## 开发背景

 公司的一件体育产品中，使用了 websocket 收发数据。客户端开发人员调试时，需要通过 websocket 连接到设备，并做各
 种动作来调试设备返回的数据。

 为了快速验证数据，写了这个简易的 websocket 服务端模拟硬件产品各种场景发送的数据。这样即使设备交互也能测试整个流程，
 可以大大提高开发、调试效率、测试效率。

 ## 使用

 1. 配置 node 开发环境；
 2. 在项目根目录下执行

    ```
    npm install
    ```

 3. 定制测试消息
    在 ***index.js*** 文件的，修改
    ```
    ws.on("message", (message, isBinary) => {
      // 在这里定制消息
    })
    ```
 4. 在项目根目录下执行
    ```
    npm run start
    ```
 5. 客户端连接 websocket `ws://127.0.0.1:8080`，并向服务器发送已定制的消息，处理服务器响应数据。

## License

MIT

 