import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  showNotification = () => {
    new Notification('Welcome to Electron', {
      body: 'This is HTML5 notification.',
      silent: false
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div className="notify-button" onClick={this.showNotification}>Show Notification</div>
        </header>
      </div>
    );
  }
}

export default App;
