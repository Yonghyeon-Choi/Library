import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    retrieveBooks,
    findBooksByTitle,
    // deleteAllBooks,
} from "../../actions/books";
import { Link } from "react-router-dom";
import "../GlobalStyles.css";

const BooksList = (props) => {
    const [searchTitle, setSearchTitle] = useState("");
    const booksRef = useRef();
    const books = useSelector(state => state.books);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveBooks());
    }, []);

    booksRef.current = books;

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const addBook = () => {
        props.history.push("/admin/add");
    };

    const openBook = (rowIndex) => {
        const id = booksRef.current[rowIndex].id;

        props.history.push("/admin/" + id);
    };

    const findByTitle = () => {
        // refreshData();
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
            <div> {/*className="col-md-6"*/}
                <table width={"100%"}>
                    <tbody>
                    <tr>
                        <td width={"88%"}>
                            <h4>Books List</h4>
                        </td>
                        <td width={"12%"}>
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

                <div width={"100%"} style={{fontSize: "11px"}}>

                {books && books.map((book, index) => (
                    <div>
                        <tr key={index}>
                            <td width={"15%"}>book cover</td>
                            <td width={"2%"}/>
                            <td width={"10%"}><b>제목</b></td>
                            <td width={"2%"}/>
                            <td width={"57%"}>{book.title}</td>
                            <td width={"2%"}/>
                            <td width={"12%"}>
                                <button
                                    type="button"
                                    className="editBtnStyle"
                                    onClick={() => openBook(index)}>
                                    관리
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><b>저자</b></td>
                            <td></td>
                            <td>{book.author}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><b>출간일</b></td>
                            <td></td>
                            <td>{book.pubdate}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default BooksList;