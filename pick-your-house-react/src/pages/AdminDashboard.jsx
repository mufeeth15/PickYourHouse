import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import { useProperties } from '../context/PropertyContext';
import '../styles/admin-dashboard.css';
import '../styles/admin-dashboard-chart.css';
import '../styles/admin-dashboard-mobile.css';
import '../styles/admin-dashboard-modals.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditingNotifications, setIsEditingNotifications] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const { users, addUser, deleteUser } = useUsers();
    const { properties, addProperty, updateProperty, deleteProperty } = useProperties();
    const navigate = useNavigate();

    // Property Management States
    const [showPropertyModal, setShowPropertyModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [currentProperty, setCurrentProperty] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState(null);

    const [propertyForm, setPropertyForm] = useState({
        title: '',
        category: 'flat-sale',
        location: '',
        price: '',
        status: 'Active',
        description: '',
        area: '',
        badge: 'Direct Owner'
    });

    // Filter states for Properties section
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        sessionStorage.clear();
        navigate('/admin/login');
    };

    const handleEditNotifications = () => {
        setIsEditingNotifications(true);
    };

    const handleSaveNotifications = () => {
        setIsEditingNotifications(false);
        // Here you would typically save the notification settings
        alert('Notification settings saved!');
    };

    // Property Management Functions
    const handleAddProperty = () => {
        setIsEditMode(false);
        setPropertyForm({
            title: '',
            category: 'flat-sale',
            location: '',
            price: '',
            status: 'Active',
            description: '',
            area: '',
            badge: 'Direct Owner'
        });
        setShowPropertyModal(true);
    };

    const handleEditProperty = (property) => {
        setIsEditMode(true);
        setCurrentProperty(property);
        setPropertyForm({
            title: property.title,
            category: property.category,
            location: property.location,
            price: property.price,
            status: property.status,
            description: property.description,
            area: property.area,
            badge: property.badge
        });
        setShowPropertyModal(true);
    };

    const handleViewProperty = (property) => {
        setCurrentProperty(property);
        setShowViewModal(true);
    };

    const handleDeleteProperty = (property) => {
        setPropertyToDelete(property);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        deleteProperty(propertyToDelete.id);
        setShowDeleteConfirm(false);
        setPropertyToDelete(null);
        alert('Property deleted successfully!');
    };

    const handlePropertyFormChange = (e) => {
        const { name, value } = e.target;
        setPropertyForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePropertySubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            // Update existing property
            updateProperty(currentProperty.id, propertyForm);
            alert('Property updated successfully!');
        } else {
            // Add new property
            addProperty(propertyForm);
            alert('Property added successfully!');
        }

        setShowPropertyModal(false);
        setPropertyForm({
            title: '',
            category: 'flat-sale',
            location: '',
            price: '',
            status: 'Active',
            description: '',
            area: '',
            badge: 'Direct Owner'
        });
    };

    const stats = {
        totalProperties: properties.length,
        activeListings: properties.filter(p => p.status === 'Active').length,
        soldProperties: properties.filter(p => p.status === 'Sold').length,
        totalUsers: users.length,
        newUsers: 156,
        contactForms: 89,
    };

    const recentContacts = [
        { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Property Inquiry', date: '2025-11-23' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Viewing Request', date: '2025-11-23' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', subject: 'General Question', date: '2025-11-22' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', subject: 'Investment Inquiry', date: '2025-11-22' }
    ];

    const renderOverview = () => (
        <div className="admin-overview">
            <h2>Dashboard Overview</h2>

            <div className="stats-grid">
                <div className="stat-card stat-primary">
                    <div className="stat-icon"><i className="las la-home"></i></div>
                    <div className="stat-content">
                        <h3>{stats.totalProperties}</h3>
                        <p>Total Properties</p>
                    </div>
                </div>

                <div className="stat-card stat-success">
                    <div className="stat-icon"><i className="las la-check-circle"></i></div>
                    <div className="stat-content">
                        <h3>{stats.activeListings}</h3>
                        <p>Active Listings</p>
                    </div>
                </div>

                <div className="stat-card stat-warning">
                    <div className="stat-icon"><i className="las la-users"></i></div>
                    <div className="stat-content">
                        <h3>{stats.totalUsers}</h3>
                        <p>Total Users</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-charts">
                <div className="chart-container">
                    <div className="chart-header">
                        <h3>Activity</h3>
                        <div className="chart-legend">
                            <div className="legend-item">
                                <span className="dot in-progress"></span>
                                <span>In Progress</span>
                            </div>
                            <div className="legend-item">
                                <span className="dot complete"></span>
                                <span>Complete</span>
                            </div>
                        </div>
                    </div>
                    <div className="bar-chart">
                        <div className="y-axis">
                            <span>50</span>
                            <span>40</span>
                            <span>30</span>
                            <span>20</span>
                            <span>10</span>
                            <span>0</span>
                        </div>
                        <div className="chart-grid">
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>

                            <div className="bars-area">
                                <div className="bar-group">
                                    <div className="bars">
                                        <div className="bar in-progress" style={{ height: '78%' }} data-value="39"></div>
                                        <div className="bar complete" style={{ height: '58%' }} data-value="29"></div>
                                    </div>
                                    <span className="x-label">Jan</span>
                                </div>
                                <div className="bar-group">
                                    <div className="bars">
                                        <div className="bar in-progress" style={{ height: '54%' }} data-value="27"></div>
                                        <div className="bar complete" style={{ height: '38%' }} data-value="19"></div>
                                    </div>
                                    <span className="x-label">Feb</span>
                                </div>
                                <div className="bar-group">
                                    <div className="bars">
                                        <div className="bar in-progress" style={{ height: '92%' }} data-value="46"></div>
                                        <div className="bar complete" style={{ height: '72%' }} data-value="36"></div>
                                    </div>
                                    <span className="x-label">Mar</span>
                                </div>
                                <div className="bar-group">
                                    <div className="bars">
                                        <div className="bar in-progress" style={{ height: '42%' }} data-value="21"></div>
                                        <div className="bar complete" style={{ height: '20%' }} data-value="10"></div>
                                    </div>
                                    <span className="x-label">Apr</span>
                                </div>
                                <div className="bar-group">
                                    <div className="bars">
                                        <div className="bar in-progress" style={{ height: '66%' }} data-value="33"></div>
                                        <div className="bar complete" style={{ height: '54%' }} data-value="27"></div>
                                    </div>
                                    <span className="x-label">May</span>
                                </div>
                                <div className="bar-group">
                                    <div className="bars">
                                        <div className="bar in-progress" style={{ height: '50%' }} data-value="25"></div>
                                        <div className="bar complete" style={{ height: '22%' }} data-value="11"></div>
                                    </div>
                                    <span className="x-label">Jun</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderProperties = () => {
        // Filter properties based on search query, status, and type
        const filteredProperties = properties.filter(property => {
            // Search filter - check title, location, and price
            const matchesSearch = searchQuery === '' ||
                property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.price.toLowerCase().includes(searchQuery.toLowerCase());

            // Status filter
            const matchesStatus = statusFilter === 'all' ||
                property.status.toLowerCase() === statusFilter.toLowerCase();

            // Type filter - map 'buy' to 'commercial'
            const matchesType = typeFilter === 'all' ||
                (typeFilter === 'buy' && property.category === 'commercial') ||
                property.category === typeFilter;

            return matchesSearch && matchesStatus && matchesType;
        });

        return (
            <div className="admin-properties">
                <div className="section-header">
                    <h2>Property Management</h2>
                    <button className="btn-primary" onClick={handleAddProperty}>+ Add New Property</button>
                </div>

                <div className="filters-bar">
                    <input
                        type="text"
                        placeholder="Search properties..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select
                        className="filter-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="sold">Sold</option>
                    </select>
                    <select
                        className="filter-select"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="all">All Types</option>
                        <option value="flat-sale">Flat for Sale</option>
                        <option value="flat-rent">Flat for Rent</option>
                        <option value="buy">Buy</option>
                    </select>
                </div>

                <div className="properties-grid">
                    {filteredProperties.length > 0 ? (
                        filteredProperties.map(property => (
                            <div key={property.id} className="property-card-admin">
                                <div className="property-image-placeholder">
                                    <i className="las la-home"></i>
                                </div>
                                <div className="property-details">
                                    <h3>{property.title}</h3>
                                    <p className="property-location"><i className="las la-map-marker"></i> {property.location}</p>
                                    <p className="property-price">{property.price}</p>
                                    <div className="property-meta">
                                        <span className={`status-badge status-${property.status.toLowerCase()}`}>
                                            {property.status}
                                        </span>
                                        <span className="property-date">{property.date}</span>
                                    </div>
                                    <div className="property-actions">
                                        <button className="btn-action btn-edit" onClick={() => handleEditProperty(property)}>
                                            <i className="las la-edit"></i> Edit
                                        </button>
                                        <button className="btn-action btn-view" onClick={() => handleViewProperty(property)}>
                                            <i className="las la-eye"></i> View
                                        </button>
                                        <button className="btn-action btn-delete" onClick={() => handleDeleteProperty(property)}>
                                            <i className="las la-trash"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-properties-message">
                            <i className="las la-search" style={{ fontSize: '4rem', color: '#ccc' }}></i>
                            <h3>No properties found</h3>
                            <p>Try adjusting your search or filters</p>

                        </div>
                    )}
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/services')}
                        style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
                    >
                        <i className="las la-save"></i> Save & View in Services
                    </button>
                </div>
            </div>
        );
    };

    const renderUsers = () => (
        <div className="admin-users">
            <div className="section-header">
                <h2>User Management</h2>
                <button className="btn-primary" >+ Add New User</button>
            </div>

            <div className="filters-bar">
                <input type="text" placeholder="Search users..." className="search-input" />
                <select className="filter-select">
                    <option>All Roles</option>
                    <option>Admin</option>
                    <option>Agent</option>
                    <option>Customer</option>
                </select>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>john@example.com</td>
                        <td><span className="role-badge role-admin">Admin</span></td>
                        <td><span className="status-badge status-active">Active</span></td>
                        <td>2025-01-15</td>
                        <td>
                            <button className="btn-action btn-edit">Edit</button>
                            <button className="btn-action btn-delete">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Jane Smith</td>
                        <td>jane@example.com</td>
                        <td><span className="role-badge role-agent">Agent</span></td>
                        <td><span className="status-badge status-active">Active</span></td>
                        <td>2025-02-20</td>
                        <td>
                            <button className="btn-action btn-edit">Edit</button>
                            <button className="btn-action btn-delete">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Mike Johnson</td>
                        <td>mike@example.com</td>
                        <td><span className="role-badge role-customer">Customer</span></td>
                        <td><span className="status-badge status-active">Active</span></td>
                        <td>2025-03-10</td>
                        <td>
                            <button className="btn-action btn-edit">Edit</button>
                            <button className="btn-action btn-delete">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    const renderContacts = () => (
        <div className="admin-contacts">
            <h2>Recent Contact Forms</h2>

            <div className="filters-bar">
                <input type="text" placeholder="Search contacts..." className="search-input" />
                <select className="filter-select">
                    <option>All Status</option>
                    <option>New</option>
                    <option>Responded</option>
                    <option>Archived</option>
                </select>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {recentContacts.map(contact => (
                        <tr key={contact.id}>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>+1 234 567 8900</td>
                            <td>{contact.subject}</td>
                            <td>{contact.date}</td>
                            <td><span className="status-badge status-active">New</span></td>
                            <td>
                                <button className="btn-action btn-view">View</button>
                                <button className="btn-action btn-edit">Respond</button>
                                <button className="btn-action btn-delete">Archive</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderBlogs = () => (
        <div className="admin-blogs">
            <div className="section-header">
                <h2>Blog Management</h2>
                <button className="btn-primary">+ Create New Post</button>
            </div>

            <div className="filters-bar">
                <input type="text" placeholder="Search blogs..." className="search-input" />
                <select className="filter-select">
                    <option>All Status</option>
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Scheduled</option>
                </select>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Views</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Top 10 Real Estate Investment Tips</td>
                        <td>Admin</td>
                        <td>Investment</td>
                        <td><span className="status-badge status-active">Published</span></td>
                        <td>2025-11-20</td>
                        <td>1,234</td>
                        <td>
                            <button className="btn-action btn-edit">Edit</button>
                            <button className="btn-action btn-view">View</button>
                            <button className="btn-action btn-delete">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>How to Choose Your Dream Home</td>
                        <td>Admin</td>
                        <td>Buying Guide</td>
                        <td><span className="status-badge status-active">Published</span></td>
                        <td>2025-11-18</td>
                        <td>856</td>
                        <td>
                            <button className="btn-action btn-edit">Edit</button>
                            <button className="btn-action btn-view">View</button>
                            <button className="btn-action btn-delete">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    const renderSettings = () => (
        <div className="admin-settings">
            <h2>Settings</h2>

            <div className="settings-sections">
                <div className="settings-card">
                    <h3>General Settings</h3>
                    <div className="form-group">
                        <label>Site Name</label>
                        <input type="text" placeholder="Enter Your Site Name" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Site Email</label>
                        <input type="email" placeholder="info@pickyourhouse.com" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Contact Phone</label>
                        <input type="tel" placeholder="+1 234 567 8900" className="form-input" />
                    </div>
                    <button className="btn-primary">Save Changes</button>
                </div>

                <div className="settings-card">
                    <h3>Notification Settings</h3>
                    <div className="form-group checkbox-group">
                        <label>
                            <input type="checkbox" defaultChecked disabled={!isEditingNotifications} />
                            Email notifications for new properties
                        </label>
                    </div>
                    <div className="form-group checkbox-group">
                        <label>
                            <input type="checkbox" defaultChecked disabled={!isEditingNotifications} />
                            Email notifications for contact forms
                        </label>
                    </div>
                    <div className="form-group checkbox-group">
                        <label>
                            <input type="checkbox" disabled={!isEditingNotifications} />
                            SMS notifications
                        </label>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {!isEditingNotifications ? (
                            <button className="btn-primary" onClick={handleEditNotifications}>Edit</button>
                        ) : (
                            <button className="btn-primary" onClick={handleSaveNotifications}>Save Changes</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="admin-dashboard-container">
            {/* Mobile Overlay */}
            {isMobileSidebarOpen && (
                <div
                    className="mobile-sidebar-overlay"
                    onClick={() => setIsMobileSidebarOpen(false)}
                ></div>
            )}

            <aside className={`admin-sidebar ${isMobileSidebarOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-header">
                    <h1>Admin Panel</h1>
                    <p>Pick Your House</p>
                </div>

                <nav className="sidebar-nav">
                    <button
                        className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('overview'); setIsMobileSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><i className="las la-chart-bar"></i></span>
                        Dashboard
                    </button>

                    <button
                        className={`nav-item ${activeTab === 'properties' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('properties'); setIsMobileSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><i className="las la-home"></i></span>
                        Properties
                    </button>

                    <button
                        className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('users'); setIsMobileSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><i className="las la-users"></i></span>
                        Users
                    </button>

                    <button
                        className={`nav-item ${activeTab === 'contacts' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('contacts'); setIsMobileSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><i className="las la-envelope"></i></span>
                        Contact Forms
                    </button>

                    <button
                        className={`nav-item ${activeTab === 'blogs' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('blogs'); setIsMobileSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><i className="las la-edit"></i></span>
                        Blogs
                    </button>

                    <button
                        className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('settings'); setIsMobileSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><i className="las la-cog"></i></span>
                        Settings
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button className="nav-item logout-btn" onClick={handleLogout}>
                        <span className="nav-icon"><i className="las la-sign-out-alt"></i></span>
                        Logout
                    </button>
                </div>
            </aside>

            <main className="admin-content">
                <header className="admin-header">
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                        aria-label="Toggle menu"
                    >
                        <i className="las la-bars"></i>
                    </button>
                    <div className="header-left">
                        <h1>Welcome back, Admin!</h1>
                        <p>Here's what's happening with your properties today.</p>
                    </div>
                    <div className="header-right">
                        <button className="notification-btn">
                            <i className="las la-bell"></i>
                            <span className="notification-badge">5</span>
                        </button>
                        <div className="admin-profile">
                            <img src="public/admin profile.jpg" alt="Admin Profile" />
                            <span>Admin User</span>
                        </div>
                    </div>
                </header>

                <div className="admin-main-content">
                    {activeTab === 'overview' && renderOverview()}
                    {activeTab === 'properties' && renderProperties()}
                    {activeTab === 'users' && renderUsers()}
                    {activeTab === 'contacts' && renderContacts()}
                    {activeTab === 'blogs' && renderBlogs()}
                    {activeTab === 'settings' && renderSettings()}
                </div>
            </main>

            {/* Add/Edit Property Modal */}
            {showPropertyModal && (
                <div className="modal-overlay" onClick={() => setShowPropertyModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{isEditMode ? 'Edit Property' : 'Add New Property'}</h2>
                            <button className="modal-close" onClick={() => setShowPropertyModal(false)}>
                                <i className="las la-times"></i>
                            </button>
                        </div>
                        <form onSubmit={handlePropertySubmit} className="property-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Property Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={propertyForm.title}
                                        onChange={handlePropertyFormChange}
                                        className="form-input"
                                        placeholder="Enter property title"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category *</label>
                                    <select
                                        name="category"
                                        value={propertyForm.category}
                                        onChange={handlePropertyFormChange}
                                        className="form-input"
                                        required
                                    >
                                        <option value="flat-sale">Flat for Sale</option>
                                        <option value="flat-rent">Flat for Rent</option>
                                        <option value="commercial">Commercial</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Status *</label>
                                    <select
                                        name="status"
                                        value={propertyForm.status}
                                        onChange={handlePropertyFormChange}
                                        className="form-input"
                                        required
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Sold">Sold</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Location *</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={propertyForm.location}
                                        onChange={handlePropertyFormChange}
                                        className="form-input"
                                        placeholder="Enter location"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Price *</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={propertyForm.price}
                                        onChange={handlePropertyFormChange}
                                        className="form-input"
                                        placeholder="e.g., $500,000 or ₹50 Lakh"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Area *</label>
                                    <input
                                        type="text"
                                        name="area"
                                        value={propertyForm.area}
                                        onChange={handlePropertyFormChange}
                                        className="form-input"
                                        placeholder="e.g., 2000 Sq.Ft."
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Badge *</label>
                                    <select
                                        name="badge"
                                        value={propertyForm.badge}
                                        onChange={handlePropertyFormChange}
                                        className="form-input"
                                        required
                                    >
                                        <option value="Direct Owner">Direct Owner</option>
                                        <option value="Direct Builder">Direct Builder</option>
                                        <option value="Zero Brokerage">Zero Brokerage</option>
                                        <option value="Brokerage Applicable">Brokerage Applicable</option>
                                        <option value="Premium Property">Premium Property</option>
                                        <option value="Negotiable Price">Negotiable Price</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Description *</label>
                                <textarea
                                    name="description"
                                    value={propertyForm.description}
                                    onChange={handlePropertyFormChange}
                                    className="form-input"
                                    placeholder="Enter property description"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setShowPropertyModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    {isEditMode ? 'Update Property' : 'Add Property'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Property Modal */}
            {showViewModal && currentProperty && (
                <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
                    <div className="modal-content view-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Property Details</h2>
                            <button className="modal-close" onClick={() => setShowViewModal(false)}>
                                <i className="las la-times"></i>
                            </button>
                        </div>
                        <div className="property-view-content">
                            <div className="property-view-image">
                                <i className="las la-home"></i>
                            </div>
                            <div className="property-view-details">
                                <h3>{currentProperty.title}</h3>
                                <div className="property-view-meta">
                                    <span className={`status-badge status-${currentProperty.status.toLowerCase()}`}>
                                        {currentProperty.status}
                                    </span>
                                    <span className="badge-tag">{currentProperty.badge}</span>
                                </div>
                                <div className="property-info-grid">
                                    <div className="info-item">
                                        <i className="las la-map-marker"></i>
                                        <div>
                                            <strong>Location</strong>
                                            <p>{currentProperty.location}</p>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <i className="las la-dollar-sign"></i>
                                        <div>
                                            <strong>Price</strong>
                                            <p>{currentProperty.price}</p>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <i className="las la-ruler-combined"></i>
                                        <div>
                                            <strong>Area</strong>
                                            <p>{currentProperty.area}</p>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <i className="las la-tag"></i>
                                        <div>
                                            <strong>Category</strong>
                                            <p>{currentProperty.category === 'flat-sale' ? 'Flat for Sale' : currentProperty.category === 'flat-rent' ? 'Flat for Rent' : 'Commercial'}</p>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <i className="las la-calendar"></i>
                                        <div>
                                            <strong>Listed Date</strong>
                                            <p>{currentProperty.date}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="property-description">
                                    <strong>Description</strong>
                                    <p>{currentProperty.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowViewModal(false)}>
                                Close
                            </button>
                            <button className="btn-primary" onClick={() => {
                                setShowViewModal(false);
                                handleEditProperty(currentProperty);
                            }}>
                                <i className="las la-edit"></i> Edit Property
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && propertyToDelete && (
                <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
                    <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Confirm Delete</h2>
                            <button className="modal-close" onClick={() => setShowDeleteConfirm(false)}>
                                <i className="las la-times"></i>
                            </button>
                        </div>
                        <div className="delete-modal-content">
                            <div className="delete-icon">
                                <i className="las la-exclamation-triangle"></i>
                            </div>
                            <h3>Are you sure you want to delete this property?</h3>
                            <p className="property-name">{propertyToDelete.title}</p>
                            <p className="warning-text">This action cannot be undone.</p>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
                                Cancel
                            </button>
                            <button className="btn-danger" onClick={confirmDelete}>
                                <i className="las la-trash"></i> Delete Property
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
