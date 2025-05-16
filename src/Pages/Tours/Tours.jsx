import React from 'react';
import Styles from './Tours.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllTours, setSelectedTour } from '../../store/toursSlice';
// 导入所有需要的图片
import californiaImg from '../../assets/Images/sunset.jpg';
import nycImg from '../../assets/Images/native-2-Edward_Moran_-_Henrik_Hudson_entering_New_York_Harbor.jpg';
import grandCanyonImg from '../../assets/Images/58-National-Parks-1600px.jpg';
import barcelonaImg from '../../assets/Images/Pariss1.avif';
import russiaImg from '../../assets/Images/Northern-Lights-Russia-Murmansk-tour-Aurora-Borealis.webp';
import saharaImg from '../../assets/Images/sahara.jpg';

const Tours = () => {
  const tours = useSelector(selectAllTours);
  const dispatch = useDispatch();

  console.log('Tours data:', tours);

  const handleTourSelect = (tour) => {
    dispatch(setSelectedTour(tour));
  };

  const getTourImage = (tourId) => {
    switch (tourId) {
      case 1:
        return californiaImg; // 加州日落游船
      case 2:
        return nycImg; // 纽约美食文化之旅
      case 3:
        return grandCanyonImg; // 大峡谷马蹄湾
      case 4:
        return barcelonaImg; // 巴塞罗那城市之旅
      case 5:
        return russiaImg; // 俄罗斯冬季冒险
      case 6:
        return saharaImg; // 撒哈拉沙漠露营
      default:
        return californiaImg;
    }
  };

  if (!tours || tours.length === 0) {
    return <div>Loading tours...</div>;
  }

  return (
    <div className={Styles.toursSection}>
      <div className={Styles.toursGrid}>
        {tours.map((tour) => (
          <div className={Styles.tourCard} key={tour.id}>
            <div className={Styles.tourImageWrapper}>
              <img src={getTourImage(tour.id)} alt={tour.title} className={Styles.tourImage} />
              <span className={`${Styles.tourBadge} ${Styles[tour.badgeClass]}`}>{tour.badge}</span>
              <div className={Styles.tourRating}>
                <span>★ {tour.rating} <span className={Styles.tourReviews}>({tour.reviews} reviews)</span></span>
              </div>
            </div>
            <div className={Styles.tourInfo}>
              <h3 className={Styles.tourTitle}>{tour.title}</h3>
              <div className={Styles.tourMeta}>
                <span>{tour.details}</span>
                <span>{tour.guests}</span>
              </div>
              <div className={Styles.tourBottom}>
                <span className={Styles.tourPrice}>${tour.price} <span className={Styles.tourPer}>/ person</span></span>
                <Link 
                  to={`/Tours/${tour.slug}`} 
                  className={Styles.bookBtn}
                >
                  Book Now
                </Link>
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