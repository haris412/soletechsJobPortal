import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    token: string = '';
    constructor() { }

    GetToken() {
        return localStorage.getItem('token');
    }

    SetToken(token: string) {
        localStorage.setItem('token', token);
    }
}