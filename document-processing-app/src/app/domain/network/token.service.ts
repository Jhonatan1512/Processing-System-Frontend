import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TokenService{
    private readonly TOKEN_KEY = 'token';

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    decodeToke(token: string): any {
        if(!token) return null;
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
             
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('0' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error){
            return null;
        }
    }
}