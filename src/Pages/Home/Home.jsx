import React from 'react';
import Styles from './Home.module.css'
import videoBg from '../../assets/Videos/World.mp4';
import img1 from '../../assets/Images/Beach.jpg';
import img2 from '../../assets/Images/OG_Colosseum_Ancient-Rome_KIDS_1122_3x2.avif'
import img3 from '../../assets/Images/Cairo_From_Tower_(cropped).jpg'
import img4 from '../../assets/Images/barcelona-city-overview.jpg'
import img5 from '../../assets/Images/unnamed.jpg'
import img6 from '../../assets/Images/Art+Deco+Statue+-+Christ+the+Redeemer,+Rio+de+Janeiro,+Brazil.jpg'
import img7 from '../../assets/Images/Header_Fujiyoshida.avif'
import img8 from '../../assets/Images/iStock-646880230.avif'
import img9 from '../../assets/Images/iStock-1322713774.avif'
import testimonial1 from '../../assets/Images/TESTIMONIAL1.jpg';
import testimonial2 from '../../assets/Images/TESTIMONIAL2.jpg';
import testimonial3 from '../../assets/Images/TESTIMONIAL3.jpg';
import { Link } from 'react-router-dom';
import Cairo from '../Countries/Cairo/Cairo'
import Rome from '../Countries/Roma/Roma'
import Paris from '../Countries/Paris/Paris'
import Moscow from '../Countries/Moscow/Moscow'
import Brazil from '../Countries/Brazil/Brazil'
import Tokyo from '../Countries/Tokyo'
import Sydney from '../Countries/Sydney'
import US from '../Countries/US'
import sunsetImg from '../../assets/Images/sunset.jpg';
import nycImg from '../../assets/Images/native-2-Edward_Moran_-_Henrik_Hudson_entering_New_York_Harbor.jpg';
import grandCanyonImg from '../../assets/Images/58-National-Parks-1600px.jpg';
import barcelonaImg from '../../assets/Images/Pariss1.avif';
import russiaImg from '../../assets/Images/Northern-Lights-Russia-Murmansk-tour-Aurora-Borealis.webp';
import saharaImg from '../../assets/Images/sahara.jpg';

const Home = () => {
  return (
    <>
      <section className="container-fluid">
        <div className="row">
          <div className="col-12 p-0">
            <div className="position-relative vh-100">
              <video
                autoPlay
                muted
                loop
                id="bg-video"
                className="position-absolute w-100 h-100"
                style={{ objectFit: 'cover' }}
              >
                <source src={videoBg} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="position-absolute top-50 start-50 translate-middle text-center text-white video">
                <h1 className={`display-1 ${Styles.HeroVideoH1}`}>To Where !</h1>
                <p className={`${Styles.HeroVideoP}`}>"A journey of a thousand miles begins with a single step ."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`container my-4 mt-5`}>
        <div className="text-center mb-5">
          <h2 className={`${Styles.sectionTitle} display-4 fw-bold`}>Top Destinations</h2>
          <div className={`${Styles.titleUnderline} mx-auto mt-3`}></div>
        </div>
        {/* <!-- ROW 1 --> */}
        <div className={`row g-2`}>
          {/* <!-- card 1 --> */}
          <div className={`col-md-3`}>
            <Link to="Rome" className="text-decoration-none">
              <div className="card text-white" 
                    style={{width: 'auto', height: '15rem'}}>
                <img
                  src={`${img2}`}
                  className={`card-img`}
                  style={{height: '100%' , objectFit: 'cover' }}
                  alt="Rome landscape"
                />
                <div
                  className={`card-img-overlay d-flex flex-column justify-content-end`}
                >
                  <h5 className={`${Styles.cardTitle}`}>Rome</h5>
                </div>
              </div>
            </Link>
          </div>

          {/* <!-- card 2 --> */}
          <div className={`col-md-6`}>
            <Link to="Cairo" className="text-decoration-none">
              <div className="card text-white" 
              style={{width: 'auto', height: '15rem'}}>
                <img
                  src={`${img3}`}
                  className={`card-img`}
                  style={{height: '100%' , objectFit: 'cover' }}
                  alt="Cairo landscape"
                />
                <div
                  className={`card-img-overlay d-flex flex-column justify-content-end`}
                >
                  <h5 className={`${Styles.cardTitle}`}>Cairo</h5>
                </div>
              </div>
            </Link>
          </div>

          {/* <!-- card 3 --> */}
          <div className={`col-md-3`}>
            <Link to="Paris" className="text-decoration-none">
              <div className="card text-white" 
              style={{width: 'auto', height: '15rem'}}>
                <img
                  src={`${img4}`}
                  className={`card-img`}
                  style={{height: '100%' , objectFit: 'cover' }}
                  alt="Barcelona landscape"
                />
                <div
                  className={`card-img-overlay d-flex flex-column justify-content-end`}
                >
                  <h5 className={`${Styles.cardTitle}`}>Paris</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* <!-- ROW 2 --> */}
        <div className={`row g-2 mt-3`}>
          {/* <!-- card 1 --> */}
          <div className={`col-md-6`}>
            <Link to="Moscow" className="text-decoration-none">
              <div className="card text-white" 
              style={{width: 'auto', height: '17rem'}}>
                <img
                  src={`${img5}`}
                  className={`card-img`}
                  style={{height: '100%' , objectFit: 'cover' }}
                  alt="Russia landscape"
                />
                <div
                  className={`card-img-overlay d-flex flex-column justify-content-end`}
                >
                  <h5 className={`${Styles.cardTitle}`}>Russia</h5>
                </div>
              </div>
            </Link>
          </div>

          {/* <!-- card 2 --> */}
          <div className={`col-md-6`}>
            <Link to="Brazil" className="text-decoration-none">
              <div className="card text-white" 
              style={{width: 'auto', height: '17rem'}}>
                <img
                  src={`${img6}`}
                  className={`card-img`}
                  style={{height: '100%' , objectFit: 'cover' }}
                  alt="Egypt landscape"
                />
                <div
                  className={`card-img-overlay d-flex flex-column justify-content-end`}
                >
                  <h5 className={`${Styles.cardTitle}`}>Brazil</h5>
                </div>
              </div>
            </Link>
          </div>

          {/* <!-- ROW 3 --> */}
          <div className={`row g-2`}>
            {/* <!-- card 1 --> */}
            <div className={`col-md-4`}>
              <Link to="Tokyo" className="text-decoration-none">
                <div className="card text-white" 
                  style={{width: '100%', height: '15rem'}}>
                  <img
                    src={`${img7}`}
                    className={`card-img`}
                    style={{height: '100%' , objectFit: 'cover' }}
                    alt="Sahara landscape"
                  />
                  <div
                    className={`card-img-overlay d-flex flex-column justify-content-end`}
                  >
                    <h5 className={`${Styles.cardTitle}`}>Tokyo</h5>
                  </div>
                </div>
              </Link>
            </div>

            {/* <!-- card 2 --> */}
            <div className={`col-md-4`}>
              <Link to="Sydney" className="text-decoration-none">
                <div className="card text-white" 
                style={{width: '100%', height: '15rem'}}>
                  <img
                    src={`${img8}`}
                    className={`card-img`}
                    style={{height: '100%' , objectFit: 'cover' }}
                    alt="Paris landscape"
                  />
                  <div
                    className={`card-img-overlay d-flex flex-column justify-content-end`}
                  >
                    <h5 className={`${Styles.cardTitle}`}>Sydney</h5>
                  </div>
                </div>
              </Link>
            </div>

            {/* <!-- card 3 --> */}
            <div className={`col-md-4`}>
              <Link to="US" className="text-decoration-none">
                <div className="card text-white" 
                style={{width: '100%', height: '15rem'}}>
                  <img
                    src={`${img9}`}
                    className={`card-img`}
                    style={{height: '100%' , objectFit: 'cover' }}
                    alt="Tokyo landscape"
                  />
                  <div
                    className={`card-img-overlay d-flex flex-column justify-content-end`}
                  >
                    <h5 className={`${Styles.cardTitle}`}>US</h5>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-center mb-5">
          <h2 className={`${Styles.sectionTitle} display-4 fw-bold`}>Top Rated Tours</h2>
          <div className={`${Styles.titleUnderline} mx-auto mt-3`}></div>
        </div>
        <div className={Styles.toursSection}>
        <div className={Styles.toursGrid}>
          {/* الكارت الأول */}
          <div className={Styles.tourCard}>
            <div className={Styles.tourImageWrapper}>
              <img src={sunsetImg} alt="California Sunset/Twilight Boat Cruise" className={Styles.tourImage} />
              <span className={`${Styles.tourBadge} ${Styles.topRated}`}>Top Rated</span>
              <div className={Styles.tourRating}><span>★ 4.96 <span className={Styles.tourReviews}>(672 reviews)</span></span></div>
            </div>
            <div className={Styles.tourInfo}>
              <h3 className={Styles.tourTitle}>California Sunset/Twilight Boat Cruise</h3>
              <div className={Styles.tourMeta}>
                <span>2 days 3 nights</span>
                <span>4-6 guest</span>
              </div>
              <div className={Styles.tourBottom}>
                <span className={Styles.tourPrice}>$48.25 <span className={Styles.tourPer}>/ person</span></span>
                <Link to="/Tours/1" className={Styles.bookBtn}>Book Now</Link>
              </div>
            </div>
          </div>
          {/* الكارت الثاني */}
          <div className={Styles.tourCard}>
            <div className={Styles.tourImageWrapper}>
              <img src={nycImg} alt="NYC: Food Tastings and Culture Tour" className={Styles.tourImage} />
              <span className={`${Styles.tourBadge} ${Styles.bestSale}`}>Best Sale</span>
              <div className={Styles.tourRating}><span>★ 4.96 <span className={Styles.tourReviews}>(672 reviews)</span></span></div>
            </div>
            <div className={Styles.tourInfo}>
              <h3 className={Styles.tourTitle}>NYC: Food Tastings and Culture Tour</h3>
              <div className={Styles.tourMeta}>
                <span>3 days 3 nights</span>
                <span>4-6 guest</span>
              </div>
              <div className={Styles.tourBottom}>
                <span className={Styles.tourPrice}>$17.32 <span className={Styles.tourPer}>/ person</span></span>
                <Link to="/Tours/nyc" className={Styles.bookBtn}>Book Now</Link>
              </div>
            </div>
          </div>
          {/* الكارت الثالث */}
          <div className={Styles.tourCard}>
            <div className={Styles.tourImageWrapper}>
              <img src={grandCanyonImg} alt="Grand Canyon Horseshoe Bend 2 days" className={Styles.tourImage} />
              <span className={`${Styles.tourBadge} ${Styles.discount}`}>25% Off</span>
              <div className={Styles.tourRating}><span>★ 4.96 <span className={Styles.tourReviews}>(672 reviews)</span></span></div>
            </div>
            <div className={Styles.tourInfo}>
              <h3 className={Styles.tourTitle}>Grand Canyon Horseshoe Bend 2 days</h3>
              <div className={Styles.tourMeta}>
                <span>7 days 6 nights</span>
                <span>4-6 guest</span>
              </div>
              <div className={Styles.tourBottom}>
                <span className={Styles.tourPrice}>$15.63 <span className={Styles.tourPer}>/ person</span></span>
                <Link to="/Tours/grand-canyon" className={Styles.bookBtn}>Book Now</Link>
              </div>
            </div>
          </div>
          {/* الكارت الرابع */}
          <div className={Styles.tourCard}>
            <div className={Styles.tourImageWrapper}>
              <img src={barcelonaImg} alt="Barcelona City Tour" className={Styles.tourImage} />
              <span className={`${Styles.tourBadge} ${Styles.topRated}`}>Top Rated</span>
              <div className={Styles.tourRating}><span>★ 4.85 <span className={Styles.tourReviews}>(512 reviews)</span></span></div>
            </div>
            <div className={Styles.tourInfo}>
              <h3 className={Styles.tourTitle}>Barcelona City Tour</h3>
              <div className={Styles.tourMeta}>
                <span>4 days 3 nights</span>
                <span>2-4 guest</span>
              </div>
              <div className={Styles.tourBottom}>
                <span className={Styles.tourPrice}>$39.99 <span className={Styles.tourPer}>/ person</span></span>
                <Link to="/Tours/barcelona" className={Styles.bookBtn}>Book Now</Link>
              </div>
            </div>
          </div>
          {/* الكارت الخامس */}
          <div className={Styles.tourCard}>
            <div className={Styles.tourImageWrapper}>
              <img src={russiaImg} alt="Russia Winter Adventure" className={Styles.tourImage} />
              <span className={`${Styles.tourBadge} ${Styles.bestSale}`}>Best Sale</span>
              <div className={Styles.tourRating}><span>★ 4.90 <span className={Styles.tourReviews}>(430 reviews)</span></span></div>
            </div>
            <div className={Styles.tourInfo}>
              <h3 className={Styles.tourTitle}>Russia Winter Adventure</h3>
              <div className={Styles.tourMeta}>
                <span>5 days 4 nights</span>
                <span>3-5 guest</span>
              </div>
              <div className={Styles.tourBottom}>
                <span className={Styles.tourPrice}>$29.50 <span className={Styles.tourPer}>/ person</span></span>
                <Link to="/Tours/russia" className={Styles.bookBtn}>Book Now</Link>
              </div>
            </div>
          </div>
          {/* الكارت السادس */}
          <div className={Styles.tourCard}>
            <div className={Styles.tourImageWrapper}>
              <img src={saharaImg} alt="Sahara Desert Camp" className={Styles.tourImage} />
              <span className={`${Styles.tourBadge} ${Styles.discount}`}>15% Off</span>
              <div className={Styles.tourRating}><span>★ 4.80 <span className={Styles.tourReviews}>(389 reviews)</span></span></div>
            </div>
            <div className={Styles.tourInfo}>
              <h3 className={Styles.tourTitle}>Sahara Desert Camp</h3>
              <div className={Styles.tourMeta}>
                <span>6 days 5 nights</span>
                <span>2-8 guest</span>
              </div>
              <div className={Styles.tourBottom}>
                <span className={Styles.tourPrice}>$22.10 <span className={Styles.tourPer}>/ person</span></span>
                <Link to="/Tours/sahara" className={Styles.bookBtn}>Book Now</Link>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className={`${Styles.testimonialSection} py-5`}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className={`${Styles.sectionTitle} display-4 fw-bold text-white`}>What Our Travelers Say</h2>
            <div className={`${Styles.titleUnderline} mx-auto mt-3`}></div>
            <p className="text-white-50 mt-3">Discover why travelers choose us for their adventures</p>
          </div>
          
          <div className="row justify-content-center g-4">
            <div className="col-md-4">
              <div className={`${Styles.testimonialCard} h-100`}>
                <div className="d-flex align-items-center mb-4">
                  <img src={testimonial1} alt="Sarah Johnson" className={`${Styles.userImg} me-3`} />
                  <div>
                    <h5 className="mb-0 text-white">Sarah Johnson</h5>
                    <p className="text-white-50 mb-0">Adventure Enthusiast</p>
                    <div className={`${Styles.starRating}`}>★★★★★</div>
                  </div>
                </div>
                <p className={`${Styles.para} mb-0`}>"An incredible experience! The tour guides were knowledgeable and the accommodations were perfect. Will definitely book again!"</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className={`${Styles.testimonialCard} h-100`}>
                <div className="d-flex align-items-center mb-4">
                  <img src={testimonial2} alt="Michael Chen" className={`${Styles.userImg} me-3`} />
                  <div>
                    <h5 className="mb-0 text-white">Michael Chen</h5>
                    <p className="text-white-50 mb-0">Travel Photographer</p>
                    <div className={`${Styles.starRating}`}>★★★★★</div>
                  </div>
                </div>
                <p className={`${Styles.para} mb-0`}>"The attention to detail and personalized service made our trip unforgettable. Highly recommend their tours!"</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className={`${Styles.testimonialCard} h-100`}>
                <div className="d-flex align-items-center mb-4">
                  <img src={testimonial3} alt="Emma Rodriguez" className={`${Styles.userImg} me-3`} />
                  <div>
                    <h5 className="mb-0 text-white">Emma Rodriguez</h5>
                    <p className="text-white-50 mb-0">Cultural Explorer</p>
                    <div className={`${Styles.starRating}`}>★★★★★</div>
                  </div>
                </div>
                <p className={`${Styles.para} mb-0`}>"From booking to the end of our journey, everything was seamless. The team went above and beyond our expectations."</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;