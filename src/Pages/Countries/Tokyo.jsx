import React, { useState, useRef, useEffect } from 'react';
import styles from './Countries.module.css';
import TokyoVideo from '../../assets/Videos/Tokyo.webm';

// Import images for Places to Visit
import Kyoto  from '../../assets/Images/XYZeXYZe2158_1680b.jpg';
import Fuji  from '../../assets/Images/22fba69863f7d95408b199a4796db8e8-Fujinomiya 5th Station.avif';
import Nara  from '../../assets/Images/nara-city-day-trip_1.jpg';
import Osaka  from '../../assets/Images/osaka-dotonbori-iStock-1138049211-1024x683.jpg';
import Hiroshima  from '../../assets/Images/original.jpg';
import Hokkaido from '../../assets/Images/biei.jpg';

// Import images for Things to Do
import Tea  from '../../assets/Images/16326054_1780240605631657_734568532_o.jpg';
import Ryokan  from '../../assets/Images/japan-ryokan-aBv1DziNn4Y.jpg';
import Cuisine  from '../../assets/Images/Chef-Okuda-is-the-chef-owner-at-his-restaurant-Al-che-cciano-that-has-been-shining-the-spotlight-on-Shonai-ingredients.webp';
import Onsen  from '../../assets/Images/Australia1-1-scaled.jpg';
import Sumo  from '../../assets/Images/3-day-itinerary-Sumo-Show.jpg';
import Bustling from '../../assets/Images/16771994045e32706e1d79f.jpg';

const PlacesToVisit = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollStart, setScrollStart] = useState(0);
  
    const placesToVisit = [
      {
        image: Hiroshima,
        title: "Hiroshima"
      },
      {
        image: Fuji,
        title: "Mount Fuji"
      },
      {
        image: Hokkaido,
        title: "Hokkaido"
      },
      {
        image: Osaka,
        title: "Osaka"
      }, 
      {
        image: Nara,
        title: "Nara"
      },
      {
        image: Kyoto,
        title: "Kyoto"
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
        image: Tea,
        title: "Experience a Traditional Tea Ceremony"
      },
      {
        image: Ryokan,
        title: "Stay at a Ryokan (Traditional Inn)"
      },
      {
        image: Cuisine,
        title: "Explore Japanese Cuisine"
      },
      {
        image: Onsen,
        title: "Visit an Onsen (Hot Spring Bath)"
      },
      {
        image: Sumo,
        title: "Watch a Sumo Match or Traditional Performance"
      },
      {
        image: Bustling,
        title: "Shop in Bustling Districts"
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

const Tokyo = () => {
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
                  src={TokyoVideo}
                  type="video/mp4"
                />
              </video>
              <div
                className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex flex-column justify-content-center align-items-center"
              >
                <h2 className="text-white display-1 fw-bold text-center">Tokyo</h2>
                <p className="text-white text-center" style={{ 
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
            <h2>Explore Tokyo</h2>
            <p>
              Tokyo is a city of contrasts—where serene temples stand alongside neon-lit skyscrapers, and 
              centuries-old customs coexist with futuristic innovations. From the bustling streets of Shibuya 
              to the peaceful gardens of Shinjuku Gyoen, every district tells its own story. Experience the 
              world's most efficient public transport, indulge in Michelin-starred cuisine, and discover why 
              Tokyo is consistently ranked as one of the world's most livable cities. Whether you're exploring 
              the digital wonderland of Akihabara or finding tranquility in a traditional tea ceremony, Tokyo 
              offers an unforgettable journey through time and culture. ✨
            </p>
          </div>
          <div className="col-lg-6">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1662975.6916161894!2d138.45019769003667!3d35.50429312191173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x605d1b87f02e57e7%3A0x2e01618b22571b89!2sTokyo%2C%20Japan!5e0!3m2!1sen!2seg!4v1747168209716!5m2!1sen!2seg" 
              width="600" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
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

export default Tokyo;
