import React from "react";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
import { push } from "react-router-redux";

import { getParameterByName } from "core/utilities/location";

import { updateText } from "app/actions/search-bar";
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
	componentDidMount = () => {
		//Search for local suggestions

		if (window.location.pathname.startsWith("/search/")) {
			let search = unescape(window.location.pathname.split("/search/")[1]);

			if (search) {
				this.props.dispatch(updateText(search));
			}
		}
	};

	onChange = (event, { newValue, method }) => {
		//Search for suggestions
		if (newValue && newValue.length > 0) {
			this.props.dispatch(lookUpBooks(newValue, "local"));
		}

		this.props.dispatch(updateText(newValue));
	};

	onSuggestionsFetchRequested = () => {};

	onSuggestionsClearRequested = () => {};

	onKeyPress = event => {
		if (event.key === "Enter") {
			if (this.props.query.length > 0) {
				this.props.dispatch(push("/search/" + this.props.query));
			}
		}
	};

	render() {
		const { query: value, suggestions } = this.props;

		const inputProps = {
			placeholder: "Suche nach einem Buch...",
			value,
			onKeyPress: this.onKeyPress,
			onChange: this.onChange
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
		suggestions: state.app.lookedUpBooks.local,
		query: state.app.searchBar.query
	};
};

export default connect(mapStateToProps)(CSSModules(Search, styles));
