import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export enum ProjectNotificationAPIEndPoints {
  NOTIFICATION_LIST = '/notification/list',
  CREATE_NOTIFICATION = "/notification/create",
  MARK_AS_SINGLE_NOTIFICATION = "/notification/mart-read/",
  DELETE_SINGLE_NOTIFICATION = "/notification/delete/",
  MARK_AS_MULTIPLE_NOTIFICATION = "/notification/mart-read",
  DELETE_MULTIPLE_NOTIFICATION = "/notification/delete",
  NOTIFICATION_COUNT = '/notification/count'
}

@Injectable({
  providedIn: 'root'
})
export class ProjectNotificationService {
  baseUrl!: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.baseUrl = environment.baseUrl;
  }

  // GET project notification list
  getNotificationList(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + ProjectNotificationAPIEndPoints.NOTIFICATION_LIST);
  }

  getNotificationNotification(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + ProjectNotificationAPIEndPoints.NOTIFICATION_COUNT);
  }

  // create project notification
  createNotification(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + ProjectNotificationAPIEndPoints.CREATE_NOTIFICATION, payload);
  }

  // mark as single notification
  readSingleNotification(id: any): Observable<any> {
    const payload = {};
    return this.httpClient
      .patch<any>(this.baseUrl + ProjectNotificationAPIEndPoints.MARK_AS_SINGLE_NOTIFICATION + id, payload);
  }

  // delete single project notification
  deleteSingleNotification(id: string): Observable<any> {
    return this.httpClient
      .delete<any>(this.baseUrl + ProjectNotificationAPIEndPoints.DELETE_SINGLE_NOTIFICATION + id);
  }

  // mark as multiple notification
  readMultipleNotification(payload: any): Observable<any> {
    return this.httpClient
      .patch<any>(this.baseUrl + ProjectNotificationAPIEndPoints.MARK_AS_MULTIPLE_NOTIFICATION, payload);
  }

  // delete multiple project notification
  deleteMultipleNotification(): Observable<any> {
    return this.httpClient
      .delete<any>(this.baseUrl + ProjectNotificationAPIEndPoints.DELETE_MULTIPLE_NOTIFICATION);
  }
}
