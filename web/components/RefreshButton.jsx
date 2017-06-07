import React from "react";
import TimeAgo from "react-timeago";

import MdRefresh from "react-icons/md/refresh";

import CSSModules from "react-css-modules";
import styles from "./RefreshButton.scss";

const RefreshButton = ({ date, loading, refreshHandler }) => {
	return (
		<span>
			<a href="#" onClick={refreshHandler}>
				<MdRefresh styleName={loading ? "icon-spinning" : "icon"} />
			</a>

			{" "}

			{date &&
				<span>
					Refreshed{" "}
					<TimeAgo
						date={date}
						formatter={(value, unit, suffix) => {
							if (unit === "second") {
								return "just now";
							} else {
								return (
									value + " " + unit + (value > 1 ? "s" : "") + " " + suffix
								);
							}
						}}
					/>
				</span>}
		</span>
	);
};

export default CSSModules(RefreshButton, styles);
