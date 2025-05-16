import React, { useState, useRef, useEffect } from 'react';
import styles from '../Countries.module.css';
import romeVideo from '../../../assets/Videos/Rome.webm';

// Import images for Places to Visit
import colosseum from '../../../assets/Images/Colosseum.jpg';
import cityView from '../../../assets/Images/Colosseum-Forum-Tour-View-from-top-tier-2000x1500.jpg'; // Placeholder
import piazza from '../../../assets/Images/Piazza_Navona.jpg';
import vatican from '../../../assets/Images/Vatican City & St. Peter Basilica.jpg';
import trevi from '../../../assets/Images/Trevi Fountain.jpg';
import pantheon from '../../../assets/Images/Pantheon.jpg';

// Import images for Things to Do
import pasta from '../../../assets/Images/Pasta.jpg';
import vespa from '../../../assets/Images/Scooteroma-Classic-Vespa-Tour.jpg';
import gelato from '../../../assets/Images/Italian Gelato.webp';
import trastevere from '../../../assets/Images/Trastevere.jpg';
import forum from '../../../assets/Images/Walk Through the Roman Forum.jpg';
import sunset from '../../../assets/Images/Venice-Sunset-Rialto-Bridge.jpg';

const PlacesToVisit = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const placesToVisit = [
    { image: colosseum, title: "Colosseum" },
    { image: vatican, title: "Vatican City & St. Peter's Basilica" },
    { image: trevi, title: "Trevi Fountain" },
    { image: pantheon, title: "Pantheon" },
    { image: piazza, title: "Piazza Navona" },
    { image: cityView, title: "Roman Forum" }
  ];

  const nextCard = () => {
    if (currentIndex < placesToVisit.length - 4) setCurrentIndex(prev => prev + 1);
  };
  const prevCard = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  useEffect(() => {
    if (carouselRef.current) {
      const scrollPosition = currentIndex * (carouselRef.current.offsetWidth / 4);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
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
  const handleMouseUp = () => setIsDragging(false);

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
              <div className={styles['card-overlay']}><p>{item.title}</p></div>
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
    { image: pasta, title: "Eat Authentic Roman Pasta" },
    { image: vespa, title: "Vespa Tour Around Rome" },
    { image: gelato, title: "Try Italian Gelato" },
    { image: trastevere, title: "Explore Trastevere" },
    { image: forum, title: "Walk Through the Roman Forum" },
    { image: sunset, title: "Watch Sunset from a Rooftop" }
  ];

  const nextCard = () => {
    if (currentIndex < thingsToDo.length - 4) setCurrentIndex(prev => prev + 1);
  };
  const prevCard = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  useEffect(() => {
    if (carouselRef.current) {
      const scrollPosition = currentIndex * (carouselRef.current.offsetWidth / 4);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
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
  const handleMouseUp = () => setIsDragging(false);

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
              <div className={styles['card-overlay']}><p>{item.title}</p></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Roma = () => (
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
              <source src={romeVideo} type="video/mp4" />
            </video>
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex flex-column justify-content-center align-items-center">
              <h2 className="text-white display-1 fw-bold text-center">Rome</h2>
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
                The Eternal City of History, Art, and Romance
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
            <h2>Explore Rome</h2>
            <p>
            Rome is a living museum, where every street and piazza tells a story of emperors, artists, and dreamers.
            From the grandeur of the Colosseum to the charm of Trastevere, the city is a feast for the senses.
            Savor authentic pasta, toss a coin in the Trevi Fountain, and let the magic of the Eternal City sweep you away. ✨
          </p>
          </div>
          <div className="col-lg-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190028.35442433384!2d12.371185002867197!3d41.91020879261674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f6196f9928ebb%3A0xb90f770693656e38!2sRome%2C%20Metropolitan%20City%20of%20Rome%20Capital%2C%20Italy!5e0!3m2!1sen!2seg!4v1747062095748!5m2!1sen!2seg"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
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

export default Roma;