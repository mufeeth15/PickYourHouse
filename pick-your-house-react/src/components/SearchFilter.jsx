import React, { useState } from 'react';

const SearchFilter = () => {
    const [activeTab, setActiveTab] = useState('Buy a property');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement search logic here
        console.log(`Searching for ${activeTab}`);
    };

    return (
        <section className="search-filter-section">
            <div className="search-tabs">
                {['Buy a property', 'Sell a property', 'Rent a property'].map((tab) => (
                    <button
                        key={tab}
                        className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="search-form-container">
                <form id="property-search-form" onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px', width: '100%' }}>
                    <div className="search-input-group">
                        <input type="text" name="keywords" placeholder="Enter Keywords" />
                    </div>
                    <div className="search-input-group">
                        <select name="property-type">
                            <option value="">Property Types</option>
                            <option value="flat">Flat</option>
                            <option value="row_house">Row House</option>
                        </select>
                    </div>
                    <div className="search-input-group">
                        <select name="neighbourhood">
                            <option value="">Neighbourhoods</option>
                            <option value="vashi">Vashi</option>
                            <option value="ghansoli">Ghansoli</option>
                            <option value="kopar_khairane">Kopar Khairane</option>
                        </select>
                    </div>
                    <button type="submit" className="search-btn">
                        <i className="fas fa-search"></i> Search
                    </button>
                </form>
            </div>
            <div id="search-results-container"></div>
        </section>
    );
};

export default SearchFilter;
