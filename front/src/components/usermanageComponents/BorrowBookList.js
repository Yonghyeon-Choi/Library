import React, { useState, useEffect } from "react";
import bookService from "../../services/book.service";
import imageService from "../../services/image.service";
import usermanageService from "../../services/usermanage.service";
import "../GlobalStyles.css";

const BorrowBookList = (props) => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    const userid = user.id;

    const initialUserState = {
        id: null,
        username: "",
        email: "",
        brws: [],
    };
    const [images, setImages] = useState([]);
    const [books, setBooks] = useState([]);
    const [currentUser, setCurrentUser] = useState(initialUserState);

    const getUser = id => {
        usermanageService.get(id)
            .then(response => {
                setCurrentUser(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveBooks = () => {
        bookService.getAll()
            .then(response => {
                setBooks(response.data);
                //console.log(response.data);
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

    useEffect(() => {
        getUser(userid);
        retrieveBooks();
        retrieveImages();
    }, []);

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

    const returnBook = (book) => {
        let currentBook = book;
        let user = currentUser;

        for(let i = 0; i < user.brws.length; i++){
            if(user.brws[i].isbn === currentBook.isbn){
                user.brws.splice(i, i+1);
            }
        }
        console.log(user.brws);

        let currentBorrow = {};
        for(let i = 0; i< books.length; i++){
            if(books[i].id === currentBook.id){
                currentBorrow = books[i];
            }
        }

        console.log(currentBorrow.brws);

        // let userdata = {
        //     id: user.id,
        //     brws: user.brws,
        // };
        //
        // usermanageService.borrow(user.id, userdata)
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(e => {
        //         console.log(e);
        //     });
        //
        // let bookdata = {
        //     id: currentBook.id,
        //     brw: currentBook.brw - 1,
        //     brws: currentBook.brws,
        // };

        // bookService.borrow(currentBook.id, bookdata)
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(e => {
        //         console.log(e);
        //     });
        //


        // window.location.reload();
    };

    return (
        <div className="card">
            {userid}
            <div style={{width: "100%"}}>
                <h5>대출 도서</h5>
                <hr/>
                {currentUser.brws && currentUser.brws.map((book, index) => (
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
                                        onClick={() => returnBook(book)}
                                    >
                                        반납
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

export default BorrowBookList;
