const express = require("express");
const juicesRouter = require("./juices.routes");
const usersRouter = require("./users.routes");
const authRouter = require("./authRouter");

function routerApi(app) {
  const router = express.Router();

  app.use("/", router);
  router.use("/auth", authRouter);
  router.use("/admin/users", usersRouter);
  router.use("/admin/juices", juicesRouter);
}

module.exports = routerApi;
