import React, { useState } from "react";
import bookService from "../../services/book.service";
import imageService from "../../services/image.service";
import "../GlobalStyles.css";

const BookAdd = () => {
    const initialBookState = {
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

    const handleInputChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    };

    const [images, setImages] = useState([]);

    const onChange = (e) => {
        e.preventDefault();
        const img = e.target.files[0];
        setImages(img);
    };

    const saveBook = () => {
        var data = {
            title: book.title,
            description: book.description
        };

        bookService.create(data)
            .then(response => {
                setBook({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description
                });
                setSubmitted(true);
                console.log(response.data);
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
                <div className={"edit-form"}>
                    <h5>도서 등록</h5>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">제목</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={book.title}
                                onChange={handleInputChange}
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
                                placeholder={"YYYYMMDD"}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">설명</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={book.description}
                                onChange={handleInputChange}
                                rows={"5"}
                            />
                        </div>
                        <div>
                            <input 
                                type='file'
                                accept='.png'
                                name='cover_img'
                                onChange={onChange}/>
                            <label
                                className={"addBtnStyle fileUploadBtn floatRight"}
                                htmlFor="file-upload"
                            >
                                사진 추가
                            </label>
                        </div>
                    </form>
                    <button onClick={saveBook} className="addBtnStyle">
                        등록
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookAdd;