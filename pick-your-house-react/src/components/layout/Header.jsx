import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('/');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setActiveLink(location.pathname);
        // Close mobile menu when route changes
        setIsMobileMenuOpen(false);
    }, [location]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="main-header">
            <div className="header-one">
                <div className="logo-group">
                    <Link to="/">
                        <img src="/PYH.webp" alt="Pick Your House Logo" className="main-logo" />
                    </Link>
                </div>

                {/* Mobile Menu Toggle Button */}
                <button
                    className="mobile-menu-toggle"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>

                {/* Desktop Navigation */}
                <nav className="main-nav">
                    <ul>
                        <li>
                            <Link
                                to="/"
                                className={activeLink === '/' ? 'active' : ''}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className={activeLink === '/about' ? 'active' : ''}
                            >
                                About us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/services"
                                className={activeLink === '/services' ? 'active' : ''}
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/blogs"
                                className={activeLink === '/blogs' ? 'active' : ''}
                            >
                                Blogs
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className={activeLink === '/contact' ? 'active' : ''}
                            >
                                Contact us
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="header-actions">
                    <Link to="/contact">Enquiry</Link>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li>
                        <Link
                            to="/"
                            className={activeLink === '/' ? 'active' : ''}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className={activeLink === '/about' ? 'active' : ''}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About us
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/services"
                            className={activeLink === '/services' ? 'active' : ''}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/blogs"
                            className={activeLink === '/blogs' ? 'active' : ''}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Blogs
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className={activeLink === '/contact' ? 'active' : ''}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Contact us
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className="mobile-enquiry-btn"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Enquiry
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
