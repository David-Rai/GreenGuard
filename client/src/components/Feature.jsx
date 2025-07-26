import React from 'react';
import { FiZap, FiCode, FiLayers, FiSettings, FiArrowRight } from 'react-icons/fi';


const Features = () => {
  const features = [
    {
      icon: <FiZap />,
      title: "Lightning Fast",
      description: "Optimized components that load instantly and perform smoothly"
    },
    {
      icon: <FiCode />,
      title: "Clean Code",
      description: "Semantic, well-structured components for easy customization"
    },
    {
      icon: <FiLayers />,
      title: "Modular Design",
      description: "Mix and match components to build exactly what you need"
    },
    {
      icon: <FiSettings />,
      title: "Easy Configuration",
      description: "Simple props system for quick adjustments"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to build modern, high-performance applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div className="bg-black border-stone-900 p-6 rounded-xl border  hover:border-stone-700 transition-colors duration-300 group">
        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-700 transition-colors">
          {React.cloneElement(icon, { className: 'text-white text-xl' })}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    );
  };
  
export default Features;