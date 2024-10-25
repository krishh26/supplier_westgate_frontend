import { Component } from '@angular/core';

@Component({
  selector: 'app-bid-question-details-uk',
  templateUrl: './bid-question-details-uk.component.html',
  styleUrls: ['./bid-question-details-uk.component.scss']
})
export class BidQuestionDetailsUkComponent {

  questionDetails: any = [];

  constructor(){
    const details = localStorage.getItem('ViewQuestionForCoordinator');
    if(details) {
      this.questionDetails = JSON.parse(details);
    }
  }

}
