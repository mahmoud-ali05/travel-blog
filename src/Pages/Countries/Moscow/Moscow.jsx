import React, { useState, useRef, useEffect } from 'react';
import styles from './Moscow.module.css';
import MoscowVideo from '../../../assets/Videos/Moscow.webm';

// Import images for Places to Visit
import Petersburg from '../../../assets/Images/1200x675_Z1KLv8g.webp';
import Baikal from '../../../assets/Images/iS_686448636.avif';
import Sochi from '../../../assets/Images/59f1c7e415e9f9181233f83c.jpg';
import Kazan from '../../../assets/Images/kazan.jpg';
import Altai from '../../../assets/Images/b150216004-banner-size.jpg';
import Golden from '../../../assets/Images/cathedral-of-assumption-yaroslavl-golden-ring-russia_1-1024x768.jpg';

// Import images for Things to Do
import Siberian from '../../../assets/Images/Ride the Trans-Siberian Railway.jpg';
import Museums from '../../../assets/Images/Explore Russian Palaces & Museums.jpg';
import Bolshoi from '../../../assets/Images/bolshoi_theatre.jpg';
import Volga  from '../../../assets/Images/Volga-Dream-Exterior-1687x1012.webp';
import Villages  from '../../../assets/Images/617c516a15e9f948d047470c.jpg';
import Murmansk from '../../../assets/Images/Northern-Lights-Russia-Murmansk-tour-Aurora-Borealis.webp';

const PlacesToVisit = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollStart, setScrollStart] = useState(0);
  
    const placesToVisit = [
      {
        image: Petersburg,
        title: "St. Petersburg"
      },
      {
        image: Baikal,
        title: "Lake Baikal"
      },
      {
        image: Sochi,
        title: "Sochi"
      },
      {
        image: Kazan,
        title: "Kazan"
      },
      {
        image: Altai,
        title: "Altai Mountains"
      },
      {
        image: Golden,
        title: "The Golden Ring"
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
        image: Siberian,
        title: "Ride the Trans-Siberian Railway"
      },
      {
        image: Museums,
        title: "Explore Russian Palaces & Museums"
      },
      {
        image: Bolshoi,
        title: "See a Ballet at the Bolshoi Theatre"
      },
      {
        image: Volga,
        title: "Cruise the Volga River"
      },
      {
        image: Villages,
        title: "Visit Traditional Russian Villages"
      },
      {
        image: Murmansk,
        title: "Chase the Northern Lights in Murmansk"
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

const Moscow = () => {
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
                  src={MoscowVideo}
                  type="video/mp4"
                />
              </video>
              <div
                className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex flex-column justify-content-center align-items-center"
              >
                <h2 className="text-white display-1 fw-bold text-center">Moscow</h2>
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
                Moscow enchants with Kremlin grandeur, Bolshoi brilliance, and vibrant energy
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
            <h2>Explore Moscow</h2>
            <p>
            Russia is a land of majestic landscapes, rich history, and breathtaking architecture. From the colorful domes of Moscow to the royal elegance of St. Petersburg and the natural wonder of Lake Baikal, Russia offers unforgettable experiences in every season. Whether you're drawn to snowy adventures, cultural treasures, or scenic train journeys, Russia promises a journey like no other. ✨
            </p>
          </div>
          <div className="col-lg-6">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d900987.3827434784!2d36.53083948602519!3d55.72728617933746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54afc73d4b0c9%3A0x3d44d6cc5757cf4c!2sMoscow%2C%20Russia!5e0!3m2!1sen!2seg!4v1747155142693!5m2!1sen!2seg" width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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

export default Moscow;
