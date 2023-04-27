import { RATING_STEP } from '../data-store/data-const';

export const sortByMax = (a: number, b: number) => a > b ? 1 : -1;

export const sortByMin = (a: number, b: number) => a < b ? 1 : -1;

export const getRandomArbitrary = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);

export const roundUp = (rating: number) => Math.round(rating) * RATING_STEP;
