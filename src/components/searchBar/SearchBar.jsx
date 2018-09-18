import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';

import throttle from '../../utils/throttle';
import debounce from '../../utils/debounce';

import { bookSearchStart } from '../../actions/search';

import SearchIcon from '../searchIcon/SearchIcon';

import './SearchBar.css';

class SearchBar extends PureComponent {
    constructor(props) {
        super(props);

        this.onSearchInputChange = this.onSearchInputChange.bind(this);

        this.state = {
            searchTerm: '',
            searchTyping: false,
        };
    }

    onSearchInputChange(e) {
        if (e.target.value.length < 3)
            return;

        this.setState({
            searchTyping: true
        });
        this.props.bookSearchStart(e.target.value);
        this.disableSearchAnimation();
    };

    disableSearchAnimation = debounce(() => this.setState({searchTyping: false}), 1000);

    render() {
        return (
        <Form className="flex-grow-1" color="#ffffff">
            <InputGroup>
                <Input type="search" placeholder="" className="border-booki" onChange={throttle(200, this.onSearchInputChange)} />
                <InputGroupAddon addonType="append">
                    <Button outline type="submit" color="booki">
                        <SearchIcon animated={this.state.searchTyping} />
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        search: state.search,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ bookSearchStart }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);