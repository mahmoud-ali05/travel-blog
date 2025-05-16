import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { selectAllTours } from '../../store/toursSlice';
import img1 from '../../assets/Images/Beach.jpg';
import img2 from '../../assets/Images/OG_Colosseum_Ancient-Rome_KIDS_1122_3x2.avif';
import img3 from '../../assets/Images/Cairo_From_Tower_(cropped).jpg';
import img4 from '../../assets/Images/barcelona-city-overview.jpg';
import img5 from '../../assets/Images/unnamed.jpg';
import img6 from '../../assets/Images/camp-sahara-desert-egypt-sunset-68103884-transformed.jpeg';
import malibu from '../../assets/Images/malibu.jpg';
import { FaRegClock, FaUsers, FaMapMarkedAlt, FaGlobe } from 'react-icons/fa';

const californiaImages = [img1, img2, img3, img4, img5, img6, img1, img4, img2, img5];

const mainCaliforniaImage = malibu; // صورة ماليبو الجديدة

const goldenGateImage = img1; // استخدم صورة الشاطئ كمعلم شهير (يمكنك تغييرها لاحقاً)

const TourDetail = () => {
  const { id } = useParams();
  const tours = useSelector(selectAllTours);
  const navigate = useNavigate();
  let tour = tours.find(t => t.slug === id);

  // 添加调试信息
  console.log('TourDetail - id:', id);
  console.log('TourDetail - tours:', tours);
  console.log('TourDetail - tour:', tour);

  useEffect(() => {
    if (!tour) {
      const tourById = tours.find(t => String(t.id) === id);
      if (tourById) {
        navigate(`/Tours/${tourById.slug}`, { replace: true });
      }
    }
  }, [id, tours, tour, navigate]);

  if (!tour) return <div>الرحلة غير موجودة</div>;

  const [openAccordion, setOpenAccordion] = useState({included: true, duration: false});

  return (
    <div className="tour-detail-container" style={{padding: '2rem', background: '#f8f9fa'}}>
      {/* صورة معلم كاليفورنيا بعرض الشاشة */}
      <div style={{marginBottom: '1.5rem'}}>
        <img
          src={mainCaliforniaImage}
          alt="California Landmark"
          style={{width: '100%', height: '320px', objectFit: 'cover', borderRadius: '14px'}}
        />
      </div>
      {/* صور في الأعلى */}
      <div className="carousel" style={{display: 'flex', gap: '10px', marginBottom: '1.5rem', overflowX: 'auto'}}>
        {californiaImages.map((img, idx) => (
          <img key={idx} src={img} alt={`California ${idx+1}`} style={{width: '160px', height: '100px', objectFit: 'cover', borderRadius: '8px'}} />
        ))}
      </div>
      {/* كروت المعلومات مع أيقونات وأنيميشن */}
      <div style={{display: 'flex', gap: '1.5rem', marginBottom: '2rem', justifyContent: 'center'}}>
        <div className="info-card animated-card" style={infoCardStyle}>
          <FaRegClock size={32} color="#007bff" />
          <div className="info-title" style={infoTitleStyle}>Duration</div>
          <div className="info-value" style={infoValueStyle}>5-7 days</div>
        </div>
        <div className="info-card animated-card" style={infoCardStyle}>
          <FaUsers size={32} color="#007bff" />
          <div className="info-title" style={infoTitleStyle}>Group Size</div>
          <div className="info-value" style={infoValueStyle}>25 People</div>
        </div>
        <div className="info-card animated-card" style={infoCardStyle}>
          <FaMapMarkedAlt size={32} color="#007bff" />
          <div className="info-title" style={infoTitleStyle}>Tour Type</div>
          <div className="info-value" style={infoValueStyle}>Daily Tour</div>
        </div>
        <div className="info-card animated-card" style={infoCardStyle}>
          <FaGlobe size={32} color="#007bff" />
          <div className="info-title" style={infoTitleStyle}>Languages</div>
          <div className="info-value" style={infoValueStyle}>All Languages</div>
        </div>
      </div>
      {/* المحتوى الرئيسي */}
      <div style={{display: 'flex', gap: '2rem'}}>
        {/* يسار: Overview و Highlight */}
        <div style={{flex: 2}}>
          <div style={{background: '#fff', borderRadius: '10px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px #eee'}}>
            <h3 style={{color: '#007bff'}}>Overview</h3>
            <p style={{fontSize: '1.1rem', color: '#333', marginTop: '1rem'}}>
              Discover the magic of California! From the iconic Golden Gate Bridge in San Francisco to the glamorous beaches of Los Angeles, and from the towering redwoods to the vibrant streets of San Diego, California offers a journey like no other. Whether you crave adventure, relaxation, or cultural exploration, the Golden State welcomes you with open arms and endless sunshine. Experience breathtaking landscapes, world-class cuisine, and a spirit of innovation that defines the West Coast dream.
            </p>
          </div>
          <div style={{background: '#fff', borderRadius: '10px', padding: '1.5rem', boxShadow: '0 2px 8px #eee', marginBottom: '1.5rem'}}>
            <h3 style={{color: '#007bff'}}>Highlight</h3>
            <ul style={{fontSize: '1.05rem', color: '#333', marginTop: '1rem', paddingLeft: '1.2rem'}}>
              <li>Drive along the Pacific Coast Highway for breathtaking ocean views.</li>
              <li>Visit Hollywood and walk among the stars on the Walk of Fame.</li>
              <li>Enjoy fresh seafood at San Francisco's Fisherman's Wharf.</li>
              <li>Explore Yosemite National Park's majestic waterfalls and granite cliffs.</li>
              <li>Relax on the sunny beaches of Santa Monica and Malibu.</li>
              <li>Experience world-class wines in Napa Valley's picturesque vineyards.</li>
            </ul>
          </div>
          {/* Accordion Sections */}
          <div style={{maxWidth: 900, margin: '0 auto 2rem auto'}}>
            {/* Included/Excluded */}
            <div style={{background: '#fff', borderRadius: '14px', boxShadow: '0 2px 12px #e0e7ef', marginBottom: '1.2rem', border: '1px solid #eee'}}>
              <div
                onClick={() => setOpenAccordion(prev => ({...prev, included: !prev.included}))}
                className="accordion-title"
              >
                Included/Excluded
                <span style={{fontSize: 22}}>{openAccordion.included ? '▲' : '▼'}</span>
              </div>
              {openAccordion.included && (
                <div style={{display: 'flex', gap: '2rem', padding: '0 1.5rem 1.2rem 1.5rem'}}>
                  <div style={{flex: 1}}>
                    <b>Included:</b>
                    <ul style={{marginTop: 8, marginBottom: 0, paddingLeft: 18}}>
                      <li>Admission to all listed California attractions.</li>
                      <li>Guided tours in English and other languages.</li>
                      <li>Transportation between major sites.</li>
                      <li>Daily breakfast at selected hotels.</li>
                      <li>Entrance fees to national parks.</li>
                    </ul>
                  </div>
                  <div style={{flex: 1}}>
                    <b>Excluded:</b>
                    <ul style={{marginTop: 8, marginBottom: 0, paddingLeft: 18}}>
                      <li>International airfare.</li>
                      <li>Personal expenses and souvenirs.</li>
                      <li>Lunch and dinner.</li>
                      <li>Optional activities not listed in the itinerary.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            {/* Duration */}
            <div style={{background: '#fff', borderRadius: '14px', boxShadow: '0 2px 12px #e0e7ef', marginBottom: '1.2rem', border: '1px solid #eee'}}>
              <div
                onClick={() => setOpenAccordion(prev => ({...prev, duration: !prev.duration}))}
                className="accordion-title"
              >
                Duration
                <span style={{fontSize: 22}}>{openAccordion.duration ? '▲' : '▼'}</span>
              </div>
              {openAccordion.duration && (
                <div style={{padding: '0 1.5rem 1.2rem 1.5rem'}}>
                  <p style={{marginBottom: 10}}>
                    Your California adventure spans 5-7 days with the following highlights:
                  </p>
                  <ol style={{marginTop: 0, paddingLeft: 20}}>
                    <li><b>Day 1-2:</b> Arrival and exploration of Los Angeles</li>
                    <li><b>Day 3-4:</b> Coastal drive and San Francisco visit</li>
                    <li><b>Day 5:</b> Yosemite National Park adventure</li>
                    <li><b>Day 6:</b> Beach relaxation and local experiences</li>
                    <li><b>Day 7:</b> Farewell and departure</li>
                  </ol>
                  <p style={{marginTop: 10}}>
                    Each day is designed to give you the best of California's nature, cities, and culture!
                  </p>
                </div>
              )}
            </div>
            {/* Question & Answers */}
            <div style={{background: '#fff', borderRadius: '14px', boxShadow: '0 2px 12px #e0e7ef', border: '1px solid #eee', marginBottom: '1.2rem', padding: '1.2rem 1.5rem'}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem'}}>
                <h3 style={{color: '#3973d6', fontWeight: 'bold', fontSize: '1.4rem', margin: 0}}>Question & Answers</h3>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div style={{background: '#f8f9fa', borderRadius: '10px', border: '1px solid #e0e7ef', padding: '1rem 1.2rem'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                    <span style={{fontSize: 20, color: '#3973d6', fontWeight: 'bold'}}>?</span>
                    <span style={{fontWeight: 'bold'}}>Is this California tour suitable for families?</span>
                  </div>
                  <div style={{marginTop: 6, marginLeft: 28}}>
                    Absolutely! Our California tour is designed for travelers of all ages, including families with children.
                  </div>
                </div>
                <div style={{background: '#f4f6fa', borderRadius: '10px', border: '1px solid #e0e7ef', padding: '1rem 1.2rem'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                    <span style={{fontSize: 20, color: '#3973d6', fontWeight: 'bold'}}>?</span>
                    <span style={{fontWeight: 'bold'}}>Can I bring my own food or drinks?</span>
                  </div>
                  <div style={{marginTop: 6, marginLeft: 28}}>
                    Outside food and drinks are not allowed on the tour bus, but you'll have plenty of stops at local restaurants and cafes along the way.
                  </div>
                </div>
                <div style={{background: '#f8f9fa', borderRadius: '10px', border: '1px solid #e0e7ef', padding: '1rem 1.2rem'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                    <span style={{fontSize: 20, color: '#3973d6', fontWeight: 'bold'}}>?</span>
                    <span style={{fontWeight: 'bold'}}>Is the tour accessible for people with disabilities?</span>
                  </div>
                  <div style={{marginTop: 6, marginLeft: 28}}>
                    Yes, we strive to make our tours accessible. Please let us know your needs in advance so we can assist you.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* يمين: نموذج الحجز */}
        <div style={{flex: 1, minWidth: '320px'}}>
          <div style={{background: '#fff', borderRadius: '10px', padding: '2rem 1.5rem', boxShadow: '0 2px 8px #eee'}}>
            <h3 style={{color: '#007bff', marginBottom: '1.5rem'}}>Booking Form</h3>
            <form>
              <div style={{marginBottom: '1rem'}}>
                <label>From:</label><br />
                <input type="date" style={{width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}} />
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label>Time:</label><br />
                <input type="radio" id="time1" name="time" value="08:00 AM" defaultChecked />
                <label htmlFor="time1" style={{marginLeft: '8px'}}>08:00 AM</label>
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label>Tickets:</label>
                <div style={{display: 'flex', gap: '1rem', marginTop: '0.5rem'}}>
                  <div>Adult (18+ years)<br /><b>01</b></div>
                  <div>Children (2+ years)<br /><b>00</b></div>
                  <div>Infant<br /><b>00</b></div>
                </div>
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label>Full Name</label><br />
                <input type="text" placeholder="Your Name" style={{width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}} />
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label>Phone</label><br />
                <input type="text" placeholder="123-456-789" style={{width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}} />
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label>Guide ID <span style={{color:'#888', fontSize:'0.95em'}}>(optional)</span></label><br />
                <input type="text" placeholder="Enter guide ID if you have one" style={{width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}} />
              </div>
              <div style={{marginBottom: '1.5rem'}}>
                <label>Title</label><br />
                <input type="radio" id="mr" name="title" value="Mr." defaultChecked /> <label htmlFor="mr">Mr.</label>
                <input type="radio" id="mrs" name="title" value="Mrs." style={{marginLeft: '10px'}} /> <label htmlFor="mrs">Mrs.</label>
                <input type="radio" id="ms" name="title" value="Ms." style={{marginLeft: '10px'}} /> <label htmlFor="ms">Ms.</label>
              </div>
              <button type="submit" style={{width: '100%', background: '#007bff', color: '#fff', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1.1rem'}}>Book Now</button>
            </form>
          </div>
        </div>
      </div>
      {/* أنيميشن للكروت */}
      <style>{`
        .info-card {
          background: #fff;
          border-radius: 14px;
          padding: 1.2rem 2rem;
          box-shadow: 0 2px 12px #e0e7ef;
          text-align: center;
          min-width: 140px;
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .info-title {
          font-weight: bold;
          font-size: 1.1rem;
          margin-top: 0.5rem;
        }
        .info-value {
          color: #007bff;
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
        }
        .accordion-title:hover {
          color: #007bff;
        }
      `}</style>
      {/* قسم دليل المرشدين السياحيين */}
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
        background: `linear-gradient(120deg, rgba(19,92,74,0.60) 0%, rgba(57,115,214,0.45) 100%), url(${malibu}) center/cover no-repeat`
      }}>
        {/* طبقة شفافة فوق الصورة */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(120deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 224, 130, 0.55) 100%)',
          zIndex: 1
        }}></div>
        <div style={{flex: 1, minWidth: 320, position: 'relative', zIndex: 2}}>
          <h1 style={{fontSize: '2.7rem', fontWeight: 'bold', color: ' #ffd54f', margin: 0, textShadow: '0 2px 12px #135c4a99'}}>Tour Guides Directory</h1>
        </div>
        <div style={{flex: 2, minWidth: 320, maxWidth: 600, position: 'relative', zIndex: 2}}>
          <h2 style={{fontWeight: 'bold', color: '#ffe082', fontSize: '1.45rem', marginBottom: 10, textShadow: '0 2px 8px #135c4a88'}}>Certified by the California Tourism Board</h2>
          <p style={{fontSize: '1.13rem', color: '#fff', margin: '14px 0 0 0', textShadow: '0 1px 8px #135c4a55'}}>There are many advantages to exploring California with a certified tour guide. You'll discover hidden gems, local stories, and cultural facts in your own language that you might miss on your own. Our guides can help you practice your English or even a bit of Spanish!</p>
          <p style={{fontSize: '1.13rem', color: '#fff', margin: '14px 0', textShadow: '0 1px 8px #135c4a55'}}>Tour guides help you save time and make the most of your trip. They know the best spots for photos, food, and fun. Choose from over 2,500+ certified California tour guides, each with their own specialty and passion for the Golden State.</p>
          <div style={{display: 'flex', alignItems: 'center', gap: 0, marginTop: 28}}>
            <button
              style={{
                background: 'linear-gradient(90deg, #ffe082 0%, #ffd54f 100%)',
                color: '#135c4a',
                fontWeight: 'bold',
                fontSize: '1.18rem',
                border: 'none',
                borderRadius: '8px 0 0 8px',
                padding: '14px 36px 14px 36px',
                cursor: 'pointer',
                boxShadow: '0 2px 12px #135c4a33',
                letterSpacing: '1px',
                transition: 'background 0.3s, color 0.3s',
                textDecoration: 'underline',
              }}
              onMouseOver={e => {e.target.style.background='#135c4a';e.target.style.color='#ffe082';}}
              onMouseOut={e => {e.target.style.background='linear-gradient(90deg, #ffe082 0%, #ffd54f 100%)';e.target.style.color='#135c4a';}}
              onClick={() => navigate('/guides-directory')}
            >
              Find Your Tour Guide
            </button>
            <div style={{background: '#ffe082', height: '100%', borderRadius: '0 8px 8px 0', padding: '0 22px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 12px #135c4a22'}}>
              <span style={{fontSize: 28, color: '#135c4a'}}>&rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// تعريف ستايلات JS للكروت (للتوافق)
const infoCardStyle = {};
const infoTitleStyle = {};
const infoValueStyle = {};

export default TourDetail; 