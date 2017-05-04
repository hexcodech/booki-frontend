import React from "react";

import FormField from "web/components/form/FormField";

import CSSModules from "react-css-modules";
import styles from "./FormGroups.scss";

const FormGroups = ({ object, keyPaths, handleOnChange, errors = {} }) => {
	let formGroups = [];

	for (let i = 0; i < keyPaths.length; i++) {
		let formGroup = [];

		for (let j = 0; j < keyPaths[i].length; j++) {
			formGroup.push(
				<FormField
					key={i + "/" + j}
					object={object}
					keyPath={keyPaths[i][j].keyPath}
					fieldSize={"col-" + 12 / keyPaths[i].length}
					label={keyPaths[i][j].label}
					labelSize={"col-" + 2 * keyPaths[i].length}
					inputType={keyPaths[i][j].inputType}
					inputDisabled={keyPaths[i][j].inputDisabled}
					inputSize={"col-" + (12 - 2 * keyPaths[i].length)}
					handleOnChange={handleOnChange}
					inputProps={keyPaths[i][j].inputProps}
					errors={errors[keyPaths[i][j].keyPath]}
				/>
			);
		}

		formGroups.push(
			<div key={i} className="row" styleName="form-group">
				{formGroup}
			</div>
		);
	}

	return <div>{formGroups}</div>;
};

export default CSSModules(FormGroups, styles);
