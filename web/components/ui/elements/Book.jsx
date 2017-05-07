import React from "react";

import CSSModules from "react-css-modules";
import styles from "./Book.scss";

const Book = props => {
	const id = props.id ? props.id : Math.random().toString().substring(2);
	const url = props.url
		? props.url
		: "https://source.unsplash.com/228x318/?book";
	const width = props.width ? props.width : 228;
	const height = props.height ? props.height : 318;

	return (
		<div styleName="book">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 210">
				<defs>
					<path
						id={id + "-a"}
						d="M0 210l0 0V0S1 .3 2.3.2c2-.2 5-.2 5-.2L7 210c-.8 0-2.4 0-4.4-.2z"
					/>
					<linearGradient
						id={id + "-b"}
						x1="-.1%"
						x2="100.1%"
						y1="50%"
						y2="50%"
					>
						<stop stopColor="#E6E6E6" offset="0%" />
						<stop stopColor="#FFF" offset="100%" />
					</linearGradient>
					<path id={id + "-c"} d="M160 210H7V0h160z" />
					<pattern
						id={id + "-img"}
						patternUnits="userSpaceOnUse"
						width={width}
						height={height}
					>
						<image xlinkHref={url} x="0" y="0" width={width} height={height} />
					</pattern>
				</defs>
				<g fill="none" fillRule="evenodd">
					<use fill="#FFC676" xlinkHref={"#" + id + "-a"} />
					<use
						fill={"url(#" + id + "-b)"}
						xlinkHref={"#" + id + "-a"}
						style={{
							mixBlendMode: "multiply"
						}}
					/>
					<use fill={"url(#" + id + "-img)"} xlinkHref={"#" + id + "-c"} />
					<path fill="#000" fillOpacity=".3" d="M6.3 0h1.4v210H6.3z" />
				</g>
			</svg>
		</div>
	);
};

export default CSSModules(Book, styles);
