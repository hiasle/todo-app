import { catchError, tap } from 'rxjs/operators';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

import { EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LoggingHttpInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('DEBUG: ', request);
    return next.handle(request);
  }
}
