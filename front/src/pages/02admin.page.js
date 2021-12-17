import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import bookList from "../components/adminComponets/BooksList";
import oneBook from "../components/adminComponets/Book";
import addBook from "../components/adminComponets/BookAdd";

export default class adminPage extends Component {
  render() {
    return (
        <div className="container">
          <Link to={"/admin"}/>
          <Switch>
            <Route exact path={"/admin"} component={bookList}/>
            <Route exact path={"/admin/add"} component={addBook} />
            <Route exact path={"/admin/:id"} component={oneBook} />
          </Switch>
        </div>
    );
  }
}
