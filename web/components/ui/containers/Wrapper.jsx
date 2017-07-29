import React from "react";
import { DEV_TOOLS } from "config.json";

import DevTools from "web/components/dev/DevTools";

import Footer from "web/components/ui/Footer";

import Header from "web/containers/ui/navigation/Header";

import Notifications from "web/containers/Notifications";
import "./Wrapper.scss";

const Wrapper = ({ children }) => {
	return (
		<div id="outer-container">
			<div styleName="border-wrapper">
				<Header />
				<div styleName="content" id="page-wrap">
					{children}
				</div>
			</div>
			<Footer />
			<Notifications />
			{DEV_TOOLS && <DevTools />}
		</div>
	);
};

export default Wrapper;
