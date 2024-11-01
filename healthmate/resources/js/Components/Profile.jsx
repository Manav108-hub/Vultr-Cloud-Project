import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Weight,
  Ruler,
  Activity,
  Heart,
} from 'lucide-react';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">John Doe</h1>
            <p className="text-gray-600">Member since March 2024</p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-in-up">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileField
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            label="Email"
            value="john.doe@example.com"
            isEditing={isEditing}
          />
          <ProfileField
            icon={<Phone className="h-5 w-5 text-gray-400" />}
            label="Phone"
            value="+1 (555) 123-4567"
            isEditing={isEditing}
          />
          <ProfileField
            icon={<Calendar className="h-5 w-5 text-gray-400" />}
            label="Date of Birth"
            value="15 April 1985"
            isEditing={isEditing}
          />
          <ProfileField
            icon={<Weight className="h-5 w-5 text-gray-400" />}
            label="Weight"
            value="68 kg"
            isEditing={isEditing}
          />
          <ProfileField
            icon={<Ruler className="h-5 w-5 text-gray-400" />}
            label="Height"
            value="175 cm"
            isEditing={isEditing}
          />
          <ProfileField
            icon={<Activity className="h-5 w-5 text-gray-400" />}
            label="Activity Level"
            value="Moderate"
            isEditing={isEditing}
          />
        </div>
      </div>

      {/* Health Goals */}
      <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-in-up">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Health Goals
        </h2>
        <div className="space-y-4">
          <HealthGoal
            icon={<Heart className="h-5 w-5 text-red-500" />}
            title="Improve Cardiovascular Health"
            progress={75}
            isEditing={isEditing}
          />
          <HealthGoal
            icon={<Activity className="h-5 w-5 text-green-500" />}
            title="Increase Daily Activity"
            progress={60}
            isEditing={isEditing}
          />
          <HealthGoal
            icon={<Weight className="h-5 w-5 text-blue-500" />}
            title="Maintain Healthy Weight"
            progress={90}
            isEditing={isEditing}
          />
        </div>
      </div>

      {/* Medical History */}
      <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-in-up">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Medical History
        </h2>
        <div className="space-y-4">
          {medicalHistory.map((item, index) => (
            <MedicalHistoryItem key={index} {...item} isEditing={isEditing} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileField({ icon, label, value, isEditing }) {
  return (
    <div className="flex items-center gap-3 hover:shadow-md transform hover:scale-105 transition duration-200 ease-in-out">
      {icon}
      <div className="flex-1">
        <label className="block text-sm text-gray-600">{label}</label>
        {isEditing ? (
          <input
            type="text"
            defaultValue={value}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p className="text-gray-900">{value}</p>
        )}
      </div>
    </div>
  );
}

function HealthGoal({ icon, title, progress, isEditing }) {
  return (
    <div className="flex items-center gap-4 hover:shadow-md transform hover:scale-105 transition duration-200 ease-in-out">
      {icon}
      <div className="flex-1">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <span className="text-sm text-gray-600">{progress}%</span>
        </div>
        {isEditing ? (
          <input
            type="range"
            value={progress}
            className="w-full"
            min="0"
            max="100"
          />
        ) : (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 rounded-full h-2"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

const medicalHistory = [
  {
    condition: 'Seasonal Allergies',
    date: 'Diagnosed 2018',
    status: 'Managed with medication',
  },
  {
    condition: 'Minor Surgery',
    date: 'January 2020',
    status: 'Fully recovered',
  },
];

function MedicalHistoryItem({ condition, date, status, isEditing }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transform hover:scale-105 transition duration-200 ease-in-out">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            defaultValue={condition}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            defaultValue={date}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            defaultValue={status}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      ) : (
        <>
          <h3 className="font-medium text-gray-900">{condition}</h3>
          <p className="text-sm text-gray-600">{date}</p>
          <p className="text-sm text-gray-600">{status}</p>
        </>
      )}
    </div>
  );
}

export default Profile;
