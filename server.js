const express = require("express");
const fetch = require("node-fetch");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.use(session({
  secret: "flexicx_hidden_secret",
  resave: false,
  saveUninitialized: false
}));

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  BOT_ID
} = process.env;

/* LOGIN */
app.get("/login", (req, res) => {
  const url =
    `https://discord.com/oauth2/authorize` +
    `?client_id=${process.env.CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}` +
    `&response_type=code` +
    `&scope=identify`;

  res.redirect(url);
});

app.get("/callback", async (req, res) => {
  // xử lý OAuth2 ở đây (bạn đã có)
  res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.sendFile(__dirname + "/public/dashboard.html");
});

  res.redirect(url);
});

/* CALLBACK */
app.get("/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.redirect("/");

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI
    })
  });

  const token = await tokenRes.json();

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${token.access_token}` }
  });

  const user = await userRes.json();
  req.session.user = user;

  res.redirect("/dashboard");
});

/* USER INFO */
app.get("/api/me", (req, res) => {
  if (!req.session.user) return res.status(401).json({});
  res.json(req.session.user);
});

/* INVITE BOT THẬT */
app.get("/api/invite", (req, res) => {
  const PERMISSIONS = "8"; // ADMIN
  const invite =
    `https://discord.com/oauth2/authorize` +
    `?client_id=${BOT_ID}` +
    `&permissions=${PERMISSIONS}` +
    `&scope=bot%20applications.commands`;

  res.json({ invite });
});

/* DASHBOARD */
app.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.sendFile(__dirname + "/public/index.html");
});
/* TEAM PAGE */
app.get("/team", (req, res) => {
  res.sendFile(path.join(__dirname, "public/team.html"));
});

/* INVITE BOT (URL ĐẸP) */
app.get("/invite", (req, res) => {
  const PERMISSIONS = "8";
  const invite =
    `https://discord.com/oauth2/authorize` +
    `?client_id=${process.env.BOT_ID}` +
    `&permissions=${PERMISSIONS}` +
    `&scope=bot%20applications.commands`;

  res.redirect(invite);
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});