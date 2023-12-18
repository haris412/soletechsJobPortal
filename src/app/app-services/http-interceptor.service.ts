import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/services/shared.service';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private sharedService: SharedService) { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (
            !request.url.startsWith('http://localhost:7247/api/ERPAuthentication/AuthenticationByCompanyId') &&
            !request.url.startsWith('https://www.googleapis.com/') &&
            !request.url.startsWith('https://openidconnect.googleapis.com/')
        ) {
            let token = this.sharedService.GetToken();
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token ?? ""}`, //TODO: NEED TO EXCLUDE ALLOW ANONYMOUS ACTIONS TO EXCLUDE TOKEN. SHOULD BE REPLACED WHEN FULL AUTH IS IMPLMENETED.
                    'AccessToken': token ?? '',
                    'dataAreaId' : this.sharedService.dataAreaId,
                    'languageId' : this.sharedService.languageId
                },
            });
        }
        return next.handle(request);
    }
}