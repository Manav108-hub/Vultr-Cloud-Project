import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="space-y-16 animate-fade-in">
      {/* Hero Section */}
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

      {/* Conditionally Render GetStarted Component */}
      {showGetStarted && (
        <section className="mt-8 p-4 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h2>
          <GetStarted /> {/* Render the actual content */}
        </section>
      )}

      {/* Features Section */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* How It Works Section */}
      <section className="text-center space-y-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          HealthMate simplifies the way you track and manage your health. Here's how you can get started in just a few steps.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <StepCard stepNumber="1" title="Sign Up" description="Create your free account in minutes." />
          <StepCard stepNumber="2" title="Set Goals" description="Choose your health goals and preferences." />
          <StepCard stepNumber="3" title="Track & Improve" description="Track your progress and get personalized insights." />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 rounded-2xl p-8 text-center animate-fade-in-up">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to start your health journey?
        </h2>
        <p className="text-gray-600 mb-6">
          Join thousands of users who have transformed their health with HealthMate
        </p>
        <Link
          to="/login"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
        >
          Join Now <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </section>
    </div>
        </>
    );
}
