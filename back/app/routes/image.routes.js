const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {
    router.post("/upload", controller.upload);
    router.get("/list", controller.getListFiles);

    app.use("/api/images", router);
};

module.exports = routes;