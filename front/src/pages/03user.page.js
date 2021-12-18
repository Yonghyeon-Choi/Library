import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";

import bookList from "../components/userComponents/BooksList";
import oneBook from "../components/userComponents/Book";

const adminToken = window.localStorage.getItem('adminToken');
const userToken = window.localStorage.getItem('userToken');

export default class userPage extends Component {
    render() {
        return (
            <div className="container">
                {(adminToken || userToken) ? (
                    <>
                        <Link to={"/user"}/>
                        <Switch>
                            <Route exact path={"/user"} component={bookList}/>
                            <Route exact path={"/user/:id"} component={oneBook} />
                        </Switch>
                    </>
                ) : (
                    <Redirect to={"/login"}/>
                )}
            </div>
        );
    }
}
