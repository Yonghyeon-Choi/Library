import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import bookList from "../components/publicComponets/BooksList";

export default class publicPage extends Component {
    render() {
        return (
            <div className="container">
                <Link to={"/"}/>
                <Switch>
                    <Route exact path={"/"} component={bookList}/>
                </Switch>
            </div>
        );
    }
}