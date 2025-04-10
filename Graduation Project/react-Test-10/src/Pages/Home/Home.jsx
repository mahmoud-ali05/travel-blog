import React from 'react';
import Styles from './Home.module.css'
import videoBg from '../../assets/Videos/3657467-hd_1920_1080_30fps.mp4';
import img1 from '../../assets/Images/Beach.jpg';

const cards = Array(6).fill({ // Replace with actual data
  title: "Card title",
  text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  image: "/ASSETS/images/2.jpg"
});

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

      <section className={Styles.cards1}>
        {cards.map((card, index) => (
          <div key={index} className={`card ${Styles.oneCard}`}>
            <img src={img1} className={`card-img-top ${Styles.cardImage}`} alt="..." />
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.text}</p>
              <a href="#" className={`btn btn-primary ${Styles.button1}`}>Go somewhere</a>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Home;