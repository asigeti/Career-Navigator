import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import MobileMenu from './MobileMenu';


const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-primary-600 font-bold text-xl">AI Career Navigator</span>
            </Link>
            <MobileMenu />
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {user.email || 'Logged In'}
                </span>
                <Button onClick={signOut}>Sign Out</Button>
              </div>
            ) : (
              <div>
                <Link to="/signin">
                  <Button>Sign In</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;