import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../../assets/Images/Beach.jpg';
import img2 from '../../assets/Images/OG_Colosseum_Ancient-Rome_KIDS_1122_3x2.avif';
import img3 from '../../assets/Images/Cairo_From_Tower_(cropped).jpg';
import img4 from '../../assets/Images/barcelona-city-overview.jpg';
import img5 from '../../assets/Images/unnamed.jpg';
import img6 from '../../assets/Images/camp-sahara-desert-egypt-sunset-68103884-transformed.jpeg';
import { FaRegClock, FaUsers, FaMapMarkedAlt, FaGlobe } from 'react-icons/fa';
import axios from 'axios';

const saharaImages = [img6, img3, img4, img5, img1, img2];
const mainSaharaImage = img6;

const TourDetailSahara = () => {
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

    setFormData(prev => ({
      ...prev,
      tickets: {
        ...prev.tickets,
        [type]: numValue
      }
    }));
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
        tourTitle: 'Sahara Desert Adventure',
        ...formData,
        bookingDate: new Date().toISOString(),
        status: 'pending'
      };

      const response = await axios.post('http://localhost:5002/api/bookings', bookingData);
      
      if (response.data.success) {
        loadingMessage.remove();
        
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
        `;
        successMessage.innerHTML = `
          <h3 style="margin: 0 0 15px 0; font-size: 1.4rem;">Booking Successful!</h3>
          <p style="margin: 0; font-size: 1.1rem;">We will contact you shortly to confirm your booking details.</p>
          <p style="margin: 10px 0 0 0; font-size: 1rem;">Booking ID: ${response.data.data._id}</p>
        `;
        document.body.appendChild(successMessage);

        setTimeout(() => {
          successMessage.remove();
          navigate('/');
        }, 3000);

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
      }
    } catch (error) {
      console.error('Booking error:', error);
      
      const loadingMessage = document.querySelector('div[style*="position: fixed"]');
      if (loadingMessage) {
        loadingMessage.remove();
      }

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
      `;
      document.body.appendChild(errorMessage);

      setTimeout(() => {
        errorMessage.remove();
      }, 5000);
    }
  };

  return (
    <div className="tour-detail-container" style={{padding: '2rem', background: '#f5f5f5'}}>
      {/* Main Sahara Image */}
      <div style={{marginBottom: '1.5rem'}}>
        <img
          src={mainSaharaImage}
          alt="Sahara Desert Sunset"
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
        scrollbarColor: '#8B4513 #f0f0f0'
      }}>
        {saharaImages.map((img, idx) => (
          <img 
            key={idx} 
            src={img} 
            alt={`Sahara Desert ${idx+1}`} 
            style={{
              width: '300px',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(139,69,19,0.2)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} 
          />
        ))}
      </div>

      {/* Info Cards */}
      <div style={{display: 'flex', gap: '1.5rem', marginBottom: '2rem', justifyContent: 'center'}}>
        <div className="info-card" style={infoCardStyle}>
          <FaRegClock size={32} color="#8B4513" />
          <div className="info-title" style={infoTitleStyle}>Duration</div>
          <div className="info-value" style={infoValueStyle}>3 days</div>
        </div>
        <div className="info-card" style={infoCardStyle}>
          <FaUsers size={32} color="#8B4513" />
          <div className="info-title" style={infoTitleStyle}>Group Size</div>
          <div className="info-value" style={infoValueStyle}>2-6 People</div>
        </div>
        <div className="info-card" style={infoCardStyle}>
          <FaMapMarkedAlt size={32} color="#8B4513" />
          <div className="info-title" style={infoTitleStyle}>Tour Type</div>
          <div className="info-value" style={infoValueStyle}>Desert Adventure</div>
        </div>
        <div className="info-card" style={infoCardStyle}>
          <FaGlobe size={32} color="#8B4513" />
          <div className="info-title" style={infoTitleStyle}>Languages</div>
          <div className="info-value" style={infoValueStyle}>English, Arabic</div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{display: 'flex', gap: '2rem'}}>
        {/* Left: Overview & Highlight */}
        <div style={{flex: 2}}>
          <div style={{background: '#fff', borderRadius: '10px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(139,69,19,0.1)'}}>
            <h3 style={{color: '#8B4513'}}>Overview</h3>
            <p style={{fontSize: '1.1rem', color: '#333', marginTop: '1rem'}}>
              Experience the magic of the Sahara Desert! This 3-day adventure takes you through the golden dunes, offering camel rides, traditional Bedouin experiences, and unforgettable desert camping under the stars. Immerse yourself in the rich culture and breathtaking landscapes of the world's largest hot desert.
            </p>
          </div>
          <div style={{background: '#fff', borderRadius: '10px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(139,69,19,0.1)', marginBottom: '1.5rem'}}>
            <h3 style={{color: '#8B4513'}}>Highlight</h3>
            <ul style={{fontSize: '1.05rem', color: '#333', marginTop: '1rem', paddingLeft: '1.2rem'}}>
              <li>Camel trekking at sunset</li>
              <li>Traditional Bedouin dinner</li>
              <li>Desert camping under the stars</li>
              <li>Sandboarding adventure</li>
              <li>Sunrise over the dunes</li>
              <li>Cultural music and dance</li>
            </ul>
          </div>

          {/* Accordion Sections */}
          <div style={{maxWidth: 900, margin: '0 auto 2rem auto'}}>
            {/* Included/Excluded */}
            <div style={{background: '#fff', borderRadius: '14px', boxShadow: '0 2px 12px rgba(139,69,19,0.1)', marginBottom: '1.2rem', border: '1px solid #e0e0e0'}}>
              <div
                onClick={() => setOpenAccordion(prev => ({...prev, included: !prev.included}))}
                className="accordion-title"
                style={{color: '#8B4513', cursor: 'pointer', padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
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
                      <li>2 nights desert camping</li>
                      <li>All meals and water</li>
                      <li>Camel riding equipment</li>
                      <li>Traditional entertainment</li>
                    </ul>
                  </div>
                  <div style={{flex: 1}}>
                    <b style={{color: '#8B4513'}}>Excluded:</b>
                    <ul style={{marginTop: 8, marginBottom: 0, paddingLeft: 18, color: '#333'}}>
                      <li>Flights to/from Morocco</li>
                      <li>Personal expenses</li>
                      <li>Travel insurance</li>
                      <li>Optional activities</li>
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
                style={{color: '#8B4513', cursor: 'pointer', padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
              >
                Duration
                <span style={{fontSize: 22}}>{openAccordion.duration ? '▲' : '▼'}</span>
              </div>
              {openAccordion.duration && (
                <div style={{padding: '0 1.5rem 1.2rem 1.5rem'}}>
                  <p style={{marginBottom: 10, color: '#333'}}>
                    Your Sahara Desert Adventure includes:
                  </p>
                  <ol style={{marginTop: 0, paddingLeft: 20, color: '#333'}}>
                    <li><b>Day 1:</b> Arrival, camel trek, sunset viewing</li>
                    <li><b>Day 2:</b> Sunrise, sandboarding, cultural activities</li>
                    <li><b>Day 3:</b> Morning activities, farewell lunch</li>
                  </ol>
                  <p style={{marginTop: 10, color: '#333'}}>
                    Three days of desert exploration and unforgettable memories!
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
                  boxShadow: '0 4px 6px rgba(139,69,19,0.2)'
                }}
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>

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
        background: `linear-gradient(120deg, rgba(139,69,19,0.60) 0%, rgba(160,82,45,0.45) 100%), url(${mainSaharaImage}) center/cover no-repeat`
      }}>
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(120deg, rgba(255, 255, 255, 0.18) 0%, rgba(210, 180, 140, 0.55) 100%)',
          zIndex: 1
        }}></div>
        <div style={{flex: 1, minWidth: 320, position: 'relative', zIndex: 2}}>
          <h1 style={{fontSize: '2.7rem', fontWeight: 'bold', color: '#fff', margin: 0, textShadow: '0 2px 12px rgba(0,0,0,0.3)'}}>Find Your Desert Guide</h1>
        </div>
        <div style={{flex: 2, minWidth: 320, maxWidth: 600, position: 'relative', zIndex: 2}}>
          <h2 style={{fontWeight: 'bold', color: '#fff', fontSize: '1.45rem', marginBottom: 10, textShadow: '0 2px 8px rgba(0,0,0,0.2)'}}>Certified Sahara Tour Guides</h2>
          <p style={{fontSize: '1.13rem', color: '#fff', margin: '14px 0 0 0', textShadow: '0 1px 8px rgba(0,0,0,0.2)'}}>Explore the Sahara Desert with experienced local guides. Discover hidden oases, ancient traditions, and experience the magic of the desert.</p>
          <p style={{fontSize: '1.13rem', color: '#fff', margin: '14px 0', textShadow: '0 1px 8px rgba(0,0,0,0.2)'}}>Choose from passionate guides who know the best spots for stargazing, camel trekking, and cultural experiences.</p>
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
              onClick={() => navigate('/guides-directory')}
            >
              Find Your Desert Guide
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

// Styles
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

const ticketButtonStyle = {
  padding: '6px 12px',
  background: '#8B4513',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  '&:hover': {
    background: '#A0522D'
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
    borderColor: '#8B4513',
    boxShadow: '0 0 0 2px rgba(139,69,19,0.25)',
    outline: 'none'
  }
};

export default TourDetailSahara; 