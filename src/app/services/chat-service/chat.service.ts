import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export enum ChatServiceEndPoint {
  CHAT_LIST = '/chat/list', // get
  CREATE_CHAT = '/chat/create', // post
  DELETE_CHAT = "/chat/delete/",  // delete
  FETCH_GROUP = "/chat/list/chat-group/", // get
  ADD_TO_CHAT = "/chat/add"  // patch
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl!: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.baseUrl = environment.baseUrl;
  }

  // Get chat list
  getChatList(params: any): Observable<any> {
    let queryParams = new HttpParams();
    if (params?.projectId) {
      queryParams = queryParams.set('projectId', params?.projectId);
    }

    if (params?.limit) {
      queryParams = queryParams.set('limit', params?.limit);
    }

    if (params?.page) {
      queryParams = queryParams.set('page', params?.page);
    }

    return this.httpClient.get<any>(this.baseUrl + ChatServiceEndPoint.CHAT_LIST, { params: queryParams });
  }

  createChat(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + ChatServiceEndPoint.CREATE_CHAT, payload);
  }

  deleteChat(id: any): Observable<any> {
    return this.httpClient
      .delete<any>(this.baseUrl + ChatServiceEndPoint.DELETE_CHAT + id);
  }

  fetchChatGroup(id: any): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + ChatServiceEndPoint.FETCH_GROUP + id);
  }

  addToChat(payload: any): Observable<any> {
    return this.httpClient
      .patch<any>(this.baseUrl + ChatServiceEndPoint.ADD_TO_CHAT, payload);
  }
}
