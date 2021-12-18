import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";

import userList from "../components/usermanageComponents/UsersList";
import oneUser from "../components/usermanageComponents/User";

const adminToken = window.localStorage.getItem('adminToken');

export default class usermanagePage extends Component {
    render() {
        return (
            <div className="container">
                {adminToken ? (
                    <>
                        <Link to={"/usermanage"}/>
                        <Switch>
                            <Route exact path={"/usermanage"} component={userList}/>
                            <Route exact path={"/usermanage/:id"} component={oneUser} />
                        </Switch>
                    </>
                ) : (
                    <Redirect to={"/login"}/>
                )}
            </div>
        );
    }
}
