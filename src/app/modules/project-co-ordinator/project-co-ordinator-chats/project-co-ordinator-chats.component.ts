import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat-service/chat.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-project-co-ordinator-chats',
  templateUrl: './project-co-ordinator-chats.component.html',
  styleUrls: ['./project-co-ordinator-chats.component.scss']
})
export class ProjectCoOrdinatorChatsComponent implements OnInit {
  projectId: string = '';
  loginUser: any;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private chatService: ChatService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.projectId = params['id']
    });

    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    this.chatList();
  }

  // get Chat List
  chatList() {
    const payload = {
      projectId: this.projectId,
      limit: 150,
      page: 1
    }
    this.chatService.getChatList(payload).subscribe((response) => {
      console.log('rrrrrrrr', response);
    })
  }

  createChat() {

  }

  deleteChat() {

  }
}
