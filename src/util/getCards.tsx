import { OfferType } from '../types/offer';
import Card from '../components/card/card';

export const getCards = (offers: OfferType[]) => offers.map((offer) => <Card {...offer} key={offer.id} />);
