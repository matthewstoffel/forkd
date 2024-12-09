import { Restaurant } from '../models/restaurant.model';

export function selectRandomRestaurant(restaurants: Restaurant[]): Restaurant | null {
    if (!restaurants || restaurants.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    return restaurants[randomIndex];
}

export function getSpinnerSections(restaurants: Restaurant[]): SpinnerSection[] {
    const totalDegrees = 360;
    const sectionDegrees = totalDegrees / restaurants.length;
    
    return restaurants.map((restaurant, index) => ({
        restaurant,
        transform: {
            rotate: index * sectionDegrees,
            translate: { x: 0, y: 0 }
        }
    }));
}

export interface SpinnerSection {
    restaurant: Restaurant;
    transform: {
        rotate: number;
        translate: { x: number; y: number; }
    };
}