import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBook, deleteBook } from "../../actions/books";
import BookDataService from "../../services/book.service";

const Book = (props) => {
    const initialBookState = {
        id: null,
        title: "",
        isbn: "",
        author: "",
        publisher: "",
        pubdate: "",
        cnt: "",
        brw: "",
        description: ""
    };
    const [currentBook, setCurrentBook] = useState(initialBookState);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const getTutorial = id => {
        BookDataService.get(id)
            .then(response => {
                setCurrentBook(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getTutorial(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentBook({ ...currentBook, [name]: value });
    };

    // const updateStatus = status => {
    //     const data = {
    //         id: currentBook.id,
    //         title: currentBook.title,
    //         description: currentBook.description,
    //     };
    //
    //     dispatch(updateBook(currentBook.id, data))
    //         .then(response => {
    //             console.log(response);
    //
    //             setCurrentBook({ ...currentBook, published: status });
    //             setMessage("The status was updated successfully!");
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // };

    const updateContent = () => {
        dispatch(updateBook(currentBook.id, currentBook))
            .then(response => {
                console.log(response);

                setMessage("The Book was updated successfully.");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeBook = () => {
        dispatch(deleteBook(currentBook.id))
            .then(() => {
                props.history.push("/books");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentBook ? (
                <div className="edit-form">
                    <h4>Book</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">제목</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentBook.title}
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
                                value={currentBook.isbn}
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
                                value={currentBook.author}
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
                                value={currentBook.publisher}
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
                                value={currentBook.pubdate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">설명</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentBook.description}
                                onChange={handleInputChange}
                                rows={"5"}
                            />
                        </div>
                    </form>
                    {/*<div>*/}
                    {/*    <label>*/}
                    {/*        <strong>제목</strong>*/}
                    {/*    </label>{" "}*/}
                    {/*    {currentBook.title}*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label>*/}
                    {/*        <strong>ISBN</strong>*/}
                    {/*    </label>{" "}*/}
                    {/*    {currentBook.isbn}*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label>*/}
                    {/*        <strong>저자</strong>*/}
                    {/*    </label>{" "}*/}
                    {/*    {currentBook.author}*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label>*/}
                    {/*        <strong>출판사</strong>*/}
                    {/*    </label>{" "}*/}
                    {/*    {currentBook.publisher}*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label>*/}
                    {/*        <strong>출간일</strong>*/}
                    {/*    </label>{" "}*/}
                    {/*    {currentBook.pubdate}*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label>*/}
                    {/*        <strong>설명</strong>*/}
                    {/*    </label>{" "}*/}
                    {/*    {currentBook.description}*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label>*/}
                    {/*        <strong>보유 수</strong>*/}
                    {/*    </label>{" "}*/}
                    {/*    {currentBook.cnt}*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label>*/}
                    {/*        <strong>대출 중</strong>*/}
                    {/*    </label>{" "}*/}
                    {/*    {currentBook.brw}*/}
                    {/*</div>*/}

                    <button className="badge badge-danger mr-2" onClick={removeBook}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateContent}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Book...</p>
                </div>
            )}
        </div>
    );
};

export default Book;