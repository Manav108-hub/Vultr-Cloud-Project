import React from "react";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import { Head, router, usePage } from "@inertiajs/react";
import { Heart, Activity, Brain, Scale } from "lucide-react";

export default function HealthDashboard() {
    const { user, details } = usePage().props;

    const [formData, setFormData] = React.useState({
        weight: details?.weight || 0,
        height: details?.height || 0,
        activity_level: String(details?.activity_level || 'N/A'), // Ensure activity_level is a string
        daily_steps: details?.daily_steps || 0,
        heart_rate: details?.heart_rate || 0,
        sleep_score: details?.sleep_score || 0,
    });

    const [isEditing, setIsEditing] = React.useState(false);
    const [lastValues, setLastValues] = React.useState(formData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'activity_level' ? String(value) : value }); // Convert activity_level to string
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('dashboard/update', formData);
        setLastValues(formData); // Update last known values
        setIsEditing(false); // Disable editing after saving
    };

    const calculateTrend = (currentValue, lastValue) => {
        if (lastValue === 0) return 0; // Avoid division by zero
        return ((currentValue - lastValue) / lastValue * 100).toFixed(2) + '%';
    };

    return (
        <GuestLayout>
            <Head title="Health Dashboard" />
            <div className="container mx-auto mt-8 mb-8 space-y-8 animate-fade-in">
                <header className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={handleEdit}
                        disabled={isEditing}
                    >
                        Update Metrics
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={<Heart className="h-6 w-6 text-red-500" />}
                        title="Heart Rate"
                        value={`${formData.heart_rate} BPM`}
                        trend={calculateTrend(formData.heart_rate, lastValues.heart_rate)}
                        trendUp={formData.heart_rate > lastValues.heart_rate}
                    />
                    <StatCard
                        icon={<Activity className="h-6 w-6 text-green-500" />}
                        title="Daily Steps"
                        value={formData.daily_steps}
                        trend={calculateTrend(formData.daily_steps, lastValues.daily_steps)}
                        trendUp={formData.daily_steps > lastValues.daily_steps}
                    />
                    <StatCard
                        icon={<Brain className="h-6 w-6 text-purple-500" />}
                        title="Sleep Score"
                        value={`${formData.sleep_score}%`}
                        trend={calculateTrend(formData.sleep_score, lastValues.sleep_score)}
                        trendUp={formData.sleep_score > lastValues.sleep_score}
                    />
                    <StatCard
                        icon={<Scale className="h-6 w-6 text-blue-500" />}
                        title="Weight"
                        value={`${formData.weight} kg`}
                        trend={calculateTrend(formData.weight, lastValues.weight)}
                        trendUp={formData.weight > lastValues.weight}
                    />
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 mt-6">
                    <h2 className="text-xl font-semibold text-gray-700">Update Health Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} disabled={!isEditing} />
                        <InputField label="Height (cm)" name="height" value={formData.height} onChange={handleChange} disabled={!isEditing} />
                        <InputField label="Activity Level" name="activity_level" value={formData.activity_level} onChange={handleChange} disabled={!isEditing} />
                        <InputField label="Daily Steps" name="daily_steps" value={formData.daily_steps} onChange={handleChange} disabled={!isEditing} />
                        <InputField label="Heart Rate (BPM)" name="heart_rate" value={formData.heart_rate} onChange={handleChange} disabled={!isEditing} />
                        <InputField label="Sleep Score (%)" name="sleep_score" value={formData.sleep_score} onChange={handleChange} disabled={!isEditing} />
                    </div>
                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" disabled={!isEditing}>
                        Save Changes
                    </button>
                </form>
            </div>
        </GuestLayout>
    );
}

// InputField component for form fields
function InputField({ label, name, value, onChange, disabled }) {
    return (
        <div>
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
        </div>
    );
}

function StatCard({ icon, title, value, trend, trendUp }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow transform hover:scale-105 transition duration-200 ease-in-out">
            <div className="flex items-center justify-between mb-4">
                {icon}
                <span className={`text-sm ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
                    {trend}
                </span>
            </div>
            <h3 className="text-gray-600 text-sm">{title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value || '0'}</p>
        </div>
    );
}
