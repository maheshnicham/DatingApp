import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  container = "Unread";
  pagination?: Pagination;
  messages?: Message[];
  pageNumber= 1;
  pageSize= 2;
  loading = false;

  constructor(private messagesService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages()
  {
    this.loading = true;
    this.messagesService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
      next : response => {
        this.pagination = response.pagination;
        this.messages = response.result;
        this.loading = false;
      }
    })
  }

  deleteMessage(id: number){
    this.messagesService.deleteMessage(id).subscribe({
      next: () => {
        this.messages?.splice(this.messages.findIndex(m => m.id === id), 1);
      }
    })
  }

  pageChanged(event:any){
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }  
}
