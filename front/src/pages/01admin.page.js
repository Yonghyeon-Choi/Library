import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import bookList from "../components/adminComponents/BooksList";
import oneBook from "../components/adminComponents/Book";
import addBook from "../components/adminComponents/BookAdd";

const adminToken = window.localStorage.getItem('adminToken');

export default class adminPage extends Component {
  render() {
    return (
        <div className="container">
            {adminToken ? (
                <>
                <Link to={"/admin"}/>
                <Switch>
                    <Route exact path={"/admin"} component={bookList}/>
                    <Route exact path={"/admin/add"} component={addBook} />
                    <Route exact path={"/admin/:id"} component={oneBook} />
                </Switch>
                </>
            ) : (
                <Link to={"/login")}/>
            )}

        </div>
    );
  }
}
