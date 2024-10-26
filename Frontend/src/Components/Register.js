import React, { useState } from 'react';

export const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Simulate success for now
        setSuccess("Registration successful! You can now login.");
        setError("");
        setFormData({
            firstName: "",
            lastName: "",
            dob: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        });
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center p-8 bg-gray-100 min-h-screen">
            <div className="md:w-1/2 bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center mb-6">Create Your Account</h1>
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                {success && <p className="text-green-600 text-center mb-4">{success}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Form Fields */}
                    {Object.keys(formData).map((key) => (
                        <div className="mb-4" key={key}>
                            {key === 'dob' ? (
                                <input
                                    type="date"
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    required
                                />
                            ) : (
                                <input
                                    type={key.includes('password') ? "password" : key === 'email' ? "email" : "text"}
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleInputChange}
                                    placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    required
                                />
                            )}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
