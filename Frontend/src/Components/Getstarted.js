import React from 'react';
import { FaUserPlus, FaSync, FaBullseye, FaCheckCircle } from 'react-icons/fa';

const GetStarted = () => {
  // StepCard component with animations and hover effects
  const StepCard = ({ stepNumber, title, description, icon }) => {
    return (
      <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform duration-200 ease-in-out animate-fade-in-up flex flex-col items-center">
        <div className="mb-4 flex items-center">
          <div className="text-4xl font-bold text-blue-600 mr-2">{stepNumber}</div>
          <div className="text-3xl text-blue-600">{icon}</div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 text-center">{title}</h3>
        <p className="text-gray-600 mt-2 text-center">{description}</p>
      </div>
    );
  };

  return (
    <div className="container mx-auto text-center py-16 animate-fade-in">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Getting Started with HealthMate
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
        Welcome! Follow these simple steps to create an account and start tracking your health.
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-10">
        <div className="bg-blue-600 h-2 rounded-full w-1/3"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
        <StepCard
          stepNumber="1"
          title="Sign Up"
          description="Create your free account and set up your profile."
          icon={<FaUserPlus />}
        />
        <StepCard
          stepNumber="2"
          title="Connect Devices"
          description="Sync your health data from wearables and apps."
          icon={<FaSync />}
        />
        <StepCard
          stepNumber="3"
          title="Set Goals"
          description="Define your health goals and start tracking."
          icon={<FaBullseye />}
        />
        <StepCard
          stepNumber="4"
          title="Track Progress"
          description="Monitor your health metrics and achievements."
          icon={<FaCheckCircle />}
        />
        <StepCard
          stepNumber="5"
          title="Get Insights"
          description="Receive personalized insights and recommendations."
          icon={<FaCheckCircle />}
        />
      </div>

      {/* Call to Action */}
      <div className="mt-10">
        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-200">
          Sign Up Now
        </button>
      </div>

      {/* Testimonials */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
        <p className="text-gray-600 italic">
          "HealthMate has transformed my health journey. I never knew tracking could be so easy and effective!"
        </p>
        <p className="text-gray-600 italic mt-2">
          "Thanks to HealthMate, I finally reached my fitness goals! Highly recommend!"
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
