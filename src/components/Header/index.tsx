import React from 'react';
import { Link } from 'gatsby';
import './Header.scss';

interface HeaderProps {
  siteTitle?: string;
}

class Header extends React.PureComponent<HeaderProps, {}> {
  public render() {
    const { siteTitle } = this.props;

    return (
      <header className="header">
        <h1 className="header__title">
          <Link to="/" className="header__link">
            {siteTitle}
          </Link>
        </h1>
      </header>
    );
  }
}

export default Header;
