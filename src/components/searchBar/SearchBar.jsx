import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
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
            searchFocus: false,
        };
    }

    onSearchInputChange(e) {
        this.setState({searchTerm: e.target.value});
        
        if (e.target.value.length < 3)
            return;

        this.setState({searchTyping: true});
        this.props.bookSearchStart(e.target.value);
        this.disableSearchAnimation();
    };

    disableSearchAnimation = debounce(() => this.setState({searchTyping: false}), 1000);

    render() {
        return (
        <div className="flex-grow-1">
            <Form color="#ffffff">
                <InputGroup>
                    <Input type="search" placeholder="" className="border-booki" 
                    onChange={throttle(200, this.onSearchInputChange)} 
                    onFocus={() => this.setState({searchFocus: true})}
                    onBlur={() => this.setState({searchFocus: false})} />
                    <InputGroupAddon addonType="append">
                        <Button outline type="submit" color="booki">
                            <SearchIcon animated={this.state.searchTyping || this.props.search.bookSearchLoading} />
                        </Button>
                    </InputGroupAddon>
                </InputGroup>

                <Dropdown isOpen={this.state.searchFocus && this.state.searchTerm.length >= 3} toggle={() => console.log('asd')}>
                    <DropdownToggle tag="div" />
                    <DropdownMenu>
                        <DropdownItem tag="div" className="search-book-nullItem" />
                        {this.props.search.bookSearchResult && this.props.search.bookSearchResult.books.slice(0,5).map(book => {
                            return (
                            <DropdownItem key={book.isbn}>
                                <div className="d-flex">
                                    <div className="search-book-img align-self-center">
                                        <img src={book.image_url} alt={`Cover Bild ${book.title}`} />
                                    </div>
                                    <div className="search-book-content">
                                        <span>{book.title}</span>
                                        <span className="text-muted">{book.authors}</span>
                                        <span className="text-muted"><i>{book.publication_date ? new Date(book.publication_date*1000).getFullYear() : null}</i></span>
                                    </div>
                                </div>
                            </DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>
            </Form>
        </div>
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