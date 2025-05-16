import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/axios';
import ContactMessages from './ContactMessages';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [usersRes, countriesRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/admin/countries')
        ]);
        setUsers(usersRes.data);
        setCountries(countriesRes.data);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleUserStatusToggle = async (userId) => {
    try {
      const res = await api.put(`/admin/users/${userId}/status`);
      setUsers(users.map(u => u._id === userId ? res.data : u));
    } catch (err) {
      setError('Failed to update user status');
      console.error(err);
    }
  };

  const handleUserDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      console.log('Attempting to delete user:', userId);
      
      // Get the auth token
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Make the delete request with explicit headers
      const response = await api.delete(`/admin/users/${userId}`, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });

      console.log('Delete response:', response.data);

      if (response.data.success) {
        setUsers(users.filter(u => u._id !== userId));
        alert('User deleted successfully');
      } else {
        throw new Error(response.data.message || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', {
        error: err,
        response: err.response?.data,
        status: err.response?.status
      });

      let errorMessage = 'Failed to delete user';
      
      if (err.response) {
        errorMessage = err.response.data.message || err.response.data.error || errorMessage;
        
        if (err.response.status === 401) {
          errorMessage = 'Session expired. Please log in again.';
          navigate('/login');
        } else if (err.response.status === 403) {
          errorMessage = 'You do not have permission to delete this user';
        } else if (err.response.status === 404) {
          errorMessage = 'User not found';
        }
      } else if (err.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else if (err.message === 'No authentication token found') {
        errorMessage = 'Please log in again';
        navigate('/login');
      }
      
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleCountryDelete = async (countryId) => {
    if (!window.confirm('Are you sure you want to delete this country?')) return;
    
    try {
      await api.delete(`/admin/countries/${countryId}`);
      setCountries(countries.filter(c => c._id !== countryId));
    } catch (err) {
      setError('Failed to delete country');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'countries' ? 'active' : ''}`}
            onClick={() => setActiveTab('countries')}
          >
            Countries
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Contact Messages
          </button>
        </li>
      </ul>

      {error && <div className="alert alert-danger">{error}</div>}

      {activeTab === 'users' && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">User Management</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td className="border px-4 py-2">{user.username}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.role}</td>
                    <td className="border px-4 py-2">
                      <span className={`px-2 py-1 rounded ${user.isActive ? 'bg-green-200' : 'bg-red-200'}`}>
                        {user.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleUserStatusToggle(user._id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      >
                        {user.isActive ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        onClick={() => handleUserDelete(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'countries' && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Country Management</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {countries.map(country => (
                  <tr key={country._id}>
                    <td className="border px-4 py-2">{country.name}</td>
                    <td className="border px-4 py-2">{country.description}</td>
                    <td className="border px-4 py-2">
                      <span className={`px-2 py-1 rounded ${country.isActive ? 'bg-green-200' : 'bg-red-200'}`}>
                        {country.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleCountryDelete(country._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'messages' && <ContactMessages />}
    </div>
  );
};

export default AdminDashboard; 