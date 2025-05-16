import React, { useState, useRef, useEffect } from 'react';
import styles from './Brazil.module.css';
import BrazilVideo from '../../../assets/Videos/Brazil.mp4';

// Import images for Places to Visit
import Rio  from '../../../assets/Images/170776a5-bcde-4296-944c-1ccffa8e9bd2.jpg';
import São  from '../../../assets/Images/São Paulo.jpg';
import Salvador  from '../../../assets/Images/iStock-1322713774.avif';
import Fernando  from '../../../assets/Images/About-Fernando-de-Noronha-Diving-Guide-4.jpg';
import Pantanal  from '../../../assets/Images/79387433.jpg';
import Manaus from '../../../assets/Images/museu-do-teatro-amazonas.jpg';

// Import images for Things to Do
import Carnival  from '../../../assets/Images/RioCarnival_parades_party_brazil.jpg';
import Amazon       from '../../../assets/Images/Travelling-by-boat-into-the-depth-of-Amazon-Jungles-in-Cuyabeno-National-Park-Ecuador-691421549621844.jpg';
import Christ    from '../../../assets/Images/Crowd-of-people-below-the-christ-the-Redeemer-in-Rio.jpg.webp';
import Iguazu  from '../../../assets/Images/2210580_large_ac1afd80.jpg';
import Copacabana  from '../../../assets/Images/20140329_111232-2.jpg';
import Chapada from '../../../assets/Images/Chapada-Diamantina-Excursions-1000x600.webp';

const PlacesToVisit = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollStart, setScrollStart] = useState(0);
  
    const placesToVisit = [
      {
        image: São,
        title: "São Paulo"
      },
      {
        image: Salvador ,
        title: "Salvador (Bahia)"
      },
      {
        image: Fernando ,
        title: "Fernando de Noronha"
      },
      {
        image: Pantanal ,
        title: "Pantanal "
      },
      {
        image: Manaus,
        title: "Manaus (Amazonas)"
      },
      {
        image: Rio ,
        title: "Bonito"
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
        image: Carnival ,
        title: "Experience Rio’s Carnival"
      },
      {
        image: Amazon,
        title: "Explore the Amazon Rainforest"
      },
      {
        image: Christ,
        title: "Visit Christ the Redeemer"
      },
      {
        image: Iguazu,
        title: "Witness Iguazu Falls"
      },
      {
        image: Copacabana,
        title: "Relax on Copacabana & Ipanema Beaches"
      },
      {
        image: Chapada,
        title: "Hike in Chapada Diamantina"
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

const Brazil = () => {
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
                  src={BrazilVideo}
                  type="video/mp4"
                />
              </video>
              <div
                className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex flex-column justify-content-center align-items-center"
              >
                <h2 className="text-white display-1 fw-bold text-center">Rio de Janeiro</h2>
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
                  The Marvelous City of Sun, Sea, and Samba
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* about brazil section */}
      <section className={`container-fluid mt-5 bg-light ${styles['about-paris-section']}`}>
        <div className="row">
          <div className="col-lg-6">
            <h2>Explore Brazil</h2>
            <p>
              From the Amazon's wild heart to Rio's electric pulse, Brazil thrills with emerald jungles, golden beaches, and Carnival magic—where every moment bursts with life and color. Let Brazil's rhythm move you—dive into natural wonders, dance under tropical skies, and discover why this is Earth's most joyful adventure! ✨
            </p>
          </div>
          <div className="col-lg-6">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470400.7387162241!2d-43.77565748091152!3d-22.91315797656393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bde559108a05b%3A0x50dc426c672fd24e!2sRio%20de%20Janeiro%2C%20State%20of%20Rio%20de%20Janeiro%2C%20Brazil!5e0!3m2!1sen!2seg!4v1747162734059!5m2!1sen!2seg" 
              width="600" 
              height="450" 
              style={{border: 0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
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

export default Brazil;
