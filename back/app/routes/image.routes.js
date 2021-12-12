module.exports = app => {
    const images = require("../controllers/file.controller");

    var router = require("express").Router();

    router.post("/upload", images.upload);
    router.get("/list", images.getListFiles);
    router.get("/list/:name", controller.download);

    app.use("/api/images", router);
};