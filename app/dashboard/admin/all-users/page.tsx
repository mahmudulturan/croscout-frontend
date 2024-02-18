"use client"
// Importing necessary modules and components
import Loading from '@/components/ui/Loading/Loading';
import { getUsersByRole } from '@/lib/database/getUsers';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@/providers/AuthProvider';
import AllUsersTable from '../../components/AllUsersTable/AllUsersTable';
import { getStoredToken } from '@/utils/tokenStorage';

const Page = () => {
    // Type definition for user object
    type User = {
        name: string;
        role: string;
        email: string;
    };

    // State variables for users and loading status
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Function to fetch users
        const fetchUsers = async () => {
            try {
                // Setting loading status to true
                setIsLoading(true);
                // Retrieving token from local storage
                const token = getStoredToken();
                // If token is not available, throw an error
                if (!token) {
                    throw new Error('Token is required for authorization');
                }
                // Fetching users by role
                const data = await getUsersByRole({ role: "user", token });
                // Setting users and updating loading status
                setUsers(data.users);
                setIsLoading(false);
            } catch (error) {
                // Handling error if fetching users fails
                console.error('Error occurred while fetching users:', error);
                setIsLoading(false);
            }
        };

        // Calling fetchUsers function
        fetchUsers();
    }, []);

    // Rendering loading component if data is still loading
    if (isLoading) {
        return <Loading />;
    }

    // Rendering message if no users exist
    if (users.length <= 0) {
        return <div className="text-center mt-20 text-white min-h-screen"><h1 className="lg:text-4xl text-2xl text-center">Don't register any user yet.</h1></div>;
    }

    // Rendering user table
    return (
        <div className='bg-primary-50 px-3 py-3'>
            <h4 className='text-xl mb-3 text-white-50'>All Users:</h4>
            <AllUsersTable data={users} tableFor="user" />
        </div>
    );
};

export default Page;
