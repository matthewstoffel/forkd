import { Observable } from '@nativescript/core';
import { Restaurant } from '../models/restaurant.model';

export class RestaurantService extends Observable {
    private favorites: Restaurant[] = [];

    getFavorites(): Restaurant[] {
        return this.favorites;
    }

    addFavorite(restaurant: Restaurant): boolean {
        if (this.favorites.length >= 5) {
            return false;
        }
        this.favorites.push(restaurant);
        this.notifyPropertyChange('favorites', this.favorites);
        return true;
    }

    removeFavorite(restaurantId: string): void {
        this.favorites = this.favorites.filter(r => r.id !== restaurantId);
        this.notifyPropertyChange('favorites', this.favorites);
    }

    async getNearbyRestaurants(latitude: number, longitude: number): Promise<Restaurant[]> {
        // TODO: Implement Google Maps API integration
        return [];
    }
}