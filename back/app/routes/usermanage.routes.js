module.exports = app => {
    const users = require("../controllers/usermanage.controller.js");

    var router = require("express").Router();

    // Retrieve all Users
    router.get("/", users.findAll);

    // // Retrieve all borrowed Users
    // router.get("/borrowed", uses.findAllBorrowed);

    // Retrieve a single User with id
    router.get("/:id", users.findOne);

    // Update a User with id
    router.put("/:id", users.update);

    // Update a User with id
    router.put("/borrow/:id", users.borrow);

    // Delete a User with id
    router.delete("/:id", users.delete);

    // Delete all Users
    router.delete("/", users.deleteAll);

    app.use("/api/usermanage", router);
};