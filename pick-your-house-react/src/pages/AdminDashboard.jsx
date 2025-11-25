import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import '../styles/admin-dashboard.css';
import '../styles/admin-dashboard-chart.css';
import '../styles/admin-dashboard-mobile.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditingNotifications, setIsEditingNotifications] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const { users, addUser, deleteUser } = useUsers();
    const navigate = useNavigate();

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

    const stats = {
        totalProperties: 20,
        activeListings: 10,
        soldProperties: 32,
        totalUsers: users.length,
        newUsers: 156,
        contactForms: 89,
    };

    const recentProperties = [
        { id: 1, title: 'Modern Villa in Beverly Hills', price: '$2,500,000', status: 'Active', date: '2025-11-20' },
        { id: 2, title: 'Luxury Apartment Downtown', price: '$850,000', status: 'Pending', date: '2025-11-19' },
        { id: 3, title: 'Cozy Family Home', price: '$450,000', status: 'Sold', date: '2025-11-18' },
        { id: 4, title: 'Beachfront Property', price: '$3,200,000', status: 'Active', date: '2025-11-17' },
        { id: 5, title: 'Urban Loft Space', price: '$620,000', status: 'Active', date: '2025-11-16' }
    ];

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

    const renderProperties = () => (
        <div className="admin-properties">
            <div className="section-header">
                <h2>Property Management</h2>
                <button className="btn-primary">+ Add New Property</button>
            </div>

            <div className="filters-bar">
                <input type="text" placeholder="Search properties..." className="search-input" />
                <select className="filter-select">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Sold</option>
                </select>
                <select className="filter-select">
                    <option>All Types</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                </select>
            </div>

            <div className="properties-grid">
                {recentProperties.map(property => (
                    <div key={property.id} className="property-card-admin">
                        <div className="property-image-placeholder">
                            <i className="las la-home"></i>
                        </div>
                        <div className="property-details">
                            <h3>{property.title}</h3>
                            <p className="property-price">{property.price}</p>
                            <div className="property-meta">
                                <span className={`status-badge status-${property.status.toLowerCase()}`}>
                                    {property.status}
                                </span>
                                <span className="property-date">{property.date}</span>
                            </div>
                            <div className="property-actions">
                                <button className="btn-action btn-edit">Edit</button>
                                <button className="btn-action btn-view">View</button>
                                <button className="btn-action btn-delete">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="table-container" style={{ marginTop: '2rem' }}>
                <h3>Recent Properties</h3>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentProperties.map(property => (
                            <tr key={property.id}>
                                <td>{property.title}</td>
                                <td className="price-cell">{property.price}</td>
                                <td>
                                    <span className={`status-badge status-${property.status.toLowerCase()}`}>
                                        {property.status}
                                    </span>
                                </td>
                                <td>{property.date}</td>
                                <td>
                                    <button className="btn-action btn-edit">Edit</button>
                                    <button className="btn-action btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

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
                            <img src="https://via.placeholder.com/40" alt="Admin" />
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
        </div>
    );
};

export default AdminDashboard;
