# Admin Dashboard - Pick Your House

## Overview
A comprehensive admin dashboard for managing the Pick Your House real estate website. This dashboard provides a complete interface for managing properties, users, contact forms, blog posts, and site settings.

## Features

### 🏠 Dashboard Overview
- **Real-time Statistics**: View key metrics including total properties, active listings, users, and revenue
- **Recent Activity**: Quick access to recent properties and contact form submissions
- **Visual Analytics**: Beautiful stat cards with gradient designs and animations

### 🏘️ Property Management
- **Add/Edit/Delete Properties**: Full CRUD operations for property listings
- **Filter & Search**: Advanced filtering by status, type, and search functionality
- **Property Cards**: Visual grid layout with property details and quick actions
- **Status Tracking**: Active, Pending, and Sold status indicators

### 👥 User Management
- **User Roles**: Admin, Agent, and Customer role management
- **User Status**: Active/Inactive user tracking
- **User Actions**: Edit and delete user accounts
- **Search & Filter**: Find users by name, email, or role

### 📧 Contact Form Management
- **View Submissions**: Access all contact form submissions
- **Status Tracking**: New, Responded, and Archived statuses
- **Quick Actions**: View, respond, and archive contact forms
- **Search Functionality**: Find specific contact submissions

### 📝 Blog Management
- **Create/Edit Posts**: Full blog post management
- **Status Control**: Published, Draft, and Scheduled statuses
- **View Analytics**: Track blog post views and engagement
- **Category Management**: Organize posts by categories

### ⚙️ Settings
- **General Settings**: Site name, email, and contact information
- **Notification Settings**: Email and SMS notification preferences
- **Security**: Password management and security settings

## Access Information

### Login Credentials
- **URL**: `/admin/login`
- **Demo Email**: `admin@pickyourhouse.com`
- **Demo Password**: `admin123`

### Routes
- `/admin/login` - Admin login page
- `/admin` - Main admin dashboard

## Design Features

### 🎨 Modern UI/UX
- **Gradient Backgrounds**: Beautiful gradient color schemes
- **Glassmorphism**: Modern frosted glass effects on login page
- **Smooth Animations**: Fade-in, slide-up, and hover animations
- **Responsive Design**: Fully responsive across all devices

### 🎯 User Experience
- **Sidebar Navigation**: Fixed sidebar with icon-based navigation
- **Active States**: Clear visual feedback for active sections
- **Status Badges**: Color-coded badges for different statuses
- **Action Buttons**: Intuitive action buttons with hover effects

### 📱 Mobile Responsive
- **Adaptive Layout**: Optimized for mobile, tablet, and desktop
- **Touch-Friendly**: Large touch targets for mobile devices
- **Collapsible Sidebar**: Mobile-friendly navigation

## Technical Stack

### Frontend
- **React**: Component-based architecture
- **React Router**: Client-side routing
- **CSS3**: Modern styling with animations and gradients

### Styling Approach
- **Custom CSS**: No framework dependencies
- **CSS Variables**: Easy theme customization
- **Flexbox & Grid**: Modern layout techniques
- **Animations**: Smooth transitions and micro-interactions

## File Structure

```
src/
├── pages/
│   ├── AdminDashboard.jsx    # Main dashboard component
│   └── AdminLogin.jsx         # Login page component
├── styles/
│   ├── admin-dashboard.css    # Dashboard styles
│   └── admin-login.css        # Login page styles
└── App.jsx                    # Updated with admin routes
```

## Usage

### Starting the Development Server
```bash
cd pick-your-house-react
npm run dev
```

### Accessing the Admin Panel
1. Navigate to `http://localhost:5173/admin/login`
2. Enter the demo credentials
3. Click "Login to Dashboard"
4. You'll be redirected to the admin dashboard

### Navigation
Use the sidebar to navigate between different sections:
- **Dashboard**: Overview and statistics
- **Properties**: Manage property listings
- **Users**: Manage user accounts
- **Contact Forms**: View and respond to inquiries
- **Blogs**: Manage blog posts
- **Settings**: Configure site settings

## Customization

### Color Scheme
The dashboard uses a purple gradient theme. To customize:
1. Open `src/styles/admin-dashboard.css`
2. Modify the gradient values in `.stat-card::before` and `.btn-primary`
3. Update the sidebar gradient in `.admin-sidebar`

### Adding New Sections
1. Create a new render function in `AdminDashboard.jsx`
2. Add a new nav button in the sidebar
3. Add the section to the conditional rendering in the main content area

### Modifying Statistics
Update the `stats` object in `AdminDashboard.jsx` to change displayed statistics.

## Security Notes

⚠️ **Important**: This is a demo implementation. For production use:
- Implement proper authentication with JWT or session tokens
- Add backend API integration
- Implement role-based access control (RBAC)
- Add input validation and sanitization
- Use HTTPS for all communications
- Implement CSRF protection
- Add rate limiting for login attempts

## Future Enhancements

### Planned Features
- [ ] Real backend API integration
- [ ] Advanced analytics with charts (Chart.js or Recharts)
- [ ] Image upload functionality
- [ ] Drag-and-drop property reordering
- [ ] Email template editor
- [ ] Export data to CSV/PDF
- [ ] Real-time notifications
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Advanced search with filters

### Performance Optimizations
- [ ] Lazy loading for images
- [ ] Pagination for large datasets
- [ ] Virtual scrolling for long lists
- [ ] Code splitting for routes
- [ ] Caching strategies

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Login Issues
- Ensure you're using the correct demo credentials
- Check browser console for errors
- Clear browser cache and cookies

### Styling Issues
- Verify CSS files are properly imported
- Check for conflicting styles
- Ensure viewport meta tag is present

### Routing Issues
- Verify React Router is properly configured
- Check that all routes are defined in App.jsx
- Ensure BrowserRouter wraps the app

## Support
For issues or questions, please refer to the main project documentation or create an issue in the repository.

---

**Built with ❤️ for Pick Your House**
