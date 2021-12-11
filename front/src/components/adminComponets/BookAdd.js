import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBook } from "../../actions/books";
import "../GlobalStyles.css";

const BookAdd = () => {
    const initialBookState = {
        id: null,
        id: null,
        title: "",
        isbn: "",
        author: "",
        publisher: "",
        pubdate: "",
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
                        <label htmlFor="title">제목</label>
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
                        <label htmlFor="isbn">ISBN</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ISBN"
                            name="ISBN"
                            value={book.isbn}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">저자</label>
                        <input
                            type="text"
                            className="form-control"
                            id="author"
                            name="author"
                            value={book.author}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="publisher">출판사</label>
                        <input
                            type="text"
                            className="form-control"
                            id="publisher"
                            name="publisher"
                            value={book.publisher}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pubdate">출간일</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pubdate"
                            name="pubdate"
                            value={book.pubdate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">설명</label>
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

                    <button onClick={saveBook} className="addBtnStyle">
                        등록
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookAdd;