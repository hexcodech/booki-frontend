import React
       from 'react';
import get
       from 'lodash/get';

const FormField = ({
	object, keyPath, fieldSize, label, labelSize, inputType,
	inputDisabled, inputSize, handleOnChange, inputProps={},
  errors = []
}) => {

	const onChange = (event) => {
		handleOnChange(event.target.id, event.target.value);
	};

	const value = get(object, keyPath);

	const inputField = typeof inputType === 'function' ?

              inputType(keyPath, value, errors, handleOnChange) :

              (<input
                {...inputProps}
								type={inputType ? inputType : 'text'}
								className={
                  'form-control' + (
                    errors.length > 0 ? ' form-control-danger' : ''
                  )
                }
								id={keyPath}
								value={value ? value : ''}
								onChange={onChange}
								autoComplete='off'
								disabled={inputDisabled ? inputDisabled : false}
               />);

	return (
    <div
      className={
        fieldSize + ' form-group' +  (errors.length > 0 ? ' has-danger': '')
      }
    >
			<div className='form-field row'>
				<label htmlFor={keyPath} className={labelSize}>
					{label ? label : '[Unlabeled]'}
				</label>
				<div className={inputSize}>
					{inputField}
          <div className='form-control-feedback'>
            {errors.map((error, index) => {
              return (<div className='alert alert-danger' key={index}>
                {error}
              </div>);
            })}
          </div>
				</div>
			</div>
		</div>
	);
};

export default FormField;
