import { Observable, View } from '@nativescript/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';

export class SpinnerViewModel extends Observable {
    private restaurantService: RestaurantService;
    private _spinnerMessage: string;
    private _currentRestaurant: string;
    private restaurants: Restaurant[] = [];
    private isSpinning = false;
    private spinInterval: any;
    private tumblerWindow: View;

    constructor() {
        super();
        this.restaurantService = new RestaurantService();
        this._spinnerMessage = "Choose your spinning mode!";
        this._currentRestaurant = "Tap SPIN!";
        this.loadMockRestaurants();
        this.onIndividualMode(); // Initialize with individual mode
    }

    get spinnerMessage(): string {
        return this._spinnerMessage;
    }

    set spinnerMessage(value: string) {
        if (this._spinnerMessage !== value) {
            this._spinnerMessage = value;
            this.notifyPropertyChange('spinnerMessage', value);
        }
    }

    get currentRestaurant(): string {
        return this._currentRestaurant;
    }

    set currentRestaurant(value: string) {
        if (this._currentRestaurant !== value) {
            this._currentRestaurant = value;
            this.notifyPropertyChange('currentRestaurant', value);
        }
    }

    async onSpinTap(args) {
        if (this.isSpinning) return;
        
        this.isSpinning = true;
        this.spinnerMessage = "Spinning...";
        
        // Get reference to tumbler window
        if (!this.tumblerWindow) {
            const page = args.object.page;
            this.tumblerWindow = page.getViewById('tumblerWindow');
        }

        const duration = 3000;
        const steps = 30;
        const interval = duration / steps;
        let counter = 0;
        
        if (this.spinInterval) {
            clearInterval(this.spinInterval);
        }

        this.spinInterval = setInterval(() => {
            counter++;
            const randomIndex = Math.floor(Math.random() * this.restaurants.length);
            this.currentRestaurant = this.restaurants[randomIndex].name;

            if (counter >= steps) {
                clearInterval(this.spinInterval);
                const finalRestaurant = this.restaurants[Math.floor(Math.random() * this.restaurants.length)];
                this.currentRestaurant = finalRestaurant.name;
                this.spinnerMessage = `Selected: ${finalRestaurant.name}!`;
                this.isSpinning = false;
            }

            // Animate the tumbler window
            if (this.tumblerWindow) {
                const progress = counter / steps;
                const amplitude = 20 * (1 - progress); // Decreasing amplitude
                this.tumblerWindow.translateY = Math.sin(progress * Math.PI * 6) * amplitude;
            }
        }, interval);
    }

    onIndividualMode() {
        this.restaurants = this.restaurantService.getFavorites();
        if (this.restaurants.length === 0) {
            this.spinnerMessage = "Add some favorite restaurants first!";
            this.currentRestaurant = "No restaurants";
            return;
        }
        this.spinnerMessage = "Tap SPIN to choose a restaurant!";
        this.currentRestaurant = "Tap SPIN!";
    }

    onGroupMode() {
        this.spinnerMessage = "Group mode coming soon!";
    }

    private loadMockRestaurants() {
        const mockRestaurants: Restaurant[] = [
            {
                id: '1',
                name: "Pizza Place",
                address: "123 Main St",
                latitude: 0,
                longitude: 0,
                category: "Italian",
                rating: 4.5,
                isFavorite: true
            },
            {
                id: '2',
                name: "Burger Joint",
                address: "456 Oak Ave",
                latitude: 0,
                longitude: 0,
                category: "American",
                rating: 4.2,
                isFavorite: true
            },
            {
                id: '3',
                name: "Sushi Bar",
                address: "789 Pine St",
                latitude: 0,
                longitude: 0,
                category: "Japanese",
                rating: 4.8,
                isFavorite: true
            }
        ];

        mockRestaurants.forEach(restaurant => {
            this.restaurantService.addFavorite(restaurant);
        });
    }
}