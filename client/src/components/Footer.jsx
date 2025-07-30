import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiGithub } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[#F9FAF8] border-t border-[#E5E7EB] py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo & Description */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-[#1E293B] mb-2">GreenGuard</h3>
          <p className="text-[#475569] max-w-xs">
            Empowering communities to protect the environment with real-time reporting and collaboration.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-[#1E293B] font-medium">
          <a href="/" className="hover:text-[#2ecc71] transition">Home</a>
          <a href="/reports" className="hover:text-[#2ecc71] transition">Reports</a>
          <a href="/about" className="hover:text-[#2ecc71] transition">About</a>
          <a href="/contact" className="hover:text-[#2ecc71] transition">Contact</a>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-6 text-[#475569]">
          <a href="https://facebook.com" aria-label="Facebook" className="hover:text-[#2ecc71] transition">
            <FiFacebook size={24} />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="hover:text-[#2ecc71] transition">
            <FiTwitter size={24} />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" className="hover:text-[#2ecc71] transition">
            <FiInstagram size={24} />
          </a>
          <a href="https://github.com" aria-label="GitHub" className="hover:text-[#2ecc71] transition">
            <FiGithub size={24} />
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-[#94a3b8]">
        &copy; {new Date().getFullYear()} GreenGuard. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
