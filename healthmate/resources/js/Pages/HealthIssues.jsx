import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteUserForm from './Partials/DeleteUserForm';
import { Heart, Activity, Calendar } from 'lucide-react';

export default function HealthIssues({ mustVerifyEmail, status }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Health Issues
        </h2>
      }
    >
      <Head title="Health Issues" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="flex justify-between items-start bg-white p-4 shadow-sm rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="h-10 w-10 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Health Overview</h1>
                <p className="text-gray-600">Current Health Status</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Save Changes' : 'Edit Information'}
            </button>
          </div>

          {/* Health Details */}
          <div className="bg-white p-6 shadow-sm rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Health Goals and Medical History
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-600">Activity Level</label>
                  <p className="text-gray-900">Moderate</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm text-gray-600">
                    Last Checkup
                  </label>
                  <p className="text-gray-900">15 April 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Forms Section */}
          <div className="space-y-6">
            <div className="bg-white p-4 shadow-sm rounded-lg">
              <UpdateProfileInformationForm
                mustVerifyEmail={mustVerifyEmail}
                status={status}
                className="max-w-xl"
              />
            </div>

            <div className="bg-white p-4 shadow-sm rounded-lg">
              <UpdatePasswordForm className="max-w-xl" />
            </div>

            <div className="bg-white p-4 shadow-sm rounded-lg">
              <DeleteUserForm className="max-w-xl" />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
