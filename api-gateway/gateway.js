const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const authMiddleware = require("../services/auth-service/middleware/authMiddleware");

const app = express();

app.use(cors());

// Request logger
app.use((req, res, next) => {
  console.log("=================================");
  console.log("Gateway Received Request");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("=================================");
  next();
});

// AUTH SERVICE
app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:5001/auth",
    changeOrigin: true,
    /*pathRewrite: {
      "^/auth": "",
    },*/
    on: {
      proxyReq: (proxyReq, req) => {
        console.log("➡️ Forwarding to AUTH SERVICE:", req.url);
      },
      proxyRes: (proxyRes, req) => {
        console.log("⬅️ AUTH SERVICE responded:", proxyRes.statusCode);
      },
      error: (err) => {
        console.error("❌ AUTH SERVICE ERROR:", err.message);
      },
    },
  })
);

// NIC SERVICE
app.use(
  "/nic",
  authMiddleware, // ✅ add middleware here
  createProxyMiddleware({
    target: "http://localhost:5002/nic",
    changeOrigin: true,
    /*pathRewrite: {
      "^/nic": "",
    },*/
    on: {
      proxyReq: (proxyReq, req) => {
        console.log("➡️ Forwarding to NIC SERVICE:", req.url);
      },
    },
  })
);


// NIC SERVICE
app.use(
  "/report",
  authMiddleware, // ✅ add middleware here
  createProxyMiddleware({
    target: "http://localhost:5003/report",
    changeOrigin: true,
    /*pathRewrite: {
      "^/nic": "",
    },*/
    on: {
      proxyReq: (proxyReq, req) => {
        console.log("➡️ Forwarding to REPORT SERVICE:", req.url);
      },
    },
  })
);



app.listen(5000, () => {
  console.log("🚀 API Gateway running on port 5000");
});