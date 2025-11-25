import React, { createContext, useContext, useState } from 'react';

// Create Context
const UserContext = createContext();

// Custom hook to use the user context
export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUsers must be used within a UserProvider');
    }
    return context;
};

// Provider Component
export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Admin User',
            email: 'admin@pickyourhouse.com',
            role: 'Admin',
            status: 'Active',
            joined: new Date().toISOString().split('T')[0]
        }
    ]);

    // Add new user
    const addUser = (userData) => {
        const newUser = {
            id: users.length + 1,
            name: userData.name,
            email: userData.email,
            role: userData.role || 'Customer',
            status: 'Active',
            joined: new Date().toISOString().split('T')[0]
        };

        setUsers(prevUsers => [...prevUsers, newUser]);
        return newUser;
    };

    // Delete user
    const deleteUser = (id) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    };

    // Update user
    const updateUser = (id, updatedData) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === id ? { ...user, ...updatedData } : user
            )
        );
    };

    const value = {
        users,
        addUser,
        deleteUser,
        updateUser
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
