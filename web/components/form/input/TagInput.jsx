import React		from 'react';
import {connect}	from 'react-redux';
import bindAll		from 'lodash/bindAll';

import {WithContext as ReactTags}
					from 'react-tag-input';

class TagInput extends React.Component{
	
	constructor(props){
		super(props);
		
		bindAll(this, ['handleChange', 'handleDelete', 'handleAddition', 'handleDrag']);
	}
	
	handleChange(tags){
		if(this.props.handleOnChange){
			this.props.handleOnChange(this.props.id, tags.map(el => el.text));
		}
	}
	
	handleDelete(i) {
		let tags = this.props.tags;
		tags.splice(i, 1);
		
		this.handleChange(tags);
	}
	
	handleAddition(tag) {
		let tags = this.props.tags;
		
		if(this.props.unique){
			
			for(let i=0;i<tags.length;i++){
				if(tags[i].text === tag){
					return;
				}
			}
			
		}
		
		tags.push({
			id: tags.length + 1,
			text: tag
		});
		
		this.handleChange(tags);
	}
	
	handleDrag(tag, currPos, newPos) {
		let tags = this.props.tags;

		// mutate array
		tags.splice(currPos, 1);
		tags.splice(newPos, 0, tag);

		// re-render
		this.handleChange(tags);
	}
	
	render(){
		let {tags, suggestions, placeholder} = this.props;
		
		return (
			<div className='clearfix react-tags'>
				<ReactTags tags={tags}
					suggestions={suggestions}
					handleDelete={this.handleDelete}
					handleAddition={this.handleAddition}
					handleDrag={this.handleDrag}
					classNames={{
						tags: 'tags-tags',
						tagInput: 'tags-input',
						tagInputField: 'tags-input-field',
						selected: 'tags-selected',
						tag: 'tags-tag',
						remove: 'tags-remove',
						suggestions: 'tags-suggestions',
					}}
					placeholder={placeholder}
				/>
			</div>
		)
	}
	
}

export default connect()(TagInput);