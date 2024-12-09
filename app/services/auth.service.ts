import { SecureStorage } from '@nativescript/secure-storage';
import { User } from '../models/user.model';
import { Observable } from '@nativescript/core';

export class AuthService extends Observable {
    private secureStorage: SecureStorage;
    private currentUser: User | null = null;

    constructor() {
        super();
        this.secureStorage = new SecureStorage();
    }

    async register(username: string, email: string, password: string): Promise<User> {
        // In a real app, this would make an API call
        const user: User = {
            id: Date.now().toString(),
            username,
            email,
            favoriteRestaurants: [],
            groups: [],
            isPremium: false
        };

        await this.secureStorage.set({
            key: `user_${user.id}`,
            value: JSON.stringify(user)
        });

        await this.secureStorage.set({
            key: `credentials_${email}`,
            value: JSON.stringify({ password, userId: user.id })
        });

        this.currentUser = user;
        this.notifyPropertyChange('currentUser', user);
        return user;
    }

    async login(email: string, password: string): Promise<User> {
        const credentials = await this.secureStorage.get({
            key: `credentials_${email}`
        });

        if (!credentials) {
            throw new Error('User not found');
        }

        const { password: storedPassword, userId } = JSON.parse(credentials);
        
        if (password !== storedPassword) {
            throw new Error('Invalid password');
        }

        const userData = await this.secureStorage.get({
            key: `user_${userId}`
        });

        if (!userData) {
            throw new Error('User data not found');
        }

        this.currentUser = JSON.parse(userData);
        this.notifyPropertyChange('currentUser', this.currentUser);
        return this.currentUser;
    }

    async logout(): Promise<void> {
        this.currentUser = null;
        this.notifyPropertyChange('currentUser', null);
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }
}