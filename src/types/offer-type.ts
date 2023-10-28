import { City } from './city';
import { Host } from './host';
import { Location } from './location';
import { Comment } from './comment';

export type OfferType = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: Host;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
  comments: Comment[];
};
