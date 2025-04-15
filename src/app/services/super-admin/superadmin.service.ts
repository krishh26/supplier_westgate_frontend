import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

export enum SuperAdminEndPoint {
  DASHBOARD_LIST = '/user/admin/dashboard',
  SUPER_Statistics = '/user/admin/suppleir-statictics',
  CATEGORY_LIST = '/category/list',
  INDUSTRY_LIST = '/industry/list',
  SUPPLIER_LIST = '/user/suplier/list',
  SUPPLIER_REGISTER = '/web-user/register',
  SUPPLIERUSER_LIST = '/user/suplier/list',
  PROJECT_MAIL_SEND = '/project/new-project-mail',
  CREATE_TASK = '/task/create',
  GET_TASK = '/task/list',
  ADD_COMMENTS = '/task/add-comment/',
  UPDATE_TASK = '/task/update',
  UPDATE_COMMENT = '/task/update-comment',
  APPOINT_FEASIBLITY_USER = '/project/update/appoint-user',
  APPOINT_BID_USER = '/project/update/appoint-bidmanager',
  APPROVE_OR_REJECT = '/project/update/approve-reject',
  APPROVE_OR_REJECT_SUPERADMIN = '/project/update/approve-reject-admin',
  ADD_IMAGE_PROJECT_DETAILS = '/project-detail-title/update/',
  GET_GAP_ANALYSIS = '/project/gap-analysis',
  GET_GAP_ANALYSIS_DROPPERD_AFTER_FEASIBILITY = '/project/gap-analysis-dafstatus-reason',
  GET_GAP_ANALYSIS_NO_SUPPLIER_MATCHED = '/project/gap-analysis-nosuppliermatched-reason',
  EXPORT_EXCEL = '/project/export-csv',
  EXPORT_DATABASE = '/database/export',
  UPLOAD_BY_TAGS = '/web-user/uploadByTag',
  DELETE_EXPERTISE_DOCUMENT = '/web-user/deleteFile',
  EXPERTISE_LIST = '/web-user/expertise-list',
  GET_SUPPLIER_EXPERTISE = '/web-user/get-suppliers',
  USER_UPDATE = '/user/update',
  CANDIDATE_ADD = '/candidate/add',
  CANDIDATE_GET = '/candidate/get',
  CANDIDATE_GET_LIST = '/candidate/get-list',
  CANDIDATE_SUPPLIER_WISE = '/candidate/get/',
  CANDIDATE_LIST = '/candidate/list',
  ADD_EXPERTISE_AND_SUBEXPERTISE = '/web-user/add-expertise',
  ROLES_LIST = '/roles/get-list',
  ROLES_ADD = '/roles/add',
  ROLES_DELETE = '/roles/delete',
  ROLES_CANDIDATES = '/roles/candidates',
  DELETE_CANDIDATE = '/candidate/delete',
  CANDIDATE_UPDATE = '/candidate/update',
  GET_SUBTASKS = '/task/subtasks',
  SELECT_FROM_SORTLIST = '/project/select-from-sortlist',
  REMOVE_FROM_SHORTLIST = '/project/remove-from-sortlist'
}

@Injectable({
  providedIn: 'root',
})
export class SuperadminService {
  baseUrl!: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.baseUrl = environment.baseUrl;
  }

  exportProjects() {
    window.open(this.baseUrl + SuperAdminEndPoint.EXPORT_EXCEL, "_blank");
  }

  deepCopy<T>(object: T): T {
    return JSON.parse(JSON.stringify(object));
  }

  exportDatabase() {
    window.open(this.baseUrl + SuperAdminEndPoint.EXPORT_DATABASE, "_blank");
  }

  getDashboardList(params: any): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + SuperAdminEndPoint.DASHBOARD_LIST,
      { params }
    );
  }

  getSupplierListsExpertiseWise(params: any): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + SuperAdminEndPoint.GET_SUPPLIER_EXPERTISE,
      { params }
    );
  }


  getGapAnalysis(params: HttpParams): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + SuperAdminEndPoint.GET_GAP_ANALYSIS,
      { params }
    );
  }


  getGapAnalysisNosupplierMatched(params: any): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + SuperAdminEndPoint.GET_GAP_ANALYSIS_NO_SUPPLIER_MATCHED,
      { params }
    );
  }

  getGapAnalysisDroppedafterFeasibility(params: any): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + SuperAdminEndPoint.GET_GAP_ANALYSIS_DROPPERD_AFTER_FEASIBILITY,
      { params }
    );
  }

  getsuperstatictics(): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + SuperAdminEndPoint.SUPER_Statistics
    );
  }

  projectMailSend(): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + SuperAdminEndPoint.PROJECT_MAIL_SEND,
      {}
    );
  }

  getIndustryList(): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + SuperAdminEndPoint.INDUSTRY_LIST
    );
  }

  getCategoryList(): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + SuperAdminEndPoint.CATEGORY_LIST
    );
  }

  getSupplierList(): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + SuperAdminEndPoint.SUPPLIER_LIST
    );
  }

  supplierregister(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + SuperAdminEndPoint.SUPPLIER_REGISTER,
      payload
    );
  }

  getSUpplierList(params: any): Observable<any> {
    const url = `${this.baseUrl}${SuperAdminEndPoint.SUPPLIERUSER_LIST}`;
    let queryParams = new HttpParams();

    if (params?.page) {
      queryParams = queryParams.set('page', params.page);
    }
    if (params?.limit) {
      queryParams = queryParams.set('limit', params.limit);
    }
    if (params?.startDate) {
      queryParams = queryParams.set('startDate', params.startDate);
    }
    if (params?.endDate) {
      queryParams = queryParams.set('endDate', params.endDate);
    }
    if (params?.search) {
      queryParams = queryParams.set('search', params.search);
    }

    return this.httpClient.get<any>(url, { params: queryParams });
  }

  createTask(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + SuperAdminEndPoint.CREATE_TASK,
      payload
    );
  }

  uploadByTag(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + SuperAdminEndPoint.UPLOAD_BY_TAGS,
      payload
    );
  }

  getExpertiseList(params: any = {}): Observable<any> {
    const url = `${this.baseUrl}${SuperAdminEndPoint.EXPERTISE_LIST}`;
    let queryParams = new HttpParams();

    // if (params?.page) {
    //   queryParams = queryParams.set('page', params.page);
    // }
    // if (params?.limit) {
    //   queryParams = queryParams.set('limit', params.limit);
    // }
    if (params?.search) {
      queryParams = queryParams.set('search', params.search);
    }
    if (params?.startDate) {
      queryParams = queryParams.set('startDate', params.startDate);
    }
    if (params?.endDate) {
      queryParams = queryParams.set('endDate', params.endDate);
    }

    return this.httpClient.get<any>(url, { params: queryParams });
  }

  deleteDocumentExpertise(fileId: string): Observable<any> {
    const url = `${this.baseUrl}${SuperAdminEndPoint.DELETE_EXPERTISE_DOCUMENT}`;
    const body = { fileId };

    return this.httpClient.request<any>('DELETE', url, { body });
  }


  updateTask(payload: any, id: string): Observable<any> {
    return this.httpClient.patch<any>(
      this.baseUrl + SuperAdminEndPoint.UPDATE_TASK + '/' + id,
      payload
    );
  }

  updateComment(payload: any, taskId?: string, userId?: string): Observable<any> {
    if (taskId) {
      return this.httpClient.patch<any>(
        this.baseUrl + SuperAdminEndPoint.UPDATE_COMMENT + '/' + taskId,
        payload
      );
    }
    return this.httpClient.put<any>(
      this.baseUrl + '/tasks/comments/' + payload.commentId,
      payload
    );
  }

  getTask(assignId: string): Observable<any> {
    let params = new HttpParams();
    if (assignId) {
      params = params.set('assignTo', assignId);
    }
    return this.httpClient.get<any>(
      this.baseUrl + SuperAdminEndPoint.GET_TASK,
      { params }
    );
  }

  getsuperadmintasks(assignId: string, status?: string, sort?: string, pickACategory?: string, keyword?: string, myDay?: boolean, type?: string, page?: number, pageSize?: number): Observable<any> {
    let params = new HttpParams();

    if (page && pageSize) {
      params = params.set('page', Number(page));
      params = params.set('limit', Number(pageSize));
    }

    if (assignId) {
      params = params.set('assignTo', assignId);
    }
    if (status) {
      params = params.set('status', status);
    }
    if (sort) { // Add sorting parameter
      params = params.set('sort', sort);
    }
    if (pickACategory) {
      params = params.set('pickACategory', pickACategory);
    }
    if (keyword) {
      params = params.set('keyword', keyword);
    }
    if (myDay) {
      params = params.set('myDay', myDay.toString());
    }
    if (type) {
      params = params.set('type', type.toString());
    }
    return this.httpClient.get<any>(
      this.baseUrl + SuperAdminEndPoint.GET_TASK,
      { params }
    );
  }


  getMyTask(assignId: string, myDay: boolean, sort?: string, pickACategory?: string, keyword?: string, page?: number, limit?: number): Observable<any> {
    let params = new HttpParams();

    if (page && limit) {
      params = params.set('page', Number(page));
      params = params.set('limit', Number(limit));
    }

    if (assignId) {
      params = params.set('assignTo', assignId);
    }
    if (myDay) {
      params = params.set('myDay', myDay.toString());
    }
    if (sort) { // Add sorting parameter
      params = params.set('sort', sort);
    }
    if (pickACategory) {
      params = params.set('pickACategory', pickACategory);
    }
    if (keyword) {
      params = params.set('keyword', keyword);
    }
    return this.httpClient.get<any>(
      this.baseUrl + SuperAdminEndPoint.GET_TASK,
      { params }
    );
  }

  getTaskUserwise(queryParams: { [key: string]: any }, page?: number, pageSize?: number): Observable<any> {
    let params = new HttpParams();

    if (page && pageSize) {
      params = params.set('page', Number(page));
      params = params.set('limit', Number(pageSize));
    }

    Object.entries(queryParams).forEach(([key, value]) => {
      params = params.set(key, value.toString());
    });
    return this.httpClient.get<any>(
      this.baseUrl + SuperAdminEndPoint.GET_TASK,
      { params }
    );
  }

  addComments(payload: any, id: string): Observable<any> {
    return this.httpClient.patch<any>(
      this.baseUrl + SuperAdminEndPoint.ADD_COMMENTS + id,
      payload
    );
  }

  appointFeasibilityUser(payload: any, id: string): Observable<any> {
    return this.httpClient.patch<any>(
      this.baseUrl + SuperAdminEndPoint.APPOINT_FEASIBLITY_USER + '/' + id,
      payload
    );
  }

  appointBidUser(payload: any, id: string): Observable<any> {
    return this.httpClient.patch<any>(
      this.baseUrl + SuperAdminEndPoint.APPOINT_BID_USER + '/' + id,
      payload
    );
  }

  approveOrRejectProject(payload: any, id: string): Observable<any> {
    return this.httpClient.patch<any>(
      this.baseUrl + SuperAdminEndPoint.APPROVE_OR_REJECT + '/' + id,
      payload
    );
  }

  approveOrRejectProjectsuperAdmin(payload: any, id: string): Observable<any> {
    return this.httpClient.patch<any>(
      this.baseUrl + SuperAdminEndPoint.APPROVE_OR_REJECT_SUPERADMIN + '/' + id,
      payload
    );
  }

  updateProjectDetails(payload: any, id: string): Observable<any> {
    return this.httpClient.patch<any>(
      this.baseUrl + SuperAdminEndPoint.ADD_IMAGE_PROJECT_DETAILS + id,
      payload
    );
  }

  updateSupplierExpertise(supplierId: string, expertiseData: any): Observable<any> {
    const headers = { 'supplierId': supplierId };

    return this.httpClient.patch<any>(
      `${this.baseUrl}${SuperAdminEndPoint.USER_UPDATE}/${supplierId}`,
      expertiseData,
      { headers }
    );
  }

  addCandidate(candidateData: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.baseUrl}${SuperAdminEndPoint.CANDIDATE_ADD}`,
      candidateData
    );
  }

  addExpertiseandSubExpertise(candidateData: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.baseUrl}${SuperAdminEndPoint.ADD_EXPERTISE_AND_SUBEXPERTISE}`,
      candidateData
    );
  }


  getCandidatesBySupplier(supplierId: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.baseUrl}${SuperAdminEndPoint.CANDIDATE_GET}/${supplierId}`
    );
  }

  getCandidatesList(page: number, limit: number, search?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.httpClient.get<any>(
      `${this.baseUrl}${SuperAdminEndPoint.CANDIDATE_GET_LIST}`,
      { params }
    );
  }

  getCandidatesByListId(listId: string, queryParams: any): Observable<any> {
    let params = new HttpParams()
      .set('page', queryParams.page.toString())
      .set('limit', queryParams.pagesize.toString());

    // Add role filter if provided
    if (queryParams.role) {
      params = params.set('role', queryParams.role);
    }

    return this.httpClient.get<any>(
      `${this.baseUrl}${SuperAdminEndPoint.CANDIDATE_LIST}/${listId}`,
      { params }
    );
  }

  getRolesList(params: any = {}): Observable<any> {
    let queryParams = new HttpParams();

    if (params.startDate) {
      queryParams = queryParams.set('startDate', params.startDate);
    }
    if (params.endDate) {
      queryParams = queryParams.set('endDate', params.endDate);
    }
    if (params.search) {
      queryParams = queryParams.set('search', params.search);
    }

    return this.httpClient.get<any>(
      this.baseUrl + SuperAdminEndPoint.ROLES_LIST,
      { params: queryParams }
    );
  }

  addRole(roleData: { name: string }): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + SuperAdminEndPoint.ROLES_ADD,
      roleData
    );
  }

  deleteRole(roleId: string): Observable<any> {
    return this.httpClient.delete<any>(
      this.baseUrl + SuperAdminEndPoint.ROLES_DELETE + '/' + roleId
    );
  }

  deleteDocumentResource(fileId: string) {
    return this.httpClient.delete(`${this.baseUrl}/delete-document-resource/${fileId}`);
  }

  getCandidatesByRole(roleId: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.baseUrl}${SuperAdminEndPoint.ROLES_CANDIDATES}/${roleId}`
    );
  }

  getRoleById(roleId: string) {
    return this.httpClient.get(`${this.baseUrl}/roles/${roleId}`);
  }

  updateRole(roleId: string, data: any) {
    return this.httpClient.patch(`${this.baseUrl}/roles/update/${roleId}`, data);
  }

  deleteCandidate(candidateId: string): Observable<any> {
    return this.httpClient.delete<any>(
      this.baseUrl + SuperAdminEndPoint.DELETE_CANDIDATE + '/' + candidateId
    );
  }

  updateCandidate(candidateId: string, payload: any): Observable<any> {
    return this.httpClient.patch(`${this.baseUrl}/candidate/update/${candidateId}`, payload);
  }

  updateCommentPin(taskId: string, commentId: string, payload: any) {
    return this.httpClient.patch(`${this.baseUrl}/task/${taskId}/comments/${commentId}/pin`, payload);
  }

  // Toggle pin status of a comment
  togglePinComment(payload: any, taskId: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/tasks/${taskId}/comments/toggle-pin`, payload);
  }

  // Delete a comment
  deleteComment(commentId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/tasks/comments/${commentId}`);
  }

  addSubtask(taskId: string, subtaskData: any) {
    return this.httpClient.post(`${this.baseUrl}/task/${taskId}/subtasks/add`, subtaskData);
  }

  getCandidateList() {
    return this.httpClient.get(`${this.baseUrl}/candidate/get-list`);
  }

  getSubtasks(taskId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}${SuperAdminEndPoint.GET_SUBTASKS}/${taskId}`);
  }

  deleteSubtask(taskId: string, subtaskId: string) {
    return this.httpClient.delete(`${this.baseUrl}/task/${taskId}/subtasks/${subtaskId}`);
  }

  logoutTask() {
    return this.httpClient.post(`${this.baseUrl}/task/logout`, {});
  }

  selectFromSortlist(data: { userId: string; projectId: string; isSelected: boolean }): Observable<any> {
    return this.httpClient.patch<any>(
      this.baseUrl + SuperAdminEndPoint.SELECT_FROM_SORTLIST,
      data
    );
  }

  removeFromShortlist(userId: string, projectId: string): Observable<any> {
    const payload = {
      userId,
      projectId
    };
    return this.httpClient.patch<any>(
      this.baseUrl + SuperAdminEndPoint.REMOVE_FROM_SHORTLIST,
      payload
    );
  }

  // Get task details by ID
  getTaskDetails(taskId: string) {
    return this.httpClient.get(`${this.baseUrl}/task/detail/${taskId}`);
  }
}
