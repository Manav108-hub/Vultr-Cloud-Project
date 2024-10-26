import React from 'react';

const GetStarted = () => {
  // StepCard component defined inline
  const StepCard = ({ stepNumber, title, description }) => {
    return (
      <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
        <div className="mb-4">
          <span className="text-4xl font-bold">{stepNumber}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };

  return (
    <div className="container mx-auto text-center py-12">
      <h1 className="text-4xl font-bold mb-4">Getting Started with HealthMate</h1>
      <p className="text-lg text-gray-600 mb-8">
        Welcome! Follow these simple steps to create an account and start tracking your health.
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        <StepCard stepNumber="1" title="Sign Up" description="Create your free account and set up your profile." />
        <StepCard stepNumber="2" title="Connect Devices" description="Sync your health data from wearables and apps." />
        <StepCard stepNumber="3" title="Set Goals" description="Define your health goals and start tracking." />
      </div>
    </div>
  );
};

export default GetStarted;
