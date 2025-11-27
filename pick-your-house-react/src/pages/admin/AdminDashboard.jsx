import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';
import { useProperties } from '../../context/PropertyContext';
import { useContacts } from '../../context/ContactContext';
import '../../styles/admin-dashboard.css';
import '../../styles/admin-dashboard-chart.css';
import '../../styles/admin-dashboard-mobile.css';
import '../../styles/admin-dashboard-modals.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditingNotifications, setIsEditingNotifications] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const { users, addUser, deleteUser, updateUser } = useUsers();
    const { properties, addProperty, updateProperty, deleteProperty } = useProperties();
    const { contacts } = useContacts();
    const navigate = useNavigate();

    // New State for Dropdowns
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    // Refs for click outside handling
    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
        badge: 'Direct Owner',
        image: null
    });

    // Filter states for Properties section
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    // User Management States
    const [currentUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : { email: 'admin@pickyourhouse.com', role: 'Admin' };
    });
    const [showUserModal, setShowUserModal] = useState(false);
    const [showUserDeleteConfirm, setShowUserDeleteConfirm] = useState(false);
    const [currentUserEdit, setCurrentUserEdit] = useState(null);
    const [isUserEditMode, setIsUserEditMode] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [deleteUsername, setDeleteUsername] = useState('');
    const [deletePassword, setDeletePassword] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [userForm, setUserForm] = useState({
        name: '',
        email: '',
        role: 'Editor',
        status: 'Active',
        password: ''
    });

    // Contact Management States
    const [showContactViewModal, setShowContactViewModal] = useState(false);
    const [showRespondModal, setShowRespondModal] = useState(false);
    const [showContactDeleteConfirm, setShowContactDeleteConfirm] = useState(false);
    const [currentContact, setCurrentContact] = useState(null);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const { deleteContact, updateContactStatus } = useContacts();

    // Notifications State
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'New property inquiry from John Doe', time: '5 min ago', read: false },
        { id: 2, text: 'New user registration: Sarah Smith', time: '1 hour ago', read: false },
        { id: 3, text: 'Property "Sunny Villa" marked as Sold', time: '2 hours ago', read: true },
        { id: 4, text: 'System update completed successfully', time: '1 day ago', read: true },
        { id: 5, text: 'Weekly analytics report is ready', time: '2 days ago', read: true }
    ]);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        sessionStorage.clear();
        navigate('/admin/login');
    };

    const handleEditNotifications = () => {
        setIsEditingNotifications(true);
    };

    const handleSaveNotifications = () => {
        setIsEditingNotifications(false);
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
            badge: 'Direct Owner',
            image: null
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
            badge: property.badge,
            image: property.image || null
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
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPropertyForm(prev => ({
                        ...prev,
                        image: reader.result
                    }));
                };
                reader.readAsDataURL(file);
            }
        } else {
            setPropertyForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleRemoveImage = () => {
        setPropertyForm(prev => ({
            ...prev,
            image: null
        }));
        const fileInput = document.getElementById('property-image');
        if (fileInput) fileInput.value = '';
    };

    const handlePropertySubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            updateProperty(currentProperty.id, propertyForm);
            alert('Property updated successfully!');
        } else {
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
            badge: 'Direct Owner',
            image: null
        });
    };

    // User Management Functions
    const handleAddUser = () => {
        if (currentUser.role !== 'Admin') {
            alert('Only Admin users can create new users!');
            return;
        }
        setIsUserEditMode(false);
        setUserForm({
            name: '',
            email: '',
            role: 'Editor',
            status: 'Active',
            password: ''
        });
        setShowUserModal(true);
    };

    const handleEditUser = (user) => {
        if (currentUser.role !== 'Admin') {
            alert('Only Admin users can edit users!');
            return;
        }
        if (user.email === 'admin@pickyourhouse.com') {
            alert('Cannot edit the main Admin user!');
            return;
        }
        setCurrentUserEdit(user);
        setIsUserEditMode(true);
        setUserForm({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            password: '' // Don't populate password for security, let them set new one if they want
        });
        setShowUserModal(true);
    };

    const handleDeleteUser = (user) => {
        if (currentUser.role !== 'Admin') {
            alert('Only Admin users can delete users!');
            return;
        }
        if (user.email === 'admin@pickyourhouse.com') {
            alert('Cannot delete the main Admin user!');
            return;
        }
        setUserToDelete(user);
        setDeleteUsername('');
        setDeletePassword('');
        setDeleteError('');
        setShowUserDeleteConfirm(true);
    };

    const confirmUserDelete = () => {
        if (deleteUsername !== currentUser.email || deletePassword !== currentUser.password) {
            setDeleteError('Invalid credentials. Please try again.');
            return;
        }

        if (userToDelete) {
            deleteUser(userToDelete.id);
            setShowUserDeleteConfirm(false);
            setUserToDelete(null);
            setDeleteUsername('');
            setDeletePassword('');
            setDeleteError('');
        }
    };

    const handleUserFormChange = (e) => {
        const { name, value } = e.target;
        setUserForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUserSubmit = (e) => {
        e.preventDefault();
        if (isUserEditMode && currentUserEdit) {
            const updates = { ...userForm };
            if (!updates.password) {
                delete updates.password; // Don't overwrite password if empty
            }
            updateUser(currentUserEdit.id, updates);
            alert('User updated successfully!');
        } else {
            addUser(userForm);
            alert('User added successfully!');
        }
        setShowUserModal(false);
    };

    // Contact Management Functions
    const handleViewContact = (contact) => {
        setCurrentContact(contact);
        setShowContactViewModal(true);
    };

    const handleDeleteContact = (contact) => {
        setContactToDelete(contact);
        setShowContactDeleteConfirm(true);
    };

    const confirmDeleteContact = () => {
        if (contactToDelete) {
            deleteContact(contactToDelete.id);
            setShowContactDeleteConfirm(false);
            setContactToDelete(null);
            alert('Contact form deleted successfully!');
        }
    };

    const handleRespondContact = (contact) => {
        setCurrentContact(contact);
        setResponseMessage('');
        setShowRespondModal(true);
    };

    const submitResponse = (e) => {
        e.preventDefault();
        if (currentContact) {
            // In a real app, this would send an email
            console.log(`Sending response to ${currentContact.email}: ${responseMessage}`);
            updateContactStatus(currentContact.id, 'Responded');
            setShowRespondModal(false);
            setResponseMessage('');
            alert(`Response sent to ${currentContact.name} successfully!`);
        }
    };

    const stats = {
        totalProperties: properties.length,
        activeListings: properties.filter(p => p.status === 'Active').length,
        soldProperties: properties.filter(p => p.status === 'Sold').length,
        totalUsers: users.length,
        newUsers: 156,
        contactForms: contacts.length,
    };



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
        const filteredProperties = properties.filter(property => {
            const matchesSearch = searchQuery === '' ||
                property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.price.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' ||
                property.status.toLowerCase() === statusFilter.toLowerCase();
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
                                    {property.image ? (
                                        <img src={property.image} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <i className="las la-home"></i>
                                    )}
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
                {currentUser.role === 'Admin' && (
                    <button className="btn-primary" onClick={handleAddUser}>+ Add New User</button>
                )}
            </div>
            <div className="filters-bar">
                <input type="text" placeholder="Search users..." className="search-input" />
                <select className="filter-select">
                    <option>All Roles</option>
                    <option>Admin</option>
                    <option>Editor</option>
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
                    {Array.isArray(users) && users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name || 'Unknown'}</td>
                                <td>{user.email || 'No Email'}</td>
                                <td><span className={`role-badge role-${(user.role || 'customer').toLowerCase()}`}>{user.role || 'Customer'}</span></td>
                                <td><span className={`status-badge status-${(user.status || 'active').toLowerCase()}`}>{user.status || 'Active'}</span></td>
                                <td>{user.joined || new Date().toISOString().split('T')[0]}</td>
                                <td>
                                    <button
                                        className="btn-action btn-edit"
                                        onClick={() => handleEditUser(user)}
                                        disabled={user.email === 'admin@pickyourhouse.com'}
                                        style={user.email === 'admin@pickyourhouse.com' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn-action btn-delete"
                                        onClick={() => handleDeleteUser(user)}
                                        disabled={user.email === 'admin@pickyourhouse.com'}
                                        style={user.email === 'admin@pickyourhouse.com' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No users found</td>
                        </tr>
                    )}
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
                    {contacts.map(contact => (
                        <tr key={contact.id}>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.subject}</td>
                            <td>{contact.date}</td>
                            <td><span className="status-badge status-active">New</span></td>
                            <td>
                                <button className="btn-action btn-view" onClick={() => handleViewContact(contact)}>View</button>
                                <button className="btn-action btn-edit" onClick={() => handleRespondContact(contact)}>Respond</button>
                                <button className="btn-action btn-delete" onClick={() => handleDeleteContact(contact)}>Delete</button>
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
            {isMobileSidebarOpen && (
                <div
                    className="mobile-sidebar-overlay"
                    onClick={() => setIsMobileSidebarOpen(false)}
                ></div>
            )}

            <aside className={`admin-sidebar ${isMobileSidebarOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-header">
                    <h1>Pick Your House</h1>
                    <div className="active-status">
                        <span className="status-dot"></span>
                        Active
                    </div>
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
            </aside >

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
                        <h1>Welcome back, {currentUser.name ? currentUser.name.split(' ')[0] : 'Admin'}!</h1>
                        <p>Here's what's happening with your properties today.</p>
                    </div>
                    <div className="header-right">
                        <div className="notification-wrapper" style={{ position: 'relative' }} ref={notificationRef}>
                            <button
                                className="notification-btn"
                                onClick={() => {
                                    setShowNotifications(!showNotifications);
                                    setShowProfileMenu(false);
                                }}
                            >
                                <i className="las la-bell"></i>
                                <span className="notification-badge">{notifications.filter(n => !n.read).length}</span>
                            </button>
                            {showNotifications && (
                                <div className="dropdown-menu notification-dropdown">
                                    <div className="dropdown-header">
                                        <h3>Notifications</h3>
                                        <button className="mark-read-btn" onClick={markAllAsRead}>Mark all as read</button>
                                    </div>
                                    <div className="notification-list">
                                        {notifications.map(n => (
                                            <div key={n.id} className={`notification-item ${!n.read ? 'unread' : ''}`}>
                                                <p>{n.text}</p>
                                                <span>{n.time}</span>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            )}
                        </div>

                        <div className="profile-wrapper" style={{ position: 'relative' }} ref={profileRef}>
                            <div
                                className="admin-profile"
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src="public/admin profile.jpg" alt="Profile" />
                                <span>{currentUser.name || 'Admin User'}</span>
                                <i className={`las la-angle-${showProfileMenu ? 'up' : 'down'}`} style={{ marginLeft: '0.5rem', fontSize: '0.8rem' }}></i>
                            </div>
                            {showProfileMenu && (
                                <div className="dropdown-menu profile-dropdown simple-logout">
                                    <div className="dropdown-content-wrapper">
                                        <button className="menu-item logout-item" onClick={handleLogout}>
                                            <i className="las la-sign-out-alt"></i> Logout
                                        </button>
                                    </div>
                                </div>
                            )}
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
            {
                showPropertyModal && (
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
                                    <div className="form-group full-width">
                                        <label>Property Image</label>
                                        <div className="image-upload-container">
                                            <input
                                                type="file"
                                                name="image"
                                                id="property-image"
                                                accept="image/*"
                                                onChange={handlePropertyFormChange}
                                                className="file-input"
                                                style={{ display: 'none' }}
                                            />
                                            <label htmlFor="property-image" className="file-upload-label">
                                                <i className="las la-cloud-upload-alt"></i>
                                                <span>Click to upload image</span>
                                            </label>
                                            {propertyForm.image && (
                                                <div className="image-preview">
                                                    <img src={propertyForm.image} alt="Preview" />
                                                    <button type="button" className="remove-image-btn" onClick={handleRemoveImage}>
                                                        <i className="las la-times"></i>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
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
                )
            }

            {/* View Property Modal */}
            {
                showViewModal && currentProperty && (
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
                                    {currentProperty.image ? (
                                        <img src={currentProperty.image} alt={currentProperty.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
                                    ) : (
                                        <i className="las la-home"></i>
                                    )}
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
                )
            }

            {/* Delete Confirmation Modal */}
            {
                showDeleteConfirm && propertyToDelete && (
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
                )
            }

            {/* Add/Edit User Modal */}
            {
                showUserModal && (
                    <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>{isUserEditMode ? 'Edit User' : 'Add New User'}</h2>
                                <button className="modal-close" onClick={() => setShowUserModal(false)}>
                                    <i className="las la-times"></i>
                                </button>
                            </div>
                            <form onSubmit={handleUserSubmit} className="property-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={userForm.name}
                                            onChange={handleUserFormChange}
                                            className="form-input"
                                            placeholder="Enter user name"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={userForm.email}
                                            onChange={handleUserFormChange}
                                            className="form-input"
                                            placeholder="Enter email address"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Password {isUserEditMode ? '(Leave blank to keep current)' : '*'}</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={userForm.password}
                                            onChange={handleUserFormChange}
                                            className="form-input"
                                            placeholder={isUserEditMode ? "Enter new password" : "Enter password"}
                                            required={!isUserEditMode}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Role *</label>
                                        <select
                                            name="role"
                                            value={userForm.role}
                                            onChange={handleUserFormChange}
                                            className="form-input"
                                            required
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Editor">Editor</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Status *</label>
                                        <select
                                            name="status"
                                            value={userForm.status}
                                            onChange={handleUserFormChange}
                                            className="form-input"
                                            required
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn-secondary" onClick={() => setShowUserModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-primary">
                                        {isUserEditMode ? 'Update User' : 'Add User'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {/* Delete User Confirmation Modal */}
            {
                showUserDeleteConfirm && userToDelete && (
                    <div className="modal-overlay" onClick={() => setShowUserDeleteConfirm(false)}>
                        <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Confirm Delete</h2>
                                <button className="modal-close" onClick={() => setShowUserDeleteConfirm(false)}>
                                    <i className="las la-times"></i>
                                </button>
                            </div>
                            <div className="delete-modal-content">
                                <div className="delete-icon">
                                    <i className="las la-exclamation-triangle"></i>
                                </div>
                                <h3>Are you sure you want to delete this user?</h3>
                                <p className="property-name">{userToDelete.name}</p>
                                <p className="warning-text">This action cannot be undone.</p>
                                <div className="secure-delete-form" style={{ marginTop: '1.5rem', textAlign: 'left' }}>
                                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                                        Please enter your admin credentials to confirm deletion.
                                    </p>
                                    {deleteError && (
                                        <div style={{ color: '#dc2626', background: '#fee2e2', padding: '0.5rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                            {deleteError}
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Admin Email</label>
                                        <input
                                            type="email"
                                            className="form-input"
                                            value={deleteUsername}
                                            onChange={(e) => setDeleteUsername(e.target.value)}
                                            placeholder="Enter admin email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
                                        <input
                                            type="password"
                                            className="form-input"
                                            value={deletePassword}
                                            onChange={(e) => setDeletePassword(e.target.value)}
                                            placeholder="Enter admin password"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button className="btn-secondary" onClick={() => setShowUserDeleteConfirm(false)}>
                                    Cancel
                                </button>
                                <button className="btn-danger" onClick={confirmUserDelete}>
                                    <i className="las la-trash"></i> Confirm Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* View Contact Modal */}
            {showContactViewModal && currentContact && (
                <div className="modal-overlay" onClick={() => setShowContactViewModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Contact Details</h2>
                            <button className="modal-close" onClick={() => setShowContactViewModal(false)}>
                                <i className="las la-times"></i>
                            </button>
                        </div>
                        <div className="view-property-content">
                            <div className="property-info-grid">
                                <div className="info-item">
                                    <i className="las la-user"></i>
                                    <div>
                                        <strong>Name</strong>
                                        <p>{currentContact.name}</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <i className="las la-envelope"></i>
                                    <div>
                                        <strong>Email</strong>
                                        <p>{currentContact.email}</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <i className="las la-phone"></i>
                                    <div>
                                        <strong>Phone</strong>
                                        <p>{currentContact.phone}</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <i className="las la-calendar"></i>
                                    <div>
                                        <strong>Date</strong>
                                        <p>{currentContact.date}</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <i className="las la-tag"></i>
                                    <div>
                                        <strong>Subject</strong>
                                        <p>{currentContact.subject}</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <i className="las la-info-circle"></i>
                                    <div>
                                        <strong>Status</strong>
                                        <p><span className={`status-badge status-${currentContact.status.toLowerCase()}`}>{currentContact.status}</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="property-description" style={{ marginTop: '1.5rem' }}>
                                <strong>Message</strong>
                                <p style={{ background: '#f9fafb', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem' }}>{currentContact.message}</p>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowContactViewModal(false)}>
                                Close
                            </button>
                            <button className="btn-primary" onClick={() => {
                                setShowContactViewModal(false);
                                handleRespondContact(currentContact);
                            }}>
                                <i className="las la-reply"></i> Respond
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Respond Contact Modal */}
            {showRespondModal && currentContact && (
                <div className="modal-overlay" onClick={() => setShowRespondModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Respond to {currentContact.name}</h2>
                            <button className="modal-close" onClick={() => setShowRespondModal(false)}>
                                <i className="las la-times"></i>
                            </button>
                        </div>
                        <form onSubmit={submitResponse} className="property-form">
                            <div className="form-group">
                                <label>To</label>
                                <input type="text" value={currentContact.email} disabled className="form-input" style={{ background: '#f3f4f6' }} />
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <input type="text" value={`Re: ${currentContact.subject}`} disabled className="form-input" style={{ background: '#f3f4f6' }} />
                            </div>
                            <div className="form-group">
                                <label>Message *</label>
                                <textarea
                                    className="form-input"
                                    rows="6"
                                    value={responseMessage}
                                    onChange={(e) => setResponseMessage(e.target.value)}
                                    placeholder="Type your response here..."
                                    required
                                    style={{ resize: 'vertical' }}
                                ></textarea>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setShowRespondModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    <i className="las la-paper-plane"></i> Send Response
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Contact Confirmation Modal */}
            {showContactDeleteConfirm && contactToDelete && (
                <div className="modal-overlay" onClick={() => setShowContactDeleteConfirm(false)}>
                    <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Confirm Delete</h2>
                            <button className="modal-close" onClick={() => setShowContactDeleteConfirm(false)}>
                                <i className="las la-times"></i>
                            </button>
                        </div>
                        <div className="delete-modal-content">
                            <div className="delete-icon">
                                <i className="las la-exclamation-triangle"></i>
                            </div>
                            <h3>Are you sure you want to delete this contact form?</h3>
                            <p className="property-name">From: {contactToDelete.name}</p>
                            <p className="warning-text">This action cannot be undone.</p>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setShowContactDeleteConfirm(false)}>
                                Cancel
                            </button>
                            <button className="btn-danger" onClick={confirmDeleteContact}>
                                <i className="las la-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};

export default AdminDashboard;
