import React from "react";
import "./Table.scss";

const Table = ({ interactive, children }) => {
	return (
		<table styleName={"table" + (interactive ? "-interactive" : "")}>
			{children}
		</table>
	);
};

export { Table };

const Seperator = props => {
	return (
		<tr styleName="seperator" {...props}>
			{props.children}
		</tr>
	);
};

export { Seperator };
