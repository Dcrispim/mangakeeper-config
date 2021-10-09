import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import GeneralPage from "../GeneralPage";

// import { Container } from './styles';

const MainContent: React.FC = () => {
  return (
    <Router>
      <div>
          <Route path="/general" component={GeneralPage}></Route>
          <Route path="/tags" component={Users}>
            <Users />
          </Route>
          <Route exact path="/" component={GeneralPage}>
          </Route>
      </div>
    </Router>
  );
};

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default MainContent;
