import React, { useState } from 'react';

const Services = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(6);

    const listings = [
        {
            id: 1,
            category: 'flat-sale',
            title: '2 BHK New Launch Project for Sale',
            location: 'Thane West, Mumbai',
            price: '₹ 95 Lakh',
            description: 'Under construction property with excellent return on investment potential. 900 Sq.Ft.',
            badge: 'Direct Builder'
        },
        {
            id: 2,
            category: 'flat-sale',
            title: '3 BHK Ready to Move Flat for Sale',
            location: 'Powai, Mumbai',
            price: '₹ 2.5 Crore',
            description: 'Luxury amenities and prime location. Near IIT Bombay. Contact for viewing. 1650 Sq.Ft.',
            badge: 'Negotiable Price'
        },
        {
            id: 3,
            category: 'commercial',
            title: '3BHK Flat Furnished Flat',
            location: 'Nariman Point, Mumbai',
            price: '₹ 1,50,000 / month',
            description: 'Premium office space, high foot traffic area. Excellent connectivity. 2000 Sq.Ft.',
            badge: 'Direct Owner Listing'
        },
        {
            id: 4,
            category: 'flat-rent',
            title: '1 RK Compact Flat for Rent',
            location: 'Andheri East, Mumbai',
            price: '₹ 18,000 / month',
            description: 'Ideal for bachelors or small family. Close to metro station. Low maintenance. 500 Sq.Ft.',
            badge: 'Brokerage Applicable'
        },
        {
            id: 5,
            category: 'flat-rent',
            title: '4 BHK Sea-View Penthouse for Rent',
            location: 'Malabar Hill, Mumbai',
            price: '₹ 1,50,000 / month',
            description: 'Stunning panoramic sea view. Ultra-luxury living. Private terrace included. 3500 Sq.Ft.',
            badge: 'Brokerage Applicable'
        },
        {
            id: 6,
            category: 'flat-sale',
            title: '2 BHK New Launch Project for Sale',
            location: 'Thane West, Mumbai',
            price: '₹ 95 Lakh',
            description: 'Under construction property with excellent return on investment potential. 900 Sq.Ft.',
            badge: 'Direct Builder'
        },
        {
            id: 7,
            category: 'flat-rent',
            title: '2 BHK Furnished Flat for Rent',
            location: 'Bandra West, Mumbai',
            price: '₹ 65,000 / month',
            description: 'Fully furnished flat in prime location. Modern amenities and 24/7 security. 1100 Sq.Ft.',
            badge: 'Zero Brokerage'
        },
        {
            id: 8,
            category: 'commercial',
            title: 'Commercial Office Space',
            location: 'BKC, Mumbai',
            price: '₹ 2,00,000 / month',
            description: 'Premium office space in business district. High-speed internet and parking. 2500 Sq.Ft.',
            badge: 'Direct Owner'
        },
        {
            id: 9,
            category: 'flat-sale',
            title: '4 BHK Luxury Villa for Sale',
            location: 'Juhu, Mumbai',
            price: '₹ 5 Crore',
            description: 'Luxurious villa with private pool and garden. Premium location near beach. 3000 Sq.Ft.',
            badge: 'Premium Property'
        }
    ];

    const filterListings = (category) => {
        setActiveFilter(category);
        setVisibleCount(6); // Reset visible count when filter changes
    };

    const filteredListings = activeFilter === 'all'
        ? listings
        : listings.filter(listing => listing.category === activeFilter);

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
