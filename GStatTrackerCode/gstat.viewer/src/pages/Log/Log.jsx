import React from "react";
import "./Log.css";
import { useNavigate } from "react-router-dom";

function Log() {
  const Nav = useNavigate();
  return (
    <div class="LogContainer">
      <div class="columns">
        <div class="column is-half">
          <div class="tile is-parent">
            <article class="tile is-child notification is-success">
              <p class="title">User Log</p>
              <p class="subtitle">Log Start</p>
              <div class="content">
        
              </div>
            </article>
          </div>
        </div>
        <div class="column is-half">
          <div class="tile is-parent">
            <article class="tile is-child notification is-danger">
              <p class="title">Repo Log</p>
              <p class="subtitle">Log Start</p>
              <div class="content">
        
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Log;
