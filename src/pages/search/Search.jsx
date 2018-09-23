import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { bookAggregatedSearchStart } from '../../actions/search';

import './Search.css';

class Search extends PureComponent {
    constructor(props) {
        super(props);

        if (this.props.match.params.searchvalue)
            this.props.bookAggregatedSearchStart(this.props.match.params.searchvalue);
    }

    render() {
        return (
            <div>
                {this.props.match.params.searchvalue}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        search: state.search,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ bookAggregatedSearchStart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);