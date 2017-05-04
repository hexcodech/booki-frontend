import React from "react";
import { connect } from "react-redux";

import CSSModules from "react-css-modules";
import styles from "./ConditionComponent.scss";

const ConditionValueComponent = ({ value: condition }) => {
	return (
		<div styleName="condition-value">
			<span styleName="description">
				{condition.key}
			</span>
		</div>
	);
};

export default CSSModules(ConditionValueComponent, styles);
