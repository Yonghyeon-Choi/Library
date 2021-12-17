import React, { useState, useEffect, useRef } from "react";
import usermanageService from "../../services/usermanage.service";
import "../GlobalStyles.css";

const UsersList = (props) => {
    const adminToken = window.localStorage.getItem('adminToken');

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

    const openUser = (rowIndex) => {
        const id = usersRef.current[rowIndex].id;

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

    const [adminId, setAdminId] = useState("");

    const setAuth = () => {
        const curUser = window.localStorage.getItem('user');
        const adminName = curUser.username;
        let adminId = "";

        for(let i = 0; i < users.length; i++){
            if(users[i].username === adminName){
                setAdminId(users[i].roles[0]);
                break
            }
        }
    };

    useEffect(() => {
        setAuth();
    }, []);

    const showAuth = (roleId) => {
        if(roleId===adminId){
            return <p>관리자</p>
        }
        else{
            return <p>사용자</p>
        }
    };

    return (
        <div>
            {adminId}
        {adminToken ? (
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
                            <th width={"15%"}>권한</th>
                            <th width={"15%"}>이름</th>
                            <th width={"28%"}>이메일</th>
                            <th width={"39%"}>대출 도서</th>
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
                                    <td width={"15%"}>{showAuth(user.roles[0])}</td>
                                    <td width={"15%"}>{user.username}</td>
                                    <td width={"28%"}>{user.email}</td>
                                    <td width={"39%"}>{user.brws && user.brws.map((book, bindex)=>(
                                        <div key={bindex}>
                                            <b>도서명</b>&nbsp;{book.bookname}
                                            <b>대출일</b>&nbsp;{book.brwtime}
                                        </div>
                                    ))}</td>
                                    <td width={"13%"} className={"right-align"}>
                                        <button
                                            type="button"
                                            className="editBtnStyle right-margin"
                                            onClick={() => openUser(index)}>
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
        ):(
            props.history.push("/login")
        )}
        </div>
    );
};

export default UsersList;