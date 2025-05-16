import React, { useState, useRef, useEffect } from 'react';
import styles from './Paris.module.css';
import parisVideo from '../../../assets/Videos/Paris_ The last drone aerials.mp4';

// Import images for Places to Visit
import eiffelTower from '../../../assets/Images/Eiffel Tower at Golden Hour.jpg';
import louvre from '../../../assets/Images/Louvre & Artistic Treasures.jpg';
import seineRiver from '../../../assets/Images/Seine River Cruise.webp';
import montmartre from '../../../assets/Images/Montmartre & Sacré-Cœur.jpg';
import champsElysees from '../../../assets/Images/Champs-Élysées & Arc de Triomphe.jpg';
import parisianCafes from '../../../assets/Images/Indulge in Parisian Cafés & Patisseries.jpg';

// Import images for Things to Do
import picnic from '../../../assets/Images/picnic-at-the-Eiffel-tower.webp';
import moulinRouge from '../../../assets/Images/moulin-rouge.jpg';
import cookingClass from '../../../assets/Images/Take a French Cooking Class.jpg';
import cycling from '../../../assets/Images/Cycle Through the Countryside or Vineyards.webp';
import trainRide from '../../../assets/Images/Take a Scenic Train Ride.avif';
import cafeMorning from '../../../assets/Images/Experience a French Café Morning.webp';

const PlacesToVisit = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollStart, setScrollStart] = useState(0);
  
    const placesToVisit = [
      {
        image: eiffelTower,
        title: "Eiffel Tower at Golden Hour"
      },
      {
        image: louvre,
        title: "Louvre & Artistic Treasures"
      },
      {
        image: seineRiver,
        title: "Seine River Cruise"
      },
      {
        image: montmartre,
        title: "Montmartre & Sacré-Cœur"
      },
      {
        image: champsElysees,
        title: "Champs-Élysées & Arc de Triomphe"
      },
      {
        image: parisianCafes,
        title: "Indulge in Parisian Cafés & Patisseries"
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
        image: picnic,
        title: "Have a Picnic at a Parisian Park"
      },
      {
        image: moulinRouge,
        title: "Watch a Cabaret Show at Moulin Rouge or Crazy Horse"
      },
      {
        image: cookingClass,
        title: "Take a French Cooking Class"
      },
      {
        image: cycling,
        title: "Cycle Through the Countryside or Vineyards"
      },
      {
        image: trainRide,
        title: "Take a Scenic Train Ride"
      },
      {
        image: cafeMorning,
        title: "Experience a French Café Morning"
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

const Paris = () => {
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
                  src={parisVideo}
                  type="video/mp4"
                />
              </video>
              <div
                className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex flex-column justify-content-center align-items-center"
              >
                <h2 className="text-white display-1 fw-bold text-center">Paris</h2>
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
            <h2>Explore Paris</h2>
            <p>
              A city where love dances along the Seine, where history whispers
              through cobblestone streets, and every corner glows with artistry.
              Paris is more than a place—it's a feeling. From the golden embrace
              of sunset at the Eiffel Tower to the quiet magic of Montmartre's
              alleys, it's a symphony of elegance, romance, and joie de vivre.
              Welcome to the city of light, where dreams wear berets and every
              moment is a work of art. ✨
            </p>
          </div>
          <div className="col-lg-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.778160305!2d2.2646326294935837!3d48.858938485521726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2seg!4v1746313414733!5m2!1sen!2seg"
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

export default Paris;
