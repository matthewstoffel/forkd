import { Observable } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';
import { validate } from 'email-validator';
import { Frame } from '@nativescript/core';

export class RegisterViewModel extends Observable {
    private authService: AuthService;
    
    private _username = '';
    private _email = '';
    private _password = '';
    private _usernameError = '';
    private _emailError = '';
    private _passwordError = '';

    constructor() {
        super();
        this.authService = new AuthService();
    }

    get username(): string { return this._username; }
    set username(value: string) {
        if (this._username !== value) {
            this._username = value;
            this.notifyPropertyChange('username', value);
        }
    }

    get email(): string { return this._email; }
    set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange('email', value);
        }
    }

    get password(): string { return this._password; }
    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange('password', value);
        }
    }

    get usernameError(): string { return this._usernameError; }
    set usernameError(value: string) {
        if (this._usernameError !== value) {
            this._usernameError = value;
            this.notifyPropertyChange('usernameError', value);
        }
    }

    get emailError(): string { return this._emailError; }
    set emailError(value: string) {
        if (this._emailError !== value) {
            this._emailError = value;
            this.notifyPropertyChange('emailError', value);
        }
    }

    get passwordError(): string { return this._passwordError; }
    set passwordError(value: string) {
        if (this._passwordError !== value) {
            this._passwordError = value;
            this.notifyPropertyChange('passwordError', value);
        }
    }

    async onRegister() {
        // Reset errors
        this.usernameError = '';
        this.emailError = '';
        this.passwordError = '';

        // Validate
        let isValid = true;

        if (!this.username || this.username.length < 3) {
            this.usernameError = 'Username must be at least 3 characters';
            isValid = false;
        }

        if (!validate(this.email)) {
            this.emailError = 'Please enter a valid email';
            isValid = false;
        }

        if (!this.password || this.password.length < 6) {
            this.passwordError = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (!isValid) return;

        try {
            const user = await this.authService.register(
                this.username,
                this.email,
                this.password
            );
            
            // Navigate to preferences page
            Frame.topmost().navigate({
                moduleName: 'components/preferences/preferences-page',
                clearHistory: true
            });
        } catch (error) {
            this.emailError = 'Registration failed. Please try again.';
        }
    }

    onLoginTap() {
        Frame.topmost().navigate('components/auth/login-page');
    }
}