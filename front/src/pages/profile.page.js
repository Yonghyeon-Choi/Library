import React, { Component } from "react";
import { connect } from "react-redux";
//import { Redirect } from 'react-router-dom';

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
                <div className="row">

                    <table className="table table-borderless">
                        <tbody>
                        <tr>
                            <th colSpan="3">
                                <h3>
                                    <strong>{currentUser.username}'s Profile</strong>
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
                                <strong>DB ID </strong>
                            </td>
                            <td>{currentUser.id}</td>
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
                                <strong>Authorities </strong>
                            </td>
                            <td>{currentUser.roles[0]}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}
export default connect(mapStateToProps)(Profile);
