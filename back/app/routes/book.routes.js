module.exports = app => {
    const books = require("../controllers/book.controller.js");

    var router = require("express").Router();

    // Create a new Book
    router.post("/", books.create);

    // Retrieve all Books
    router.get("/", books.findAll);

    // Retrieve a single Book with id
    router.get("/:id", books.findOne);

    // Update a Book with id
    router.put("/:id", books.update);

    // Borrow Book
    router.put("/borrow/:id", books.borrow);

    // Delete a Book with id
    router.delete("/:id", books.delete);

    // Delete all Booksb
    router.delete("/", books.deleteAll);

    // // Retrieve all borrowed Books
    // router.get("/borrowed", books.findAllBorrowed);

    app.use("/api/books", router);
};