require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../database");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (user) {
    return res.send("email already exists");
  }

  const hash = bcrypt.hashSync(password, 12);
  users.push({ email, password: hash });

  const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20s",
  });
  res.json({ accessToken });
});

router.get("/users", (req, res) => {
  res.json(users);
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (!user) {
    res.send("invalid credentials");
  }
  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    res.send("wrong password");
  } else {
    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20s",
    });
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET);

    refreshTokens.push(refreshToken);

    res.send({ accessToken, refreshToken });
  }
});

const refreshTokens = [];

router.post("/token", async (req, res) => {
  // const refreshToken = req.headers["x-auth-token"];
  const refreshToken =req.body.refreshToken
  if (!refreshToken) {
    return res.send("token not found");
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.send("invalid refresh token");
  }

  try {
    const data = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const { email } = data;
    const accessToken = await jwt.sign(
      { email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );
    res.send({ accessToken });
  } catch (error) {
    res.send("invalid refresh token, try catch");
  }
});

router.delete("/logout", (req, res) => {
  const refreshToken = req.header("x-auth-token");

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.sendStatus(204);
});

module.exports = router;
