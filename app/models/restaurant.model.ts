export interface Restaurant {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    category: string;
    rating: number;
    isFavorite: boolean;
    phoneNumber?: string;
}