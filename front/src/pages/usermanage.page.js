import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import userList from "../components/usermanageComponets/UsersList";
import oneUser from "../components/usermanageComponets/User";

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
