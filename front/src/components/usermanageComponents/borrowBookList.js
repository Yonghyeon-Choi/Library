import React, { useState, useEffect, useRef } from "react";
import bookService from "../../services/book.service";
import usermanageService from "../../services/usermanage.service";
import "../GlobalStyles.css";

const borrowBookList = (props) => {
    let user = window.localStorage.getItem("user");
    user = JSON.parse(user);
    const userBorrows = user.brws;

    const [images, setImages] = useState([]);
    const [books, setBooks] = useState([]);

    const retrieveBooks = () => {
        bookService.getAll()
            .then(response => {
                setBooks(response.data);
                // console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveImages = () => {
        imageService.getFiles()
            .then(response => {
                setImages(response.data);
                // console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    let brws = [];

    const getBook = (id) => {
        let title = "";
        for(let i = 0; i < books.length; i++){
            if(books[i].id === id){
                brws.push(books[i]);
            }
        }
    };

    const retieveBorrows = () => {
        for(let i = 0; i < userBorrows.length; i++){
            getBook(userBorrows[i].bookid);
        }
    };

    useEffect(() => {
        retrieveBooks();
        retrieveImages();
        retieveBorrows()
    }, []);

    const KST = (utc) => {
        const KST = new Date(utc);

        let year = KST.getFullYear();
        let month = ('0' + (KST.getMonth() + 1)).slice(-2);
        let day = ('0' + KST.getDate()).slice(-2);
        let dateString = year + '년' + month  + '월' + day +"일 ";
        let hours = ('0' + KST.getHours()).slice(-2);
        let minutes = ('0' + KST.getMinutes()).slice(-2);
        let seconds = ('0' + KST.getSeconds()).slice(-2);
        let timeString = hours + '시' + minutes  + '분' + seconds + "초";

        return dateString + timeString;
    };

    return (
        <div className="card">
            <div style={{width: "100%"}}>
                <h5>대출 도서</h5>
                <hr/>
                {brws && brws.map((book, index) => (
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
                                        >>
                                    </button>
                                </td>
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
    );
};

export default borrowBookList;