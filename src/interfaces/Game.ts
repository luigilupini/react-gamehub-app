import { Platform } from './Platform';

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  // /* cSpell:disable */
  metacritic: number;
  rating_top: number;
  // rating: number;
  slug: string;
  description_raw: string;
}