import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tours: [
    {
      id: 1,
      image: '../../assets/Images/Beach.jpg',
      badge: 'Top Rated',
      badgeClass: 'topRated',
      rating: '4.96',
      reviews: 672,
      title: 'California Sunset/Twilight Boat Cruise',
      slug: 'california',
      details: '2 days 3 nights',
      guests: '4-6 guest',
      price: 48.25,
      description: 'استمتع برحلة بحرية عند غروب الشمس في كاليفورنيا، حيث الأجواء الرومانسية والمناظر الطبيعية الخلابة. هذه الرحلة مثالية للعائلات والأصدقاء الباحثين عن لحظات لا تُنسى على متن القارب.'
    },
    {
      id: 2,
      image: '../../assets/Images/OG_Colosseum_Ancient-Rome_KIDS_1122_3x2.avif',
      badge: 'Best Sale',
      badgeClass: 'bestSale',
      rating: '4.96',
      reviews: 672,
      title: 'NYC: Food Tastings and Culture Tour',
      slug: 'nyc',
      details: '3 days 3 nights',
      guests: '4-6 guest',
      price: 17.32,
      description: 'جولة تذوق الطعام في نيويورك ستأخذك إلى قلب المدينة النابض بالحياة، حيث تتعرف على ثقافات متنوعة وتستمتع بأشهى الأطباق المحلية والعالمية.'
    },
    {
      id: 3,
      image: '../../assets/Images/Cairo_From_Tower_(cropped).jpg',
      badge: '25% Off',
      badgeClass: 'discount',
      rating: '4.96',
      reviews: 672,
      title: 'Grand Canyon Horseshoe Bend 2 days',
      slug: 'grand-canyon',
      details: '7 days 6 nights',
      guests: '4-6 guest',
      price: 15.63,
      description: 'مغامرة جراند كانيون تتيح لك استكشاف أعظم عجائب الطبيعة، مع مناظر بانورامية لا مثيل لها وتجربة لا تُنسى لمحبي المغامرات.'
    },
    {
      id: 4,
      image: '../../assets/Images/barcelona-city-overview.jpg',
      badge: 'Top Rated',
      badgeClass: 'topRated',
      rating: '4.85',
      reviews: 512,
      title: 'Barcelona City Tour',
      slug: 'barcelona',
      details: '4 days 3 nights',
      guests: '2-4 guest',
      price: 39.99,
      description: 'جولة في مدينة برشلونة تمنحك فرصة لاكتشاف سحر المدينة الأوروبية، من الشواطئ الذهبية إلى المعالم التاريخية والثقافية.'
    },
    {
      id: 5,
      image: '../../assets/Images/unnamed.jpg',
      badge: 'Best Sale',
      badgeClass: 'bestSale',
      rating: '4.90',
      reviews: 430,
      title: 'Russia Winter Adventure',
      slug: 'russia',
      details: '5 days 4 nights',
      guests: '3-5 guest',
      price: 29.50,
      description: 'مغامرة شتوية في روسيا بين الثلوج والمناظر الطبيعية الساحرة، مع أنشطة ترفيهية وتجارب ثقافية فريدة.'
    },
    {
      id: 6,
      image: '../../assets/Images/camp-sahara-desert-egypt-sunset-68103884-transformed.jpeg',
      badge: '15% Off',
      badgeClass: 'discount',
      rating: '4.80',
      reviews: 389,
      title: 'Sahara Desert Camp',
      slug: 'sahara',
      details: '6 days 5 nights',
      guests: '2-8 guest',
      price: 22.10,
      description: 'تجربة تخييم فريدة في صحراء السـحـراء مع غروب الشمس الساحر، أجواء بدوية أصيلة وليالٍ تحت النجوم.'
    },
  ],
  selectedTour: null,
  filters: {
    minPrice: 0,
    maxPrice: 100,
    rating: 0,
  },
  sortBy: 'price', // 'price', 'rating', 'reviews'
};

// 添加调试信息
console.log('Initial tours state:', initialState.tours);

const toursSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    setSelectedTour: (state, action) => {
      state.selectedTour = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSelectedTour, setFilters, setSortBy } = toursSlice.actions;

// Selectors
export const selectAllTours = (state) => state.tours.tours;
export const selectSelectedTour = (state) => state.tours.selectedTour;
export const selectFilters = (state) => state.tours.filters;
export const selectSortBy = (state) => state.tours.sortBy;

export default toursSlice.reducer; 