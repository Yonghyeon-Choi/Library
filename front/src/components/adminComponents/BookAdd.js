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

    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");

    const onChange = (e) => {
        e.preventDefault();
        const img = e.target.files[0];
        console.log(img);
        setImage(img);
        setPreview(URL.createObjectURL(img));
    };

    const saveBook = () => {
        var data = {
            id: book.id,
            title: book.title,
            isbn: book.isbn,
            author: book.author,
            publisher: book.publisher,
            pubdate: book.pubdate,
            description: book.description
        };

        bookService.create(data)
            .then(response => {
                setBook({
                    id: response.data.id,
                    title: response.data.title,
                    isbn: response.data.isbn,
                    author: response.data.author,
                    publisher: response.data.publisher,
                    pubdate: response.data.pubdate,
                    description: response.data.description
                });
                setSubmitted(true);
                // console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

        imageService.upload(image)
            .then(response => {
                setImage(response.image);
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
                    <h5>?????? ??????</h5>
                    <hr/>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">??????</label>
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
                                id="isbn"
                                name="isbn"
                                value={book.isbn}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">??????</label>
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
                            <label htmlFor="publisher">?????????</label>
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
                            <label htmlFor="pubdate">?????????</label>
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
                            <label htmlFor="description">??????</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={book.description}
                                onChange={handleInputChange}
                                rows={"5"}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cover-image">????????? ?????????</label>
                            {preview && (
                                <div>
                                    <img className={'preview'} src={preview} alt={''}/>
                                </div>
                            )}
                            <input 
                                type='file'
                                id='file-upload'
                                style={{display:'none'}}
                                name={book.isbn+'.png'}
                                accept='image/png'
                                onChange={onChange}/>
                            <label
                                className={"addBtnStyle fileUploadBtn"}
                                htmlFor="file-upload"
                            >
                                ?????? ??????
                            </label>
                        </div>
                    </form>
                    <hr/>
                    <button onClick={saveBook} className="addBtnStyle">
                        ??????
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookAdd;