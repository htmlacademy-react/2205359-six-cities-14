import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../const';
import PrivateRoute from './private-route/private-route';
import {HelmetProvider} from 'react-helmet-async';
import MainPage from '../pages/main/main';
import Login from '../pages/login/login';
import Favorites from '../pages/favorites/favorites';
import Offer from '../pages/offer/offer';
import NotFound from '../pages/not-found/not-found';
import { CardOffer } from '../mocks/cardOffer';
import { CITIES } from '../const';
import ScrollToTop from './scroll-top/scroll-top';

export default function App(): JSX.Element {
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
                <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
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
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </HelmetProvider>
  );
}
