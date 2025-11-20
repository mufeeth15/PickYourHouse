import React from 'react';
import Hero from '../components/Hero';
import SearchFilter from '../components/SearchFilter';
import PropertyDiscovery from '../components/PropertyDiscovery';
import ExclusiveHighlight from '../components/ExclusiveHighlight';
import FeaturedSell from '../components/FeaturedSell';
import DreamHome from '../components/DreamHome';
import FAQ from '../components/FAQ';

const Home = () => {
    return (
        <>
            <Hero />
            <SearchFilter />
            <PropertyDiscovery />
            <ExclusiveHighlight />
            <FeaturedSell />
            <DreamHome />
            <FAQ />
        </>
    );
};

export default Home;
