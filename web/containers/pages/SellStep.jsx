import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import Loader from "halogen/PulseLoader";

import { resetSell } from "app/actions/pages/sell";

import CSSModules from "react-css-modules";
import styles from "./SellStep.scss";

class SellStep extends React.Component {
	render() {
		let { dispatch, step, children, loading } = this.props;

		return (
			<div styleName="sell-step">
				<h1>Buch erfassen</h1>

				{children}

				<button
					styleName="cancel"
					className="btn btn-primary"
					onClick={() => {
						dispatch(push("/"));
						dispatch(resetSell());
					}}
				>
					Abbrechen
				</button>
				<button
					disabled={!this.props.nextEnabled}
					styleName="next"
					className="btn btn-primary"
					onClick={this.props.onNextStep}
				>
					{loading && <Loader styleName="spinner" color="#FFF" size="10px" />}
					Weiter
				</button>

			</div>
		);
	}
}

export default connect()(CSSModules(SellStep, styles));
