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
        dispatch(findBooksByTitle(searchTitle));
    };

    const onKeyPress = (e) => {
        if(e.key === "Enter") findByTitle();
    };

    return (
        <div className="card">
            <div style={{width: "100%"}}>{/*className="col-md-8"*/}
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="제목"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                        onKeyPress={onKeyPress}
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
            <div style={{width: "100%"}}>
                <table width={"100%"}>
                    <tbody>
                    <tr>
                        <td width={"87%"}>
                            <h5>책 목록</h5>
                        </td>
                        <td width={"13%"} className={"right-align"}>
                            <button
                                className="addBtnStyle"
                                type="button"
                                onClick={addBook}
                            >
                                추가
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <hr/>

                {books && books.map((book, index) => (
                    <div>
                    <table key={index} width={"100%"} style={{fontSize: "11px"}}>
                        <tbody>
                            <tr>
                                <td width={"15%"}>book cover</td>
                                <td width={"2%"}/>
                                <td width={"10%"} className={"right-align"}><b>제목</b></td>
                                <td width={"1%"}/>
                                <td width={"57%"}>{book.title}</td>
                                <td width={"2%"}/>
                                <td width={"13%"}  className={"right-align"}>
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
                                <td></td>
                                <td className={"right-align"}><b>저자</b></td>
                                <td></td>
                                <td>{book.author}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td className={"right-align"}><b>출간</b></td>
                                <td></td>
                                <td>{book.publisher} {book.pubdate}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr>
                                <br/>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    ))}

            </div>
        </div>
    );
};

export default BooksList;