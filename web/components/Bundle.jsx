import React from 'react';

class Bundle extends React.Component {

  componentWillMount(){
    
    this.setState({
      module: null
    });

    this.load(this.props);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.load !== this.props.load){
      this.load(nextProps);
    }
  }

  load(props){

    props.load((module) => {
      this.setState({
        // handle both es imports and cjs
        module: module.default ? module.default : module
      });
    });

  }

  render(){
    return this.props.children(this.state.module);
  }
}

export default Bundle;
