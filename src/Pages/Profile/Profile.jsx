import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2>
          <div className="mb-4">
            <Link to="/profile/edit" className="btn btn-primary">Edit Profile</Link>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <div className="mt-1 text-lg text-gray-900">{user?.username}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 text-lg text-gray-900">{user?.email}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <div className="mt-1 text-lg text-gray-900 capitalize">{user?.role || 'user'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 