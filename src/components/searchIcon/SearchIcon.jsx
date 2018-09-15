import React, { PureComponent } from 'react';
import './SearchIcon.css';

class SearchIcon extends PureComponent {
    render() {
        return (
            <div className="search-icon mx-2">
                <svg viewBox="0 0 100 100">
                    <circle id="pie" className={this.props.animated ? 'toggled' : 'toggle-end'} cx="45" cy="45" r="20"></circle>
                    <circle id="circle" cx="45" cy="45" r="40"></circle>
                    <path id="line" className={this.props.animated ? 'toggled' : 'toggle-end'} d="M45,45 L100,100"></path>
                </svg>
            </div>
        );
    }
}

export default SearchIcon;