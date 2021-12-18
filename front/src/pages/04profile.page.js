import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import bookService from "../services/book.service";

class Profile extends Component {

    render() {
        const { user: currentUser } = this.props;

        return (
            <div
                className="container"
                style={{
                    marginTop: "50px",
                    padding: "30px",
                }}
            >
                {currentUser ? (
                    <div className="row">
                        <table className="table table-borderless">
                            <tbody>
                            <tr>
                                <th colSpan="3">
                                    <h3>
                                        <strong>{currentUser.username} 마이페이지</strong>
                                    </h3>
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Token </strong>
                                </td>
                                <td>
                                    {currentUser.accessToken.substring(0, 20)} ...{" "}
                                    {currentUser.accessToken.substr(
                                        currentUser.accessToken.length - 20
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Name </strong>
                                </td>
                                <td>{currentUser.username}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Email </strong>
                                </td>
                                <td>{currentUser.email}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>대출 도서 </strong>
                                </td>
                                <td>{currentUser.brws.map((book, index)=>(
                                    <div key={index}>
                                        <b>도서명</b>&nbsp;{getBook(book.bookid)}<br/>
                                        <b>대출일</b>&nbsp;{KST(book.brwtime)}<br/><br/>
                                    </div>
                                ))}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <Redirect to={"/login"}/>
                )
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
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

    useEffect(() => {
        retrieveBooks();
    }, []);

    const getBook = (id) => {
        let title = "";
        for(let i = 0; i < books.length; i++){
            if(books[i].id === id){
                title = books[i].title;
                break
            }
        }
        return title
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
    return {
        user,
    };
}
export default connect(mapStateToProps)(Profile);
