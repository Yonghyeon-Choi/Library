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
                    <hr/>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">이름</label>
                            {currentUser.username}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">이메일</label>
                            {currentUser.email}
                        </div>
                        <div className="form-group">
                            <label htmlFor="brws">대출 도서</label>
                            {currentUser.brws && currentUser.brws.map((book, index)=>(
                                <div key={index}>
                                    <b>도서명</b>&nbsp;{book.bookname}
                                    <b>대출일</b>&nbsp;{book.brwtime}
                                </div>
                            ))}
                        </div>
                    </form>
                    <hr/>
                    <div className="right-align">
                        <button className="delBtnStyle" onClick={removeUser}>
                            회원 삭제
                        </button>
                    </div>

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