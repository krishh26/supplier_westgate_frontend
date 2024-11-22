import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

export enum SupplierAdminEndPoint {
  DASHBOARD_LIST = '/project/dashboard',
  ADD_CASESTUDY = '/case-study/create',
  // PROJECT_DETAILS = '/project/get/',
  MANAGE_USER_LIST = '/user/suplier',
  ADD_USER = '/user/suplier/register',
  CASE_STUDY_LIST = '/case-study/list',
  ADD_CASE_STUDY = '/case-study/create',
  DELETE_USER = '/user/delete/',
  UPDATE_CASESTUDY = '/case-study/update/',
  DOCUMENT_UPLOAD = '/project/upload',
  DELETE_CASE_STUDY = '/case-study/delete/'
}

@Injectable({
  providedIn: 'root'
})
export class SupplierAdminService {

  baseUrl!: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.baseUrl = environment.baseUrl;
  }

  getDashboardList(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + SupplierAdminEndPoint.DASHBOARD_LIST);
  }

  getCaseStudyList(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + SupplierAdminEndPoint.CASE_STUDY_LIST);
  }

  getManageUserList(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + SupplierAdminEndPoint.MANAGE_USER_LIST);
  }

  addCaseStudy(payload: any) {
    return this.httpClient
      .post<any>(this.baseUrl + SupplierAdminEndPoint.ADD_CASESTUDY, payload);
  }

  updateCaseStudy(id: any, payload: any) {
    return this.httpClient
      .patch<any>(this.baseUrl + SupplierAdminEndPoint.UPDATE_CASESTUDY + id, payload);
  }


  addUser(payload: any) {
    return this.httpClient
      .post<any>(this.baseUrl + SupplierAdminEndPoint.ADD_USER, payload);
  }

  // deleteUser(params: { id: string }): Observable<any> {
  //   return this.httpClient
  //     .post<any>(this.baseUrl + SupplierAdminEndPoint.DELETE_USER, payload);
  // }

  deleteUser(params: { id: string }): Observable<any> {
    const url = `${this.baseUrl}${SupplierAdminEndPoint.DELETE_USER}`;

    let queryParams = new HttpParams();
    queryParams = queryParams.set('id', params.id || '');
    return this.httpClient.delete<any>(url, { params: queryParams });
  }

  deleteCaseStudies(id: string): Observable<any> {
    // const url = `${this.baseUrl}${SupplierAdminEndPoint.DELETE_CASE_STUDY}`;

    // let queryParams = new HttpParams();
    // queryParams = queryParams.set('id', params.id || '');
    // return this.httpClient.delete<any>(url, { params: queryParams });
    return this.httpClient
      .delete<any>(this.baseUrl + SupplierAdminEndPoint.DELETE_CASE_STUDY + id);
  }

  uploadDocument(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + SupplierAdminEndPoint.DOCUMENT_UPLOAD, payload);
  }
}
