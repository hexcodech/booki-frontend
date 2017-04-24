import React
       from 'react';
import Autosuggest
       from 'react-autosuggest';

import CSSModules
       from 'react-css-modules';
import styles
       from './Search.scss';

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

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
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
      onChange: this.onChange
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

export default CSSModules(Search, styles);
