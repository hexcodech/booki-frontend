import React
       from 'react';
import {connect}
       from 'react-redux';
import Autosuggest
       from 'react-autosuggest';
import {push}
       from 'react-router-redux';

import CSSModules
       from 'react-css-modules';
import styles
       from './Searchbar.scss';

const books = [
  {
    title: 'C++',
    year: 1972
  },
  {
    title: 'Elm',
    year: 2012
  }
];

const getSuggestions = (value) => {
  const inputValue  = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : books;
};

const getSuggestionValue = suggestion => suggestion.title;

const renderSuggestion = (suggestion) => (
  <div>
    {suggestion.title}
  </div>
);


class Search extends React.Component{

  constructor(){
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, {newValue, method}) => {
    this.setState({
      value: newValue
    });
  };

  onKeyPress = (event) => {
    if(event.key === 'Enter'){
      if(this.state.value.length > 0){

        this.props.dispatch(
          push('/search/' + this.state.value)
        );

      }
    }
  };

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render(){

    const {value, suggestions} = this.state;

    const inputProps = {
      placeholder: 'Suche nach einem Buch...',
      value,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    };

    return (
      <div className='input-group' styleName='search'>
        <Autosuggest
          theme={styles}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <div className='input-group-addon' styleName='search-button'>
          <i className='material-icons'>search</i>
        </div>
      </div>
    );
  }
}

export default connect()(CSSModules(Search, styles));
