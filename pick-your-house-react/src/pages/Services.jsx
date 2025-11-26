import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';

const Services = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(6);
    const { properties } = useProperties();

    const filterListings = (category) => {
        setActiveFilter(category);
        setVisibleCount(6); // Reset visible count when filter changes
    };

    const filteredListings = activeFilter === 'all'
        ? properties
        : properties.filter(listing => listing.category === activeFilter);

    const visibleListings = filteredListings.slice(0, visibleCount);
    const hasMore = visibleCount < filteredListings.length;

    const loadMore = () => {
        setVisibleCount(prev => prev + 3);
    };

    return (
        <main className="page-content container">
            <section className="sub-nav">
                <a
                    href="#"
                    className={`sub-nav-item ${activeFilter === 'all' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); filterListings('all'); }}
                >
                    All Listings
                </a>
                <a
                    href="#"
                    className={`sub-nav-item ${activeFilter === 'flat-rent' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); filterListings('flat-rent'); }}
                >
                    Flat for Rent
                </a>
                <a
                    href="#"
                    className={`sub-nav-item ${activeFilter === 'flat-sale' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); filterListings('flat-sale'); }}
                >
                    Flat for Sale
                </a>
                <a
                    href="#"
                    className={`sub-nav-item ${activeFilter === 'commercial' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); filterListings('commercial'); }}
                >
                    Flat for Buy
                </a>
            </section>

            <div className="listings-grid">
                {visibleListings.map((listing) => (
                    <div key={listing.id} className={`listing-card ${listing.category} all`}>
                        <div className={listing.id === 1 || listing.id === 6 ? 'card-image-1' : 'card-image'}>
                            <img src="/1183405_20-350x350.jpg" alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div className="card-body">
                            <h3>{listing.title}</h3>
                            <p className="location">{listing.location}</p>
                            <p className="price">{listing.price}</p>
                            <p className="description">{listing.description}</p>
                            <div className="details-bar">
                                <span className="view-details">View Details</span>
                                <span className="brokerage">{listing.badge}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className="load-more-container">
                    <button id="load-more-btn" onClick={loadMore}>
                        Load More Properties
                    </button>
                </div>
            )}
        </main>
    );
};

export default Services;
