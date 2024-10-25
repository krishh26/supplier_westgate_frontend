import { Component } from '@angular/core';

@Component({
  selector: 'app-uk-writer-question-details',
  templateUrl: './uk-writer-question-details.component.html',
  styleUrls: ['./uk-writer-question-details.component.scss']
})
export class UkWriterQuestionDetailsComponent {
  questionDetails: any = [];

  constructor(){
    const details = localStorage.getItem('ViewQuestion');
    if(details) {
      this.questionDetails = JSON.parse(details);
    }
  }
}
