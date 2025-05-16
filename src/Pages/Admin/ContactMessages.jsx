import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/contact');
      setMessages(res.data);
    } catch (err) {
      setError('Failed to fetch messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (messageId) => {
    if (!response.trim()) {
      setError('Please enter a response');
      return;
    }

    try {
      await api.put(`/contact/${messageId}/respond`, { response });
      setResponse('');
      setSelectedMessage(null);
      fetchMessages(); // Refresh messages
    } catch (err) {
      setError('Failed to send response');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Contact Messages</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="row">
        <div className="col-md-8">
          <div className="list-group">
            {messages.map(message => (
              <div
                key={message._id}
                className={`list-group-item list-group-item-action ${
                  selectedMessage?._id === message._id ? 'active' : ''
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{message.subject}</h5>
                  <small className={message.status === 'pending' ? 'text-warning' : 'text-success'}>
                    {message.status}
                  </small>
                </div>
                <p className="mb-1">{message.message}</p>
                <small>
                  From: {message.user.username} ({message.user.email})
                </small>
                <br />
                <small>
                  Sent on: {new Date(message.createdAt).toLocaleString()}
                </small>
                {message.adminResponse && (
                  <div className="mt-2 p-2 bg-light rounded">
                    <strong>Your Response:</strong>
                    <p className="mb-0">{message.adminResponse}</p>
                    <small>
                      Responded on: {new Date(message.respondedAt).toLocaleString()}
                    </small>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-md-4">
          {selectedMessage && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Respond to Message</h5>
                <div className="mb-3">
                  <label className="form-label">Your Response</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Type your response here..."
                  ></textarea>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleRespond(selectedMessage._id)}
                  disabled={!response.trim()}
                >
                  Send Response
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactMessages; 