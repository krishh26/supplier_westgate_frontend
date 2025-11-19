import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export enum ProjectEndPoint {
  PROJECT_LIST = '/project/list',
  ADD_PROJECT = '/project/create',
  PROJECT_EDIT = '/project/update',
  DELETE_PROJECT = '/project/delete',
  PROJECT_DETAILS = '/project/get/',
  APPLY_PROJECT = "/project/apply",
  SORT_LIST_PROJECT = "/project/sortlist",
  SUMMARYQUESTION_LIST = "/summary-question/list/",
  QUESTION_DETAILS = '/summary-question/list/',
  UPDATE_MANAGER = '/project/update/project-manager/',
  UPDATE_PROJECTMANAGER_SUPPLIER_STATUS = '/project/add-status',
  CONTACT_MAIL_SEND = '/project/mail-send',
  PROJECT_STRIP_LIST = '/project-detail-title/list',
  UPDATE_PROJECT_DETAIL_TITLE = '/project-detail-title/update/',
  RESPOND_MINIMAL_REQUIREMENT = '/project/minimal-requirement/respond',
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl!: string;
  projectid!: any

  constructor(
    private httpClient: HttpClient,
  ) {
    this.baseUrl = environment.baseUrl;
    this.projectid = localStorage.getItem('projectID')
  }

  getProjectList(params: {
    keyword: string, page: string,
    limit: string,
    applied: boolean,
    sortlist: boolean,
    match: string,
    status: string,
    category?: string,
    supplierId?: string,
    industry?: string,
    projectType?: string,
    clientType?: string,
    publishDateRange?: string,
    SubmissionDueDateRange?: string,
    valueRange?: any,
    selectedSupplier?: boolean // Add this line
    expired?: boolean,
    supplierStatus?: string,
    workInProgress?: string,
    bidManagerStatus?: string,
    queryRaised?: boolean

  }): Observable<any> {
    const url = `${this.baseUrl}${ProjectEndPoint.PROJECT_LIST}`;
    let queryParams = new HttpParams();
    queryParams = queryParams.set('keyword', params?.keyword || '');
    queryParams = queryParams.set('page', params?.page);
    queryParams = queryParams.set('limit', params?.limit);
    if (params?.applied) {
      queryParams = queryParams.set('applied', params?.applied);
    }
    if (params?.sortlist) {
      queryParams = queryParams.set('sortlist', params?.sortlist);
    }
    if (params?.match) {
      queryParams = queryParams.set('match', params?.match);
    }
    if (params?.status) {
      queryParams = queryParams.set('status', params?.status);
    }
    if (params?.bidManagerStatus) {
      queryParams = queryParams.set('bidManagerStatus', params?.bidManagerStatus);
    }
    if (params?.supplierStatus) {
      queryParams = queryParams.set('supplierStatus', params?.supplierStatus);
    }
    if (params?.category) {
      queryParams = queryParams.set('category', params?.category);
    }
    if (params?.supplierId) {
      queryParams = queryParams.set('supplierId', params?.supplierId);
    }
    if (params?.industry) {
      queryParams = queryParams.set('industry', params?.industry);
    }
    if (params?.projectType) {
      queryParams = queryParams.set('projectType', params?.projectType);
    }
    if (params?.clientType) {
      queryParams = queryParams.set('clientType', params?.clientType);
    }
    if (params?.workInProgress) {
      queryParams = queryParams.set('workInProgress', params?.workInProgress);
    }
    if (params?.publishDateRange) {
      queryParams = queryParams.set('publishDateRange', params?.publishDateRange);
    }
    if (params?.SubmissionDueDateRange) {
      queryParams = queryParams.set('SubmissionDueDateRange', params?.SubmissionDueDateRange);
    }
    if (params?.valueRange) {
      queryParams = queryParams.set('valueRange', params?.valueRange);
    }
    if (params?.selectedSupplier) { // Add this condition
      queryParams = queryParams.set('selectedSupplier', params?.selectedSupplier);
    }
    if (params?.expired !== undefined && params?.expired !== null) {
      queryParams = queryParams.set('expired', params?.expired);
    }
    if (params?.queryRaised !== undefined) {
      queryParams = queryParams.set('queryRaised', params?.queryRaised);
    }
    return this.httpClient.get<any>(url, { params: queryParams });
  }

  getprojectStrips(projectId: string): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + ProjectEndPoint.PROJECT_STRIP_LIST + '?projectId=' + projectId);
  }

  deleteProject(payload: any): Observable<any> {
    return this.httpClient
      .delete<any>(this.baseUrl + ProjectEndPoint.DELETE_PROJECT, payload);
  }

  editProject(projectId: string, payload: any): Observable<any> {
    return this.httpClient
      .patch<any>(this.baseUrl + ProjectEndPoint.PROJECT_EDIT + `/${projectId}`, payload);
  }

  addProject(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + ProjectEndPoint.ADD_PROJECT, payload);
  }

  contactMailSend(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + ProjectEndPoint.CONTACT_MAIL_SEND, payload);
  }

  getProjectDetails(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + ProjectEndPoint.PROJECT_DETAILS + this.projectid);
  }

  getSummaryQuestionList(projectId: string): Observable<any> {
    const params = new HttpParams().set('projectId', projectId);
    return this.httpClient.get<any>(this.baseUrl + ProjectEndPoint.SUMMARYQUESTION_LIST, { params });
  }

  // Darshan
  getProjectDetailsById(projectId: string): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + ProjectEndPoint.PROJECT_DETAILS + projectId);
  }

  getQuestionDetailsById(projectId: string): Observable<any> {
    const params = new HttpParams().set('projectId', projectId);
    return this.httpClient.get<any>(this.baseUrl + ProjectEndPoint.QUESTION_DETAILS, { params });
  }

  projectApply(payload: any): Observable<any> {
    return this.httpClient
      .patch<any>(this.baseUrl + ProjectEndPoint.APPLY_PROJECT, payload);
  }

  changeProjectSupplierStatus(payload: any): Observable<any> {
    return this.httpClient
      .patch<any>(this.baseUrl + ProjectEndPoint.UPDATE_PROJECTMANAGER_SUPPLIER_STATUS, payload);
  }

  projectSortList(payload: any): Observable<any> {
    return this.httpClient
      .patch<any>(this.baseUrl + ProjectEndPoint.SORT_LIST_PROJECT, payload);
  }

  addSupplier(supplierId: any, payload: any) {
    return this.httpClient
      .patch<any>(this.baseUrl + `${ProjectEndPoint.UPDATE_MANAGER}${supplierId}`, payload, {
      });
  }

  updateProjectDetailTitle(stripId: string, payload: any): Observable<any> {
    return this.httpClient
      .patch<any>(this.baseUrl + ProjectEndPoint.UPDATE_PROJECT_DETAIL_TITLE + stripId, payload);
  }

  respondToMinimalRequirement(projectId: string, payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + ProjectEndPoint.RESPOND_MINIMAL_REQUIREMENT.replace('/project/', `/project/${projectId}/`), payload);
  }
}
