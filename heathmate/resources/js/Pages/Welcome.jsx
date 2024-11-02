import NavBar from '@/Components/Navbar';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Activity, Heart, Brain, Stethoscope } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Welcome() {
    const [showGetStarted, setShowGetStarted] = useState(false);
    const toggleGetStarted = () => {
        setShowGetStarted(!showGetStarted);
    }
    return (
        <>
            <Head title="Welcome" />
            <NavBar />
           <div className='container flex mx-auto justify-center animate-fade-in mt-8'>
            <section className="text-center space-y-8">
                <h1 className="text-5xl font-bold text-gray-900">
                    Your Personal Health Companion
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Take control of your health journey with HealthMate. Get personalized insights,
                    track your progress, and connect with healthcare professionals.
                </p>
            <div className="flex justify-center gap-4">
            <button
                onClick={toggleGetStarted} // Toggle on button click
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 transform hover:scale-105"
            >
                Get Started <ArrowRight className="h-5 w-5" />
            </button>
            </div>
            </section>
           </div>
           {/* Conditionally Render GetStarted Component */}
      {showGetStarted && (
        <section className="mt-8 p-4 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h2>
          <GetStarted /> {/* Render the actual content */}
        </section>
      )}

      {/* Features Section */}
      <section className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        <FeatureCard
          icon={<Activity className="h-8 w-8 text-blue-600" />}
          title="Health Tracking"
          description="Monitor your vital signs and daily activities with ease"
        />
        <FeatureCard
          icon={<Heart className="h-8 w-8 text-blue-600" />}
          title="Wellness Insights"
          description="Get personalized recommendations for better health"
        />
        <FeatureCard
          icon={<Brain className="h-8 w-8 text-blue-600" />}
          title="AI Assistant"
          description="24/7 health guidance powered by advanced AI"
        />
        <FeatureCard
          icon={<Stethoscope className="h-8 w-8 text-blue-600" />}
          title="Expert Connect"
          description="Direct access to healthcare professionals"
        />
      </section>

        </>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow transform hover:scale-105 transition duration-200 ease-in-out">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }
  
  function StepCard({ stepNumber, title, description }) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center transform hover:scale-105 transition duration-200 ease-in-out">
        <div className="text-2xl font-bold text-blue-600 mb-4">{stepNumber}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }
  
  FeatureCard.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };
  
  StepCard.propTypes = {
    stepNumber: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };