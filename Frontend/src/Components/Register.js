import React, { useState } from 'react';

export const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        course: "",
        specialization: "",
        yearOfStudy: "",
        gpa: "",
        githubUsername: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(""); // For displaying errors
    const [success, setSuccess] = useState(""); // For displaying success message

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        // Simulate success for now
        setSuccess("Registration successful! You can now login.");
        setError(""); // Clear error if any
        setFormData({
            firstName: "",
            lastName: "",
            dob: "",
            course: "",
            specialization: "",
            yearOfStudy: "",
            gpa: "",
            githubUsername: "",
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
                {error && <p className="text-red-600 text-center mb-4">{error}</p>} {/* Error message */}
                {success && <p className="text-green-600 text-center mb-4">{success}</p>} {/* Success message */}

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
                            ) : key === 'yearOfStudy' || key === 'gpa' ? (
                                <select
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    required
                                >
                                    <option value="">{key === 'yearOfStudy' ? "Year of Study" : "GPA"}</option>
                                    {key === 'yearOfStudy' && (
                                        <>
                                            <option value="1">1st Year</option>
                                            <option value="2">2nd Year</option>
                                            <option value="3">3rd Year</option>
                                            <option value="4">4th Year</option>
                                        </>
                                    )}
                                    {key === 'gpa' && (
                                        <>
                                            <option value="5-6">5-6</option>
                                            <option value="6-7">6-7</option>
                                            <option value="7-8">7-8</option>
                                            <option value="8-9">8-9</option>
                                            <option value="9-10">9-10</option>
                                        </>
                                    )}
                                </select>
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
