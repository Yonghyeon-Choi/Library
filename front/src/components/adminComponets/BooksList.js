import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    retrieveBooks,
    findBooksByTitle,
    // deleteAllBooks,
} from "../../actions/books";
import { Link } from "react-router-dom";
import "../GlobalStyles.css";

const BooksList = (props) => {
    const [currentBook, setCurrentBook] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    const books = useSelector(state => state.books);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveBooks());
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const refreshData = () => {
        setCurrentBook(null);
        setCurrentIndex(-1);
    };

    const setActiveBook = (book, index) => {
        setCurrentBook(book);
        setCurrentIndex(index);
    };

    const addBook = () => {
        props.history.push("/admin/add");
    };

    // const removeAllBooks = () => {
    //     dispatch(deleteAllBooks())
    //         .then(response => {
    //             console.log(response);
    //             refreshData();
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // };

    const findByTitle = () => {
        refreshData();
        dispatch(findBooksByTitle(searchTitle));
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6"> {/*className="col-md-6"*/}
                <table width={"100%"}>
                    <tbody>
                    <tr>
                        <td width={"88%"}>
                            <h4>Books List</h4>
                        </td>
                        <td>
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={addBook}
                            >
                                Add
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <ul className="list-group">
                    {books &&
                    books.map((book, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveBook(book, index)}
                            key={index}
                        >
                            <table style={{fontSize: "11px"}}>
                                <tbody>
                                <tr>
                                    <td width={"15%"} rowSpan={2}>book cover</td>
                                    <td width={"10%"}><b>제목</b></td>
                                    <td width={"75%"}>{book.title}</td>
                                </tr>
                                <hr/>
                                <tr>
                                    <td><b>저자</b></td>
                                    <td>{book.author}</td>
                                </tr>
                                </tbody>
                            </table>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentBook ? (
                    <div>
                        <h4>Book</h4>
                        <div>
                            <label>
                                <strong>제목</strong>
                            </label>{" "}
                            {currentBook.title}
                        </div>
                        <div>
                            <label>
                                <strong>ISBN</strong>
                            </label>{" "}
                            {currentBook.isbn}
                        </div>
                        <div>
                            <label>
                                <strong>저자</strong>
                            </label>{" "}
                            {currentBook.author}
                        </div>
                        <div>
                            <label>
                                <strong>출판사</strong>
                            </label>{" "}
                            {currentBook.publisher}
                        </div>
                        <div>
                            <label>
                                <strong>출간일</strong>
                            </label>{" "}
                            {currentBook.pubdate}
                        </div>
                        <div>
                            <label>
                                <strong>설명</strong>
                            </label>{" "}
                            {currentBook.description}
                        </div>
                        <div>
                            <label>
                                <strong>보유 수</strong>
                            </label>{" "}
                            {currentBook.cnt}
                        </div>
                        <div>
                            <label>
                                <strong>대출 중</strong>
                            </label>{" "}
                            {currentBook.brw}
                        </div>
                        <hr/>
                        <Link
                            to={"/admin/" + currentBook.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Book</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BooksList;