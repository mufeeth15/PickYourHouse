import React from 'react';

const Hero = () => {
    return (
        <section className="hero-banner">
            <div className="hero-text">
                <h1>The Key to Homes, Comfort & Investment in Navi Mumbai</h1>
                <p>Find your perfect flat or row house in Vashi, Ghansoli and Kopar Khairane. We are your trusted partners for buying, selling, and renting properties.</p>
                <div className="hero-buttons">
                    <a className="explore" href="#">Explore Properties</a>
                    <a className="list" href="#">List Your Property</a>
                </div>
            </div>
            <div className="hero-images">
                <div className="image-box">
                    <img src="/1183405_20-350x350.jpg" alt="Home interior 1" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
