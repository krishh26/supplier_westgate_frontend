import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

export enum UKWriterEndPoint {
  DASHBOARD_DATA = '/project/ukwriter/dashboard',
  UKWRITER_UPDATE = '/summary-question/uk-writer/update/',
  SUPPLIER_LIST = '/project/ukwriter/selected-user/',
  SUPPLIER_LIST_BY_ID = '/project/ukwriter/supplier-user/'
}


@Injectable({
  providedIn: 'root'
})
export class UkWriterService {


  baseUrl!: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.baseUrl = environment.baseUrl;
  }

  getDashboardData(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + UKWriterEndPoint.DASHBOARD_DATA);
  }

  addUkData(payload: any) {
    return this.httpClient
      .post<any>(this.baseUrl + UKWriterEndPoint.UKWRITER_UPDATE, payload);
  }

  getSupplierList(userId: string): Observable<any> {
    return this.httpClient
      .get<any>(`${this.baseUrl}${UKWriterEndPoint.SUPPLIER_LIST}${userId}`);
  }
  // project/ukwriter/supplier-user/:projectId?supplierId=6623a984f86ed3af4b99295c
  getSupplierListById(projectId: string,supplierId:string): Observable<any> {
    return this.httpClient
      .get<any>(`${this.baseUrl}${UKWriterEndPoint.SUPPLIER_LIST_BY_ID}${projectId}?supplierId=${supplierId}`);
  }

}
