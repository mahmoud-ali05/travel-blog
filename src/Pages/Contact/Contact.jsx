import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    subject: '',
    message: ''
  });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingMessages, setFetchingMessages] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    console.log('Contact component mounted, user:', user);
    if (!user) {
      console.log('No user found, redirecting to login');
      navigate('/login');
      return;
    }
    fetchMessages();
  }, [user, navigate]);

  const fetchMessages = async () => {
    try {
      console.log('Fetching messages...');
      setFetchingMessages(true);
      setError('');
      const token = localStorage.getItem('token');
      console.log('Token:', token ? 'Present' : 'Missing');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Making request to /contact/user');
      const res = await api.get('/contact/user', {
        headers: {
          'x-auth-token': token
        }
      });
      console.log('Messages received:', res.data);
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers
      });
      
      if (err.message === 'No authentication token found') {
        navigate('/login');
      } else {
        setError('Failed to load messages. Please try again later.');
      }
    } finally {
      setFetchingMessages(false);
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Submitting form:', form);
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      console.log('Token for submit:', token ? 'Present' : 'Missing');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Making request to /contact');
      const res = await api.post('/contact', form, {
        headers: {
          'x-auth-token': token
        }
      });
      console.log('Submit response:', res.data);
      
      setSuccess('Message sent successfully');
      setForm({ subject: '', message: '' });
      await fetchMessages(); // Refresh messages
    } catch (err) {
      console.error('Error sending message:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers
      });
      
      if (err.message === 'No authentication token found') {
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Failed to send message. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Contact Admin</h2>
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    className="form-control"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Your Messages</h2>
              {fetchingMessages ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : messages.length === 0 ? (
                <p>No messages yet</p>
              ) : (
                <div className="list-group">
                  {messages.map(message => (
                    <div key={message._id} className="list-group-item">
                      <h5 className="mb-1">{message.subject}</h5>
                      <p className="mb-1">{message.message}</p>
                      <small className="text-muted">
                        Sent on: {new Date(message.createdAt).toLocaleString()}
                      </small>
                      {message.adminResponse && (
                        <div className="mt-2 p-2 bg-light rounded">
                          <strong>Admin Response:</strong>
                          <p className="mb-0">{message.adminResponse}</p>
                          <small className="text-muted">
                            Responded on: {new Date(message.respondedAt).toLocaleString()}
                          </small>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;