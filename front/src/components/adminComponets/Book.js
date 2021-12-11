import React, { useState, useEffect } from "react";
import bookService from "../../services/book.service";
import "../GlobalStyles.css";

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

    const getBook = id => {
        bookService.get(id)
            .then(response => {
                setCurrentBook(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getBook(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentBook({ ...currentBook, [name]: value });
    };

    // const updatePublished = status => {
    //     var data = {
    //         id: currentTutorial.id,
    //         title: currentTutorial.title,
    //         description: currentTutorial.description,
    //         published: status
    //     };
    //
    //     TutorialDataService.update(currentTutorial.id, data)
    //         .then(response => {
    //             setCurrentTutorial({ ...currentTutorial, published: status });
    //             console.log(response.data);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // };

    const updateContent = () => {
        bookService.update(currentBook.id, book)
            .then(response => {
                console.log(response.data);
                setMessage("The tutorial was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeBook = () => {
        bookService.remove(currentBook.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/admin");
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
                        <div className="form-group">
                            <label htmlFor="cnt">보유 수</label>
                            <input
                                type="number"
                                className="form-control"
                                id="cnt"
                                name="cnt"
                                value={currentBook.cnt}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="brw">대출 중</label>
                            <input
                                type="number"
                                className="form-control"
                                id="brw"
                                name="brw"
                                value={currentBook.brw}
                                onChange={handleInputChange}
                                disabled
                            />
                        </div>
                    </form>

                    <button className="delBtnStyle" onClick={removeBook}>
                        삭제
                    </button>

                    <button
                        type="submit"
                        className="addBtnStyle"
                        onClick={updateContent}
                    >
                        수정
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