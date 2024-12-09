import { Observable, Frame } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';
import { validate } from 'email-validator';

export class LoginViewModel extends Observable {
    private authService: AuthService;
    
    private _email = '';
    private _password = '';
    private _emailError = '';
    private _passwordError = '';

    constructor() {
        super();
        this.authService = new AuthService();
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

    async onLogin() {
        // Reset errors
        this.emailError = '';
        this.passwordError = '';

        // Validate
        let isValid = true;

        if (!validate(this.email)) {
            this.emailError = 'Please enter a valid email';
            isValid = false;
        }

        if (!this.password) {
            this.passwordError = 'Password is required';
            isValid = false;
        }

        if (!isValid) return;

        try {
            const user = await this.authService.login(
                this.email,
                this.password
            );
            
            // Navigate to spinner page
            Frame.topmost().navigate({
                moduleName: 'components/spinner/spinner-page',
                clearHistory: true
            });
        } catch (error) {
            if (error.message === 'User not found') {
                this.emailError = 'No account found with this email';
            } else if (error.message === 'Invalid password') {
                this.passwordError = 'Incorrect password';
            } else {
                this.emailError = 'Login failed. Please try again.';
            }
        }
    }

    onRegisterTap() {
        Frame.topmost().navigate('components/auth/register-page');
    }
}