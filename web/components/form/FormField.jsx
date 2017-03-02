import React				from 'react';
import {connect}			from 'react-redux';
import get					from 'lodash/get';

const FormField = ({object, keyPath, fieldSize, label, labelSize, inputType, inputDisabled, inputSize, input, handleOnChange}) => {
	
	let onChange = (event) => {
		handleOnChange(event.target.id, event.target.value);
	};
	
	let value = get(object, keyPath);
	
	let inputField = input	? input(keyPath, value, handleOnChange)
							: <input
								type={inputType ? inputType : 'text'}
								className='form-control'
								id={keyPath}
								value={value ? value : ''}
								onChange={onChange}
								autoComplete='off'
								disabled={inputDisabled ? inputDisabled : false}
							/>;
	
	return (
		<div className={fieldSize}>
			<div className='form-field row'>
				<label htmlFor={keyPath} className={labelSize}>
					{label ? label : '[Unlabeled]'}
				</label>
				<div className={inputSize}>
					{inputField}
				</div>
			</div>
		</div>
	);
};

export default connect()(FormField);