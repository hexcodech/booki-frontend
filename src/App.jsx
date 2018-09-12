import React, { Component } from 'react';
import Router from './components/Router';
import LazyComponent from './utils/LazyComponent';

const AsyncHeader = LazyComponent(() => import('./components/header/Header'));

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router header={AsyncHeader}/>
      </div>
    );
  }
}

export default App;
