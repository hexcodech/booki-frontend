import React				from 'react';
import {connect}			from 'react-redux';

import FormField			from 'web/components/form/FormField';

const FormGroups = ({object, keyPaths, handleOnChange}) => {
	
	let formGroups = [];
	
	for(let i=0;i<keyPaths.length;i++){
		let formGroup = [];
		
		for(let j=0;j<keyPaths[i].length;j++){
			
			formGroup.push(
				<FormField
					key={j}
					object={object}
					keyPath={keyPaths[i][j].keyPath}
					fieldSize={'col-' + (12 / keyPaths[i].length) }
					
					label={keyPaths[i][j].label}
					labelSize={'col-' + (2 * keyPaths[i].length)}
					
					inputType={keyPaths[i][j].inputType}
					inputDisabled={keyPaths[i][j].inputDisabled}
					inputSize={'col-' + (12 - 2 * keyPaths[i].length)}
					input={keyPaths[i][j].input}
					
					handleOnChange={handleOnChange}
				/>
			);
			
			
		}
		
		formGroups.push(
			<div key={i} className='form-group row'>{formGroup}</div>
		);
	}
	
	return (
		<div className='form-groups'>{formGroups}</div>
	);
};

export default connect()(FormGroups);