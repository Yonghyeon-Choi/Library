import React, { useState, useEffect } from "react";
import bookService from "../../services/book.service";
import imageService from "../../services/image.service";
import "../GlobalStyles.css";

const Book = (props) => {
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
    const [currentBook, setCurrentBook] = useState(initialBookState);
    const [message, setMessage] = useState("");
    const [images, setImages] = useState([]);

    const getBook = id => {
        bookService.get(id)
            .then(response => {
                setCurrentBook(response.data);
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

    useEffect(() => {
        getBook(props.match.params.id);
        retrieveImages();
    }, [props.match.params.id]);

    const handleInputChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        setCurrentBook({ ...currentBook, [name]: value });
    };

    const updateContent = () => {
        let data = {
            id: currentBook.id,
            title: currentBook.title,
            isbn: currentBook.isbn,
            author: currentBook.author,
            publisher: currentBook.publisher,
            pubdate: currentBook.pubdate,
            cnt: currentBook.cnt,
            description: currentBook.description
        };

        bookService.update(currentBook.id, data)
            .then(response => {
                console.log(response.data);
                setMessage("수정이 완료 되었습니다.");
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

    const moveAdmin = () => {
        props.history.push("/admin");
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
                    <h5>도서 정보 수정</h5>
                    <hr/>
                    <form>
                        {imageView(currentBook)}
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
                                id="isbn"
                                name="isbn"
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
                                placeholder={"YYYYMMDD"}
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
                    <hr/>
                    <table width={"100%"}>
                        <tbody>
                            <tr>
                                <td className={"left-align"}>
                                    <button
                                        type="submit"
                                        className="addBtnStyle"
                                        onClick={updateContent}
                                    >
                                        수정
                                    </button>
                                    &nbsp;&nbsp;
                                    <button
                                        type="button"
                                        onClick={moveAdmin}
                                        className="addBtnStyle">
                                        목록
                                    </button>
                                </td>
                                <td className={"right-align"}>
                                    <button className="delBtnStyle" onClick={removeBook}>
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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