import React from "react";

import { API_URL } from "config.json";

import CSSModules from "react-css-modules";
import styles from "./FlagComponent.scss";

const FlagValueComponent = ({ value }) => {
	let url = API_URL + "/static/res/img/locales/" + value.value + ".svg";

	return (
		<span styleName="flag-value">
			<img src={url} height="20" width="20" />{value.label}
		</span>
	);
};

export default CSSModules(FlagValueComponent, styles);
