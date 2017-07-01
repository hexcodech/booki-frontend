import React from "react";
import "./Bugtracker.scss";

import ReactMarkdown from "react-markdown";

import FaExclamation from "react-icons/fa/exclamation";
import FaCheck from "react-icons/fa/check";

class Bugtracker extends React.Component {
	constructor() {
		super();

		this.state = {
			issues: []
		};
	}

	componentDidMount = () => {
		let request = new XMLHttpRequest();
		request.addEventListener("load", event => {
			if (request.status >= 200 && request.status < 300) {
				this.setState({ issues: JSON.parse(request.responseText) });
			} else {
				console.warn(request.statusText, request.responseText);
			}
		});

		request.open(
			"GET",
			"https://api.github.com/repos/hexcodech/booki-frontend/issues?state=all",
			true
		);
		request.setRequestHeader("Content-Type", "application/json");
		request.setRequestHeader("Accept", "application/vnd.github.v3+json");
		request.send();
	};

	render = () => {
		const { issues } = this.state;
		let first = false;
		return (
			<div styleName="bugtracker">
				<div className="container">
					<ul styleName="timeline">
						{issues.map((issue, index) => {
							let date = new Date(issue.created_at),
								checked = false;
							if (!first && issue.state === "open") {
								first = true;
								checked = true;
							}

							return (
								<li styleName="event" key={issue.id}>
									<input
										id={issue.id}
										type="radio"
										name="tl-group"
										defaultChecked={checked}
									/>
									<label htmlFor={issue.id} />
									<div styleName={"thumb-" + issue.state}>
										<div styleName="icon">
											{issue.state === "open" ? <FaExclamation /> : <FaCheck />}
										</div>
										<span>
											{date.getDate() +
												". " +
												(date.getMonth() + 1) +
												". " +
												date.getFullYear()}
										</span>
									</div>
									<div styleName="content-perspective">
										<div styleName="content">
											<div styleName="content-inner">
												<h3>{issue.title}</h3>
												<div styleName="issue-body">
													<ReactMarkdown source={issue.body} />
													<a href={issue.html_url} target="_blank">Details</a>
												</div>
											</div>
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	};
}

export default Bugtracker;
