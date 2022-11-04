const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");
const db = require("../../images.json")

let routes = (app) => {
  router.post("/v1/file", controller.upload, (req, res, next) => {


    res.status(200).send({
      message: "Uploaded the file successfully",
      filepath: req.file.filename
    });
  });
  // router.get("/v1/:id", controller.getListFiles);
  router.get("/v1/:name", controller.download);
  // router.delete("/files/:name", controller.remove);

  app.use(router);
};

module.exports = routes;
