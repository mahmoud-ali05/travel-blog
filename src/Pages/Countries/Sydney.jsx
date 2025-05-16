import React, { useState, useRef, useEffect } from 'react';
import styles from './Countries.module.css';
import AustraliaVideo from '../../assets/Videos/Australia.webm';

// Import images for Places to Visit
import Melbourne  from '../../assets/Images/Melbourne_skyline_sor.jpg';
import Barrier  from '../../assets/Images/great-barrier-reef-coral-turtles-1.jpg';
import Tjuta  from '../../assets/Images/uluru-kata-tjuta-national-park-northern-territory-australia.webp';
import Tasmania  from '../../assets/Images/133522-2.webp';
import Whitsunday  from '../../assets/Images/Whitehaven-aerial-view_cs.jpg';
import Daintree from '../../assets/Images/daintree-landscape-aspect-ratio-1920-1300.jpeg';

// Import images for Things to Do
import Snorkel  from '../../assets/Images/2021_TNQ_CalyspoReefCruises_AgincourtReef_DivingSnorkelling_AndrewWatson_146895.jpg';
import Aboriginal  from '../../assets/Images/shutterstock2459058929.jpg';
import Iconic  from '../../assets/Images/130624174959-50-surf-spots-the-box.jpg';
import Ocean  from '../../assets/Images/great-ocean-road-_gor_r_140415570_1150x863.jpg';
import Uluru  from '../../assets/Images/uluru_at_sunset_framed_by_a_tree_silhouette.jpeg';
import Wildlife from '../../assets/Images/396d0e6602e46a47d837c9359481c217.jpeg';

const PlacesToVisit = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollStart, setScrollStart] = useState(0);
  
    const placesToVisit = [
      {
        image: Melbourne,
        title: "Melbourne (Victoria)"
      },
      {
        image: Barrier,
        title: "Great Barrier Reef"
      },
      {
        image: Tjuta,
        title: "Uluru-Kata Tjuta National Park"
      },
      {
        image: Tasmania,
        title: "Tasmania"
      },
      {
        image: Whitsunday,
        title: "Whitsunday Islands"
      },
      {
        image: Daintree,
        title: "Daintree Rainforest (Queensland)"
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
        image: Snorkel,
        title: "Snorkel or Dive in the Great Barrier Reef"
      },
      {
        image: Aboriginal,
        title: "Experience Aboriginal Culture"
      },
      {
        image: Iconic,
        title: "Surf at Iconic Beaches"
      },
      {
        image: Ocean,
        title: "Take a Road Trip on the Great Ocean Road"
      },
      {
        image: Uluru,
        title: "Explore the Outback and Uluru"
      },
      {
        image: Wildlife,
        title: "Visit Wildlife Parks and Meet Native Animals"
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

const Sydney = () => {
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
                  src={AustraliaVideo}
                  type="video/mp4"
                />
              </video>
              <div
                className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex flex-column justify-content-center align-items-center"
              >
                <h2 className="text-white display-1 fw-bold text-center">Sydney</h2>
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
                city where love dances along the Seine, where history whispers
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
            <h2>Explore Sydney</h2>
            <p>
            Australia is a land of stunning contrasts — from vibrant cities like Sydney and Melbourne to natural wonders like the Great Barrier Reef and Uluru. Whether you're looking to relax on pristine beaches, explore ancient rainforests, meet unique wildlife, or dive into rich Aboriginal culture, Australia offers adventure at every turn. It's a dream destination for nature lovers, thrill-seekers, and culture enthusiasts alike.

✨
            </p>
          </div>
          <div className="col-lg-6">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424146.70786458475!2d150.6023093212265!3d-33.847234815654595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743f%3A0x3017d681632a850!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2seg!4v1747176857637!5m2!1sen!2seg" width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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

export default Sydney;
