import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export enum ProjectCoordinatorAPIEndPoint {
  DASHBOARD_LIST = '/project/project-coordinator/dashboard',
  DOCUMENT_UPLOAD = '/project/upload',
  UPDATE_PROJECT = "/project/update/"
}

@Injectable({
  providedIn: 'root'
})
export class ProjectCoordinatorService {
  baseUrl!: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.baseUrl = environment.baseUrl;
  }

  // Get project manager dashboard data
  getDashboardList(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + ProjectCoordinatorAPIEndPoint.DASHBOARD_LIST);
  }

  // Get project manager dashboard data
  uploadDocument(payload : any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + ProjectCoordinatorAPIEndPoint.DOCUMENT_UPLOAD, payload);
  }

  // Get project manager dashboard data
  updateProject(payload : any, projectId : string): Observable<any> {
    return this.httpClient
      .patch<any>(this.baseUrl + ProjectCoordinatorAPIEndPoint.UPDATE_PROJECT + projectId, payload);
  }
}
