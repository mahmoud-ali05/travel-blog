import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../../assets/Images/nick-dunlap-IzaKFvJxukM-unsplash.jpg';
import img2 from '../../assets/Images/OG_Colosseum_Ancient-Rome_KIDS_1122_3x2.avif';
import img3 from '../../assets/Images/james-lee-4k9rum051oI-unsplash.jpg';
import img4 from '../../assets/Images/tommao-wang-1NFhWQQvg3E-unsplash.jpg';
import img5 from '../../assets/Images/westwind-air-service-C0dSvpljHcI-unsplash.jpg';
import img6 from '../../assets/Images/pedro-vit-FkV8Xn3L-9k-unsplash.jpg';
import { FaRegClock, FaUsers, FaMapMarkedAlt, FaGlobe } from 'react-icons/fa';
import axios from 'axios';



const grandCanyonImages = [img6, img3, img5, img1, img2, img4];
const mainGrandCanyonImage = img6;

const TourDetailGrandCanyon = () => {
  const [openAccordion, setOpenAccordion] = useState({included: true, duration: false});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    time: '08:00 AM',
    tickets: {
      adult: 1,
      children: 0,
      infant: 0
    },
    customerInfo: {
      title: 'Mr.',
      fullName: '',
      phone: '',
      email: '',
      guideId: ''
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTicketChange = (type, value) => {
    console.log('Changing ticket:', type, value);
    const numValue = parseInt(value) || 0;
    
    if (numValue < 0) return;
    
    if (type === 'adult' && numValue < 1) return;
    
    if (type === 'children' && numValue > 4) {
      alert('Maximum 4 children allowed');
      return;
    }
    
    if (type === 'infant' && numValue > 2) {
      alert('Maximum 2 infants allowed');
      return;
    }

    setFormData(prev => {
      const newData = {
        ...prev,
        tickets: {
          ...prev.tickets,
          [type]: numValue
        }
      };
      console.log('New form data:', newData);
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.date) {
      alert('Please select a date');
      return;
    }
    
    if (!formData.customerInfo.fullName) {
      alert('Please enter your full name');
      return;
    }
    
    if (!formData.customerInfo.phone) {
      alert('Please enter your phone number');
      return;
    }

    try {
      // Show loading message
      const loadingMessage = document.createElement('div');
      loadingMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 20px;
        border-radius: 8px;
        z-index: 1000;
        font-size: 1.1rem;
      `;
      loadingMessage.textContent = 'Processing your booking...';
      document.body.appendChild(loadingMessage);

      const bookingData = {
        tourTitle: 'Grand Canyon Adventure',
        ...formData,
        bookingDate: new Date().toISOString(),
        status: 'pending'
      };

      try {
        const response = await axios.post('http://localhost:5002/api/bookings', bookingData, {
          timeout: 10000, // 10 seconds timeout
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data.success) {
          // Remove loading message
          loadingMessage.remove();

          // Show success message
          const successMessage = document.createElement('div');
          successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #28a745;
            color: white;
            padding: 25px 40px;
            border-radius: 12px;
            z-index: 1000;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: fadeIn 0.3s ease;
          `;
          successMessage.innerHTML = `
            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem;">Booking Successful!</h3>
            <p style="margin: 0; font-size: 1.1rem;">We will contact you shortly to confirm your booking details.</p>
            <p style="margin: 10px 0 0 0; font-size: 1rem;">Booking ID: ${response.data.data._id}</p>
          `;
          document.body.appendChild(successMessage);

          // Add animation style
          const style = document.createElement('style');
          style.textContent = `
            @keyframes fadeIn {
              from { opacity: 0; transform: translate(-50%, -48%); }
              to { opacity: 1; transform: translate(-50%, -50%); }
            }
          `;
          document.head.appendChild(style);

          // Remove success message and redirect after 3 seconds
          setTimeout(() => {
            successMessage.remove();
            style.remove();
            navigate('/');
          }, 3000);

          // Reset form
          setFormData({
            date: '',
            time: '08:00 AM',
            tickets: {
              adult: 1,
              children: 0,
              infant: 0
            },
            customerInfo: {
              title: 'Mr.',
              fullName: '',
              phone: '',
              email: '',
              guideId: ''
            }
          });
        } else {
          throw new Error(response.data.message || 'Booking failed');
        }
      } catch (axiosError) {
        // Handle network errors
        let errorMessage = 'Network error, please try again later';
        
        if (axiosError.code === 'ECONNABORTED') {
          errorMessage = 'Request timeout, please check your network connection';
        } else if (!axiosError.response) {
          errorMessage = 'Unable to connect to server, please check your network connection';
        } else if (axiosError.response.status === 404) {
          errorMessage = 'Server address error, please contact administrator';
        } else if (axiosError.response.status === 500) {
          errorMessage = 'Internal server error, please try again later';
        }

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Booking error:', error);
      
      // Remove loading message
      const loadingMessage = document.querySelector('div[style*="position: fixed"]');
      if (loadingMessage) {
        loadingMessage.remove();
      }

      // Show error message
      const errorMessage = document.createElement('div');
      errorMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #dc3545;
        color: white;
        padding: 20px 30px;
        border-radius: 8px;
        z-index: 1000;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      `;
      errorMessage.innerHTML = `
        <h3 style="margin: 0 0 10px 0">Booking Failed</h3>
        <p style="margin: 0">${error.message || 'Please try again later'}</p>
        <p style="margin: 10px 0 0 0; font-size: 0.9rem;">If the problem persists, please contact customer service</p>
      `;
      document.body.appendChild(errorMessage);

      // Remove error message after 5 seconds
      setTimeout(() => {
        errorMessage.remove();
      }, 5000);
    }
  };

  const buttonStyle = {
    padding: '8px 16px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    fontWeight: '500',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    '&:hover': {
      background: '#0056b3',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }
  };

  const ticketButtonStyle = {
    padding: '6px 12px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    '&:hover': {
      background: '#0056b3'
    },
    '&:disabled': {
      background: '#ccc',
      cursor: 'not-allowed'
    }
  };

  const inputStyle = {
    width: '60px',
    padding: '8px',
    textAlign: 'center',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    '&:focus': {
      borderColor: '#007bff',
      boxShadow: '0 0 0 2px rgba(0,123,255,0.25)',
      outline: 'none'
    }
  };

  const ticketContainerStyle = {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '1rem',
    flexWrap: 'wrap'
  };

  const ticketItemStyle = {
    flex: '1',
    minWidth: '200px',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  };

  const ticketLabelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#495057',
    fontWeight: '500'
  };

  const ticketControlsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    justifyContent: 'center'
  };

  return (
    <div className="tour-detail-container" style={{padding: '2rem', background: '#f5f5f5'}}>
      {/* Main Grand Canyon Image */}
      <div style={{marginBottom: '1.5rem'}}>
        <img
          src={mainGrandCanyonImage}
          alt="Grand Canyon Landmark"
          style={{width: '100%', height: '400px', objectFit: 'cover', borderRadius: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)'}}
        />
      </div>
      {/* Carousel */}
      <div className="carousel" style={{
        display: 'flex',
        gap: '15px',
        marginBottom: '1.5rem',
        overflowX: 'auto',
        padding: '10px 0',
        width: '100%',
        scrollbarWidth: 'thin',
        scrollbarColor: '#8B4513 #f0f0f0',
        '&::-webkit-scrollbar': {
          height: '8px'
        },
        '&::-webkit-scrollbar-track': {
          background: '#f0f0f0',
          borderRadius: '4px'
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#8B4513',
          borderRadius: '4px'
        }
      }}>
        {grandCanyonImages.map((img, idx) => (
          <img 
            key={idx} 
            src={img} 
            alt={`Grand Canyon ${idx+1}`} 
            style={{
              width: '300px',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(139,69,19,0.2)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }} 
          />
        ))}
      </div>
      {/* Info Cards */}
      <div style={{display: 'flex', gap: '1.5rem', marginBottom: '2rem', justifyContent: 'center'}}>
        <div className="info-card animated-card" style={{...infoCardStyle, background: '#fff', border: '1px solid #e0e0e0'}}>
          <FaRegClock size={32} color="#8B4513" />
          <div className="info-title" style={{...infoTitleStyle, color: '#333'}}>Duration</div>
          <div className="info-value" style={{...infoValueStyle, color: '#8B4513'}}>3 days</div>
        </div>
        <div className="info-card animated-card" style={{...infoCardStyle, background: '#fff', border: '1px solid #e0e0e0'}}>
          <FaUsers size={32} color="#8B4513" />
          <div className="info-title" style={{...infoTitleStyle, color: '#333'}}>Group Size</div>
          <div className="info-value" style={{...infoValueStyle, color: '#8B4513'}}>2-6 People</div>
        </div>
        <div className="info-card animated-card" style={{...infoCardStyle, background: '#fff', border: '1px solid #e0e0e0'}}>
          <FaMapMarkedAlt size={32} color="#8B4513" />
          <div className="info-title" style={{...infoTitleStyle, color: '#333'}}>Tour Type</div>
          <div className="info-value" style={{...infoValueStyle, color: '#8B4513'}}>Adventure Tour</div>
        </div>
        <div className="info-card animated-card" style={{...infoCardStyle, background: '#fff', border: '1px solid #e0e0e0'}}>
          <FaGlobe size={32} color="#8B4513" />
          <div className="info-title" style={{...infoTitleStyle, color: '#333'}}>Languages</div>
          <div className="info-value" style={{...infoValueStyle, color: '#8B4513'}}>English, Spanish</div>
        </div>
      </div>
      {/* Main Content */}
      <div style={{display: 'flex', gap: '2rem'}}>
        {/* Left: Overview & Highlight */}
        <div style={{flex: 2}}>
          <div style={{background: '#fff', borderRadius: '10px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(139,69,19,0.1)'}}>
            <h3 style={{color: '#8B4513'}}>Overview</h3>
            <p style={{fontSize: '1.1rem', color: '#333', marginTop: '1rem'}}>
              Experience the majesty of the Grand Canyon! From breathtaking rim views to thrilling hiking trails, this 3-day adventure offers stunning natural landscapes, guided tours, and unforgettable outdoor experiences. Whether you're seeking adventure or peaceful contemplation, the Grand Canyon welcomes you with its awe-inspiring beauty and rich geological history.
            </p>
          </div>
          <div style={{background: '#fff', borderRadius: '10px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(139,69,19,0.1)', marginBottom: '1.5rem'}}>
            <h3 style={{color: '#8B4513'}}>Highlight</h3>
            <ul style={{fontSize: '1.05rem', color: '#333', marginTop: '1rem', paddingLeft: '1.2rem'}}>
              <li>Sunrise at South Rim</li>
              <li>Guided hiking trails</li>
              <li>Helicopter tour option</li>
              <li>Native American cultural experience</li>
              <li>Stargazing night tour</li>
              <li>Optional river rafting</li>
            </ul>
          </div>
          {/* Accordion Sections */}
          <div style={{maxWidth: 900, margin: '0 auto 2rem auto'}}>
            {/* Included/Excluded */}
            <div style={{background: '#fff', borderRadius: '14px', boxShadow: '0 2px 12px rgba(139,69,19,0.1)', marginBottom: '1.2rem', border: '1px solid #e0e0e0'}}>
              <div
                onClick={() => setOpenAccordion(prev => ({...prev, included: !prev.included}))}
                className="accordion-title"
                style={{color: '#8B4513'}}
              >
                Included/Excluded
                <span style={{fontSize: 22}}>{openAccordion.included ? '▲' : '▼'}</span>
              </div>
              {openAccordion.included && (
                <div style={{display: 'flex', gap: '2rem', padding: '0 1.5rem 1.2rem 1.5rem'}}>
                  <div style={{flex: 1}}>
                    <b style={{color: '#8B4513'}}>Included:</b>
                    <ul style={{marginTop: 8, marginBottom: 0, paddingLeft: 18, color: '#333'}}>
                      <li>All transportation during the tour</li>
                      <li>2 nights lodge accommodation</li>
                      <li>Daily breakfast and dinner</li>
                      <li>Guided hiking tours</li>
                      <li>Park entrance fees</li>
                    </ul>
                  </div>
                  <div style={{flex: 1}}>
                    <b style={{color: '#8B4513'}}>Excluded:</b>
                    <ul style={{marginTop: 8, marginBottom: 0, paddingLeft: 18, color: '#333'}}>
                      <li>Flights to/from Arizona</li>
                      <li>Personal expenses</li>
                      <li>Optional helicopter tour</li>
                      <li>Travel insurance</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            {/* Duration */}
            <div style={{background: '#fff', borderRadius: '14px', boxShadow: '0 2px 12px rgba(139,69,19,0.1)', marginBottom: '1.2rem', border: '1px solid #e0e0e0'}}>
              <div
                onClick={() => setOpenAccordion(prev => ({...prev, duration: !prev.duration}))}
                className="accordion-title"
                style={{color: '#8B4513'}}
              >
                Duration
                <span style={{fontSize: 22}}>{openAccordion.duration ? '▲' : '▼'}</span>
              </div>
              {openAccordion.duration && (
                <div style={{padding: '0 1.5rem 1.2rem 1.5rem'}}>
                  <p style={{marginBottom: 10, color: '#333'}}>
                    Your Grand Canyon Adventure includes:
                  </p>
                  <ol style={{marginTop: 0, paddingLeft: 20, color: '#333'}}>
                    <li><b>Day 1:</b> Arrival, South Rim tour, sunset viewing</li>
                    <li><b>Day 2:</b> Hiking trails, cultural experience, stargazing</li>
                    <li><b>Day 3:</b> Sunrise viewing, farewell lunch, departure</li>
                  </ol>
                  <p style={{marginTop: 10, color: '#333'}}>
                    Three days of natural wonder and unforgettable memories!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Right: Booking Form */}
        <div style={{flex: 1, minWidth: '320px'}}>
          <div style={{background: '#fff', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(139,69,19,0.1)'}}>
            <h3 style={{color: '#8B4513', marginBottom: '1.5rem'}}>Book This Tour</h3>
            <form onSubmit={handleSubmit}>
              <div style={{marginBottom: '1rem'}}>
                <label>Date</label><br />
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  style={{width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}} 
                  required
                />
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label>Time</label><br />
                <select 
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  style={{width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}}
                >
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label>Tickets</label>
                <div style={ticketContainerStyle}>
                  <div style={ticketItemStyle}>
                    <label style={ticketLabelStyle}>Adults</label>
                    <div style={ticketControlsStyle}>
                      <button 
                        type="button" 
                        onClick={() => handleTicketChange('adult', formData.tickets.adult - 1)}
                        style={ticketButtonStyle}
                        disabled={formData.tickets.adult <= 1}
                      >-</button>
                      <input 
                        type="number" 
                        value={formData.tickets.adult}
                        onChange={(e) => handleTicketChange('adult', e.target.value)}
                        style={inputStyle}
                        min="1"
                      />
                      <button 
                        type="button" 
                        onClick={() => handleTicketChange('adult', formData.tickets.adult + 1)}
                        style={ticketButtonStyle}
                      >+</button>
                    </div>
                  </div>
                  <div style={ticketItemStyle}>
                    <label style={ticketLabelStyle}>Children (4-12)</label>
                    <div style={ticketControlsStyle}>
                      <button 
                        type="button" 
                        onClick={() => handleTicketChange('children', formData.tickets.children - 1)}
                        style={ticketButtonStyle}
                        disabled={formData.tickets.children <= 0}
                      >-</button>
                      <input 
                        type="number" 
                        value={formData.tickets.children}
                        onChange={(e) => handleTicketChange('children', e.target.value)}
                        style={inputStyle}
                        min="0"
                        max="4"
                      />
                      <button 
                        type="button" 
                        onClick={() => handleTicketChange('children', formData.tickets.children + 1)}
                        style={ticketButtonStyle}
                        disabled={formData.tickets.children >= 4}
                      >+</button>
                    </div>
                  </div>
                  <div style={ticketItemStyle}>
                    <label style={ticketLabelStyle}>Infants (0-3)</label>
                    <div style={ticketControlsStyle}>
                      <button 
                        type="button" 
                        onClick={() => handleTicketChange('infant', formData.tickets.infant - 1)}
                        style={ticketButtonStyle}
                        disabled={formData.tickets.infant <= 0}
                      >-</button>
                      <input 
                        type="number" 
                        value={formData.tickets.infant}
                        onChange={(e) => handleTicketChange('infant', e.target.value)}
                        style={inputStyle}
                        min="0"
                        max="2"
                      />
                      <button 
                        type="button" 
                        onClick={() => handleTicketChange('infant', formData.tickets.infant + 1)}
                        style={ticketButtonStyle}
                        disabled={formData.tickets.infant >= 2}
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label>Title</label><br />
                <select 
                  name="customerInfo.title"
                  value={formData.customerInfo.title}
                  onChange={handleInputChange}
                  style={{width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}}
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label>Full Name</label><br />
                <input 
                  type="text" 
                  name="customerInfo.fullName"
                  value={formData.customerInfo.fullName}
                  onChange={handleInputChange}
                  placeholder="Your Name" 
                  style={{width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}} 
                  required
                />
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label>Phone</label><br />
                <input 
                  type="text" 
                  name="customerInfo.phone"
                  value={formData.customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="123-456-789" 
                  style={{width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}} 
                  required
                />
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label>Email</label><br />
                <input 
                  type="email" 
                  name="customerInfo.email"
                  value={formData.customerInfo.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com" 
                  style={{width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}} 
                  required
                />
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label>Guide ID <span style={{color:'#888', fontSize:'0.95em'}}>(optional)</span></label><br />
                <input 
                  type="text" 
                  name="customerInfo.guideId"
                  value={formData.customerInfo.guideId}
                  onChange={handleInputChange}
                  placeholder="Enter guide ID if you have one" 
                  style={{width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}} 
                />
              </div>
              <button 
                type="submit" 
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(45deg, #8B4513, #A0522D)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(139,69,19,0.2)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 12px rgba(139,69,19,0.3)'
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                    boxShadow: '0 2px 4px rgba(139,69,19,0.2)'
                  }
                }}
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Card Animations and Accordion Styles */}
      <style>{`
        .info-card {
          background: #fff;
          border-radius: 14px;
          padding: 1.2rem 2rem;
          box-shadow: 0 2px 12px rgba(139,69,19,0.1);
          text-align: center;
          min-width: 140px;
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid #e0e0e0;
        }
        .info-title {
          font-weight: bold;
          font-size: 1.1rem;
          margin-top: 0.5rem;
          color: #333;
        }
        .info-value {
          color: #8B4513;
          font-weight: bold;
          margin-top: 0.2rem;
          font-size: 1.05rem;
        }
        .animated-card {
          animation: pop-in 0.7s cubic-bezier(.68,-0.55,.27,1.55);
        }
        .animated-card:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 8px 24px #c7d6ee;
        }
        @keyframes pop-in {
          0% { transform: scale(0.7) translateY(30px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .accordion-title {
          cursor: pointer;
          padding: 1.2rem 1.5rem;
          font-weight: bold;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: color 0.25s;
          color: #8B4513;
        }
        .accordion-title:hover {
          color: #007bff;
        }
      `}</style>

      {/* Tour Guides Directory Section */}
      <div style={{
        position: 'relative',
        minHeight: 450,
        margin: '48px 0 0 0',
        borderRadius: '22px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 6% 0 4%',
        gap: '2.5rem',
        flexWrap: 'wrap',
        background: `linear-gradient(120deg, rgba(139,69,19,0.60) 0%, rgba(160,82,45,0.45) 100%), url(${mainGrandCanyonImage}) center/cover no-repeat`
      }}>
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(120deg, rgba(255, 255, 255, 0.18) 0%, rgba(210,180,140,0.55) 100%)',
          zIndex: 1
        }}></div>
        <div style={{flex: 1, minWidth: 320, position: 'relative', zIndex: 2}}>
          <h1 style={{fontSize: '2.7rem', fontWeight: 'bold', color: '#fff', margin: 0, textShadow: '0 2px 12px rgba(0,0,0,0.3)'}}>Find Your Grand Canyon Guide</h1>
        </div>
        <div style={{flex: 2, minWidth: 320, maxWidth: 600, position: 'relative', zIndex: 2}}>
          <h2 style={{fontWeight: 'bold', color: '#fff', fontSize: '1.45rem', marginBottom: 10, textShadow: '0 2px 8px rgba(0,0,0,0.2)'}}>Certified by the National Park Service</h2>
          <p style={{fontSize: '1.13rem', color: '#fff', margin: '14px 0 0 0', textShadow: '0 1px 8px rgba(0,0,0,0.2)'}}>Explore the Grand Canyon with a certified local guide. Discover hidden trails, geological wonders, and experience the best of Arizona's natural beauty.</p>
          <p style={{fontSize: '1.13rem', color: '#fff', margin: '14px 0', textShadow: '0 1px 8px rgba(0,0,0,0.2)'}}>Choose from passionate guides who know the best spots for hiking, photography, and local wildlife.</p>
          <div style={{display: 'flex', alignItems: 'center', gap: 0, marginTop: 28}}>
            <button
              style={{
                background: 'linear-gradient(90deg, #D2B48C 0%, #8B4513 100%)',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1.18rem',
                border: 'none',
                borderRadius: '8px 0 0 8px',
                padding: '14px 36px 14px 36px',
                cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                textDecoration: 'underline',
              }}
              onMouseOver={e => {e.target.style.background='#A0522D';e.target.style.color='#fff';}}
              onMouseOut={e => {e.target.style.background='linear-gradient(90deg, #D2B48C 0%, #8B4513 100%)';e.target.style.color='#fff';}}
              onClick={() => navigate('/guides-directory')}
            >
              Find Your Grand Canyon Guide
            </button>
            <div style={{background: '#D2B48C', height: '100%', borderRadius: '0 8px 8px 0', padding: '0 22px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.2)'}}>
              <span style={{fontSize: 28, color: '#fff'}}>&rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// JS styles for cards
const infoCardStyle = {
  background: '#fff',
  borderRadius: '14px',
  padding: '1.2rem 2rem',
  boxShadow: '0 2px 12px rgba(139,69,19,0.1)',
  textAlign: 'center',
  minWidth: '140px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '1px solid #e0e0e0'
};

const infoTitleStyle = {
  fontWeight: 'bold',
  fontSize: '1.1rem',
  marginTop: '0.5rem',
  color: '#333'
};

const infoValueStyle = {
  color: '#8B4513',
  fontWeight: 'bold',
  marginTop: '0.2rem',
  fontSize: '1.05rem'
};

export default TourDetailGrandCanyon; 