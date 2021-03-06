import React from "react";

import "./Modal.scss";

const Modal = ({ children = [], fading = [] }) => {
	if (!Array.isArray(children)) {
		children = [children];
	}

	let childrenCopy = [].concat(children).reverse().filter(e => e);

	return (
		<div>
			<div styleName="overlay" />
			<div
				styleName="modal-wrapper"
				ref={el => {
					if (el) {
						setTimeout(() => {
							el.scrollIntoView();
						}, 0);
					}
				}}
			>
				<div styleName="modals">
					{React.Children.map(childrenCopy, (Modal, index) => {
						return (
							<div
								styleName={
									fading.indexOf(childrenCopy.length - 1 - index) !== -1
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
