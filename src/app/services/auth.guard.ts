import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

/**
 * Injectable: This decorator marks the class as one that participates in the dependency injection system.
 * providedIn: 'root': This configuration ensures that the AuthGuard service is available application - wide and
 * follows the singleton pattern, meaning there will be only one instance of this service throughout the application.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    /**
     * @param route An instance of ActivatedRouteSnapshot,
     * This contains the future route that will be activated if the guard allows it.
     * @param state An instance of RouterStateSnapshot,
     * This contains the future state of the router if the guard allows the route to be activated.
     * @returns true if the route can be activated, false if the route cannot be activated.
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.authService.hasValidToken();
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
