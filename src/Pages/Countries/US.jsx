import React, { useState, useRef, useEffect } from 'react';
import styles from './Countries.module.css';
import USVideo from '../../assets/Videos/Los Angeles Drone Video 4K.mp4';

// Import images for Places to Visit
import York    from '../../assets/Images/GettyImages-946087016.webp';
import Orlando    from '../../assets/Images/Orlando-Florida-aerial-cityscape-towards-Eola-Lake.webp';
import Vegas   from '../../assets/Images/captionnnn.jpg';
import Washington    from '../../assets/Images/US-Capitol-place-meeting-Congress-Washington-DC.webp';
import Grand   from '../../assets/Images/shutterstock_97706066_1.avif';
import Francisco from '../../assets/Images/LittleAmerica-San-Francisco-Golden-Gate-Bridge.jpg';

// Import images for Things to Do
import National   from '../../assets/Images/58-National-Parks-1600px.jpg';
import World   from '../../assets/Images/hero_US_cities.jpg';
import Experience   from '../../assets/Images/american-road-trip.jpg';
import Entertainment   from '../../assets/Images/ey-fun-roller-coaster.jpg';
import Discover   from '../../assets/Images/native-2-Edward_Moran_-_Henrik_Hudson_entering_New_York_Harbor.jpg';
import Across from '../../assets/Images/CACZTENEXPERIENCE-2.jpg';

const PlacesToVisit = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollStart, setScrollStart] = useState(0);
  
    const placesToVisit = [
      {
        image: York,
        title: "New York City"
      },
      {
        image: Francisco,
        title: "San Francisco"
      },
      {
        image: Vegas,
        title: "Las Vegas"
      },
      {
        image: Washington,
        title: "Washington"
      }, 
      {
        image: Grand,
        title: "Grand Canyon"
      },
      {
        image: Orlando,
        title: "Orlando"
      },
    ];
  
    const nextCard = () => {
      if (currentIndex < placesToVisit.length - 4) {
        setCurrentIndex(prev => prev + 1);
      }
    };
  
    const prevCard = () => {
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };
  
    useEffect(() => {
      if (carouselRef.current) {
        const scrollPosition = currentIndex * (carouselRef.current.offsetWidth / 4);
        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth"
        });
      }
    }, [currentIndex]);
  
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX);
      setScrollStart(carouselRef.current.scrollLeft);
    };
  
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const x = e.pageX - startX;
      carouselRef.current.scrollLeft = scrollStart - x;
    };
  
    const handleMouseUp = () => {
      setIsDragging(false);
    };
  
    return (
      <section className={styles['home-container2']}>
        <div className={styles['trip-inspiration']}>
          <h2>Places to visit</h2>
        </div>
  
        <button className={styles['prev-places']} onClick={prevCard}>&#8249;</button>
        <button className={styles['next-places']} onClick={nextCard}>&#8250;</button>
  
        <div 
          className={`${styles['carousel-container']} ${styles['places-carousel']}`}
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className={styles['card-carousel']}>
            {placesToVisit.map((item, index) => (
              <a href="#" className={styles.card} key={index}>
                <img src={item.image} alt={item.title} />
                <div className={styles['card-overlay']}>
                  <p>{item.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  };
const ThingsToDo = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollStart, setScrollStart] = useState(0);
  
    const thingsToDo = [
      {
        image: National,
        title: "Explore National Parks"
      },
      {
        image: World,
        title: "Visit World-Class Cities"
      },
      {
        image: Experience,
        title: "Experience American Road Trips"
      },
      {
        image: Entertainment,
        title: "Enjoy Theme Parks and Entertainment"
      },
      {
        image: Discover,
        title: "Discover American History"
      },
      {
        image: Across,
        title: "Taste Diverse Cuisine Across Regions"
      }
    ];
  
    const nextCard = () => {
      if (currentIndex < thingsToDo.length - 4) {
        setCurrentIndex(prev => prev + 1);
      }
    };
  
    const prevCard = () => {
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };
  
    useEffect(() => {
      if (carouselRef.current) {
        const scrollPosition = currentIndex * (carouselRef.current.offsetWidth / 4);
        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth"
        });
      }
    }, [currentIndex]);
  
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX);
      setScrollStart(carouselRef.current.scrollLeft);
    };
  
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const x = e.pageX - startX;
      carouselRef.current.scrollLeft = scrollStart - x;
    };
  
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    return (
      <section className={styles['home-container2']}>
        <div className={styles['trip-inspiration']}>
          <h2>Things to do</h2>
        </div>

        <button className={styles['prev-things']} onClick={prevCard}>&#8249;</button>
        <button className={styles['next-things']} onClick={nextCard}>&#8250;</button>

        <div 
          className={`${styles['carousel-container']} ${styles['things-carousel']}`}
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className={styles['card-carousel']}>
            {thingsToDo.map((item, index) => (
              <a href="#" className={styles.card} key={index}>
                <img src={item.image} alt={item.title} />
                <div className={styles['card-overlay']}>
                  <p>{item.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
};

const US = () => {
  return (
    <>
      {/* Video section */}
      <section className="position-relative vh-100 overflow-hidden">
        <div className="container-fluid h-100 position-relative p-0">
          <div className="row h-100 m-0">
            <div className="col-12 p-0 h-100 position-relative">
              <video
                className="position-absolute top-50 start-50 translate-middle w-100 h-100 object-fit-cover"
                autoPlay
                muted
                loop
                id="bg-video"
              >
                <source
                  src={USVideo}
                  type="video/mp4"
                />
              </video>
              <div
                className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex flex-column justify-content-center align-items-center"
              >
                <h2 className="text-white display-1 fw-bold text-center">California</h2>
                <p  className="text-white text-center" style={{ 
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.8rem",
                    fontWeight: "300",
                    letterSpacing: "1px",
                    lineHeight: "1.6",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    fontStyle: "italic",
                    background: "linear-gradient(45deg, #ffffff, #e6e6e6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}>
                  The City of Love, Light, and Endless Dreams
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* about paris section */}
      <section className={`container-fluid mt-5 bg-light ${styles['about-paris-section']}`}>
        <div className="row">
          <div className="col-lg-6">
            <h2>Explore California</h2>
            <p>
            From iconic cities and world-famous landmarks to breathtaking national parks and thrilling adventures, the USA has something for every traveler. Explore the bright lights of New York, the glamor of Hollywood, or the natural beauty of the Grand Canyon and Yellowstone. Discover rich history in Washington, D.C., relax on Florida’s beaches, or road trip along the legendary Route 66.
            Come explore the land of dreams. ✨
            </p>
          </div>
          <div className="col-lg-6">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6511976.996234766!2d-124.59912455778917!3d37.16039652410438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2seg!4v1747179864290!5m2!1sen!2seg" width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>

      {/* things to do section */}
      <ThingsToDo />
      {/* places to visit section */}
      <PlacesToVisit />
    </>
  );
};

export default US;
