import CityCards from '../../components/cities-cards/cities-cards';
import { OfferType } from '../../types/offer-type';
import Logo from '../../components/logo/logo';
import CityFilters from '../../components/city-filters/city-filters';
import MainNavigation from '../../components/main-navigation/main-navigation';
import { useNavigate } from 'react-router-dom';
import { useAppSelector} from '../../hooks/redux-hooks';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_CITY } from '../../const';

export default function MainPage (): JSX.Element {
  const navigate = useNavigate();
  const currentCity = useAppSelector((store) => store.city);
  const currentSortOption = useAppSelector((store) => store.sortingOption);
  const currentCityOffers : OfferType[] = useAppSelector((store) => store.offers.filter((offer) => offer.city.name === currentCity));
  const location = useLocation().pathname.slice(1);

  useEffect(()=> {
    if (!location) {
      navigate(`${DEFAULT_CITY}`);
    }
  }, [location, navigate]);

  const sortingVariants : {[key:string]: OfferType[]} = {
    'Popular': currentCityOffers,
    'Price: low to high': [...currentCityOffers].sort((a, b) => a.price - b.price),
    'Price: high to low': [...currentCityOffers].sort((a, b) => b.price - a.price),
    'Top rated first': [...currentCityOffers].sort((a, b) => b.rating - a.rating),
  };
  const sortedOffers = sortingVariants[currentSortOption];

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <MainNavigation />
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityFilters />
          </section>
        </div>
        <div className="cities">
          <CityCards offers={sortedOffers} activeCity={currentCity}/>
        </div>
      </main>
    </div>
  );
}
