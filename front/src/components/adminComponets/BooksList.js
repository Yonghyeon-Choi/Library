import React, { useState, useEffect, useRef } from "react";
import "../GlobalStyles.css";

import bookService from "../../services/book.service";
import imageService from "../../services/image.service";

const BooksList = (props) => {
    const adminToken = window.localStorage.getItem('adminToken');

    const [searchTitle, setSearchTitle] = useState("");
    const [images, setImages] = useState([]);
    const [books, setBooks] = useState([]);
    const booksRef = useRef();
    booksRef.current = books;

    useEffect(() => {
        retrieveBooks();
        retrieveImages();
    }, []);

    const retrieveBooks = () => {
        bookService.getAll()
            .then(response => {
                setBooks(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveImages = () => {
        imageService.getFiles()
            .then(response => {
                setImages(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const onChangeSearchTitle = e => {
        e.preventDefault();
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
        bookService.findByTitle(searchTitle)
            .then(response => {
                setBooks(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const onKeyPress = (e) => {
        e.preventDefault();
        if(e.key === "Enter") findByTitle();
    };

    const imageView = (book) => {
        const isbn = book.isbn;
        let name = "";
        let url = "";
        let exist = false;

        for(let i = 0; i < images.length; i++){
            if(images[i]['name'].includes(isbn)){
                name = images[i]['name'];
                url = images[i]['url'];
                exist = true;
                break;
            }
        }
        if(exist) {
            return (
                <div style={{height: "100px", width: "70px"}}
                     className={"image-card right-align vert-center-align left-margin"}>
                    <img src={url} alt={name} height={"100px"} width={"70px"}/>
                </div>
            );
        }else{
            return (
                <div style={{height: "100px", width: "70px"}}
                     className={"image-card right-align vert-center-align left-margin"}/>
            );
        }
    };

    return (
        <div>
        {adminToken ? (
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
                                className="btn btn-outline-secondary form-control"
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
                            <td width={"85%"}>
                                <h5>책 목록</h5>
                            </td>
                            <td width={"15%"} className={"right-align"}>
                                <button
                                    className="addBtnStyle"
                                    type="button"
                                    onClick={addBook}
                                >
                                    등록
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <hr/>
                    {books && books.map((book, index) => (
                        <div key={index}>
                            <table width={"100%"} style={{fontSize: "11px"}}>
                                <tbody>
                                <tr>
                                    <td width={"15%"} rowSpan={5}>{imageView(book)}</td>
                                    <td width={"2%"}/>
                                    <td width={"10%"} className={"right-align"}><b>제목</b></td>
                                    <td width={"1%"}/>
                                    <td width={"50%"}><b>{book.title}</b></td>
                                    <td width={"2%"}/>
                                    <td width={"13%"} className={"right-align"}>
                                        <button
                                            type="button"
                                            className="editBtnStyle right-margin"
                                            onClick={() => openBook(index)}>
                                            수정
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td/>
                                    <td className={"right-align"}><b>설명</b></td>
                                    <td/>
                                    <td><i>{book.description}</i></td>
                                    <td/>
                                    <td/>
                                </tr>
                                <tr>
                                    <td/>
                                    <td className={"right-align"}><b>저자</b></td>
                                    <td/>
                                    <td>{book.author}</td>
                                    <td/>
                                    <td/>
                                </tr>
                                <tr>
                                    <td/>
                                    <td className={"right-align"}><b>출간</b></td>
                                    <td/>
                                    <td>{book.publisher} {book.pubdate}</td>
                                    <td/>
                                    <td/>
                                </tr>
                                <tr>
                                    <td/>
                                    <td className={"right-align"}><b>ISBN</b></td>
                                    <td/>
                                    <td>{book.isbn}</td>
                                    <td/>
                                    <td/>
                                </tr>
                                </tbody>
                            </table>
                            <br/>
                        </div>
                    ))}

                </div>
            </div>
        ):(
            props.history.push("/login")
        )}
        </div>
    );
};

export default BooksList;