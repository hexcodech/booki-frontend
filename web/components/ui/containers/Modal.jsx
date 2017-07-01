import React from "react";

import "./Modal.scss";

const Modal = ({ children = [], fading = [] }) => {
	if (!Array.isArray(children)) {
		children = [children];
	}

	return (
		<div>
			<div styleName="overlay" />
			<div styleName="modal-wrapper">
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
		</div>
	);
};

export default Modal;
