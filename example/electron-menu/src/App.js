import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const { ipcRenderer } = window.require('electron');

class App extends Component {
  showRightMenu = () => {
    ipcRenderer.send('on-show-context-menu');
  }

  render() {
    return (
      <div className="App" onContextMenu={this.showRightMenu}>
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
        </header>
      </div>
    );
  }
}

export default App;
