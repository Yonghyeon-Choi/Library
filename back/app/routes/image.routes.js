module.exports = app => {
    const images = require("../controllers/file.controller.js");

    var router = require("express").Router();

    router.post("/upload", images.upload);
    router.get("/list", images.getListFiles);

    app.use("/api/images", router);
};