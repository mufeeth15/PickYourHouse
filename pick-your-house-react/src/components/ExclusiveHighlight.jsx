import React, { useRef } from 'react';

const ExclusiveHighlight = () => {
    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
    };

    const properties = [
        {
            id: 1,
            title: '3 BHK Row',
            location: 'Kopar Khairane, Navi Mumbai, Maharashtra',
            description: 'Discover the perfect blend of comfort and elegance with this spacious 3 BHK row house. Wake up to...',
            bedrooms: 4,
            bathrooms: 3,
            area: '500SqFt',
            price: '₹55,000K',
            tag: 'For Rent'
        },
        {
            id: 2,
            title: '2 BHK Luxury Flat',
            location: 'Vashi, Navi Mumbai, Maharashtra',
            description: 'Modern luxury flat with premium amenities and stunning city views. Perfect for families looking for...',
            bedrooms: 2,
            bathrooms: 2,
            area: '850SqFt',
            price: '₹45,000K',
            tag: 'For Sale'
        },
        {
            id: 3,
            title: '4 BHK Penthouse',
            location: 'Ghansoli, Navi Mumbai, Maharashtra',
            description: 'Spacious penthouse with private terrace and modern interiors. Experience luxury living at its finest...',
            bedrooms: 4,
            bathrooms: 4,
            area: '1200SqFt',
            price: '₹85,000K',
            tag: 'For Rent'
        },
        {
            id: 4,
            title: '1 BHK Compact Flat',
            location: 'Airoli, Navi Mumbai, Maharashtra',
            description: 'Cozy and affordable flat perfect for bachelors or small families. Well-connected to metro station...',
            bedrooms: 1,
            bathrooms: 1,
            area: '450SqFt',
            price: '₹25,000K',
            tag: 'For Rent'
        }
    ];

    return (
        <section className="exclusive-highlight-section">
            <div className="section-header">
                <h2>Exclusive Property Highlight</h2>
            </div>
            <div className="highlight-content">
                <button className="scroll-btn prev-btn" onClick={scrollLeft}>←</button>
                <div className="highlight-card-wrapper" id="highlight-wrapper" ref={scrollContainerRef}>
                    {properties.map((property) => (
                        <div key={property.id} className="highlight-card for-rent">
                            <div className="card-image-box">
                                <img src="/1183405_20-350x350.jpg" alt={property.title} />
                                <span className="feature-tag">FEATURED</span>
                                <span className="type-tag">{property.tag}</span>
                            </div>
                            <div className="card-text">
                                <h3>{property.title}</h3>
                                <p className="location">{property.location}</p>
                                <p className="description">{property.description}</p>
                                <div className="highlight-details">
                                    <div><i className="fas fa-bed"></i> Bedrooms {property.bedrooms}</div>
                                    <div><i className="fas fa-bath"></i> Bathrooms {property.bathrooms}</div>
                                    <div><i className="fas fa-ruler-combined"></i> Living Area {property.area}</div>
                                </div>
                                <div className="card-footer">
                                    <span className="price">{property.price}</span>
                                    <a href="#" className="view-details-1">View Details</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="scroll-btn next-btn" onClick={scrollRight}>→</button>
            </div>
        </section>
    );
};

export default ExclusiveHighlight;
