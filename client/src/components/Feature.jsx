import React from 'react';
import {
  FiMapPin,
  FiCamera,
  FiUsers,
  FiAlertTriangle,
  FiShare2,
  FiEye
} from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: <FiMapPin />,
      title: "Real-Time Map Reports",
      description: "Live interactive map shows current environmental reports in your area."
    },
    {
      icon: <FiCamera />,
      title: "Photo-Based Reporting",
      description: "Users can upload images of incidents to raise awareness and add clarity."
    },
    {
      icon: <FiUsers />,
      title: "Community Driven",
      description: "Reports are shared instantly with nearby users to promote rapid collaboration."
    },
    {
      icon: <FiAlertTriangle />,
      title: "Disaster Alerts",
      description: "Floods, landslides, or animal threats — instantly notify others of danger."
    },
    {
      icon: <FiShare2 />,
      title: "Instant Broadcasting",
      description: "Every report is pushed out live to maximize visibility and timely action."
    },
    {
      icon: <FiEye />,
      title: "Raise Awareness",
      description: "Helps citizens, activists, and authorities stay informed and respond quickly."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F9FAF8' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#1E293B' }}>
            How GreenGuard Works
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: '#475569' }}>
            GreenGuard turns real-world environmental problems into fast, visible action with your help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div
      className="p-6 rounded-2xl border shadow-sm hover:shadow-lg transition-shadow"
      style={{ backgroundColor: '#ffffff', borderColor: '#E5E7EB' }}
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors"
        style={{ backgroundColor: '#A3E635' }}
      >
        {React.cloneElement(icon, { className: 'text-[#1E293B] text-2xl' })}
      </div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: '#1E293B' }}>
        {title}
      </h3>
      <p style={{ color: '#475569' }}>{description}</p>
    </div>
  );
};

export default Features;
