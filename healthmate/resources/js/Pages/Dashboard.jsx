import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

const Dashboard = ({ activities }) => {
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');
    const [caloriesBurn, setCaloriesBurn] = useState('');
    const [activityId, setActivityId] = useState(null);

    useEffect(() => {
        if (activityId) {
            const activity = activities.find(act => act.id === activityId);
            if (activity) {
                setTitle(activity.title);
                setTime(activity.time);
                setDuration(activity.duration);
                setCaloriesBurn(activity.calories_burn);
            }
        } else {
            resetForm();
        }
    }, [activityId]);

    const resetForm = () => {
        setTitle('');
        setTime('');
        setDuration('');
        setCaloriesBurn('');
        setActivityId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activityId) {
            // Update activity
            router.put(`/activities/${activityId}`, {
                title,
                time,
                duration,
                calories_burn: caloriesBurn,
            });
        } else {
            // Create activity
            router.post('/activities', {
                user_health_details_id: 'some-uuid', // Replace with actual UUID
                title,
                time,
                duration,
                calories_burn: caloriesBurn,
            });
        }
    };

    const handleEdit = (id) => {
        setActivityId(id);
    };

    const handleDelete = (id) => {
        router.delete(`/activities/${id}`);
    };

    return (
        <div>
            <h1>Manage Activities</h1>
            <form onSubmit={handleSubmit}>
                <input type="hidden" value={activityId} />
                <div>
                    <label>Activity Title:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Time:</label>
                    <input 
                        type="time" 
                        value={time} 
                        onChange={(e) => setTime(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Duration (minutes):</label>
                    <input 
                        type="number" 
                        value={duration} 
                        onChange={(e) => setDuration(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Calories Burned:</label>
                    <input 
                        type="number" 
                        value={caloriesBurn} 
                        onChange={(e) => setCaloriesBurn(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">{activityId ? 'Update Activity' : 'Add Activity'}</button>
            </form>

            <h2>Activities List</h2>
            <ul>
                {activities.map(activity => (
                    <li key={activity.id}>
                        {activity.title} - {activity.time} - {activity.duration} min - {activity.calories_burn} cal 
                        <button onClick={() => handleEdit(activity.id)}>Edit</button>
                        <button onClick={() => handleDelete(activity.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
