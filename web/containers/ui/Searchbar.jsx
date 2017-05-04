import React from "react";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
import { push } from "react-router-redux";

import { getParameterByName } from "core/utilities/location";

import { lookUpBooks } from "core/actions/book";

import CSSModules from "react-css-modules";
import styles from "./Searchbar.scss";

const getSuggestionValue = book => book.title;

const renderSuggestion = book => (
	<div>
		{book.title}
	</div>
);

class Search extends React.Component {
	constructor() {
		super();

		this.state = {
			value: "",
			suggestions: []
		};
	}

	componentDidMount = () => {
		//Search for local suggestions

		if (window.location.pathname.startsWith("/search/")) {
			let search = unescape(window.location.pathname.split("/search/")[1]);

			this.setState({
				value: search ? search : ""
			});
		}
	};

	getSuggestions = value => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		return inputLength === 0 ? [] : this.props.books.local;
	};

	onChange = (event, { newValue, method }) => {
		//Search for suggestions
		this.props.dispatch(lookUpBooks(newValue, "local"));

		this.setState({
			value: newValue
		});
	};

	onKeyPress = event => {
		if (event.key === "Enter") {
			if (this.state.value.length > 0) {
				this.props.dispatch(push("/search/" + this.state.value));
			}
		}
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: this.getSuggestions(value)
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	render() {
		const { value, suggestions } = this.state;

		const inputProps = {
			placeholder: "Suche nach einem Buch...",
			value,
			onChange: this.onChange,
			onKeyPress: this.onKeyPress
		};

		return (
			<div className="input-group" styleName="search">
				<Autosuggest
					theme={styles}
					suggestions={suggestions}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					getSuggestionValue={getSuggestionValue}
					renderSuggestion={renderSuggestion}
					inputProps={inputProps}
				/>
				<div className="input-group-addon" styleName="search-button">
					<i className="material-icons">search</i>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		books: state.app.lookedUpBooks
	};
};

export default connect(mapStateToProps)(CSSModules(Search, styles));
