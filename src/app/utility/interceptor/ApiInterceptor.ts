import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { Router } from '@angular/router';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.localStorageService.getLoggerToken();
    const authReq = httpRequest.clone({ setHeaders: { authorization: `Bearer ${jwt}` } });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirect to login page
          this.localStorageService.clearStorage();
          this.router.navigate(['/login']);
        }
        // Pass the error to the caller of the interceptor
        return throwError(error);
      })
    );
  }
}
