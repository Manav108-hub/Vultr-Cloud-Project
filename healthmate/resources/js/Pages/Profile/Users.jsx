import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { usePage } from '@inertiajs/react'; // Import usePage to get Inertia props

const UserDetails = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search); // Parse query parameters
    const userDetailsId = query.get('id'); // Get user details ID from query
    const { user, details, flash } = usePage().props; // Get user and details from Inertia props

    // If you need to fetch user details based on userDetailsId, you can implement that here

    return (
        <div>
            {flash.success && <div className="alert alert-success">{flash.success}</div>}
            <h1>User Details</h1>
            <div>
                <h2>{user.name}'s Profile</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone Number:</strong> {details?.phone_no || 'N/A'}</p>
                <p><strong>Date of Birth:</strong> {details?.dob || 'N/A'}</p>
                <p><strong>Gender:</strong> {details?.gender || 'N/A'}</p>
                <p><strong>Address:</strong> {details?.address || 'N/A'}</p>
            </div>
        </div>
    );
};

export default UserDetails;
