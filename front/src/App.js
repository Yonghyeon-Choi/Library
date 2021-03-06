import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Profile from "./pages/04profile.page";
import Login from "./pages/05login.page";
import Register from "./pages/06register.page";

import Home from "./components/publicComponents/BooksList";
import BoardAdmin from "./pages/01admin.page";
import BoardUsermanage from "./pages/02usermanage.page";
import BoardUser from "./pages/03user.page";
import BoardBorrow from "./components/usermanageComponents/BorrowBookList";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import homeLogo from "./LibraryIcon.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand nav-back">
            {currentUser ? (
                showAdminBoard ? (
                    <Link to={"/admin"} className="navbar-brand white-font">
                      <img src={homeLogo} alt="homeLogo" className="home-logo"/>
                    </Link>
                    ) : (
                    <Link to={"/user"} className="navbar-brand white-font">
                      <img src={homeLogo} alt="homeLogo" className="home-logo"/>
                    </Link>
                    )

            ) : (
                <Link to={"/"} className="navbar-brand white-font">
                  <img src={homeLogo} alt="homeLogo" className="home-logo"/>
                </Link>
            )}
            <div className="navbar-nav mr-auto">
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link white-font">
                    ?????? ??????
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/usermanage"} className="nav-link white-font">
                      ????????? ??????
                    </Link>
                  </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link white-font">
                    ??????
                  </Link>
                </li>
              )}

              {currentUser && (
                  <li className="nav-item">
                    <Link to={"/borrow"} className="nav-link white-font">
                      ?????? ??????
                    </Link>
                  </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link white-font">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link white-font" onClick={this.logOut}>
                    ????????????
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link white-font">
                    ?????????
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link white-font">
                    ????????????
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/usermanage" component={BoardUsermanage} />
              <Route path="/user" component={BoardUser} />
              <Route path="/borrow" component={BoardBorrow} />

              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </div>

           <AuthVerify logOut={this.logOut}/>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
