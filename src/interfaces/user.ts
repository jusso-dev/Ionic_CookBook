import { Subscription } from 'rxjs/Rx';

export interface User {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    photoUrl: string,
    isAuthenticated: Subscription
}