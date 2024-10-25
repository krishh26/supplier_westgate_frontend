import { Component } from '@angular/core';

@Component({
  selector: 'app-bid-question-details',
  templateUrl: './bid-question-details.component.html',
  styleUrls: ['./bid-question-details.component.scss']
})
export class BidQuestionDetailsComponent {
  questionDetails: any = [];

  constructor(){
    const details = localStorage.getItem('ViewQuestionForCoordinator');
    if(details) {
      this.questionDetails = JSON.parse(details);
    }
  }

}
