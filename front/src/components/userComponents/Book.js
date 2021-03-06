import React, { useState, useEffect } from "react";
import bookService from "../../services/book.service";
import imageService from "../../services/image.service";
import usermanageService from "../../services/usermanage.service";
import "../GlobalStyles.css";

const Book = (props) => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const userid = user.id;
    const initialBookState = {
        id: null,
        title: "",
        isbn: "",
        author: "",
        publisher: "",
        pubdate: "",
        cnt: 0,
        brw: 0,
        brws: [],
        description: ""
    };
    const initialBorrowBookState = {
        id: null,
        title: "",
        isbn: "",
        author: "",
        publisher: "",
        pubdate: "",
        description: ""
    };
    const initialUserState = {
        id: null,
        username: "",
        email: "",
        brws: [],
    };
    const [currentBook, setCurrentBook] = useState(initialBookState);
    const [currentBorrow, setCurrentBorrow] = useState(initialBorrowBookState);
    const [message, setMessage] = useState("");
    const [images, setImages] = useState([]);
    const [currentUser, setCurrentUser] = useState(initialUserState);

    const getBook = id => {
        bookService.get(id)
            .then(response => {
                setCurrentBook(response.data);
                setCurrentBorrow(response.data);
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

    const getUser = () => {
        usermanageService.get(userid)
            .then(response => {
                setCurrentUser(response.data);
                // console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getBook(props.match.params.id);
        retrieveImages();
        getUser();
        // eslint-disable-next-line
    }, [props.match.params.id]);

    const borrowContent = (event) => {
        event.preventDefault();

        let now = new Date();
        let userId = userid;

        let userBrws = currentUser.brws;
        let bookBrws = currentBook.brws;

        userBrws.push({
            id: currentBorrow.id,
            title: currentBorrow.title,
            isbn: currentBorrow.isbn,
            author: currentBorrow.author,
            publisher: currentBorrow.publisher,
            pubdate: currentBorrow.pubdate,
            description: currentBorrow.description,
            brwtime : now
        })

        bookBrws.push({
            userid : userId,
            brwtime : now
        })

        setCurrentUser({ ...currentUser, brws: userBrws});
        setCurrentBook({ ...currentBook, brws: bookBrws});

        let userdata = {
            id: currentUser.id,
            brws: currentUser.brws,
        };

        let bookdata = {
            id: currentBook.id,
            brw: currentBook.brw + 1,
            brws: currentBook.brws,
        };

        usermanageService.borrow(userId, userdata)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

        bookService.borrow(currentBook.id, bookdata)
            .then(response => {
                console.log(response.data);
                setMessage("????????? ?????? ???????????????.");
            })
            .catch(e => {
                console.log(e);
            });
        // window.location.reload();
    };

    const moveUser = () => {
        props.history.push("/user");
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
                <div className={"wrapper"}>
                    <div style={{height: "200px", width: "140px"}}
                         className={"image-card center-align vert-center-align"}>
                        <img src={url} alt={name} height={"200px"} width={"140px"}/>
                    </div>
                </div>
            );
        }else{
            return (
                <div className={"wrapper"}>
                    <div style={{height: "200px", width: "140px"}}
                         className={"image-card center-align vert-center-align"}/>
                </div>
            );
        }
    };

    return (
        <div>
            {currentBook ? (
                <div className="edit-form">
                    <h5>?????? ??????</h5>
                    <hr/>
                    <form>
                        {imageView(currentBook)}
                        <div className="form-group">
                            <label htmlFor="title">??????</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentBook.title}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="isbn">ISBN</label>
                            <input
                                type="text"
                                className="form-control"
                                id="isbn"
                                name="isbn"
                                value={currentBook.isbn}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">??????</label>
                            <input
                                type="text"
                                className="form-control"
                                id="author"
                                name="author"
                                value={currentBook.author}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="publisher">?????????</label>
                            <input
                                type="text"
                                className="form-control"
                                id="publisher"
                                name="publisher"
                                value={currentBook.publisher}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pubdate">?????????</label>
                            <input
                                type="text"
                                className="form-control"
                                id="pubdate"
                                name="pubdate"
                                value={currentBook.pubdate}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">??????</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentBook.description}
                                rows={"5"}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cnt">?????? ???</label>
                            <input
                                type="number"
                                className="form-control"
                                id="cnt"
                                name="cnt"
                                value={currentBook.cnt}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="brw">?????? ???</label>
                            <input
                                type="number"
                                className="form-control"
                                id="brw"
                                name="brw"
                                value={currentBook.brw}
                                disabled
                            />
                        </div>
                    </form>
                    <hr/>
                    {(currentBook.cnt === currentBook.brw) ? (
                        <button
                            type="submit"
                            className="addBtnStyle"
                            disabled="disabled"
                        >
                            ??????
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="addBtnStyle"
                            onClick={borrowContent}
                        >
                            ??????
                        </button>
                    )}

                    &nbsp;&nbsp;
                    <button
                        type="button"
                        onClick={moveUser}
                        className="addBtnStyle">
                        ??????
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