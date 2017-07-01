import React from "react";
import { connect } from "react-redux";

import CSSModules from "react-css-modules";
import "./ConditionComponent.scss";

const ConditionOptionComponent = ({
	option: condition,
	isFocused,
	onFocus,
	onSelect
}) => {
	const handleMouseDown = event => {
		event.preventDefault();
		event.stopPropagation();

		onSelect(condition, event);
	},
		handleMouseEnter = event => {
			onFocus(condition, event);
		},
		handleMouseMove = event => {
			if (isFocused) {
				return;
			}
			onFocus(condition, event);
		};

	return (
		<div
			styleName="condition-option"
			onMouseDown={handleMouseDown}
			onMouseEnter={handleMouseEnter}
			onMouseMove={handleMouseMove}
		>
			<span styleName="description">{condition.key}</span>
		</div>
	);
};

export default ConditionOptionComponent;
