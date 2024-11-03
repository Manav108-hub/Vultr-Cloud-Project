import React, { useState } from 'react';
import { usePage, router } from "@inertiajs/react";

const UserDetails = () => {
    const { user, details } = usePage().props;

    const [formData, setFormData] = useState({
        phone_no: details.phone_no || '',
        dob: details.dob || '',
        gender: details.gender || '',
        address: details.address || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/user/details/update', formData);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">User Details</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="phone_no" className="block text-sm font-medium">Phone Number</label>
                    <input
                        type="text"
                        name="phone_no"
                        id="phone_no"
                        value={formData.phone_no}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="dob" className="block text-sm font-medium">Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        id="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
                    <input
                        type="text"
                        name="gender"
                        id="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium">Address</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save Details</button>
            </form>
        </div>
    );
};

export default UserDetails;
