import React
       from 'react';
import Select
       from 'react-select';

const SelectInput  = (props) => {

	const {async = false, creatable = false} = props;

	if(async){

		if(creatable){
			return	<div className='react-select'>
				<Select.AsyncCreatable
					{...props}
				/>
			</div>;
		}else{
			return	<div className='react-select'>
				<Select.Async
					{...props}
				/>
			</div>;
		}

	}else{

		if(creatable){
			return	<div className='react-select'>
				<Select.Creatable
					{...props}
				/>
			</div>;
		}else{
			return	<div className='react-select'>
				<Select
					{...props}
				/>
			</div>;
		}
	}
}

export default SelectInput;
