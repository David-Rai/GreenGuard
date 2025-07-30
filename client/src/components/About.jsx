import React from 'react';

const About = () => {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAF8]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1E293B]">
          About GreenGuard
        </h2>
        <div className="space-y-6 text-base md:text-lg leading-relaxed text-[#475569]">
          <p>
            GreenGuard is a web app that empowers people to report and share environmental problems happening around them — like garbage mismanagement, deforestation, animal-related disasters, or sudden events such as floods.
          </p>
          <p>
            Anyone can post a report with an image and location, and it will be instantly broadcast to all other users through a live interactive map. This way, nearby people can see what's happening, offer help, spread awareness, or alert the right authorities.
          </p>
          <p>
            GreenGuard helps everyday people act fast and work together when something harms the environment. Whether it's a flooded road, illegal tree cutting, or animals in danger — this platform turns local reports into real-time community action.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;