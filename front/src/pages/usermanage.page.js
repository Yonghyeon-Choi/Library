import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import userList from "../components/usermanageComponents/UsersList";
import oneUser from "../components/usermanageComponents/User";

export default class adminPage extends Component {
    render() {
        return (
            <div className="container">
                <Link to={"/usermanage"}/>
                <Switch>
                    <Route exact path={"/usermanage"} component={userList}/>
                    <Route exact path={"/usermanage/:id"} component={oneUser} />
                </Switch>
            </div>
        );
    }
}
