const db = require("../models");
const Book = db.books;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.isbn) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    if (!req.body.author) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    if (!req.body.publisher) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    if (!req.body.pubdate) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Book
    const book = new Book({
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        pubdate: req.body.pubdate,
        description: req.body.description,
        cnt: 1,
        brw: 0,
        brws: []
    });

    // Save Book in the database
    book
        .save(book)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Book."
            });
        });
};

// Retrieve all Books from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    // const pubdate = req.query.pubdate;
    // var condition = pubdate ? { pubdate: { $regex: new RegExp(pubdate), $options: "i" } } : {};

    Book.find(condition).sort({pubdate: -1})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving books."
            });
        });
};

// Find a single Book with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Book.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Book with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Book with id=" + id });
        });
};

// Update a Book by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Book with id=${id}. Maybe Book was not found!`
                });
            } else res.send({ message: "Book was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Book with id=" + id
            });
        });
};

// Borrow Book.
exports.borrow = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                });
            } else res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Book.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
                });
            } else {
                res.send({
                    message: "Book was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Book with id=" + id
            });
        });
};

// Delete all Books from the database.
exports.deleteAll = (req, res) => {
    Book.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Books were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all books."
            });
        });
};

// Find all borrowed Books
exports.findAllBorrowed = (req, res) => {
    Book.find({ brw: !0 })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving books."
            });
        });
};