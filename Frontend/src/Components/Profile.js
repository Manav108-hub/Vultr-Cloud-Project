import React from 'react';

const Profile = () => {
  const user = {
    name: 'John Doe',
    age: 29,
    healthHistory: ['Fever, Headache - Oct 10, 2023', 'Cough - Sept 28, 2023']
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <h3>Health History</h3>
      <ul>
        {user.healthHistory.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
