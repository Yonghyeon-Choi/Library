import React, { useState, useEffect } from "react";
import usermanageService from "../../services/usermanage.service";
import "../GlobalStyles.css";

const User = (props) => {
    const initialUserState = {
        id: null,
        username: "",
        email: "",
        brws: [],
    };
    const [currentUser, setCurrentUser] = useState(initialUserState);
    const [message, setMessage] = useState("");

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

    useEffect(() => {
        getUser(props.match.params.id);
    }, [props.match.params.id]);

    const removeUser = () => {
        usermanageService.remove(currentUser.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/usermanage");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentUser ? (
                <div className="edit-form">
                    <h5>사용자 관리</h5>
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
                    <button className="delBtnStyle right-align" onClick={removeUser}>
                        삭제
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a User...</p>
                </div>
            )}
        </div>
    );
};

export default User;