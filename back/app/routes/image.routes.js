const express = require("express");
const router = express.Router();
const images = require("../controllers/file.controller");

let routes = (app) => {
    router.post("/upload", images.upload);
    router.get("/list", images.getListFiles);

    app.use("/api/images", router);
};

module.exports = routes;