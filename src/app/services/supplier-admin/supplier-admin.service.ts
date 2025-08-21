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
  DELETE_CASE_STUDY = '/case-study/delete/',
  SUPPLIER_DETAILS = '/user/suplier/get',
  DELETE_EXPERTISE_DOCUMENT = '/web-user/deleteFile',
  ADD_EXPERTISE_AND_SUBEXPERTISE = '/web-user/add-expertise',
  TAGS = '/tags',
  UPDATE_USER = '/user/update',
  DROPDOWN_LIST = '/web-user/drop-down-list',
  SUB_EXPERTISE_LIST = '/web-user/sub-expertise/list',
  TECHNOLOGIES = '/tech-language/technologies',
  REGISTER_SUPPLIER = '/web-user/register',
  UPDATE_SUPPLIER_PROFILE = '/user/update',
  ADD_CUSTOM_MASTERLIST = '/web-user/masterlist/custom'
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

  getSupplierDetails(supplierId: any): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + SupplierAdminEndPoint.SUPPLIER_DETAILS + '/' + supplierId);
  }

  addExpertiseandSubExpertise(candidateData: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.baseUrl}${SupplierAdminEndPoint.ADD_EXPERTISE_AND_SUBEXPERTISE}`,
      candidateData
    );
  }

  deleteDocumentExpertise(fileId: string): Observable<any> {
    const url = `${this.baseUrl}${SupplierAdminEndPoint.DELETE_EXPERTISE_DOCUMENT}`;
    const body = { fileId };

    return this.httpClient.request<any>('DELETE', url, { body });
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

  updateCaseStudy(payload: any, id: any) {
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

  getTags(search: string = ''): Observable<any> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    return this.httpClient.get<any>(`${this.baseUrl}/tags`, { params });
  }

  updateUserProfile(userId: string, payload: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.baseUrl}${SupplierAdminEndPoint.UPDATE_USER}/${userId}`, payload);
  }

  getDropdownList(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}${SupplierAdminEndPoint.DROPDOWN_LIST}`);
  }

  getSubExpertiseList(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}${SupplierAdminEndPoint.SUB_EXPERTISE_LIST}`);
  }

  submitProfileSetup(formData: any): Observable<any> {
    // Ensure all array fields contain name values except expertiseICanDo
    const processedData = {
      ...formData,
      // Convert any remaining ID-based arrays to name-based arrays, except expertiseICanDo
      technologyStack: Array.isArray(formData.technologyStack) ? formData.technologyStack.map((item: any) => typeof item === 'object' ? item.name : item) : formData.technologyStack,
      products: Array.isArray(formData.products) ? formData.products.map((item: any) => typeof item === 'object' ? item.name : item) : formData.products
    };

    return this.httpClient.post(`${this.baseUrl}${SupplierAdminEndPoint.REGISTER_SUPPLIER}`, processedData);
  }

  updateProfileSetup(supplierId: string, formData: any): Observable<any> {
    // Ensure all array fields contain name values except expertiseICanDo
    const processedData = {
      ...formData,
      // Convert any remaining ID-based arrays to name-based arrays, except expertiseICanDo
      technologyStack: Array.isArray(formData.technologyStack) ? formData.technologyStack.map((item: any) => typeof item === 'object' ? item.name : item) : formData.technologyStack,
      products: Array.isArray(formData.products) ? formData.products.map((item: any) => typeof item === 'object' ? item.name : item) : formData.products
    };

    return this.httpClient.patch(`${this.baseUrl}${SupplierAdminEndPoint.UPDATE_SUPPLIER_PROFILE}/${supplierId}`, processedData);
  }

  getTechnologies(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}${SupplierAdminEndPoint.TECHNOLOGIES}`);
  }

  addCustomMasterlist(name: string, type: string): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}${SupplierAdminEndPoint.ADD_CUSTOM_MASTERLIST}`, {
      name,
      type
    });
  }
}
