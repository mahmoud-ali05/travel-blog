import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const res = await api.put('/auth/me', form);
      setMessage('Profile updated successfully');
      // Update the user state in AuthContext
      await login(localStorage.getItem('token'));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Profile</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" name="username" className="form-control" value={form.username} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/profile')}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProfile; 