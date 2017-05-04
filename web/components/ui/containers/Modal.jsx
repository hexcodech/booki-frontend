import React from "react";

import CSSModules from "react-css-modules";
import styles from "./Modal.scss";

const Modal = ({ children, fading = [] }) => {
	return (
		<div styleName="overlay">
			<div styleName="modals">
				{React.Children.map(children.reverse(), (Modal, index) => {
					return (
						<div
							styleName={
								fading.indexOf(children.length - 1 - index) !== -1
									? "modal-fading"
									: "modal"
							}
						>
							{Modal}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CSSModules(Modal, styles);
