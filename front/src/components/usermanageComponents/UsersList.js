import React, { useState, useEffect, useRef } from "react";
import usermanageService from "../../services/usermanage.service";
import moment from "moment-timezone";
import "../GlobalStyles.css";

const UsersList = (props) => {
    const [searchName, setSearchName] = useState("");
    const [users, setUsers] = useState([]);
    const usersRef = useRef();
    usersRef.current = users;

    useEffect(() => {
        retrieveUsers();
    }, []);

    const retrieveUsers = () => {
        usermanageService.getAll()
            .then(response => {
                setUsers(response.data);
                // console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const onChangeSearchName = e => {
        e.preventDefault();
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const openUser = (id) => {
        props.history.push("/usermanage/" + id);
    };

    const findByName = () => {
        usermanageService.findByName(searchName)
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const onKeyPress = (e) => {
        if(e.key === "Enter") findByName();
    };

    const KST = (utc) => {
        const KST = new Date(utc);
        KST.setHours(KST.getHours()+9);

        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);
        let dateString = year + '년 ' + month  + '월 ' + day +"일  ";
        let hours = ('0' + today.getHours()).slice(-2);
        let minutes = ('0' + today.getMinutes()).slice(-2);
        let seconds = ('0' + today.getSeconds()).slice(-2);
        let timeString = hours + '시 ' + minutes  + '분 ' + seconds + "초";
        return dateString + timeString;
    };

    return (
        <div className="card">
            <div style={{width: "100%"}}>{/*className="col-md-8"*/}
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="이름"
                        value={searchName}
                        onChange={onChangeSearchName}
                        onKeyPress={onKeyPress}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary form-control"
                            type="button"
                            onClick={findByName}
                        >
                            검색
                        </button>
                    </div>
                </div>
            </div>
            <div style={{width: "100%"}}>
                <h5>사용자 목록</h5>
                <hr/>
                <table width={"100%"} style={{fontSize: "11px"}}>
                    <thead>
                    <tr>
                        <th width={"15%"}>이름</th>
                        <th width={"25%"}>이메일</th>
                        <th width={"47%"}>대출 도서</th>
                        <th width={"13%"}/>
                    </tr>
                    </thead>
                </table>
                <br/>
                {users && users.map((user, index) => (
                    <div key={index}>
                        <table width={"100%"} style={{fontSize: "11px"}}>
                            <tbody>
                            <tr>
                                <td width={"15%"}>{user.username}</td>
                                <td width={"25%"}>{user.email}</td>
                                <td width={"47%"}>{user.brws && user.brws.map((book, bindex)=>(
                                    <div key={bindex}>
                                        <b>도서명</b>&nbsp;{book.bookname}<br/>
                                        <b>대출일</b>&nbsp;{KST(book.brwtime)}
                                    </div>
                                ))}</td>
                                <td width={"13%"} className={"right-align"}>
                                    <button
                                        type="button"
                                        className="editBtnStyle right-margin"
                                        onClick={() => openUser(user._id)}>
                                        관리
                                    </button>
                                </td>
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

export default UsersList;