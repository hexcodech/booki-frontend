import React from "react";

import "./Button.scss";

const Button = props => {
	return (
		<button styleName="button" {...props}>
			{props.children}
		</button>
	);
};

export default Button;
