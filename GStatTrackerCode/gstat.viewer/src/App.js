import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import Repo from "./pages/Repo";
import Log from "./pages/Log";

function App() {
  return (
    <Router>
      <header className="header">
        <div className="hero is-success is-low">
          <div className="hero-body has-text-centered">
            <p className="title">GStat Tracker</p>
            <p className="subtitle">All-in-one tool for GitHub monitoring</p>
          </div>
        </div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item" href="/">
                Home
              </a>

              <a className="navbar-item" href="/user">
                User Query
              </a>

              <a className="navbar-item" href="/repo">
                Repo Query
              </a>

			        <a className="navbar-item" href="/log">
                Admin Log
              </a>

              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link"> More </a>
                <div className="navbar-dropdown">
                  <a
                    className="navbar-item"
                    href="https://github.com/febkosq8/GStat-Tracker"
                  >
                    About
                  </a>
                  <hr className="navbar-divider" />
                  <a
                    className="navbar-item"
                    href="https://github.com/febkosq8/GStat-Tracker/issues"
                  >
                    Report an issue
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="container is-widescreen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/repo" element={<Repo />} />
          <Route path="/log" element={<Log />} />
        </Routes>
      </div>

      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>GStat Tracker</strong> by{" "}
            <a href="https://jgthms.com">Febkosq8</a>. <br />
            You are running <strong>Ver: 1.3.0.6</strong> .
          </p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
