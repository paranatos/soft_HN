import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Feed from "./Feed/Feed";
import Thread from "./Thread/Thread";
import User from "./User/User";

export default function App() {
  let style = {
    margin: "10px"
  };
  return (
    <Router>
      <div>
        <nav>
          <span>
            <Link to="/" style={style}>
              TOP
            </Link>
          </span>

          <span>
            <Link to="/new" style={style}>
              NEW
            </Link>
          </span>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route key="top" exact path="/">
            <Feed mode="top" />
          </Route>
          <Route key="new" path="/new">
            <Feed mode="new" />
          </Route>
          <Route path="/post/:id" component={Thread}></Route>
          <Route path="/user/:id" component={User}></Route>
        </Switch>
      </div>
    </Router>
  );
}
