import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router';
import SVG from 'react-inlinesvg';
import styles from './Header.module.css';
import HamburgerIcon from './icons/Hamburger';
import ShoppingCart from './ShoppingCart';
import Badge from './Badge';
import { FiExternalLink, FiShoppingCart } from 'react-icons/fi';

class Header extends Component {
  state = { showNav: false, showCart: false };

  static propTypes = {
    router: PropTypes.shape({
      pathname: PropTypes.string,
      query: PropTypes.shape({
        slug: PropTypes.string
      }),
      events: PropTypes.any
    }),
    title: PropTypes.string,
    navItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        slug: PropTypes.shape({
          current: PropTypes.string
        })
      })
    ),
    logo: PropTypes.shape({
      asset: PropTypes.shape({
        url: PropTypes.string
      }),
      logo: PropTypes.string
    })
  };

  componentDidMount() {
    const { router } = this.props;
    router.events.on('routeChangeComplete', this.hideMenu);
    router.events.on('routeChangeComplete', this.hideCart);
  }

  componentWillUnmount() {
    const { router } = this.props;
    router.events.off('routeChangeComplete', this.hideMenu);
    router.events.off('routeChangeComplete', this.hideCart);
  }

  hideMenu = () => {
    this.setState({ showNav: false });
  };

  hideCart = () => {
    this.setState({ showCart: false });
  };

  handleMenuToggle = () => {
    const { showNav } = this.state;
    this.setState({
      showNav: !showNav
    });
  };

  handleCartToggle = () => {
    const { showCart } = this.state;
    this.setState({
      showCart: !showCart
    });
  };

  renderLogo = (logo) => {
    if (!logo || !logo.asset) {
      return null;
    }

    if (logo.asset.extension === 'svg') {
      return (
        <SVG
          src={logo.asset.url}
          aria-label="Online Resouces Inc. logo"
          alt="Online Resources, Inc. logo in green text"
          className={styles.logo}
        />
      );
    }
    return (
      <img
        src={logo.asset.url}
        alt="Online Resources, Inc. logo in green text"
        className={styles.logo}
      />
    );
  };

  render() {
    const { title = 'Missing title', navItems, router, logo } = this.props;
    const { showNav, showCart } = this.state;

    return (
      <>
        <p className={styles.phoneNumberBar}>
          Contact a Team Member: <span className={styles.phoneNumber}>765-482-9700</span>
        </p>
        <div className={styles.root} data-show-nav={showNav} data-show-cart={showCart}>
          <div className={styles.innerNav}>
            <h1 className={styles.branding}>
              <Link
                href={{
                  pathname: '/LandingPage',
                  query: {
                    slug: '/'
                  }
                }}
                as="/"
                prefetch
              >
                <a title={title}>{this.renderLogo(logo)}</a>
              </Link>
            </h1>
            <nav className={styles.nav}>
              <ul className={styles.navItems}>
                {navItems &&
                  navItems.map((item) => {
                    // handle external URLs
                    if (item.url) {
                      return (
                        <li key={item._key} className={styles.navItem}>
                          <a href={item.url} target="_blank" className="external-link">
                            {item.navText} <FiExternalLink />
                          </a>
                        </li>
                      );
                    }
                    const { slug, title, _id } = item;
                    const isActive =
                      (router.pathname === '/LandingPage' && router.query.slug === slug.current) ||
                      // handles subpages like product pages
                      router.pathname.includes(slug.current);
                    return (
                      <li key={_id} className={styles.navItem}>
                        <Link
                          href={{
                            pathname: '/LandingPage',
                            query: { slug: slug.current }
                          }}
                          as={`/${slug.current}`}
                          prefetch
                        >
                          <a data-is-active={isActive ? 'true' : 'false'}>{title}</a>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
              {showCart && <ShoppingCart count={7} />}
              <button
                className={styles.showCartButton}
                onClick={this.handleCartToggle}
                title="Open cart"
              >
                <FiShoppingCart className={styles.shoppingCart} />
                <Badge count={7} />
              </button>
              <button
                className={styles.showNavButton}
                onClick={this.handleMenuToggle}
                title="Open menu"
              >
                <HamburgerIcon className={styles.hamburgerIcon} />
              </button>
            </nav>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Header);
