import React, { useState, useRef, useEffect } from 'react';
import styles from './Cairo.module.css';
import cairoVideo from '../../../assets/Videos/Cairo.webm';

// Import images for Places to Visit
import pyramids from '../../../assets/Images/The Pyramids of Giza and Sphinx.jpg';
import sahara from '../../../assets/Images/The Pyramids of Giza and Sphinx111.jpg';
import cairoTower from '../../../assets/Images/Nubian Village.jpeg';
import khanElKhalili from '../../../assets/Images/Siwa Oasis123.jpeg';
import islamicCairo from '../../../assets/Images/alexandria.webp';
import nileCruise from '../../../assets/Images/Dahab99.webp';

// Import images for Things to Do
import camelRide from '../../../assets/Images/Nile Cruis 1.jpg';
import felucca from '../../../assets/Images/Snorkiling.webp';
import cookingClass from '../../../assets/Images/Desert Safari in the White Desert or Sinai.jpg';
import desertSafari from '../../../assets/Images/Hot Air Balloon Ride in Luxor.jpg';
import soundAndLight from '../../../assets/Images/Explore Egyptian Cuisine on a Food Tour.jpg';
import teaTime from '../../../assets/Images/Khan El Khalili.avif';

const PlacesToVisit = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollStart, setScrollStart] = useState(0);
  
    const placesToVisit = [
      {
        image: pyramids,
        title: "The Pyramids of Giza and Sphinx"
      },
      {
        image: sahara,
        title: "Luxor "
      },
      {
        image: cairoTower,
        title: "Aswan"
      },
      {
        image: khanElKhalili,
        title: "Siwa Oasis"
      },
      {
        image: islamicCairo,
        title: "Alexandria"
      },
      {
        image: nileCruise,
        title: "Dahab"
      }
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
          <div className={styles['section-bar']}></div>
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
        image: camelRide,
        title: "Take a Nile River Cruise"
      },
      {
        image: felucca,
        title: "Snorkeling or Diving in the Red Sea"
      },
      {
        image: cookingClass,
        title: "Desert Safari in the White Desert or Sinai"
      },
      {
        image: desertSafari,
        title: "Hot Air Balloon Ride in Luxor"
      },
      {
        image: soundAndLight,
        title: "Explore Egyptian Cuisine on a Food Tour"
      },
      {
        image: teaTime,
        title: "Visit Traditional Markets"
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
          <div className={styles['section-bar']}></div>
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

const Cairo = () => {
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
                <source src={cairoVideo} type="video/mp4" />
              </video>
              <div
                className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex flex-column justify-content-center align-items-center"
              >
                <h2 className="text-white display-1 fw-bold text-center">Cairo</h2>
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
                  Where Ancient Wonders Meet Modern Life
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    
       {/* about Cairo section */}
       <section className={`container-fluid mt-5 bg-light ${styles['about-paris-section']}`}>
        <div className="row">
          <div className="col-lg-6">
            <h2>Explore Cairo</h2>
            <p>
            A city where the ancient and modern worlds collide in perfect harmony.
              From the majestic pyramids that have stood for millennia to the bustling
              streets of downtown Cairo, every corner tells a story. The Nile flows
              through the heart of the city, bringing life and energy to this vibrant
              metropolis. Experience the warmth of Egyptian hospitality, the rich
              flavors of local cuisine, and the fascinating blend of history and
              contemporary culture that makes Cairo truly unique. ✨
            </p>
          </div>
          <div className="col-lg-6">
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.60389559899!2d31.1884235!3d30.0596183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145823dbc1f6d1dd%3A0x2c9a81d14b84fe0b!2sCairo%2C%20Cairo%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1746313414733!5m2!1sen!2seg"
              width="600"
              height="350"
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

export default Cairo;