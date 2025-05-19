import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">AI Career Navigator</h3>
            <p className="text-gray-300 mb-4">
              We believe the AI revolution shouldn't catch anyone off guard. Our mission is to give professionals the foresight to evolve before they become obsolete.
            </p>
            <p className="text-gray-300">
              © {new Date().getFullYear()} AI Career Navigator. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@aicareernavigator.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 AI Street, Tech City</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;