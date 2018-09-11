import React, { Component } from 'react';
import Router from './Router';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router header={ Header() }/>
      </div>
    );
  }
}

export default App;
