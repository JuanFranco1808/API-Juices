const express = require("express");
const { validatorHandler } = require("../middlewares/validator.handler");
const { accessLog } = require("../middlewares/access.log");
const authRouter = express.Router();
const { models } = require("../libs/sequelize");
const passport = require("passport");
const { createSchema } = require("../schemas/user.schema");

//RUTAS
authRouter
  .route("/signup", validatorHandler(createSchema, "body"))
  .get((req, res) => {
    accessLog(req.method, req.path);
    res.render("auth/signup");
  })
  .post(async (req, res) => {
    accessLog(req.method, req.path);
    //Crear usuario en BD
    const user = await models.user.create(req.body);
    //Autenticar
    req.login(user, () => {
      res.redirect("/");
    });
  });

authRouter
  .route("/signin")
  .get((req, res) => {
    accessLog(req.method, req.path);
    res.render("auth/signin");
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/signin",
      keepSessionAlive: true,
    })
  );

module.exports = authRouter;
