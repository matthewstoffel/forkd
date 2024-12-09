export interface User {
    id: string;
    username: string;
    email: string;
    favoriteRestaurants: string[];
    groups: string[];
    isPremium: boolean;
}