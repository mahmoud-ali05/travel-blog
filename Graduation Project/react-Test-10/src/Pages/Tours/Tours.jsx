import React from 'react';
import Styles from './Tours.module.css'

// Array of tour data
const tours = [
  {
    image: 'paris.jpg', // Placeholder; replace with actual image paths or URLs
    price: '$500',
    title: 'PARIS, FRANCE',
    details: '5 Days, Breakfast and Guided Tours'
  },
  {
    image: 'rome.jpg',
    price: '$300',
    title: 'ROME, ITALY',
    details: '3 Days, Breakfast and Guided Tours'
  },
  {
    image: 'london.jpg',
    price: '$700',
    title: 'LONDON, UK',
    details: '7 Days, Breakfast and Guided Tours'
  }
];

const Tours = () => {
    return (
        <div className={`container-fluid ${Styles.high} high mt-5`}>
          {/* Header */}
         
    
          {/* Tour Columns - Fixed className syntax */}
          <div className={`row mt-4 ${Styles.tourcards}`}>
            {tours.map((tour, index) => (
          <div className="col-md-4" key={index}>
            <div className="card">
              {/* Image and Price Badge */}
              <div className="position-relative">
                <img
                  src={tour.image}
                  className="card-img-top"
                  alt={tour.title}
                />
                <div
                  className="position-absolute top-0 start-0 text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#ff6200'
                  }}
                >
                  {tour.price}
                </div>
              </div>

              {/* Tour Details */}
              <div className="card-body">
                <h5 className="card-title">{tour.title}</h5>
                <p className="card-text">{tour.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tours;

// export default Tours