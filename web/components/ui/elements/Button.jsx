import React from "react";

import CSSModules from "react-css-modules";
import styles from "./Button.scss";

const Button = props => {
	return (
		<button styleName="button" {...props}>
			{props.children}
		</button>
	);
};

export default CSSModules(Button, styles);
