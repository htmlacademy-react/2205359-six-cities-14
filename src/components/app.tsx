import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../const';
import PrivateRoute from './private-route/private-route';
import {HelmetProvider} from 'react-helmet-async';
import { useAppSelector } from '../hooks/redux-hooks';
import MainPage from '../pages/main/main';
import Login from '../pages/login/login';
import Favorites from '../pages/favorites/favorites';
import Offer from '../pages/offer/offer';
import NotFound from '../pages/not-found/not-found';
import { CardOffer } from '../mocks/cardOffer';
import { CITIES } from '../const';
import ScrollToTop from './scroll-top/scroll-top';
import Spinner from './spinner/spinner';

export default function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOfferDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <Spinner />
    );
  }
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path={AppRoute.Main} element={<MainPage />} >
              {CITIES.map((city : string) => (
                <Route
                  key={city}
                  path={city}
                  element={<MainPage />}
                >
                </Route>
              ))}
            </Route>
            <Route
              path={AppRoute.Login}
              element={<Login />}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <Favorites offers={CardOffer} />
                </PrivateRoute>
              }
            />
            <Route path={AppRoute.Offer}>
              <Route path={':id'} element={<Offer offers={CardOffer}/>}/>
            </Route>
            <Route
              path={AppRoute.Error}
              element={<NotFound />}
            />
            <Route path='spinner' element={<Spinner />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </HelmetProvider>
  );
}
