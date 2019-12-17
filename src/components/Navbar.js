import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export class Navbar extends Component {
    linkStyle = {
        color: this.props.colorTheme.base,
        backgroundColor: this.props.colorTheme.pureHue,
    }
    render() {
        const { home, pages } = this.props;
        return (
            <nav className="navbar is-fixed-top">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">{home}</Link>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-start">
                        {pages.map(page => (
                        <Link
                            className="navbar-item"
                            to={"/".concat(page.component)}
                            key={page.id}>
                                {page.name}
                        </Link>
                        ))}
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    home: PropTypes.string.isRequired,
    pages: PropTypes.array.isRequired,
    colorTheme: PropTypes.object.isRequired,
};

export default Navbar;
