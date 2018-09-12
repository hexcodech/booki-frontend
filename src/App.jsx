import React, { Component } from 'react';
import Router from './components/Router';
import Header from './components/header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router header={Header}/>
      </div>
    );
  }
}

export default App;
