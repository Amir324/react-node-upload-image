const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {
  router.post("/v1/file", controller.upload, (req, res, next) => {
    setTimeout(() => {
      res.status(200).send({
        message: "Successfully upload the file",
        filepath: req.file.filename,
      });
    }, 2000);
  });
  router.get("/v1/file/:name", controller.download);
  app.use(router);
};

module.exports = routes;
