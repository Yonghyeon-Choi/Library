import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBook } from "../../actions/books";

const BookAdd = () => {
    const initialBookState = {
        id: null,
        title: "",
        description: ""
    };
    const [book, setBook] = useState(initialBookState);
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    };

    const saveBook = () => {
        const { title, description } = book;

        dispatch(createBook(title, description))
            .then(data => {
                setBook({
                    id: data.id,
                    title: data.title,
                    description: data.description
                });
                setSubmitted(true);

                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newBook = () => {
        setBook(initialBookState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newBook}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={book.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={book.description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>

                    <button onClick={saveBook} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookAdd;