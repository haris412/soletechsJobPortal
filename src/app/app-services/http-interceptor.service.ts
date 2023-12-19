import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SharedService } from '../shared/services/shared.service';
import { RecruitmentService } from './jobs.service';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private sharedService: SharedService,
        private recruitmentService: RecruitmentService) { }
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
                },
            });
        }
        return next.handle(request).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                event = event.clone({body: this.modifyBody(event.body)});
            }
            return event;
        }));
    }
    async modifyBody(body: any) {
        if (body?.Message == "Authentication failed.") {
            let accessTokenResponse = await this.recruitmentService.AuthenticationByCompanyIdAsync('');
            if (accessTokenResponse) {
                this.sharedService.SetToken(accessTokenResponse.access_token);
            }
        } else if (body?.access_token != undefined) {
                this.sharedService.SetToken(body?.access_token);
        }
    }
}