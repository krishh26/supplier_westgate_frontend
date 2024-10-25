import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

export enum MailScreenshotEndPoint {
  MAIL_SCREENSHOT_LIST = '/mail-screenshot/list',
  ADD_MAIL_SCREENSHOT = '/mail-screenshot/create',
  MAIL_SCREENSHOT_EDIT = '/mail-screenshot/update',
  DELETE_MAIL_SCREENSHOT = '/mail-screenshot/delete',
  // PROJECT_DETAILS = '/project/get/'
}
@Injectable({
  providedIn: 'root'
})
export class MailscreenshotService {

  baseUrl!: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.baseUrl = environment.baseUrl;
  }

  getMailSSList(payload: any): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + MailScreenshotEndPoint.MAIL_SCREENSHOT_LIST, payload);
  }

  deleteMailSS(payload: any): Observable<any> {
    return this.httpClient
      .delete<any>(this.baseUrl + MailScreenshotEndPoint.DELETE_MAIL_SCREENSHOT, payload);
  }

  editMailSS(payload: any): Observable<any> {
    return this.httpClient
      .patch<any>(this.baseUrl + MailScreenshotEndPoint.MAIL_SCREENSHOT_EDIT, payload);
  }

  addMailSS(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + MailScreenshotEndPoint.ADD_MAIL_SCREENSHOT, payload);
  }




}
