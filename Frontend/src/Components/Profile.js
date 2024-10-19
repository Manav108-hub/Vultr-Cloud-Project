import React from 'react';

const Profile = () => {
  const user = {
    name: 'John Doe',
    age: 29,
    healthHistory: ['Fever, Headache - Oct 10, 2023', 'Cough - Sept 28, 2023']
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-teal-500 to-purple-600">
      <div className="bg-opacity-75 bg-gradient-to-r from-teal-600 via-purple-700 to-blue-600 rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          {user.name}'s Profile
        </h2>
        <div className="text-center mb-8">
          <p className="text-xl text-teal-100">
            <span className="font-semibold">Age:</span> {user.age}
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white mb-4 text-center">
            Health History
          </h3>
          <ul className="space-y-4">
            {user.healthHistory.map((entry, index) => (
              <li key={index} className="text-lg bg-opacity-25 bg-teal-200 rounded-lg p-4 text-white">
                {entry}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
