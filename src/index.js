const express = require("express");
const crypto = require("crypto");
const base64url = require("base64url");
const app = express();
const port = 3000;
// 假设的参数值，实际使用时请替换为真实值
const clientId = "your_client_id";
const appkey = "your_org_name#your_app_name";
const clientSecret = "your_client_secret";
const userId = "your_user_id";

// a. 获取当前时间戳，单位为秒。
const curTime = Math.floor(Date.now() / 1000);

// b. 设置过期时间，单位为秒。
const ttl = 600;

// c. 生成 signature，将 clientId、appkey、userId、curTime、ttl、clientSecret 六个字段拼成一个字符串，进行 sha256 编码并将编码内容得到的字节转换为十六进制字符串。
const str = clientId + appkey + userId + curTime + ttl + clientSecret;
const sha256hash = crypto.createHash("sha256").update(str).digest("hex");

// d. 组装为 json。
const json = {
  signature: sha256hash,
  appkey: appkey,
  userId: userId,
  curTime: curTime,
  ttl: ttl,
};

// e. 将 token 类型 "dt-" 放到 json 转成的字符串前，生成最终的字符串。
const jsonStr = JSON.stringify(json);
const preToken = "dt-" + jsonStr;

// f. 进行 base64 编码，生成最终的 token。
const token = base64url.encode(preToken);

console.log(token);

/* 以下为模拟实现一个可供请求的接口，用于请求生成动态token并返回。 */

// 解析 URL 编码的请求体
app.use(express.urlencoded({ extended: true }));

// 定义路由处理函数
app.get("/generate-token", (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: "userId parameter is required" });
  }

  // 获取当前时间戳，单位为秒。
  const curTime = Math.floor(Date.now() / 1000);

  // 生成 signature，将 clientId、appkey、userId、curTime、ttl、clientSecret 六个字段拼成一个字符串，进行 sha256 编码并将编码内容得到的字节转换为十六进制字符串。
  const str = clientId + appkey + userId + curTime + ttl + clientSecret;
  const sha256hash = crypto.createHash("sha256").update(str).digest("hex");

  // 组装为 json。
  const json = {
    signature: sha256hash,
    appkey: appkey,
    userId: userId,
    curTime: curTime,
    ttl: ttl,
  };

  // 将 token 类型 "dt-" 放到 json 转成的字符串前，生成最终的字符串。
  const jsonStr = JSON.stringify(json);
  const preToken = "dt-" + jsonStr;

  // 进行 base64 编码，生成最终的 token。
  const token = base64url.encode(preToken);

  res.json({
    userId,
    token,
    ttl,
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
