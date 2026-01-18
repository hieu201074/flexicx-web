require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

/* SESSION */
app.use(
  session({
    secret: "flexicx_secret",
    resave: false,
    saveUninitialized: false,
  })
);

/* STATIC */
app.use(express.static(path.join(__dirname, "public")));

/* HOME */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

/* LOGIN (TEST – sau này thay OAuth) */
app.get("/login", (req, res) => {
  req.session.user = { id: "1", username: "FlexicX User" };
  res.redirect("/dashboard");
});

/* DASHBOARD */
app.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.sendFile(path.join(__dirname, "public/dashboard.html"));
});

/* TEAM */
app.get("/team", (req, res) => {
  res.sendFile(path.join(__dirname, "public/team.html"));
});

/* INVITE BOT */
app.get("/invite", (req, res) => {
  const PERMISSIONS = "8";
  const invite =
    "https://discord.com/oauth2/authorize" +
    `?client_id=${process.env.BOT_ID}` +
    `&permissions=${PERMISSIONS}` +
    "&scope=bot%20applications.commands";

  res.redirect(invite);
});

/* LOGOUT */
app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));