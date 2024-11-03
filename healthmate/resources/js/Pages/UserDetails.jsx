import React, { useState } from 'react';
import { usePage, router } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout.jsx";

const UserDetails = () => {
    const { user, details } = usePage().props;
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        e.preventDefault();
        setIsEditing(true);
    }

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
        setIsEditing(false);
    };
    return (
        <GuestLayout>
            <div className="min-h-full bg-gray-50 py-8">
                <div className="container mx-auto p-4">
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
                            {!isEditing && (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                >
                                    Edit
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="phone_no" className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phone_no"
                                        id="phone_no"
                                        value={formData.phone_no}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        name="dob"
                                        id="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                        Gender
                                    </label>
                                    <select
                                        name="gender"
                                        id="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <textarea
                                        name="address"
                                        id="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                    >
                                        Update
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default UserDetails;
