import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
    private isLoggedIn = false;
    //private roles = ['role', 'admin']
    private isAdmin = false;
    constructor() {}

    setLoggedIn(_value) {
        this.isLoggedIn = _value;
    }

    setRole(_value) {
        this.isAdmin = _value;
    }

    isAuthenticated(): boolean {
        return this.isLoggedIn;
    }

    isAdminRole(): boolean {
        return this.isAdmin;
    }
}
