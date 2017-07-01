import React from "react";

import { API_URL } from "config.json";

import CSSModules from "react-css-modules";
import "./FlagComponent.scss";

const FlagOptionComponent = ({ option, isFocused, onFocus, onSelect }) => {
	let url = API_URL + "/static/res/img/locales/" + option.value + ".svg";

	const handleMouseDown = event => {
		event.preventDefault();
		event.stopPropagation();

		onSelect(option, event);
	},
		handleMouseEnter = event => {
			onFocus(option, event);
		},
		handleMouseMove = event => {
			if (isFocused) {
				return;
			}
			onFocus(option, event);
		};

	return (
		<div
			styleName="flag-option"
			onMouseDown={handleMouseDown}
			onMouseEnter={handleMouseEnter}
			onMouseMove={handleMouseMove}
		>
			<img src={url} height="20" width="20" />{option.label}
		</div>
	);
};

export default FlagOptionComponent;
